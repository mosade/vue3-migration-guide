# 02. 迁移全局 API 到 createApp

## 当前任务

把 Vue 2 的全局构造方式改成 Vue 3 的应用实例方式。

## 怎么做

1. 全局搜索 `new Vue(`、`Vue.use(`、`Vue.component(`、`Vue.directive(`、`Vue.mixin(`、`Vue.prototype`。
2. 在入口文件里把 `new Vue({...}).$mount(...)` 改成 `createApp(App).mount(...)`。
3. 把 `Vue.use` 改成 `app.use`，把 `Vue.component` 改成 `app.component`，把 `Vue.directive` 改成 `app.directive`，把 `Vue.mixin` 改成 `app.mixin`。
4. 把 `Vue.prototype.xxx` 改成 `app.config.globalProperties.xxx`。
5. 删除 `Vue.config.productionTip`。
6. 如果项目用了 `Vue.extend` 来创建组件构造函数，改成普通组件对象；如果只是挂载，直接交给 `createApp`。

## 改完以后确认

- 入口文件已经不再出现 `new Vue(`。
- 全局注册和插件安装都挂在 `app` 实例上。
