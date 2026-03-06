# Task L4-04: 修复 v-bind="object" 的顺序敏感性

## 基本信息

- **任务ID**: L4-04
- **层级**: L4 - 模板层
- **优先级**: P1
- **影响范围**: 模板
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 2 中 `v-bind="object"` 与其他属性的顺序会影响结果，Vue 3 中独立属性始终覆盖 object 中的同名属性。

## 迁移指南

- [v-bind](https://v3-migration.vuejs.org/breaking-changes/v-bind.html)

## 检查清单

- [ ] 检查 `v-bind="object"` 与其他独立属性的组合
- [ ] Vue 3 中独立属性始终覆盖 object 中的同名属性

## 代码对比

### Vue 2 (顺序敏感)

```html
<!-- object 中的 id 会覆盖 "my-id" -->
<div id="my-id" v-bind="object">

<!-- "my-id" 会覆盖 object 中的 id -->
<div v-bind="object" id="my-id">
```

### Vue 3 (独立属性始终优先)

```html
<!-- 两种情况都是 "my-id" 优先 -->
<div id="my-id" v-bind="object">
<div v-bind="object" id="my-id">
```

## 显式合并策略

```html
<!-- 如需 Vue 2 行为，显式合并 -->
<div v-bind="{ ...object, id: 'my-id' }">
```

## 验收标准

- [ ] 所有 v-bind 属性合并正确
- [ ] 组件行为正常
