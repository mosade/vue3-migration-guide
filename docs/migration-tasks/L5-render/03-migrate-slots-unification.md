# Task L5-03: 迁移 $slots 和 $scopedSlots 统一

## 基本信息

- **任务ID**: L5-03
- **层级**: L5 - 渲染层
- **优先级**: P0
- **影响范围**: 渲染/组件
- **复杂度**: 高
- **预计工时**: 8-16小时

## 任务描述

Vue 3 中 `$scopedSlots` 已移除，所有插槽统一为 `$slots` 且均为函数。将 `$scopedSlots` 改为 `$slots`，并更新插槽访问方式。

## 迁移指南

- [Slots Unification](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html)

## 检查清单

- [ ] 将 `$scopedSlots` 改为 `$slots`
- [ ] 所有插槽都作为函数访问
- [ ] 移除 `this.$slots.default` 的静态访问

## 代码对比

### Vue 2

```js
// 作用域插槽
this.$scopedSlots.header({ msg: 'hello' })

// 普通插槽
this.$slots.header
```

### Vue 3

```js
// 统一为函数调用
this.$slots.header({ msg: 'hello' })

// 检查插槽是否存在
if (this.$slots.header) {
  this.$slots.header({ msg: 'hello' })
}
```

## 渲染函数中的使用

```js
// Vue 3
render() {
  return h('div', [
    this.$slots.header?.({ msg: 'hello' }),
    this.$slots.default?.()
  ])
}
```

## setup 函数中的使用

```js
import { h, useSlots } from 'vue'

export default {
  setup() {
    const slots = useSlots()

    return () => h('div', [
      slots.header?.({ msg: 'hello' })
    ])
  }
}
```

## 验收标准

- [ ] 所有 `$scopedSlots` 已替换为 `$slots`
- [ ] 插槽渲染正常
- [ ] 作用域插槽数据传递正常
