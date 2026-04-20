# 18. 迁移 props 默认值里的 this

## 当前任务

处理 `props.default` 工厂函数里不能再访问 `this` 的问题。

## 怎么做

1. 搜索 `default()`、`default: function` 这类 prop 默认值工厂。
2. 检查函数体里有没有 `this.xxx`。
3. 如果有，改成通过传入参数、外部函数、`inject` 或常量来获得依赖值。

## 改完以后确认

- props 默认值工厂里不再依赖 `this`。
