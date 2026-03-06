# Task L5-04: 迁移渲染函数 API

## 基本信息

- **任务ID**: L5-04
- **层级**: L5 - 渲染层
- **优先级**: P1
- **影响范围**: 渲染函数
- **复杂度**: 高
- **预计工时**: 8-16小时

## 任务描述

Vue 3 的渲染函数 API 有重大变化。更新 `h` 函数导入方式、VNode props 结构和组件引用方式。

## 迁移指南

- [Render Function API](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html)

## 检查清单

- [ ] 更新 `h` 函数导入方式
- [ ] 更新 VNode props 结构（扁平化）
- [ ] 更新组件注册引用方式

## 代码对比

### Vue 2

```js
export default {
  render(h) {
    return h('div', {
      class: 'foo',
      attrs: { id: 'bar' },
      on: { click: this.onClick }
    }, [
      h(MyComponent, {
        props: { msg: 'hello' },
        scopedSlots: {
          default: props => h('span', props.text)
        }
      })
    ])
  }
}
```

### Vue 3

```js
import { h } from 'vue'

export default {
  render() {
    return h('div', {
      class: 'foo',
      id: 'bar',
      onClick: this.onClick
    }, [
      h(MyComponent, {
        msg: 'hello'
      }, {
        default: props => h('span', props.text)
      })
    ])
  }
}
```

## Props 扁平化

| Vue 2 | Vue 3 |
|-------|-------|
| `class` / `style` / `attrs` / `domProps` / `on` | 扁平化到同一对象 |
| `props: { msg: 'hello' }` | 直接 `{ msg: 'hello' }` |
| `on: { click: handler }` | `onClick: handler` |
| `nativeOn: { click: handler }` | 移除 |

## 事件处理

```js
// Vue 2
h('div', {
  on: {
    click: this.handleClick,
    input: this.handleInput
  }
})

// Vue 3
h('div', {
  onClick: this.handleClick,
  onInput: this.handleInput
})
```

## 验收标准

- [ ] 所有渲染函数使用新 API
- [ ] 组件渲染正常
- [ ] 事件绑定正常
