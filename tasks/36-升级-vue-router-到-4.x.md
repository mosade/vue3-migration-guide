# 36.升级 vue-router 到 4.x

- 目标：将路由依赖升级到 Vue 3 对应主版本。
- 搜索线索：检查 `package.json` 中 `vue-router`、`vue-router/types`、路由相关插件依赖。
- 实施内容：升级到 Vue Router 4，并同步处理类型、构建别名和插件中对旧 router API 的引用。
- 注意事项：依赖安装成功只是起点，必须继续完成创建方式、history、catch-all、ready、router-view 组合任务。
- 完成标准：依赖解析到 Vue Router 4，项目中不再引用 Vue Router 3 专属安装方式。
