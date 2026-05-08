# 30.移除 Vue.delete

- 目标：删除 Vue 2 响应式补丁 API 之一。
- 搜索线索：全局搜索 `Vue.delete`、`this.$delete`。
- 实施内容：普通删除用 `delete obj[key]`；需要保留不可变语义时通过解构或重建对象删除字段。
- 注意事项：删除数组元素不要用 `delete arr[index]`，应使用 `splice` 或过滤生成新数组。
- 完成标准：字段删除、列表删除后视图和派生状态都正确更新。
