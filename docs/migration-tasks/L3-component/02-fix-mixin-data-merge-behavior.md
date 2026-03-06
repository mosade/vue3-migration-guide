# Task L3-02: 修复 mixin 中 data 的合并行为

## 基本信息

- **任务ID**: L3-02
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件（使用 mixins）
- **复杂度**: 高
- **预计工时**: 8-16小时

## 任务描述

Vue 3 中 mixin 的数据合并行为从深度合并改为浅合并。检查所有 mixins 的数据合并逻辑，确保功能正常。

## 迁移指南

- [Data Option - Mixin Merge Behavior](https://v3-migration.vuejs.org/breaking-changes/data-option.html#mixin-merge-behavior-change)

## 检查清单

- [ ] 检查所有 mixins 的数据合并逻辑
- [ ] 注意：Vue 3 中是浅合并，嵌套对象会被覆盖而非合并
- [ ] 修复依赖深度合并的代码

## 代码对比

### Vue 2（深度合并）

```js
// Mixin
{ data() { return { user: { name: 'Jack', id: 1 } } } }

// Component
{ mixins: [Mixin], data() { return { user: { id: 2 } } } }

// 结果: { user: { name: 'Jack', id: 2 } }
```

### Vue 3（浅合并）

```js
// 结果: { user: { id: 2 } } - name 被覆盖
```

## 迁移方案

```js
// 方案1：在组件中展开所有属性
{
  mixins: [Mixin],
  data() {
    return {
      user: {
        name: 'Jack', // 显式声明
        id: 2
      }
    }
  }
}

// 方案2：使用 computed 合并
{
  mixins: [Mixin],
  computed: {
    mergedUser() {
      return { ...this.$options.data().user, id: 2 }
    }
  }
}
```

## 注意事项

1. 这种变更可能导致难以发现的 bug
2. 建议全面审查 mixin 使用

## 验收标准

- [ ] 所有 mixins 数据合并正常
- [ ] 相关功能测试通过
