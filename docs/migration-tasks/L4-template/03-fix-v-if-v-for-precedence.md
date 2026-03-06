# Task L4-03: 修复 v-if 与 v-for 优先级变化

## 基本信息

- **任务ID**: L4-03
- **层级**: L4 - 模板层
- **优先级**: P0
- **影响范围**: 模板
- **复杂度**: 高
- **预计工时**: 4-8小时

## 任务描述

Vue 2 中 `v-for` 优先级高于 `v-if`，Vue 3 中 `v-if` 优先级更高。检查同时存在 `v-if` 和 `v-for` 的元素并调整逻辑。

## 迁移指南

- [v-if-v-for](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html)

## 检查清单

- [ ] 检查同时存在 `v-if` 和 `v-for` 的元素
- [ ] Vue 3 中 v-if 优先级更高，可能需要调整逻辑

## 代码对比

### Vue 2 (v-for 优先级更高)

```html
<ul>
  <li v-for="item in items" v-if="item.visible" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

### Vue 3 (v-if 优先级更高 - 报错)

```html
<!-- 方案 1: 先过滤数据 -->
<ul>
  <li v-for="item in visibleItems" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

```html
<!-- 方案 2: 使用 template -->
<ul>
  <template v-for="item in items" :key="item.id">
    <li v-if="item.visible">{{ item.name }}</li>
  </template>
</ul>
```

## 计算属性方案

```js
computed: {
  visibleItems() {
    return this.items.filter(item => item.visible)
  }
}
```

## 验收标准

- [ ] 所有 v-if + v-for 组合已修复
- [ ] 渲染结果与 Vue 2 一致
