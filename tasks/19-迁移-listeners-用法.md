# 19.迁移 $listeners 用法

## 目标

- 迁移 Vue2 `$listeners` 相关透传逻辑。
- 在 Vue3 中监听器并入 `$attrs`，需要明确 attrs 和事件落点。
- 保持父组件监听事件的触发次数、payload 和触发时机不变。

## 最小改动原则

- 能不改就不改。
- 不把 `$attrs` 无脑整包透传到错误 DOM 节点。
- 不因为发现 `inheritAttrs` 就重构组件结构。
- 只迁移明确依赖 `$listeners` 的包装组件或 render 函数。

## 允许修改范围

- 使用 `$listeners` 的组件模板、render 函数和 JS 逻辑。
- 使用 `v-on="$listeners"` 的包装组件。
- 与同一包装组件事件透传直接相关的 `emits` 声明。
- 为了避免重复触发而必须调整的最小 `$attrs` 绑定点。

## 禁止修改范围

- 不重写组件插槽结构。
- 不修改业务事件名和 payload。
- 不把所有 `$attrs` 都透传到根节点。
- 不为内部 DOM 事件错误添加 `emits`。
- 不顺手迁移无关 `v-bind="$attrs"` 代码。

## 搜索命令

如果项目有 `src` 目录，先在 `src` 下执行：

```bash
rg -n '\$listeners|context\.listeners|v-on="\$listeners"|v-on='"'"'\$listeners'"'"'|inheritAttrs|\$attrs|emits\s*:' src
```

如果项目源码不在 `src`，把命令末尾的 `src` 替换为 `.`。

## 命中分类

- 必改：模板中存在 `v-on="$listeners"`。
- 必改：JS 或 render 函数读取 `this.$listeners` 或 `context.listeners`。
- 必改：包装组件依赖 `$listeners` 手动转发父组件事件。
- 可不改：已有 Vue3 写法 `$attrs`，且事件落点明确。
- 可不改：字符串、注释、文档中的 `$listeners`。
- 阻塞：多根组件无法判断 attrs 应落在哪个元素。
- 阻塞：组件既转发事件又消费事件，无法判断哪些事件属于对外 API。

## 修改规则

- 简单单根包装组件：
  - `v-on="$listeners"` 改为 `v-bind="$attrs"`，前提是 attrs、class、style 和事件都应该落在同一个元素或子组件上。
- 需要控制事件的包装组件：
  - 只有组件已经明确 `$emit` 某个对外事件，且本次改动会保留 re-emit 路径时，才为该事件补充 `emits`。
  - 只是透传父监听器时，不要为了清理 `$attrs` 而添加 `emits`。
  - 模板中优先使用明确事件转发，例如 `@click="$emit('click', $event)"`。
  - render/setup 中处理 `onXxx` props 时，必须确认 key 存在且落点正确，不要把它当通用模板迁移模式。
- 多根组件：
  - 不自动透传 `$attrs`。
  - 先选择明确落点；无法确认时停止并报告。
- render 函数：
  - 将 `listeners` 合并到 Vue3 props 事件字段时，只处理当前组件明确转发的事件。

## 第三方依赖处理

- 第三方组件库内部 `$listeners` 不修改。
- 项目内二次封装组件可以修改，但必须说明 attrs 和事件最终落点。
- 如果 UI 库 Vue3 版本改变了事件名，记录为生态依赖阻塞，不在本任务中猜测替换。

## 验证命令

```bash
rg -n '\$listeners|context\.listeners|v-on="\$listeners"|v-on='"'"'\$listeners'"'"'|inheritAttrs|\$attrs|emits\s*:' src
git diff --check
git diff --stat
```

如果项目源码不在 `src`，把命令末尾的 `src` 替换为 `.`。

如果项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 包装按钮、表单项、弹窗、上传组件的点击、输入、关闭、确认事件。
- 父组件监听事件是否仍触发一次且只触发一次。
- `class`、`style`、`disabled`、`placeholder` 等 attrs 是否落在原预期元素。
- 多根组件是否出现 Vue attrs 警告。

## 停止条件

- 无法判断 `$attrs` 应落到哪个元素或子组件。
- 修改会改变父组件监听的事件名、payload 或触发次数。
- 组件同时涉及 `v-model`、`.sync`、`emits` 大量缺失。
- 需要统一重构包装组件体系。
- 修改会导致大面积格式化 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 已迁移的 `$listeners` 文件。
- 每个组件 attrs 和事件的最终落点。
- 保留的 `$attrs` / `inheritAttrs` 命中及原因。
- 阻塞组件和需要人工确认的问题。
- 运行过的验证命令及结果。
