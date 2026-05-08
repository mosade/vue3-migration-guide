# 18.迁移 $scopedSlots 用法

- 目标：迁移运行时代码中的 `$scopedSlots` 访问。
- 搜索线索：全局搜索 `$scopedSlots`、`scopedSlots`、`this.$slots`、`context.scopedSlots`。
- 实施内容：将 `$scopedSlots.xxx` 合并到 `$slots.xxx` 的函数调用模型；render 函数中按 Vue 3 slot 函数返回 VNode 数组处理。
- 注意事项：Vue 3 中 slot 统一为函数，判断存在性和调用方式都要改；不要把 `$slots.name` 当成静态 VNode 数组直接拼接。
- 完成标准：有无插槽、默认内容 fallback、作用域参数传递三类场景都正确。
