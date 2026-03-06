# Task L2-01: 迁移全局 API 初始化方式

## 基本信息

- **任务ID**: L2-01
- **层级**: L2 - 全局层
- **优先级**: P0
- **影响范围**: 全局 (main.js/app.js)
- **复杂度**: 中
- **预计工时**: 4-8小时

## 任务描述

将 Vue 2 的全局 API 初始化方式（`new Vue()`）迁移到 Vue 3 的应用实例模式（`createApp()`），包括配置迁移和全局属性处理。

## 迁移指南

- [Global API](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

## 检查清单

- [ ] 替换 `new Vue()` 为 `createApp()`
- [ ] 将 `Vue.config` 改为 `app.config`
- [ ] 处理 `Vue.prototype` → `app.config.globalProperties`
- [ ] 移除 `Vue.extend` 的使用
- [ ] 更新应用挂载方式 `app.mount()`

## 代码对比

### Vue 2

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### Vue 3

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')
```

## 常见模式迁移

| Vue 2 | Vue 3 |
|-------|-------|
| `Vue.config` | `app.config` |
| `Vue.prototype.$xxx` | `app.config.globalProperties.$xxx` |
| `Vue.component()` | `app.component()` |
| `Vue.directive()` | `app.directive()` |
| `Vue.mixin()` | `app.mixin()` |
| `Vue.use()` | `app.use()` |

## 注意事项

1. Vue 3 中不再有全局 Vue 构造函数，每个应用都是独立的实例
2. 插件需要在 `app.use()` 时显式传入应用实例
3. `Vue.config.productionTip` 已被移除

## 验收标准

- [ ] 应用可以正常启动
- [ ] 全局配置生效
- [ ] 全局属性可以在组件中通过 `this.$xxx` 访问
