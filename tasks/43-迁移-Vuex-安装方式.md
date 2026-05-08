# 43.迁移 Vuex 安装方式

- 目标：迁移状态管理接入方式。
- 搜索线索：全局搜索 `Vue.use(Vuex)`、`new Vuex.Store`、`createStore`、`mapState`。
- 实施内容：使用 `createStore` 创建 store，并在入口中通过 `app.use(store)` 注册。
- 注意事项：保留原 store 模块结构，先不要顺手重构状态管理；插件、命名空间模块、动态模块注册需要验证。
- 完成标准：组件内 `this.$store`、map helpers、动态模块、插件逻辑都能正常工作。
