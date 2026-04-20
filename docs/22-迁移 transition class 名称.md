# 22. 迁移 transition class 名称

## 当前任务

修正过渡类名从 Vue 2 到 Vue 3 的变化。

## 怎么做

1. 全局搜索 `.v-enter`、`.v-leave`、`enter-class`、`leave-class`。
2. 把 `.v-enter` 改成 `.v-enter-from`，把 `.v-leave` 改成 `.v-leave-from`。
3. 把 `enter-class` 改成 `enter-from-class`，把 `leave-class` 改成 `leave-from-class`。

## 改完以后确认

- 所有过渡动画样式名已经更新。
