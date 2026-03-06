# Task L5-02: 迁移 $listeners 到 $attrs

## 基本信息

- **任务ID**: L5-02
- **层级**: L5 - 渲染层
- **优先级**: P1
- **影响范围**: 渲染/组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已移除 `$listeners`，事件监听器合并到 `$attrs` 中。查找所有 `this.$listeners` 的使用并合并到 `$attrs`。

## 迁移指南

- [$listeners Removed](https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html)

## 检查清单

- [ ] 查找所有 `this.$listeners` 的使用
- [ ] 合并到 `$attrs` 中（`$attrs` 包含所有事件监听器）

## 代码对比

### Vue 2

```js
export default {
  mounted() {
    console.log(this.$listeners)
  },
  render(h) {
    return h('input', {
      on: this.$listeners
    })
  }
}
```

### Vue 3

```js
export default {
  mounted() {
    // $attrs 包含所有非 prop 属性和事件监听器
    console.log(this.$attrs)
  },
  render() {
    return h('input', this.$attrs)
  }
}
```

## inheritAttrs: false 情况

```js
export default {
  inheritAttrs: false,
  setup(props, { attrs }) {
    // attrs 包含所有属性和事件
    return { attrs }
  }
}
```

## 验收标准

- [ ] 所有 `$listeners` 使用已替换
- [ ] 事件监听器传递正常
