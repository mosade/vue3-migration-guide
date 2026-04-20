# 12. 迁移 render function API

## 当前任务

把 Vue 2 的 render function API 改成 Vue 3 写法。

## 怎么做

1. 搜索 `render(h)`、`createElement`、`domProps`、`on:`、`attrs:`、`staticClass`。
2. 把 `render(h)` 改成从 `vue` 导入 `h`。
3. 把旧的 VNode data 结构改成扁平 props 结构，例如 `onClick`、`class`、`style`、`innerHTML`。
4. 如果 render function 里通过字符串写组件名，改成 `resolveComponent`。

## 改完以后确认

- render function 代码里不再依赖 Vue 2 的 VNode data 结构。
