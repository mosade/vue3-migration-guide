# 03. 迁移全局 API 的具名导入

## 当前任务

把原来挂在 `Vue` 对象上的全局工具方法，改成 Vue 3 的具名导入。

## 怎么做

1. 全局搜索 `Vue.nextTick`、`Vue.observable`、`Vue.version`、`Vue.compile`。
2. 把这些调用改成从 `vue` 直接导入，例如 `import { nextTick, reactive, version } from 'vue'`。
3. 如果代码里还在用 `Vue.observable`，改成 `reactive`。
4. 删除不再需要的 `Vue.` 前缀。

## 改完以后确认

- 代码里不再通过 `Vue.xxx` 调用这些全局工具方法。
