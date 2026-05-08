# 16.迁移组件 v-model 协议

## 目标

- 修复自定义组件在 Vue3 下的双向绑定协议。
- 默认 `v-model` 从 Vue2 的 `value` / `input` 迁移到 Vue3 的 `modelValue` / `update:modelValue`。
- 保留原业务语义、校验触发、清空、重置和异步回填行为。

## 最小改动原则

- 能不改就不改。
- 不机械替换所有 `value`、`input`、`@input`。
- 原生表单、业务字段名、普通 DOM input 事件、非 Vue 组件事件保持原样。
- 只有能确认是自定义组件双向绑定协议时才修改。

## 允许修改范围

- 使用 `model:` 选项的自定义组件。
- 声明 `value` prop 且通过 `$emit('input', ...)` 对外同步的自定义组件。
- 父组件中绑定到自定义组件的 `v-model`。
- 与同一个受控值直接相关的最小父子组件调用链。

## 禁止修改范围

- 不修改原生 `<input>`、`<textarea>`、`<select>` 的 `v-model`。
- 不把业务字段 `value` 改名为 `modelValue`。
- 不重构表单组件架构。
- 不顺手补 Composition API、TypeScript 类型或格式化。
- 不修改第三方组件库源码。

## 搜索命令

```bash
rg -n "model\\s*:|props\\s*:.*value|value\\s*:[^,}]+|\\$emit\\(['\\\"]input['\\\"]|@input=|v-model" src .
```

复杂包装组件再补充搜索：

```bash
rg -n "\.sync|\$listeners|\$attrs|inheritAttrs|v-on:input|@input\s*=" src .
```

如果项目源码不在 `src`，先运行：

```bash
rg -n "model\\s*:|\\$emit\\(['\\\"]input['\\\"]|v-model" .
```

## 命中分类

- 必改：自定义组件声明 `value` prop，并通过 `$emit('input', nextValue)` 与父组件 `v-model` 配套。
- 必改：组件使用 Vue2 `model: { prop, event }` 选项定义双向绑定协议。
- 可不改：原生表单元素上的 `v-model`。
- 可不改：普通业务字段名 `value`，例如表格列、选项值、接口字段。
- 可不改：普通 DOM `input` 事件处理，例如输入框内部 `@input="handleInput"`。
- 阻塞：无法判断某个 `input` 是业务事件、DOM 事件还是组件对外协议。
- 阻塞：命中第三方 UI 组件或私有公共组件，且调用方数量很大。

## 修改规则

- Vue2 默认协议：
  - 子组件 `props: { value: ... }` 改为 `props: { modelValue: ... }`。
  - 子组件 `$emit('input', nextValue)` 改为 `$emit('update:modelValue', nextValue)`。
  - 子组件内部读取受控值从 `this.value` 改为 `this.modelValue`。
  - 同一组件内其他业务字段名 `value` 不改。
- Vue2 `model` 选项：
  - 如果原协议是 `model: { prop: 'checked', event: 'change' }`，优先把父组件改为 `v-model:checked`。
  - 子组件对外同步事件改为 `$emit('update:checked', nextValue)`。
  - 删除 `model` 选项。
- 父组件：
  - 对已迁移子组件保留 `v-model` 或改为带参数 `v-model:xxx`。
  - 不把所有 `@input` 改为 `@update:modelValue`，只修改与已迁移子组件配套的调用点。

## 第三方依赖处理

- 第三方组件库的 Vue2 `value` / `input` 协议不在本任务内修改。
- 如果第三方库没有 Vue3 版本或兼容层，记录库名、组件名、调用位置和阻塞原因。
- 项目内自研 UI 包装层可以修改，但必须保留对业务调用方的外部语义。

## 验证命令

```bash
rg -n "model\\s*:|\\$emit\\(['\\\"]input['\\\"]|props\\s*:.*value|@input=|v-model" src .
git diff --check
git diff --stat
```

如果项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 表单输入、清空、重置、异步回填。
- 校验触发时机。
- 弹窗表单打开、编辑、关闭后再次打开。
- 包装组件透传 `disabled`、`readonly`、`placeholder`、`class`、`style`。

## 停止条件

- 除 Vue3 v-model 协议迁移所需的受控 prop/event 外，如需改变其他公开业务 API。
- 一个公共组件有大量调用方，无法在本任务中确认全部调用语义。
- 命中同时涉及 `.sync`、`$listeners`、`inheritAttrs` 或复杂表单校验。
- 无法判断 `value` 是业务字段还是受控值。
- 修改会导致大面积格式化 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 已迁移的组件文件。
- 已修改的父组件调用点。
- 保留的 `value` / `input` 命中及原因。
- 阻塞组件和需要人工确认的问题。
- 运行过的验证命令及结果。
