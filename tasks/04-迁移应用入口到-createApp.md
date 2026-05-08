# 04.迁移应用入口到 createApp

- 目标：把根应用创建方式切换到 Vue 3。
- 搜索线索：全局搜索入口文件中的 `new Vue`、`render: h => h(App)`、`Vue.config`、`Vue.use`。
- 实施内容：使用 `createApp(App)` 创建应用，并把插件、router、store、全局组件、全局指令迁移到 app 实例上注册。
- 注意事项：不要只把 `new Vue` 换成 `createApp`，入口附近的全局 API 都要一起挪到同一个 app 实例。
- 完成标准：应用入口只通过 `createApp` 创建根应用，且全局能力都挂到该 app 实例。
