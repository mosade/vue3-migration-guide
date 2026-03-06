# Task L5-05: 迁移过渡类名变化

## 基本信息

- **任务ID**: L5-05
- **层级**: L5 - 渲染层
- **优先级**: P1
- **影响范围**: 样式/模板
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 中过渡类名有所变化。将 `v-enter` 改为 `v-enter-from`，将 `v-leave` 改为 `v-leave-from`。

## 迁移指南

- [Transition](https://v3-migration.vuejs.org/breaking-changes/transition.html)

## 检查清单

- [ ] 将 `v-enter` 改为 `v-enter-from`
- [ ] 将 `v-leave` 改为 `v-leave-from`

## 代码对比

### Vue 2

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

### Vue 3

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

## 类名映射

| Vue 2 | Vue 3 |
|-------|-------|
| `v-enter` | `v-enter-from` |
| `v-enter-active` | `v-enter-active` (不变) |
| `v-enter-to` | `v-enter-to` (不变) |
| `v-leave` | `v-leave-from` |
| `v-leave-active` | `v-leave-active` (不变) |
| `v-leave-to` | `v-leave-to` (不变) |

## 自定义过渡名

```css
/* Vue 3 */
.my-transition-enter-from,
.my-transition-leave-to {
  transform: translateX(-100%);
}
```

## 验收标准

- [ ] 所有过渡类名已更新
- [ ] 过渡动画正常
