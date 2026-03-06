# Task L4-02: 修复 key 属性在 template v-for 上的使用

## 基本信息

- **任务ID**: L4-02
- **层级**: L4 - 模板层
- **优先级**: P0
- **影响范围**: 模板
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中 `key` 属性必须绑定在子元素上，而不是 `<template v-for>` 标签上。

## 迁移指南

- [Key Attribute](https://v3-migration.vuejs.org/breaking-changes/key-attribute.html)

## 检查清单

- [ ] 将 `<template v-for>` 上的 `key` 移到子元素上
- [ ] 检查非 v-for 节点上不必要的 key

## 代码对比

### Vue 2

```html
<template v-for="item in items" :key="item.id">
  <div>{{ item.name }}</div>
</template>
```

### Vue 3

```html
<template v-for="item in items">
  <div :key="item.id">{{ item.name }}</div>
</template>
```

## 多子元素情况

```html
<!-- Vue 3 需要为每个子元素添加 key -->
<template v-for="item in items">
  <div :key="item.id + '-name'">{{ item.name }}</div>
  <div :key="item.id + '-desc'">{{ item.desc }}</div>
</template>
```

## 验收标准

- [ ] 所有 template v-for 的 key 在子元素上
- [ ] 列表渲染正常
