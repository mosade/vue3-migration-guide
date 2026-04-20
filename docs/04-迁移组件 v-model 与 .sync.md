# 04. 迁移组件 v-model 与 .sync

## 当前任务

统一修改组件双向绑定协议。

## 怎么做

1. 全局搜索 `.sync`、`model: {`、`value:`、`this.$emit('input'`。
2. 把 `:prop.sync="x"` 改成 `v-model:prop="x"`。
3. 把默认 `v-model` 的组件协议从 `value` / `input` 改成 `modelValue` / `update:modelValue`。
4. 如果组件用了 `model` 选项自定义 prop 和 event，删除 `model` 选项，改成 `v-model:xxx` 对应的 prop 与 `update:xxx` 事件。
5. 同时补上组件的 `emits` 声明。

## 改完以后确认

- 代码里不再出现 `.sync`。
- 默认 `v-model` 组件都已经使用 `modelValue`。
