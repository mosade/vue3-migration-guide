# 28.移除 functional: true

- 目标：去除 Vue 2 函数式组件标记。
- 搜索线索：全局搜索 `functional: true`、`<template functional>`、`context.props`、`context.children`。
- 实施内容：简单展示组件改为函数组件；需要生命周期、状态或复杂透传的组件改为普通组件。
- 注意事项：Vue 2 functional context 中的 `data`、`listeners`、`scopedSlots`、`children` 不能原样照搬；要重新确认 attrs、slots、emits 的边界。
- 完成标准：组件的 props、attrs、slots、事件透传与原调用方兼容。
