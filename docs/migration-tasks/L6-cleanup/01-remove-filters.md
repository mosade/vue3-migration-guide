# Task L6-01: 移除 Filters 使用

## 基本信息

- **任务ID**: L6-01
- **层级**: L6 - 清理层
- **优先级**: P0
- **影响范围**: 模板/组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已完全移除 Filters 功能。查找所有 `{{ value | filter }}` 语法并替换为计算属性或方法调用。

## 迁移指南

- [Filters](https://v3-migration.vuejs.org/breaking-changes/filters.html)

## 检查清单

- [ ] 查找所有 `{{ value | filter }}` 语法
- [ ] 替换为计算属性或方法调用
- [ ] 迁移全局过滤器（如需要）

## 代码对比

### Vue 2

```html
<p>{{ msg | capitalize }}</p>
```

```js
filters: {
  capitalize(value) {
    return value.toUpperCase()
  }
}
```

### Vue 3

```html
<p>{{ capitalizedMsg }}</p>
```

```js
computed: {
  capitalizedMsg() {
    return this.msg.toUpperCase()
  }
}

// 或使用方法
<p>{{ capitalize(msg) }}</p>
```

## 全局过滤器处理

```js
// 转为全局属性
app.config.globalProperties.$filters = {
  currency(value) {
    return '$' + value
  }
}
```

```html
<p>{{ $filters.currency(price) }}</p>
```

## 验收标准

- [ ] 所有过滤器语法已移除
- [ ] 计算属性/方法正常工作
- [ ] 全局过滤器迁移完成
