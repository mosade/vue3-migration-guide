# 12.替换 destroyed 生命周期

- 目标：修复生命周期命名变更之一。
- 搜索线索：全局搜索 `destroyed`。
- 实施内容：将 Options API 中的 `destroyed` 改为 `unmounted`。
- 注意事项：如果同一组件同时存在 `beforeDestroy` 和 `destroyed`，要保持原清理顺序语义。
- 完成标准：组件卸载后的收尾逻辑仍会执行，控制台无生命周期选项相关警告。
