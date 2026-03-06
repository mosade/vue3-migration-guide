# Task L4-06: 移除 keyCode 作为 v-on 修饰符

## 基本信息

- **任务ID**: L4-06
- **层级**: L4 - 模板层
- **优先级**: P2
- **影响范围**: 模板
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 不再支持使用数字 keyCode 作为 `v-on` 修饰符。改为使用内置别名或方法内判断。

## 迁移指南

- [Keycode Modifiers](https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html)

## 检查清单

- [ ] 查找 `@keydown.13` 等数字 keyCode
- [ ] 改为使用别名或 `@keydown` + 方法内判断

## 代码对比

### Vue 2

```html
<input @keydown.13="submit">
<input @keydown.enter="submit">
```

### Vue 3

```html
<!-- 保留内置别名 -->
<input @keydown.enter="submit">

<!-- 自定义 keyCode 改为方法内处理 -->
<input @keydown="handleKeydown">
```

```js
methods: {
  handleKeydown(event) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }
}
```

## 使用 key 属性

```html
<!-- 推荐：使用 key 属性 -->
<input @keydown="handleKeydown">
```

```js
methods: {
  handleKeydown(event) {
    if (event.key === 'Enter') {
      this.submit()
    }
  }
}
```

## 验收标准

- [ ] 所有数字 keyCode 已替换
- [ ] 键盘事件处理正常
