# Task L3-07: 修复自定义元素互操作性

## 基本信息

- **任务ID**: L3-07
- **层级**: L3 - 组件定义层
- **优先级**: P2
- **影响范围**: 组件/模板
- **复杂度**: 中
- **预计工时**: 2-4小时

## 任务描述

Vue 3 中 `is` 属性的使用限制在 `<component>` 标签上。检查自定义内置元素的使用并进行修复。

## 迁移指南

- [Custom Elements Interop](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html)

## 检查清单

- [ ] 检查 `<component is="custom-element">` 的使用
- [ ] 自定义内置元素需改为 `<component :is="'custom-element'"` 或添加 `vue: ""` 前缀

## 代码对比

### Vue 2

```html
<!-- 自定义内置元素 -->
<button is="custom-button"></button>
```

### Vue 3

```html
<!-- 使用 component 标签 -->
<component :is="'custom-button'"></component>

<!-- 或添加 vue 前缀 -->
<button vue:is="custom-button"></button>
```

## 配置自定义元素

```js
// Vue 3 中配置自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('custom-')
}
```

## 验收标准

- [ ] 所有自定义元素正确渲染
- [ ] 无控制台警告
