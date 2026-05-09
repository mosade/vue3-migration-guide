# 46.迁移全局 API Tree-Shaking

## 目标

- 迁移 Vue 2 中仍从默认 `Vue` 对象访问的非变异全局 API。
- 将 `Vue.nextTick`、`Vue.observable`、`Vue.version`、`Vue.compile` 等改为 Vue 3 可用的命名导出或明确替代方案。
- 默认保持现有业务行为和组件外部 API。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- `Vue.set`、`Vue.delete` 已由独立任务处理，本任务只记录交叉命中，不重复修改。

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

## 搜索命令

原搜索线索：全局搜索仍从默认 `Vue` 对象访问的非变异 API，以及插件里对这些 API 的引用。

```bash
rg -n 'Vue\.(nextTick|observable|version|compile|extend|set|delete)\b|import\s+Vue\s+from\s+' .
```

## 命中分类

- 必改：`Vue.nextTick(...)`，改为 `import { nextTick } from 'vue'` 后调用 `nextTick(...)`。
- 必改：`Vue.observable(...)`，改为 `import { reactive } from 'vue'` 后调用 `reactive(...)`，并确认原对象是否被跨模块共享。
- 必改：`Vue.extend(...)` 用于类型推断时，改为 `defineComponent(...)`。
- 必改：`Vue.extend(...)` 后立即 `new Ctor().$mount(...)` 的临时挂载，改为 `createApp(Component).mount(...)`。
- 可不改：组件实例上的 `this.$nextTick(...)`，除非项目约定也统一迁移。
- 可不改：`Vue.set`、`Vue.delete` 命中，交给任务 29、30。
- 阻塞：`Vue.compile` 依赖运行时模板编译，且无法确认当前构建是否使用 full build。
- 阻塞：第三方插件 UMD 自动安装、外部包或测试工具直接依赖 Vue 2 构造器。

## 修改规则

- 对 `Vue.nextTick` 做最小导入替换，不改变异步时序和回调上下文。
- 对 `Vue.observable` 只替换为 `reactive`，不顺手改 store 结构或响应式访问方式。
- 对 `Vue.extend` 区分类型推断、继承、动态挂载三种语义；无法确定时停止并报告。
- 对插件内部命中，确保 Vue 作为 peer/external 时不被打包进插件产物。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n 'Vue\.(nextTick|observable|version|compile|extend)\b|import\s+Vue\s+from\s+' .
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

- 依赖 `nextTick` 的 DOM 测量、滚动定位、焦点设置时序不变。
- 由 `observable` 迁移的共享状态仍能触发视图更新。
- 动态挂载组件仍能创建、卸载并清理事件监听。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断某处代码是业务字段、普通事件还是 Vue2 迁移目标。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
