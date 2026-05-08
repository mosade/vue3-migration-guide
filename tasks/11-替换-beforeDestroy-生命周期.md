# 11.替换 beforeDestroy 生命周期

- 目标：修复生命周期命名变更之一。
- 搜索线索：全局搜索 `beforeDestroy`。
- 实施内容：将 Options API 中的 `beforeDestroy` 改为 `beforeUnmount`。
- 注意事项：这个钩子常用于解绑事件、停止定时器、取消请求；迁移时顺手确认清理函数仍能拿到对应引用。
- 完成标准：组件卸载前的清理逻辑仍会执行，页面反复进入不会累积副作用。
