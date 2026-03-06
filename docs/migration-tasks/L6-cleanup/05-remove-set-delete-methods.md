# Task L6-05: 移除全局 set/delete 及 $set/$delete 方法

## 基本信息

- **任务ID**: L6-05
- **层级**: L6 - 清理层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中由于使用 Proxy 响应式系统，`Vue.set`、`Vue.delete`、`$set`、`$delete` 不再需要。直接使用赋值和 `delete` 操作符。

## 迁移指南

- [Vue 3 Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html)

## 检查清单

- [ ] 查找 `Vue.set`, `Vue.delete`, `this.$set`, `this.$delete` 的使用
- [ ] Vue 3 Proxy 响应式不再需要这些方法

## 代码对比

### Vue 2

```js
// 添加响应式属性
Vue.set(this.obj, 'newProp', 'value')
this.$set(this.items, index, newValue)

// 删除属性
Vue.delete(this.obj, 'prop')
this.$delete(this.items, index)
```

### Vue 3

```js
// Proxy 自动追踪，直接使用
this.obj.newProp = 'value'
this.items[index] = newValue

// 删除属性
delete this.obj.prop
this.items.splice(index, 1)
```

## 数组操作

```js
// 添加元素
this.items.push(newItem)  // Vue 2 需要 Vue.set

// 修改元素
this.items[index] = newValue  // Vue 2 需要 Vue.set

// 删除元素
this.items.splice(index, 1)  // Vue 2 需要 Vue.delete
```

## 对象操作

```js
// 添加属性
this.obj.newKey = 'value'  // 自动响应

// 删除属性
delete this.obj.key  // 自动响应
```

## 验收标准

- [ ] 所有 `set/delete` 方法已移除
- [ ] 响应式更新正常
- [ ] 数组/对象操作正常
