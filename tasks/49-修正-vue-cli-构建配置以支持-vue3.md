# 49.修正 vue-cli 构建配置以支持 Vue3

## 目标

- 让当前 `vue-cli` 构建链路能够正确处理 Vue 3。
- 只处理本任务范围内的问题。
- 默认保持现有业务行为和组件外部 API。
- `vue-cli` 的开发与构建命令可以识别并处理 Vue 3 应用。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- 老项目常有 `vue$` alias、手写 `vue-loader` rule、loader 顺序覆盖问题，构建成功前不要清理这些历史配置。

## 允许修改范围

- 只修改本任务搜索命令命中的业务源码、配置或依赖声明。
- 只修改与本任务目标直接相关的最小代码片段。
- 如果需要修改公共组件 API，必须先记录调用方影响，并停止等待人工确认。
- 如果命中构建、入口或依赖配置，只修改能证明是 Vue3 迁移阻塞的配置项。

## 禁止修改范围

- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不顺手升级无关依赖。
- 不迁移到 Vite、Pinia 或 Composition API。
- 不修改无关格式。

## 搜索命令

原搜索线索：检查 `vue.config.js`、webpack chain、loader alias、`transpileDependencies`、devServer、自定义 plugin。

```bash
rg -n 'vue.config.js|chainWebpack|configureWebpack|vue\$|vue-loader|transpileDependencies|devServer|webpack|@vue/cli-service' package.json vue.config.js babel.config.js webpack.config.js 2>/dev/null
```

## 命中分类

- 必改：命中内容直接使用了本任务要移除或迁移的 Vue2 API、语法、依赖或配置。
- 可不改：命中内容在 Vue3 下仍可工作，或只是变量名、字符串、注释、文档、业务字段。
- 阻塞：命中内容属于第三方库、私有插件、公共 API 或业务语义不清，不能安全判断。
- 阻塞：修改需要改变组件外部 API、路由行为、store 结构、事件 payload 或大量调用方。

## 修改规则

- 修正 `vue-cli`、webpack 及 Vue 插件配置，确保使用 Vue3 对应版本与接入方式。
- 构建成功前不要清理历史配置，只处理直接阻塞 Vue3 的配置。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n 'vue.config.js|chainWebpack|configureWebpack|vue\$|vue-loader|transpileDependencies|devServer|webpack|@vue/cli-service' package.json vue.config.js babel.config.js webpack.config.js 2>/dev/null
git diff --check
git diff --stat
```

如果搜索范围与项目实际目录不一致，把命令中的路径替换为实际源码、配置或依赖文件范围。若项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- `vue-cli` 的开发与构建命令可以识别并处理 Vue 3 应用。
- 没有通过宽泛 alias 掩盖第三方依赖冲突。
- 检查浏览器控制台没有由本任务引入的新错误。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断某处代码是业务字段、普通事件还是 Vue2 迁移目标。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
