# Task L3-04: 修复 props default 工厂函数中的 this 访问

## 基本信息

- **任务ID**: L3-04
- **层级**: L3 - 组件定义层
- **优先级**: P1
- **影响范围**: 组件
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

Vue 3 中 props 的 `default` 工厂函数不再可以访问 `this` 上下文。查找 `default()` 中使用 `this` 的 props 并改为其他方式获取数据。

## 迁移指南

- [Props Default This](https://v3-migration.vuejs.org/breaking-changes/props-default-this.html)

## 检查清单

- [ ] 查找 `default()` 中使用 `this` 的 props
- [ ] 改为使用注入或其他方式获取数据

## 代码对比

### Vue 2

```js
export default {
  props: {
    items: {
      default() {
        return this.parentItems || []
      }
    }
  }
}
```

### Vue 3

```js
import { inject } from 'vue'

export default {
  props: {
    items: {
      default() {
        // 无法访问 this，使用默认值
        return []
      }
    }
  },
  setup() {
    const parentItems = inject('parentItems', [])
    return { parentItems }
  }
}
```

## 替代方案

1. **使用 inject**：对于祖先组件提供的数据
2. **使用 computed**：在组件内计算默认值
3. **使用工厂函数参数**：Vue 3.2+ 支持接收 rawProps 参数

## 验收标准

- [ ] 所有 props default 函数不再使用 `this`
- [ ] 组件功能正常
