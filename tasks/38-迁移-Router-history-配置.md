# 38.迁移 Router history 配置

- 目标：迁移路由历史模式配置。
- 搜索线索：全局搜索 `mode:`、`base:`、`history:`、`hash`、`abstract`。
- 实施内容：`mode: 'history'` 改为 `createWebHistory(base)`，`mode: 'hash'` 改为 `createWebHashHistory(base)`；测试环境或非浏览器环境按需使用 memory history。
- 注意事项：`base` 不再是 router 顶层配置，生产部署路径和 nginx/history fallback 要一起确认。
- 完成标准：刷新页面、直接访问深层路由、hash/history 模式下的跳转都正常。
