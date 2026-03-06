# Task L4-08: 移除 inline-template 属性

## 基本信息

- **任务ID**: L4-08
- **层级**: L4 - 模板层
- **优先级**: P2
- **影响范围**: 模板
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已移除 `inline-template` 属性。查找其使用并改为使用 `<slot>` 或单独的组件文件。

## 迁移指南

- [Inline Template](https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html)

## 检查清单

- [ ] 查找 `inline-template` 属性的使用
- [ ] 改为使用 `<slot>` 或单独的组件文件

## 代码对比

### Vue 2

```html
<MyComponent inline-template>
  <div>
    <p>These are compiled as the component's own template</p>
  </div>
</MyComponent>
```

### Vue 3

```html
<!-- 使用默认 slot -->
<MyComponent v-slot="{ data }">
  <div>
    <p>{{ data.message }}</p>
  </div>
</MyComponent>
```

## Slot 方案

```html
<!-- 子组件 -->
<template>
  <div>
    <slot :data="internalData"></slot>
  </div>
</template>
```

## 单独组件方案

```html
<!-- 提取为单独组件 -->
<MyCustomTemplate />
```

```js
// 在父组件中
import MyCustomTemplate from './MyCustomTemplate.vue'

export default {
  components: { MyCustomTemplate }
}
```

## 验收标准

- [ ] 所有 `inline-template` 已替换
- [ ] 模板渲染正常
