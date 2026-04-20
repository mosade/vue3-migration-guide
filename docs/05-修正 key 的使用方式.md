# 05. 修正 key 的使用方式

## 当前任务

处理 Vue 3 对 `key` 的两处破坏性变更。

## 怎么做

1. 搜索 `v-if` / `v-else-if` / `v-else` 分支里重复使用相同 `key` 的代码。
2. 对这类条件分支，删除重复 key，或者改成不同 key。
3. 搜索 `<template v-for` 里把 `key` 写在子节点上的写法。
4. 把 `key` 提到 `<template v-for>` 本身上，不要继续放在循环子节点上。

## 改完以后确认

- 条件分支不再共用同一个 key。
- `template v-for` 的 key 已经写在 `template` 标签上。
