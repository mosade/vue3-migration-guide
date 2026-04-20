# 24. 为 TransitionGroup 显式补 wrapper

## 当前任务

处理 `<TransitionGroup>` 默认不再渲染包裹节点的问题。

## 怎么做

1. 搜索 `<transition-group>`。
2. 检查 CSS 选择器、布局结构、父子节点关系是否依赖它自动生成的 wrapper。
3. 如果依赖，就显式加上 `tag` 属性，比如 `tag="div"`、`tag="ul"`。

## 改完以后确认

- 列表结构和样式没有因为 wrapper 消失而变化。
