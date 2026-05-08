# 27.迁移 render function API

- 目标：迁移所有 render / JSX 相关实现。
- 搜索线索：全局搜索 `render(`、`createElement`、`h(`、`jsx`、`scopedSlots`、`domProps`、`on:`、`nativeOn`。
- 实施内容：将 Vue 2 的 `render(h)`、data object、slot/scopedSlot、事件对象写法迁到 Vue 3 的 `h(type, props, children)` 模型。
- 注意事项：`class`、`style`、事件名、DOM prop、slot children 的结构都变了；JSX 项目还要同步检查 Babel/TSX 插件版本和事件命名。
- 完成标准：render/JSX 组件的 props、事件、插槽、ref、动态组件都能正常工作。
