# 49.修正 vue-cli 构建配置以支持 Vue3

- 目标：让当前 `vue-cli` 构建链路能够正确处理 Vue 3。
- 搜索线索：检查 `vue.config.js`、webpack chain、loader alias、`transpileDependencies`、devServer、自定义 plugin。
- 实施内容：修正 `vue-cli`、webpack 及其 Vue 插件配置，确保使用 Vue 3 对应版本与接入方式。
- 注意事项：老项目常有 `vue$` alias、手写 `vue-loader` rule、loader 顺序覆盖问题，构建成功前不要清理这些历史配置。
- 完成标准：`vue-cli` 的开发与构建命令可以识别并处理 Vue 3 应用。
