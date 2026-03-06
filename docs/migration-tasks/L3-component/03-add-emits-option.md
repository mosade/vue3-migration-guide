# Task L3-03: 添加 emits 选项声明组件事件

## 基本信息

- **任务ID**: L3-03
- **层级**: L3 - 组件定义层
- **优先级**: P0
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 引入了 `emits` 选项用于声明组件发出的事件。为所有通过 `$emit` 触发的事件添加 `emits` 选项。

## 迁移指南

- [Emits Option](https://v3-migration.vuejs.org/breaking-changes/emits-option.html)

## 检查清单

- [ ] 在所有组件中添加 `emits` 选项
- [ ] 声明所有通过 `$emit` 触发的事件

## 代码对比

### Vue 2

```js
export default {
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
```

### Vue 3

```js
export default {
  emits: ['submit'],
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
```

## 高级用法

```js
export default {
  emits: {
    submit: (payload) => {
      // 验证事件参数
      return payload.email && payload.password
    },
    cancel: null // 无需验证
  }
}
```

## 注意事项

1. `emits` 选项是可选但强烈推荐的
2. 声明的事件不会在 `$attrs` 中
3. 有助于 IDE 类型推断

## 验收标准

- [ ] 所有组件定义了 `emits` 选项
- [ ] 所有自定义事件已声明
- [ ] 事件正常触发
