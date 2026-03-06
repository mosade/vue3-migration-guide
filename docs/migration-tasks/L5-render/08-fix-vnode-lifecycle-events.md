# Task L5-08: 修复 vnode 生命周期事件前缀

## 基本信息

- **任务ID**: L5-08
- **层级**: L5 - 渲染层
- **优先级**: P2
- **影响范围**: 模板
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 中 vnode 生命周期事件前缀从 `hook:` 改为 `vue:`。将 `@hook:mounted` 等事件改为 `@vue:mounted`。

## 迁移指南

- [VNode Lifecycle Events](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html)

## 检查清单

- [ ] 将 `@hook:mounted` 改为 `@vue:mounted`
- [ ] 更新其他生命周期钩子事件

## 代码对比

### Vue 2

```html
<ChildComponent @hook:updated="onUpdated" />
```

### Vue 3

```html
<ChildComponent @vue:updated="onUpdated" />
```

## 可用事件

- `@vue:before-mount`
- `@vue:mounted`
- `@vue:before-update`
- `@vue:updated`
- `@vue:before-unmount`
- `@vue:unmounted`

## 验收标准

- [ ] 所有 `hook:` 前缀已替换为 `vue:`
- [ ] 生命周期事件监听正常
