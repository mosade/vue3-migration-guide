# 21. 调整 attribute coercion 行为

## 当前任务

修正属性强制转换规则变化带来的 DOM 输出差异。

## 怎么做

1. 搜索绑定到 `aria-*`、`draggable`、`spellcheck`、`contenteditable` 等属性的表达式。
2. 检查这些表达式是否依赖 `false` 来移除属性。
3. 如果本意是移除属性，改成返回 `null` 或 `undefined`。
4. 对枚举属性，改成显式输出你真正想要的值，不要依赖 Vue 2 的旧转换规则。

## 改完以后确认

- 这些属性在浏览器里输出结果符合预期。
