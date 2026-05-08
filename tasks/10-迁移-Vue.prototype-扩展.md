# 10.迁移 Vue.prototype 扩展

- 目标：迁移所有实例原型扩展。
- 搜索线索：全局搜索 `Vue.prototype`、`this.$` 前缀的全局工具访问。
- 实施内容：将 `Vue.prototype.$xxx = value` 改为 `app.config.globalProperties.$xxx = value`。
- 注意事项：只迁移真正的全局实例属性；工具函数也可以直接 import，避免继续扩大隐式全局依赖。
- 完成标准：组件内原有 `this.$xxx` 能访问，且入口初始化顺序保证使用前已注册。
