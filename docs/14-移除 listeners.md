# 14. 移除 $listeners

## 当前任务

移除 Vue 2 的 `$listeners`。

## 怎么做

1. 搜索 `$listeners`、`v-on="$listeners"`。
2. 把事件透传逻辑改成基于 `$attrs`。
3. 如果组件本身需要控制属性透传位置，配合 `inheritAttrs: false` 使用。

## 改完以后确认

- 代码里不再出现 `$listeners`。
