# 19. 迁移自定义指令 API

## 当前任务

把 Vue 2 自定义指令钩子和上下文字段改成 Vue 3 写法。

## 怎么做

1. 搜索 `bind(`、`inserted(`、`componentUpdated(`、`unbind(`、`binding.expression`、`vnode.context`。
2. 把旧钩子改成 `beforeMount`、`mounted`、`updated`、`unmounted`。
3. 把 `vnode.context` 改成 `binding.instance`。
4. 删除对 `binding.expression` 的依赖，改成直接使用 `binding.value`、`binding.arg`、`binding.modifiers`。

## 改完以后确认

- 自定义指令里不再使用 Vue 2 的钩子名和上下文字段。
