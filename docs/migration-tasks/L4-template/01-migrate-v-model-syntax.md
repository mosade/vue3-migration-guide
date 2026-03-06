# Task L4-01: 迁移 v-model 语法变化

## 基本信息

- **任务ID**: L4-01
- **层级**: L4 - 模板层
- **优先级**: P0
- **影响范围**: 模板
- **复杂度**: 高
- **预计工时**: 8-16小时

## 任务描述

Vue 3 中 v-model 的语法有重大变化：prop 名称从 `value` 改为 `modelValue`，事件名称从 `input` 改为 `update:modelValue`，并且移除了 `.sync` 修饰符。

## 迁移指南

- [v-model](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

## 检查清单

- [ ] 将 `:value` + `@input` 改为 `:modelValue` + `@update:modelValue`
- [ ] 将 `.sync` 修饰符改为 `v-model:` 参数形式
- [ ] 更新组件的 `model` 选项为 `emits` + props

## 代码对比

### Vue 2

```html
<!-- .sync 修饰符 -->
<Child :title.sync="pageTitle" />
```

```js
export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: ['title']
}
```

### Vue 3

```html
<!-- 多个 v-model -->
<Child v-model:title="pageTitle" v-model:content="pageContent" />
```

```js
export default {
  props: ['title', 'content'],
  emits: ['update:title', 'update:content']
}
```

## 迁移策略

```html
<!-- Vue 2 -->
<Child :value="msg" @input="msg = $event" />

<!-- Vue 3 等价形式 -->
<Child v-model="msg" />
<Child :modelValue="msg" @update:modelValue="msg = $event" />
```

## 验收标准

- [ ] 所有 v-model 使用新语法
- [ ] 所有 .sync 替换为 v-model:
- [ ] 组件双向绑定正常
