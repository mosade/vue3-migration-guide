# 41.迁移 router-view 组合写法

- 目标：修复 `router-view` 与 `transition` / `keep-alive` 组合方式。
- 搜索线索：全局搜索包裹 `router-view` 的 `transition`、`keep-alive`、`slot-scope`、`v-slot`。
- 实施内容：使用 `<router-view v-slot="{ Component, route }">`，再在内部组合 `<transition>`、`<keep-alive>` 和动态组件。
- 注意事项：缓存 key、include/exclude、过渡 name 和路由 meta 逻辑要一起迁移；不要继续直接把 `router-view` 当成被缓存组件。
- 完成标准：路由切换动画、页面缓存、缓存失效规则与原业务预期一致。
