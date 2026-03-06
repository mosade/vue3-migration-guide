# Task L6-04: 移除 $destroy 实例方法

## 基本信息

- **任务ID**: L6-04
- **层级**: L6 - 清理层
- **优先级**: P2
- **影响范围**: 组件
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 已移除 `$destroy` 实例方法。使用条件渲染控制组件生命周期。

## 迁移指南

- [Global API](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

## 检查清单

- [ ] 查找 `this.$destroy()` 的使用
- [ ] 使用条件渲染控制组件生命周期

## 代码对比

### Vue 2

```js
this.$destroy()
```

### Vue 3

```html
<template>
  <ChildComponent v-if="showComponent" />
</template>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const showComponent = ref(true)

    // 卸载组件
    const destroyComponent = () => {
      showComponent.value = false
    }

    return { showComponent, destroyComponent }
  }
}
```

## 动态组件方案

```html
<component :is="currentComponent" />
```

```js
const currentComponent = shallowRef(ChildComponent)

// 卸载
currentComponent.value = null
```

## 验收标准

- [ ] 所有 `$destroy` 使用已替换
- [ ] 组件生命周期控制正常
