# Task L5-01: 修复 $attrs 包含 class 和 style 的变化

## 基本信息

- **任务ID**: L5-01
- **层级**: L5 - 渲染层
- **优先级**: P1
- **影响范围**: 渲染/组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中 `$attrs` 包含 `class` 和 `style` 属性。检查 `$attrs` 的使用，确保组件正确处理这些属性。

## 迁移指南

- [$attrs Includes Class and Style](https://v3-migration.vuejs.org/breaking-changes/attrs-includes-class-style.html)

## 检查清单

- [ ] 检查 `$attrs` 的使用
- [ ] 确保组件正确处理可能包含 `class` 和 `style` 的 attrs

## 代码对比

### Vue 2

```js
// $attrs 不包含 class 和 style
h('div', { attrs: this.$attrs })
```

### Vue 3

```js
// $attrs 包含 class 和 style
h('div', this.$attrs)

// 如需分离
const { class: cls, style, ...attrs } = this.$attrs
h('div', { class: cls, style, ...attrs })
```

## 组件属性处理

```js
export default {
  mounted() {
    // Vue 3 中 $attrs 包含 class 和 style
    console.log(this.$attrs)
  },
  render() {
    // 直接传递所有 attrs
    return h('div', this.$attrs)
  }
}
```

## 验收标准

- [ ] 所有 $attrs 使用已更新
- [ ] class 和 style 传递正确
