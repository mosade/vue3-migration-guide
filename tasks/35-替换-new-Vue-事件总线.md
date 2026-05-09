# 35.替换 new Vue 事件总线

## 目标

- 移除基于 `new Vue()` 的事件总线实现。
- 用独立 emitter 保留原事件名、payload、订阅、取消订阅和一次性订阅语义。
- 避免页面反复进入后重复订阅或触发已卸载页面逻辑。

## 最小改动原则

- 能不改就不改。
- 不重构跨组件通信架构。
- 不把事件总线迁移为 store、provide/inject 或 props/emits，除非原代码只涉及局部父子组件且人工确认。
- 先替换总线实现，再按最小范围修调用方。

## 允许修改范围

- 定义 `new Vue()` 事件总线的文件。
- 直接调用该总线 `$on`、`$off`、`$once`、`$emit` 的文件。
- 为保持取消订阅语义而新增的最小 emitter 适配代码。
- 与订阅清理直接相关的生命周期钩子名称。

## 禁止修改范围

- 不改事件名。
- 不改 payload 结构。
- 不合并多个事件。
- 不改变事件触发时机。
- 不把全局事件总线顺手迁移为 Vuex、Pinia 或业务状态模块。
- 不 patch 第三方库。

## 搜索命令

如果项目有 `src` 目录，先运行：

```bash
rg -n 'new Vue\(|eventBus|EventBus|bus\.\$on|bus\.\$off|bus\.\$once|bus\.\$emit|\.\$on\(|\.\$off\(|\.\$once\(|\.\$emit\(' src
```

如果项目源码不在 `src`，改为运行：

```bash
rg -n 'new Vue\(|eventBus|EventBus|bus\.\$on|bus\.\$off|bus\.\$once|bus\.\$emit|\.\$on\(|\.\$off\(|\.\$once\(|\.\$emit\(' .
```

## 命中分类

- 必改：`export default new Vue()` 或 `const bus = new Vue()` 形式的事件总线。
- 必改：对该事件总线调用 `$on`、`$off`、`$once`、`$emit`。
- 可不改：组件自身对父组件 `$emit` 的正常事件输出。
- 可不改：字符串、注释、文档中的事件名。
- 阻塞：无法确认某个 `$emit` 属于组件事件还是事件总线。
- 阻塞：事件总线被第三方插件或外部包直接 import。

## 修改规则

- 总线实现：
  - 使用项目已有 emitter 库时，优先复用已有库。
  - 项目没有 emitter 库时，新增一个极小适配层，必须提供 `on`、`off`、`once`、`emit`。
  - 适配层方法名可以保持 `$on`、`$off`、`$once`、`$emit`，以减少调用方改动。
- 订阅：
  - `$on(event, handler)` 迁移后必须保留 handler 引用。
  - 如果新 emitter `on` 返回 unsubscribe 函数，保存该函数并在卸载时调用。
- 取消订阅：
  - 原 `$off(event, handler)` 语义必须保留。
  - 匿名 handler 无法取消时，停止并报告。
- 一次性订阅：
  - 新 emitter 有 `once` 时使用 `once`。
  - 新 emitter 没有 `once` 时，用包装函数在第一次触发后主动取消订阅。
- 生命周期：
  - 如果清理逻辑仍在 `beforeDestroy` 或 `destroyed`，只做与本任务相关的最小生命周期重命名。

## 第三方依赖处理

- 第三方库内部事件总线不修改。
- 如果自研插件暴露了事件总线 API，必须保留现有 API 形状，记录调用方。
- 如果外部包直接依赖旧 bus 的 Vue 实例能力，记录为阻塞，不猜测替换。

## 验证命令

如果项目有 `src` 目录，运行：

```bash
rg -n 'new Vue\(|eventBus|EventBus|bus\.\$on|bus\.\$off|bus\.\$once|bus\.\$emit|\.\$on\(|\.\$off\(|\.\$once\(|\.\$emit\(' src
git diff --check
git diff --stat
```

如果项目源码不在 `src`，将上面的 `src` 替换为 `.` 后运行。

如果项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 发布事件后订阅方仍能收到原 payload。
- 页面离开后不再响应旧事件。
- 页面反复进入不会重复响应。
- `$once` 事件最多触发一次。
- 弹窗、消息通知、跨页面刷新、全局 loading 等使用事件总线的交互。

## 停止条件

- 无法定位事件总线定义。
- 无法区分组件 `$emit` 和 bus `$emit`。
- 订阅使用匿名函数且没有可安全取消的引用。
- 事件总线 API 被外部包或大量业务模块隐式依赖。
- 修改需要重构跨模块通信架构。
- 修改会导致大面积格式化 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 新事件总线实现位置。
- 已迁移的订阅、取消订阅、一次性订阅和发布文件。
- 保留的 `$emit` 命中及原因。
- 匿名订阅、外部依赖和其他阻塞项。
- 运行过的验证命令及结果。
