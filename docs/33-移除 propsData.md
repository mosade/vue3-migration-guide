# 33. 移除 propsData

## 当前任务

去掉根实例或程序化挂载里的 `propsData`。

## 怎么做

1. 搜索 `propsData`。
2. 如果是创建根应用时传参，改成 `createApp(App, props)`。
3. 如果是测试场景，改成 Vue 3 对应的 props 传入方式。

## 改完以后确认

- 项目里不再出现 `propsData`。
