# Task L3-06: 迁移函数式组件

## 基本信息

- **任务ID**: L3-06
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中函数式组件只能通过纯函数创建。查找所有 `functional` 属性或 `<template functional>` 的 SFC 并迁移。

## 迁移指南

- [Functional Components](https://v3-migration.vuejs.org/breaking-changes/functional-components.html)

## 检查清单

- [ ] 查找 `<template functional>` 的 SFC
- [ ] 查找 `functional: true` 的组件选项
- [ ] 改为纯函数组件

## 代码对比

### Vue 2（SFC）

```html
<template functional>
  <div>{{ props.message }}</div>
</template>
```

### Vue 2（JS）

```js
export default {
  functional: true,
  props: ['message'],
  render(h, { props }) {
    return h('div', props.message)
  }
}
```

### Vue 3

```js
import { h } from 'vue'

const FunctionalComp = (props) => {
  return h('div', props.message)
}

FunctionalComp.props = ['message']

export default FunctionalComp
```

## SFC 迁移为函数

```html
<!-- Vue 2 的 functional SFC -->
<template functional>
  <div class="alert" :class="props.type">
    {{ props.message }}
  </div>
</template>
```

```js
// Vue 3 的函数组件
import { h } from 'vue'

const Alert = (props) => {
  return h('div', {
    class: ['alert', props.type]
  }, props.message)
}

Alert.props = ['type', 'message']

export default Alert
```

## 验收标准

- [ ] 所有函数式组件迁移完成
- [ ] 组件渲染正常
- [ ] Props 传递正常
