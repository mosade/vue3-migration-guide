# 50.迁移 Options API 兼容差异

## 目标

- 迁移 Vue 3 中 Options API 的细节差异：`data` 必须为函数、mixin data 浅合并、props 默认值不再能访问 `this`、`propsData` 移除。
- 修复属性 coercion 变化导致的可见行为差异。
- 默认保持现有业务行为和组件外部 API。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- 不把 mixin 深层合并问题顺手重构为 Composition API。

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

原搜索线索：全局搜索对象形式 `data`、props 默认函数里的 `this`、`propsData`、布尔 false 绑定到非布尔属性。

```bash
rg -n 'data\s*:\s*\{|default\s*\([^)]*\)\s*\{|default\s*:\s*function|propsData|contenteditable|draggable|spellcheck|aria-[a-z-]+|:\w+=.*false' src
```

## 命中分类

- 必改：组件选项中 `data: { ... }`。
- 必改：props default factory 中访问 `this`。
- 必改：`propsData` 用于创建根实例或测试挂载，需改为 `createApp` 第二参数或测试工具 Vue 3 写法。
- 必改：依赖 Vue 2 将非布尔属性 `false` 移除的绑定，Vue 3 下需要改为 `null` 或 `undefined` 才移除。
- 可不改：`data()` 已返回对象，且不依赖 mixin 深合并。
- 可不改：字符串、文档、普通业务字段里的 `propsData`。
- 阻塞：mixin / extends 的 data 深合并语义不清，可能影响多个业务模块。
- 阻塞：props 默认值依赖实例注入、路由、store 或全局属性，无法安全替换。

## 修改规则

- `data: { ... }` 改为 `data() { return { ... } }`，不改字段名和初始值。
- props default factory 需要使用其他 props 时，改用 Vue 3 传入的 raw props 参数。
- props default factory 需要依赖注入时，明确使用 `inject`；无法确认默认值来源时停止。
- `propsData` 根实例场景改为 `createApp(Root, props)`；测试场景按当前测试工具 Vue 3 API 修改。
- 对非布尔 attribute，如果原语义是移除属性，使用 `null` 或 `undefined`，不要使用 `false`。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n 'data\s*:\s*\{|default\s*\([^)]*\)\s*\{|default\s*:\s*function|propsData|contenteditable|draggable|spellcheck|aria-[a-z-]+|:\w+=.*false' src
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

- 根实例初始 props、测试挂载 props 和默认值行为不变。
- 依赖 mixin 默认对象的页面没有丢失嵌套字段。
- `contenteditable`、`draggable`、`spellcheck`、`aria-*` 等属性输出符合原交互和可访问性预期。

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
