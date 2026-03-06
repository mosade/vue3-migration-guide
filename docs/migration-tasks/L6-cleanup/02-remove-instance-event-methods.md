# Task L6-02: 移除 $on/$off/$once 实例方法

## 基本信息

- **任务ID**: L6-02
- **层级**: L6 - 清理层
- **优先级**: P0
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 已移除 `$on`、`$off`、`$once` 实例方法。查找这些方法的使用并改为使用外部事件库或 provide/inject。

## 迁移指南

- [Events API](https://v3-migration.vuejs.org/breaking-changes/events-api.html)

## 检查清单

- [ ] 查找 `this.$on`, `this.$off`, `this.$once` 的使用
- [ ] 使用外部事件库（如 mitt）或 provide/inject

## 代码对比

### Vue 2

```js
// 事件总线
export const eventBus = new Vue()

// 组件内
this.$on('event', handler)
this.$off('event', handler)
this.$once('event', handler)
```

### Vue 3

```js
// 使用 mitt
import mitt from 'mitt'
export const emitter = mitt()

// 组件内
emitter.on('event', handler)
emitter.off('event', handler)
emitter.once('event', handler)
```

## mitt 使用示例

```js
// eventBus.js
import mitt from 'mitt'
export const emitter = mitt()

// Component A
import { emitter } from './eventBus.js'
emitter.emit('update', data)

// Component B
import { emitter } from './eventBus.js'
onMounted(() => {
  emitter.on('update', handleUpdate)
})
onUnmounted(() => {
  emitter.off('update', handleUpdate)
})
```

## 验收标准

- [ ] 所有 `$on/$off/$once` 已替换
- [ ] 事件总线功能正常
- [ ] 内存泄漏检查通过
