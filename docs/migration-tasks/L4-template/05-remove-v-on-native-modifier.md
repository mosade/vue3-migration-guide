# Task L4-05: 移除 v-on 的 .native 修饰符

## 基本信息

- **任务ID**: L4-05
- **层级**: L4 - 模板层
- **优先级**: P1
- **影响范围**: 模板
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 已移除 `.native` 修饰符。非声明的事件会自动作为原生事件监听器。

## 迁移指南

- [v-on native modifier](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html)

## 检查清单

- [ ] 查找所有 `@event.native` 的使用
- [ ] 移除 `.native`，Vue 3 中非声明事件自动作为原生事件

## 代码对比

### Vue 2

```html
<MyComponent @click.native="onClick" />
```

### Vue 3

```html
<MyComponent @click="onClick" />
```

## 工作原理

Vue 3 中：
- 如果组件声明了 `emits: ['click']`，`@click` 会作为自定义事件
- 如果没有声明，`@click` 会自动绑定到原生 DOM 元素

## 验收标准

- [ ] 所有 `.native` 修饰符已移除
- [ ] 原生事件监听正常
