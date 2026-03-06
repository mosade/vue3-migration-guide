# Task L3-09: 修复自定义指令生命周期对齐

## 基本信息

- **任务ID**: L3-09
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件（自定义指令）
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 中自定义指令的生命周期钩子名称与组件生命周期对齐。将所有指令钩子重命名并移除 `binding.expression` 的使用。

## 迁移指南

- [Custom Directives](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html)

## 检查清单

- [ ] 将所有指令钩子重命名
- [ ] 移除 `binding.expression` 的使用

## 生命周期钩子映射

| Vue 2 | Vue 3 |
|-------|-------|
| `bind` | `mounted` |
| `inserted` | `mounted` |
| `update` | `updated` |
| `componentUpdated` | `updated` |
| `unbind` | `unmounted` |

## 代码对比

### Vue 2

```js
Vue.directive('demo', {
  bind(el, binding, vnode) {
    console.log(binding.expression)
  },
  inserted(el) {},
  update(el, binding) {},
  componentUpdated(el) {},
  unbind(el) {}
})
```

### Vue 3

```js
app.directive('demo', {
  mounted(el, binding, vnode) {
    // binding.expression 已移除
    console.log(binding.value)
  },
  updated(el, binding) {},
  unmounted(el) {}
})
```

## 注意事项

1. `binding.expression` 已移除，使用 `binding.value` 替代
2. `vnode` 和 `oldVnode` 参数有所变化

## 验收标准

- [ ] 所有指令钩子已更新
- [ ] 指令功能正常
