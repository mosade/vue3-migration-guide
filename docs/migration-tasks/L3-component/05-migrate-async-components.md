# Task L3-05: 迁移异步组件定义方式

## 基本信息

- **任务ID**: L3-05
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

Vue 3 的异步组件需要使用 `defineAsyncComponent` 方法显式定义。查找所有动态导入的组件并使用 `defineAsyncComponent` 包裹。

## 迁移指南

- [Async Components](https://v3-migration.vuejs.org/breaking-changes/async-components.html)

## 检查清单

- [ ] 查找所有动态导入的组件定义
- [ ] 使用 `defineAsyncComponent` 包裹

## 代码对比

### Vue 2

```js
const AsyncComp = () => import('./MyComponent.vue')
```

### Vue 3

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./MyComponent.vue'))
```

## 高级选项

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComp,
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
})
```

## 注意事项

1. 路由懒加载组件通常也需要更新
2. 高级配置选项可以提供更好的用户体验

## 验收标准

- [ ] 所有异步组件使用 `defineAsyncComponent`
- [ ] 路由懒加载正常
- [ ] 加载状态正常显示
