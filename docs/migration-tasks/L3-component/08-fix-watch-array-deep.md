# Task L3-08: 修复 watch 数组的深度监听行为

## 基本信息

- **任务ID**: L3-08
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中 watch 数组时，默认只在数组引用变化时触发回调。如需监听数组内容变化，需要添加 `deep: true`。

## 迁移指南

- [Watch](https://v3-migration.vuejs.org/breaking-changes/watch.html)

## 检查清单

- [ ] 查找所有 watch 数组的选项
- [ ] 如需监听数组内容变化，添加 `deep: true` 或使用 `deep: 1`

## 代码对比

### Vue 2

```js
export default {
  watch: {
    items(newVal, oldVal) {
      // 数组内容变化也会触发
    }
  }
}
```

### Vue 3

```js
export default {
  watch: {
    items: {
      handler(newVal, oldVal) {
        // 只有数组引用变化时触发
      },
      deep: true // 监听内容变化
      // 或使用 deep: 1 提高性能（Vue 3.5+）
    }
  }
}
```

## 性能优化

```js
// Vue 3.5+ 支持指定深度
watch: {
  items: {
    handler(newVal) {
      // 只监听一层深度变化
    },
    deep: 1 // 性能更好
  }
}
```

## 验收标准

- [ ] 数组监听器行为正常
- [ ] 必要时添加了 `deep: true`
