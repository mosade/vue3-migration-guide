# Task L5-07: 修复 Transition 作为根节点时的行为

## 基本信息

- **任务ID**: L5-07
- **层级**: L5 - 渲染层
- **优先级**: P2
- **影响范围**: 组件/模板
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

检查 `<transition>` 作为组件根节点的情况，确保切换时触发生命周期钩子。

## 迁移指南

- [Transition as Root](https://v3-migration.vuejs.org/breaking-changes/transition-as-root.html)

## 检查清单

- [ ] 检查 `<transition>` 作为组件根节点的情况
- [ ] 确保切换时触发生命周期钩子

## 代码示例

### Vue 2 和 Vue 3（相同用法）

```html
<transition>
  <component :is="view"></component>
</transition>
```

## 注意事项

1. Vue 3 中 `<transition>` 作为根节点时行为略有变化
2. 组件切换时的生命周期钩子可能有所不同
3. 建议测试过渡动画的完整性

## 验收标准

- [ ] 过渡动画正常
- [ ] 组件生命周期钩子正确触发
