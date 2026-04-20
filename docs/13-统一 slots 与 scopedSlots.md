# 13. 统一 slots 与 scopedSlots

## 当前任务

把旧的 `$scopedSlots` 和旧插槽渲染方式统一到 Vue 3。

## 怎么做

1. 搜索 `$scopedSlots`、`slot:`、程序化创建具名插槽的 render function 代码。
2. 把 `$scopedSlots` 改成 `$slots`。
3. 如果要读取插槽内容，改成调用函数形式，例如 `$slots.header()`。
4. 如果是 render function 里传具名插槽，改成第三个参数传 slots 对象。

## 改完以后确认

- 代码里不再出现 `$scopedSlots`。
