# 34. 移除 $destroy $set $delete 与全局 set delete

## 当前任务

去掉 Vue 2 里已经废弃的实例和全局方法。

## 怎么做

1. 搜索 `$destroy(`、`Vue.set(`、`Vue.delete(`、`this.$set(`、`this.$delete(`。
2. `$destroy` 场景改成通过 `v-if` 控制组件卸载，或用 `app.unmount()` 卸载整个应用。
3. `set` / `delete` 场景改成直接赋值或 `delete obj[key]`。

## 改完以后确认

- 项目里不再出现这些已移除方法。
