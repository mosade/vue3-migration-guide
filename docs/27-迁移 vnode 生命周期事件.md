# 27. 迁移 vnode 生命周期事件

## 当前任务

把旧的 `hook:` 事件前缀改成 Vue 3 的 `vnode-` 体系。

## 怎么做

1. 搜索 `hook:`。
2. 把旧事件名改成对应的 `vnode-` 前缀名称。
3. 如果事件名里还带 `beforeDestroy` 或 `destroyed`，同步改成 `beforeUnmount` 和 `unmounted`。

## 改完以后确认

- 代码里不再出现旧的 `hook:` 前缀。
