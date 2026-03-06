# Task L2-04: 迁移全局自定义指令注册方式

## 基本信息

- **任务ID**: L2-04
- **层级**: L2 - 全局层
- **优先级**: P1
- **影响范围**: 全局
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

将 Vue 2 的全局自定义指令注册方式从 `Vue.directive()` 迁移到 Vue 3 的 `app.directive()`，并更新指令的生命周期钩子名称。

## 迁移指南

- [Custom Directives](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html)

## 检查清单

- [ ] 将 `Vue.directive()` 改为 `app.directive()`
- [ ] 更新钩子函数名称:
  - `bind` → `mounted`
  - `inserted` → `mounted`
  - `update` → `updated`
  - `componentUpdated` → `updated`
  - `unbind` → `unmounted`

## 代码对比

### Vue 2

```js
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
```

### Vue 3

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

## 生命周期钩子映射

| Vue 2 | Vue 3 |
|-------|-------|
| `bind` | `mounted` |
| `inserted` | `mounted` |
| `update` | `updated` |
| `componentUpdated` | `updated` |
| `unbind` | `unmounted` |

## 注意事项

1. Vue 3 中指令生命周期钩子与组件生命周期对齐
2. `binding.expression` 已移除
3. 钩子函数的参数有所变化

## 验收标准

- [ ] 所有全局指令已更新
- [ ] 指令功能正常
- [ ] 生命周期钩子正确触发
