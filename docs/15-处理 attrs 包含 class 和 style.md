# 15. 处理 $attrs 包含 class 和 style

## 当前任务

修正 `$attrs` 在 Vue 3 中会包含 `class` 和 `style` 带来的影响。

## 怎么做

1. 搜索 `inheritAttrs: false`。
2. 检查这些组件是否手动把 `$attrs` 绑定到非根节点。
3. 确认 `class` 和 `style` 最终会落到你期望的元素上，而不是丢失或重复。

## 改完以后确认

- `inheritAttrs: false` 相关组件的样式透传正常。
