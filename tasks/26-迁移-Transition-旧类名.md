# 26.迁移 Transition 旧类名

- 目标：修复过渡动画类名差异。
- 搜索线索：全局搜索 `*-enter`、`*-leave`、`v-enter`、`v-leave`、`<transition`。
- 实施内容：将旧的 `*-enter` / `*-leave` 起始类名迁到 Vue 3 的 `*-enter-from` / `*-leave-from` 规则。
- 注意事项：如果使用 CSS module、scoped style 或第三方动画库，类名生成和作用域选择器要一起验证。
- 完成标准：进入、离开、appear、路由切换动画都能按预期触发。
