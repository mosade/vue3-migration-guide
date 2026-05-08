# 19.迁移 $listeners 用法

- 目标：迁移 `$listeners` 相关透传逻辑。
- 搜索线索：全局搜索 `$listeners`、`v-on="$listeners"`、`inheritAttrs`、`$attrs`。
- 实施内容：Vue 3 中监听器并入 `$attrs`，简单包装组件可用 `v-bind="$attrs"` 透传；需要控制行为的组件应显式声明 `emits` 并手动转发事件。
- 注意事项：`class`、`style`、普通 attr、事件监听都可能在 `$attrs` 里，不能无脑整包透传到错误 DOM 节点；多根组件必须明确 attrs 落点。
- 完成标准：父组件监听的事件仍能触发，且没有把无关 attr 或事件泄漏到错误元素上。
