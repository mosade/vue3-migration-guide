# Vue2 到 Vue3 迁移任务索引

目标：基于 `vue-cli` 直接迁移到 Vue 3，不使用 `@vue/compat`。这套任务面向大型遗留项目和弱 code agent 执行，核心原则是最小改动：能不改就不改，不能证明是 Vue3 迁移阻塞就不改。

完成以下任务后，项目应至少能够成功 `build`，能启动开发服务器进入主流程，并完成约定核心业务流的人工回归。构建成功不是迁移完成。

## Agent 执行契约

- 每次只执行一个任务，不合并无关迁移点。
- 默认不改代码；只有命中明确 Vue3 阻塞时才做最小修改。
- 不做顺手优化，包括命名、格式、目录、架构、业务逻辑和依赖升级。
- 不引入 `@vue/compat`，不 patch `node_modules`，不通过宽泛 alias 掩盖第三方依赖冲突。
- 修改公共组件 API、事件名、payload、路由行为、store 结构前必须停止并报告。
- 大范围替换前必须先输出命中列表，不能直接机械替换。
- 每个任务完成后必须报告修改文件、剩余命中、验证命令、阻塞项和人工验收点。

标准任务模板见 [RUNBOOK_TEMPLATE.md](./RUNBOOK_TEMPLATE.md)。

## 阶段门禁

1. 盘点门禁：列出依赖图、Vue 插件、UI 库、构建自定义项和核心业务流。
2. 构建链门禁：Vue 3 compiler 和 loader 链能解析代表性 SFC。
3. 入口门禁：入口、插件、router、store、全局属性、组件、指令都通过 Vue 3 app 实例安装。
4. 语法门禁：已知 Vue2 模板和组件语法已迁移或明确标记为无需修改。
5. 运行时门禁：已删除实例 API 和事件总线模式已替换。
6. 生态门禁：router、Vuex、UI 库、自研插件与 Vue3 兼容。
7. 开发门禁：dev server 可启动，浏览器加载后没有启动白屏。
8. 生产门禁：生产构建完成，静态资源按预期 publicPath 加载。
9. 业务门禁：登录、权限、动态路由、表单、表格、弹窗、上传下载、缓存页面等核心流完成回归。

## 核心实施任务

- [01.升级 vue 到 3.x](./01-升级-vue-到-3.x.md)
- [02.替换 vue-template-compiler](./02-替换-vue-template-compiler.md)
- [03.升级单文件组件编译链](./03-升级单文件组件编译链.md)
- [04.迁移应用入口到 createApp](./04-迁移应用入口到-createApp.md)
- [05.迁移根实例挂载写法](./05-迁移根实例挂载写法.md)
- [06.迁移全局插件注册](./06-迁移全局插件注册.md)
- [07.迁移全局组件注册](./07-迁移全局组件注册.md)
- [08.迁移全局指令注册](./08-迁移全局指令注册.md)
- [09.迁移全局 mixin 注册](./09-迁移全局-mixin-注册.md)
- [10.迁移 Vue.prototype 扩展](./10-迁移-Vue.prototype-扩展.md)
- [11.替换 beforeDestroy 生命周期](./11-替换-beforeDestroy-生命周期.md)
- [12.替换 destroyed 生命周期](./12-替换-destroyed-生命周期.md)

## 模板与组件实施任务

- [13.移除模板 filters](./13-移除模板-filters.md)
- [14.移除 v-on.native](./14-移除-v-on.native.md)
- [15.移除 .sync](./15-移除-.sync.md)
- [16.迁移组件 v-model 协议](./16-迁移组件-v-model-协议.md)
- [17.迁移旧插槽语法](./17-迁移旧插槽语法.md)
- [18.迁移 $scopedSlots 用法](./18-迁移-scopedSlots-用法.md)
- [19.迁移 $listeners 用法](./19-迁移-listeners-用法.md)
- [20.补充组件 emits 声明](./20-补充组件-emits-声明.md)
- [21.移除 keyCode 修饰符](./21-移除-keyCode-修饰符.md)
- [22.移除 inline-template](./22-移除-inline-template.md)
- [23.迁移自定义指令钩子名](./23-迁移自定义指令钩子名.md)
- [24.迁移数组 watch 行为差异](./24-迁移数组-watch-行为差异.md)
- [25.迁移 v-if 与 v-for 同节点写法](./25-迁移-v-if-与-v-for-同节点写法.md)
- [26.迁移 Transition 旧类名](./26-迁移-Transition-旧类名.md)
- [27.迁移 render function API](./27-迁移-render-function-API.md)
- [28.移除 functional: true](./28-移除-functional-true.md)

## 运行时兼容实施任务

- [29.移除 Vue.set](./29-移除-Vue.set.md)
- [30.移除 Vue.delete](./30-移除-Vue.delete.md)
- [31.移除 $on 用法](./31-移除-on-用法.md)
- [32.移除 $off 用法](./32-移除-off-用法.md)
- [33.移除 $once 用法](./33-移除-once-用法.md)
- [34.替换 new Vue 事件总线](./34-替换-new-Vue-事件总线.md)
- [35.移除 $children 依赖](./35-移除-children-依赖.md)

## 生态依赖实施任务

- [36.升级 vue-router 到 4.x](./36-升级-vue-router-到-4.x.md)
- [37.迁移 Router 创建方式](./37-迁移-Router-创建方式.md)
- [38.迁移 Router history 配置](./38-迁移-Router-history-配置.md)
- [39.迁移 Router catch-all 路由](./39-迁移-Router-catch-all-路由.md)
- [40.迁移 router.onReady](./40-迁移-router.onReady.md)
- [41.迁移 router-view 组合写法](./41-迁移-router-view-组合写法.md)
- [42.升级 vuex 到 4.x](./42-升级-vuex-到-4.x.md)
- [43.迁移 Vuex 安装方式](./43-迁移-Vuex-安装方式.md)

## 补充兼容实施任务

- [44.迁移全局 API Tree-Shaking](./44-迁移全局-API-Tree-Shaking.md)
- [45.迁移异步组件定义](./45-迁移异步组件定义.md)
- [46.迁移自定义元素与 is 属性](./46-迁移自定义元素与-is-属性.md)
- [47.迁移 key 与 v-bind 顺序](./47-迁移-key-与-v-bind-顺序.md)
- [48.迁移 Options API 兼容差异](./48-迁移-Options-API-兼容差异.md)
- [50.迁移渲染边界兼容差异](./50-迁移渲染边界兼容差异.md)

## 构建实施任务

- [49.修正 vue-cli 构建配置以支持 Vue3](./49-修正-vue-cli-构建配置以支持-vue3.md)
- [51.执行开发服务器启动修复](./51-执行开发服务器启动修复.md)
- [52.执行生产构建修复](./52-执行生产构建修复.md)

## 完成标准

- [53.确认 dev server 可启动](./53-确认-dev-server-可启动.md)
- [54.确认生产构建可通过](./54-确认生产构建可通过.md)
- [55.确认首屏可渲染](./55-确认首屏可渲染.md)
- [56.确认主路由可跳转](./56-确认主路由可跳转.md)
