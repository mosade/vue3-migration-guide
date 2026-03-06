# Task L5-06: 修复 <TransitionGroup> 默认不渲染包裹元素

## 基本信息

- **任务ID**: L5-06
- **层级**: L5 - 渲染层
- **优先级**: P1
- **影响范围**: 模板
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中 `<TransitionGroup>` 默认不再渲染包裹元素。如需包裹元素，需要显式添加 `tag` 属性。

## 迁移指南

- [Transition Group](https://v3-migration.vuejs.org/breaking-changes/transition-group.html)

## 检查清单

- [ ] 检查所有 `<transition-group>` 的使用
- [ ] 如需包裹元素，显式添加 `tag` 属性

## 代码对比

### Vue 2

```html
<transition-group>
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</transition-group>
<!-- 渲染为 <span> 包裹 -->
```

### Vue 3

```html
<!-- 默认不渲染包裹元素 -->
<transition-group>
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</transition-group>

<!-- 如需包裹元素，显式指定 tag -->
<transition-group tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</transition-group>
```

## 样式影响

```css
/* Vue 2 中可能有样式依赖 span 包裹 */
.list span {
  display: flex;
}

/* Vue 3 中需要更新选择器 */
.list {
  display: flex;
}
```

## 验收标准

- [ ] 所有 `<transition-group>` 已检查
- [ ] 需要时添加了 `tag` 属性
- [ ] 列表过渡动画正常
