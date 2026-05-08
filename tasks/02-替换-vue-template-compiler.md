# 02.替换 vue-template-compiler

- 目标：移除 Vue 2 专用模板编译器。
- 搜索线索：检查 `package.json`、lockfile、构建配置中是否仍引用 `vue-template-compiler`。
- 实施内容：删除 `vue-template-compiler`，改用 `@vue/compiler-sfc`，并保持其版本与 `vue` 主版本一致。
- 注意事项：不要同时保留 Vue 2 和 Vue 3 的 SFC 编译器；老 loader 或测试工具可能会间接拉回旧编译器。
- 完成标准：模板编译链使用 Vue 3 SFC compiler，安装和构建过程中不再报 Vue/compiler 版本不匹配。
