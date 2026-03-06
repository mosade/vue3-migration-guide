# Task L2-03: 迁移全局过滤器

## 基本信息

- **任务ID**: L2-03
- **层级**: L2 - 全局层
- **优先级**: P1
- **影响范围**: 全局
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已移除过滤器功能。将使用 `Vue.filter()` 注册的全局过滤器迁移到 `globalProperties.$filters`，并修改模板中的使用方式。

## 迁移指南

- [Filters](https://v3-migration.vuejs.org/breaking-changes/filters.html)

## 检查清单

- [ ] 识别所有 `Vue.filter()` 注册的全局过滤器
- [ ] 创建 `globalProperties.$filters` 对象
- [ ] 在模板中将 `{{ value | filter }}` 改为 `$filters.filter(value)`

## 代码对比

### Vue 2

```js
// main.js
Vue.filter('currency', (value) => '$' + value)
```

```html
<!-- template -->
<p>{{ price | currency }}</p>
```

### Vue 3

```js
// main.js
app.config.globalProperties.$filters = {
  currency(value) {
    return '$' + value
  }
}
```

```html
<!-- template -->
<p>{{ $filters.currency(price) }}</p>
```

## 替代方案

1. **全局属性方式**（推荐）：如上所示，使用 `$filters`
2. **计算属性**：在组件内使用 computed
3. **方法**：在组件内使用 methods
4. **外部工具函数**：纯 JavaScript 函数，不绑定到 Vue

## 注意事项

1. 过滤器在 Vue 3 中已完全移除，不是简单的语法变更
2. 如果使用 TypeScript，需要为 `$filters` 添加类型声明

## 验收标准

- [ ] 所有过滤器调用已更新
- [ ] 模板渲染正常
- [ ] 过滤器功能正常
