# 22.移除 inline-template

- 目标：删除不再推荐的 `inline-template` 用法。
- 搜索线索：全局搜索 `inline-template`。
- 实施内容：把内联模板迁回子组件自己的 `<template>`、render 函数或显式 slot；父组件只负责传 props/slots。
- 注意事项：inline-template 里的变量解析边界容易混淆，迁移时要确认每个变量来自父作用域还是子组件实例。
- 完成标准：模板变量来源清晰，组件渲染结果与原页面一致。
