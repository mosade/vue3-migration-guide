# 36.移除 $destroy 用法

## 目标

- 移除 Vue 3 已删除的实例 `$destroy()` API 依赖。
- 只处理能确认接收者是 Vue 实例的手动销毁逻辑。
- 默认保持动态挂载组件、弹窗、消息服务和临时组件的创建、关闭、DOM 清理语义。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- 不把弹窗服务、全局组件服务或手动挂载架构重写为另一套模式。

## 允许修改范围

- 只修改本任务搜索命令命中的业务源码、配置或依赖声明。
- 只修改与本任务目标直接相关的最小代码片段。
- 如果需要修改公共组件 API，必须先记录调用方影响，并停止等待人工确认。
- 如果命中构建、入口或依赖配置，只修改能证明是 Vue3 迁移阻塞的配置项。

## 禁止修改范围

- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不顺手升级无关依赖。
- 不迁移到 Vite、Pinia 或 Composition API。
- 不修改无关格式。
- 不把普通业务对象或第三方实例的 `destroy()` 误改为 Vue app 生命周期。

## 搜索命令

原搜索线索：全局搜索 `$destroy()`、手动挂载组件和宽泛 `destroy(` 命中，再人工分类。

```bash
rg -n '\.\$destroy\(|\$destroy\(|destroy\s*\(' src
```

复杂动态挂载场景再补充搜索：

```bash
rg -n 'Vue\.extend|new\s+[A-Z][A-Za-z0-9_]*\(|\$mount\(|document\.createElement|appendChild|removeChild' src
```

## 命中分类

- 必改：能确认是手动动态挂载根实例，且可在创建处保存 app 实例的 `$destroy()`。
- 必改：`Vue.extend(...)`、`new Ctor(...)`、`instance.$mount(...)` 创建的临时根组件随后通过 `$destroy()` 清理，且能在创建处改为 `createApp(...).mount(container)` 并保存 app 实例。
- 可不改：普通业务对象、图表库、编辑器、播放器、地图、WebSocket、微前端容器等第三方实例的 `destroy()`。
- 可不改：字符串、文档、注释中的 `$destroy` 或 `destroy(`。
- 阻塞：无法证明 `destroy()` 接收者是否为 Vue 实例。
- 阻塞：组件内部 `this.$destroy()`、子组件 ref 实例销毁，或无法追溯到 `createApp` / 手动 `$mount` 容器的实例销毁。
- 阻塞：动态挂载组件依赖 router、store、i18n、provide、`globalProperties`、全局组件、全局指令或插件上下文，且无法证明迁移后上下文等价保留。
- 阻塞：销毁逻辑同时负责全局事件、DOM 容器、body 子节点、计时器或跨应用资源，无法安全判断最小替换。

## 修改规则

- 动态挂载组件只有在能证明 app context 等价保留时，才改为 `createApp(Component, props)`，并保存返回的 app 实例。
- 原来调用 `vm.$destroy()` 的位置改为调用 `app.unmount()`。
- `app.unmount()` 只能替换对应 `createApp(...).mount(container)` 创建出的 app。
- 如果原代码依赖 mounted 返回的组件公开实例，必须保留对应引用，不得只保存 app 导致行为丢失。
- 如果原组件依赖 router、store、i18n、provide、`globalProperties`、全局组件、全局指令或插件，必须复用或补齐等价上下文；无法证明等价时停止。
- 如果原逻辑手动移除 DOM 容器，保留等价的 `parentNode.removeChild(container)` 或现有清理逻辑。
- 保留原事件解绑、定时器清理、回调触发顺序；无法确认顺序时停止。
- 不顺手把服务式组件改为全局 store、provide/inject、Composition API 或插件重构。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n '\.\$destroy\(|\$destroy\(' src
rg -n 'Vue\.extend|new\s+[A-Z][A-Za-z0-9_]*\(|\$mount\(' src
git diff --check
git diff --stat
```

如果搜索范围与项目实际目录不一致，把命令中的路径替换为实际源码、配置或依赖文件范围。若项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 动态弹窗、消息提示、确认框、临时挂载组件能正常打开和关闭。
- 反复打开关闭后没有重复 DOM 节点、重复事件监听或控制台报错。
- 原关闭回调、销毁回调、Promise resolve/reject 时机保持一致。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断 `destroy()` 接收者是否为 Vue 实例。
- 销毁逻辑耦合全局事件、DOM 容器、计时器、弹窗队列或微前端生命周期，无法确认最小替换。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
