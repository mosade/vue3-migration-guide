# 17. 重命名 beforeDestroy 与 destroyed

## 当前任务

把旧生命周期名字改成 Vue 3 新名字。

## 怎么做

1. 全局搜索 `beforeDestroy` 和 `destroyed`。
2. 把 `beforeDestroy` 改成 `beforeUnmount`。
3. 把 `destroyed` 改成 `unmounted`。
4. 如果 mixin、基类组件、指令或测试里也写了这些名字，一并改掉。

## 改完以后确认

- 项目里不再出现 `beforeDestroy` 和 `destroyed`。
