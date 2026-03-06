# Task L4-07: 修复属性强制策略变更

## 基本信息

- **任务ID**: L4-07
- **层级**: L4 - 模板层
- **优先级**: P1
- **影响范围**: 模板
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中布尔属性和枚举属性的强制策略有所变化。检查这些属性的绑定方式。

## 迁移指南

- [Attribute Coercion](https://v3-migration.vuejs.org/breaking-changes/attribute-coercion.html)

## 检查清单

- [ ] 检查布尔属性的绑定（如 `disabled="false"`）
- [ ] Vue 3 中 `false` 会作为字符串保留，不再移除属性

## 代码对比

### Vue 2

```html
<!-- 空字符串也会设置 disabled -->
<button :disabled="''">Disabled</button>
```

### Vue 3

```html
<!-- 只有 true 才会设置 disabled -->
<button :disabled="true">Disabled</button>
```

## 强制策略变化

| 绑定值 | Vue 2 (disabled) | Vue 3 (disabled) |
|--------|------------------|------------------|
| `true` | `disabled="disabled"` | `disabled=""` |
| `false` | - | - |
| `''` | `disabled="disabled"` | - |
| `null` | - | - |
| `undefined` | - | - |

## 注意事项

1. Vue 3 中 `false`、`null`、`undefined` 才会移除属性
2. 空字符串在 Vue 3 中会保留为属性值

## 验收标准

- [ ] 所有布尔属性绑定正确
- [ ] 无意外属性残留
