# 37.迁移 Router 创建方式

- 目标：迁移 Router 初始化 API。
- 搜索线索：全局搜索 `new Router`、`VueRouter`、`Vue.use(Router)`、`routes:`。
- 实施内容：使用 `createRouter({ history, routes })` 创建实例；删除 `Vue.use(Router)`；在入口中通过 `app.use(router)` 安装。
- 注意事项：路由实例导出方式尽量保持兼容调用方；动态路由、权限守卫、重置路由逻辑要一起检查。
- 完成标准：路由实例可创建并安装，守卫和动态路由注册没有引用旧 API。
