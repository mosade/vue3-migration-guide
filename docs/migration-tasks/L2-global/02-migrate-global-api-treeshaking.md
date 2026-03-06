# Task L2-02: 迁移全局 API Treeshaking

## 基本信息

- **任务ID**: L2-02
- **层级**: L2 - 全局层
- **优先级**: P1
- **影响范围**: 全局
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

将 Vue 2 的全局 API 调用（如 `Vue.nextTick()`）改为 Vue 3 的具名导入方式，支持 tree-shaking 优化。

## 迁移指南

- [Global API Treeshaking](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html)

## 检查清单

- [ ] 将 `Vue.nextTick()` 改为具名导入 `nextTick`
- [ ] 将 `Vue.observable()` 改为 `reactive()`
- [ ] 将 `Vue.version` 改为具名导入
- [ ] 检查其他 `Vue.xxx` 全局 API 的使用

## 代码对比

### Vue 2

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // ...
})

const state = Vue.observable({ count: 0 })
```

### Vue 3

```js
import { nextTick, reactive, version } from 'vue'

nextTick(() => {
  // ...
})

const state = reactive({ count: 0 })
```

## API 映射表

| Vue 2 Global API | Vue 3 Named Export |
|-----------------|-------------------|
| `Vue.nextTick` | `nextTick` |
| `Vue.observable` | `reactive` |
| `Vue.version` | `version` |
| `Vue.compile` | `compile` |
| `Vue.set` | 移除（不再需要） |
| `Vue.delete` | 移除（不再需要） |

## 注意事项

1. Vue 3 中 `Vue.set` 和 `Vue.delete` 不再需要，因为 Proxy 响应式系统可以自动追踪变化
2. 确保从 'vue' 包中导入所需的 API

## 验收标准

- [ ] 所有 Vue 2 全局 API 调用已替换
- [ ] 项目构建无警告
- [ ] 功能正常
