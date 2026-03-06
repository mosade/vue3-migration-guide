# Task L6-03: 移除 $children 实例属性

## 基本信息

- **任务ID**: L6-03
- **层级**: L6 - 清理层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已移除 `$children` 实例属性。查找所有 `this.$children` 的使用并使用 `ref` 和 `provide/inject` 替代。

## 迁移指南

- [$children](https://v3-migration.vuejs.org/breaking-changes/children.html)

## 检查清单

- [ ] 查找 `this.$children` 的使用
- [ ] 使用 `ref` 和 `provide/inject` 替代

## 代码对比

### Vue 2

```js
// 访问子组件
this.$children.forEach(child => {
  child.doSomething()
})
```

### Vue 3

```html
<ChildComponent v-for="i in 3" :ref="el => setItemRef(el, i)" />
```

```js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const itemRefs = ref([])

    const setItemRef = (el, index) => {
      if (el) {
        itemRefs.value[index] = el
      }
    }

    onMounted(() => {
      // 访问子组件
      itemRefs.value.forEach(child => {
        child.doSomething()
      })
    })

    return { itemRefs, setItemRef }
  }
}
```

## provide/inject 替代方案

```js
// 父组件
provide('parent', {
  registerChild(child) {
    // 管理子组件
  }
})

// 子组件
const parent = inject('parent')
onMounted(() => {
  parent.registerChild(instance)
})
```

## 验收标准

- [ ] 所有 `$children` 使用已替换
- [ ] 子组件访问功能正常
