# 16.迁移组件 v-model 协议

- 目标：修复自定义组件的双向绑定协议。
- 搜索线索：全局搜索 `model:`、`value` prop、`$emit('input'`、`@input=`、`v-model` 绑定自定义组件。
- 实施内容：默认 `v-model` 改为 `modelValue` / `update:modelValue`；原来使用 `model` 选项自定义 prop/event 的组件，改成带参数的 `v-model:xxx` 或显式 prop + `update:xxx`。
- 注意事项：不要机械替换所有 `value` 和 `input`，原生表单、业务字段名、普通事件可能仍然应该保留；包装组件还要检查 `$attrs`、`inheritAttrs` 和事件透传。
- 完成标准：组件的外部 API、内部受控值、校验触发、清空/重置行为在 Vue 3 下与原业务预期一致。
