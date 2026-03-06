# Task L2-05: 移除 propsData 选项的使用

## 基本信息

- **任务ID**: L2-05
- **层级**: L2 - 全局层
- **优先级**: P2
- **影响范围**: 全局
- **复杂度**: 低
- **预计工时**: 1-2小时

## 任务描述

Vue 3 已移除 `propsData` 选项。查找并替换所有使用 `propsData` 的实例化代码。

## 迁移指南

- [Props Data](https://v3-migration.vuejs.org/breaking-changes/props-data.html)

## 检查清单

- [ ] 查找所有使用 `propsData` 的实例化代码
- [ ] 改为使用 `createApp` 时传递 props 或使用 provide/inject

## 代码对比

### Vue 2

```js
const app = new Vue({
  propsData: {
    foo: 'bar'
  }
})
```

### Vue 3

```js
const app = createApp({
  props: {
    foo: {
      type: String,
      default: 'bar'
    }
  }
})

// 方式1: 在 mount 时传递
app.mount('#app', {
  propsData: {
    foo: 'bar'
  }
})

// 方式2: 使用 provide/inject
app.provide('initialData', { foo: 'bar' })
```

## 注意事项

1. `propsData` 主要在单元测试中使用较多
2. 考虑重构代码避免依赖 `propsData`

## 验收标准

- [ ] 所有 `propsData` 使用已替换
- [ ] 测试用例正常通过
