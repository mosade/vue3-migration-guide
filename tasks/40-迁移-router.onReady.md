# 40.迁移 router.onReady

- 目标：迁移路由就绪等待 API。
- 搜索线索：全局搜索 `router.onReady`、`onReady(`。
- 实施内容：将 callback 形式改为 `router.isReady().then(...)` 或入口启动前 `await router.isReady()`。
- 注意事项：应用挂载顺序会影响首屏守卫、异步路由和埋点初始化；不要把依赖当前路由的逻辑提前到 ready 之前执行。
- 完成标准：首屏路由解析完成后再执行依赖路由状态的逻辑。
