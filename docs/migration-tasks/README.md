# Vue 2 → Vue 3 迁移任务清单索引

本文档列出所有迁移任务文件，便于追踪和分配。

---

## 目录结构

```
docs/migration-tasks/
├── L1-infrastructure/          # 基础设施层
├── L2-global/                  # 全局层
├── L3-component/               # 组件定义层
├── L4-template/                # 模板层
├── L5-render/                  # 渲染层
└── L6-cleanup/                 # 清理层
```

---

## 任务清单

### L1 - 基础设施层 (1个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L1-01 | [01-upgrade-dependencies](./L1-infrastructure/01-upgrade-dependencies.md) | P0 | 低 | 2-4h |

### L2 - 全局层 (5个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L2-01 | [01-migrate-global-api-init](./L2-global/01-migrate-global-api-init.md) | P0 | 中 | 4-8h |
| L2-02 | [02-migrate-global-api-treeshaking](./L2-global/02-migrate-global-api-treeshaking.md) | P1 | 低 | 2-4h |
| L2-03 | [03-migrate-global-filters](./L2-global/03-migrate-global-filters.md) | P1 | 中 | 4-8h |
| L2-04 | [04-migrate-global-directives](./L2-global/04-migrate-global-directives.md) | P1 | 低 | 2-4h |
| L2-05 | [05-remove-props-data](./L2-global/05-remove-props-data.md) | P2 | 低 | 1-2h |

### L3 - 组件定义层 (9个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L3-01 | [01-fix-data-option-declaration](./L3-component/01-fix-data-option-declaration.md) | P0 | 中 | 4-8h |
| L3-02 | [02-fix-mixin-data-merge-behavior](./L3-component/02-fix-mixin-data-merge-behavior.md) | P1 | 高 | 8-16h |
| L3-03 | [03-add-emits-option](./L3-component/03-add-emits-option.md) | P0 | 中 | 4-8h |
| L3-04 | [04-fix-props-default-this-access](./L3-component/04-fix-props-default-this-access.md) | P1 | 中 | 4-8h |
| L3-05 | [05-migrate-async-components](./L3-component/05-migrate-async-components.md) | P1 | 低 | 2-4h |
| L3-06 | [06-migrate-functional-components](./L3-component/06-migrate-functional-components.md) | P1 | 中 | 4-8h |
| L3-07 | [07-fix-custom-elements-interop](./L3-component/07-fix-custom-elements-interop.md) | P2 | 中 | 2-4h |
| L3-08 | [08-fix-watch-array-deep](./L3-component/08-fix-watch-array-deep.md) | P1 | 中 | 4-8h |
| L3-09 | [09-fix-custom-directive-lifecycle](./L3-component/09-fix-custom-directive-lifecycle.md) | P1 | 低 | 2-4h |

### L4 - 模板层 (8个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L4-01 | [01-migrate-v-model-syntax](./L4-template/01-migrate-v-model-syntax.md) | P0 | 高 | 8-16h |
| L4-02 | [02-fix-key-attribute-on-template-v-for](./L4-template/02-fix-key-attribute-on-template-v-for.md) | P0 | 中 | 4-8h |
| L4-03 | [03-fix-v-if-v-for-precedence](./L4-template/03-fix-v-if-v-for-precedence.md) | P0 | 高 | 4-8h |
| L4-04 | [04-fix-v-bind-order-sensitivity](./L4-template/04-fix-v-bind-order-sensitivity.md) | P1 | 低 | 2-4h |
| L4-05 | [05-remove-v-on-native-modifier](./L4-template/05-remove-v-on-native-modifier.md) | P1 | 低 | 2-4h |
| L4-06 | [06-remove-keycode-modifiers](./L4-template/06-remove-keycode-modifiers.md) | P2 | 中 | 4-8h |
| L4-07 | [07-fix-attribute-coercion](./L4-template/07-fix-attribute-coercion.md) | P1 | 中 | 4-8h |
| L4-08 | [08-remove-inline-template](./L4-template/08-remove-inline-template.md) | P2 | 中 | 4-8h |

### L5 - 渲染层 (8个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L5-01 | [01-fix-attrs-include-class-style](./L5-render/01-fix-attrs-include-class-style.md) | P1 | 中 | 4-8h |
| L5-02 | [02-migrate-listeners-to-attrs](./L5-render/02-migrate-listeners-to-attrs.md) | P1 | 中 | 4-8h |
| L5-03 | [03-migrate-slots-unification](./L5-render/03-migrate-slots-unification.md) | P0 | 高 | 8-16h |
| L5-04 | [04-migrate-render-function-api](./L5-render/04-migrate-render-function-api.md) | P1 | 高 | 8-16h |
| L5-05 | [05-migrate-transition-class-names](./L5-render/05-migrate-transition-class-names.md) | P1 | 低 | 2-4h |
| L5-06 | [06-fix-transition-group-wrapper-element](./L5-render/06-fix-transition-group-wrapper-element.md) | P1 | 中 | 4-8h |
| L5-07 | [07-fix-transition-as-root](./L5-render/07-fix-transition-as-root.md) | P2 | 低 | 2-4h |
| L5-08 | [08-fix-vnode-lifecycle-events](./L5-render/08-fix-vnode-lifecycle-events.md) | P2 | 低 | 2-4h |

### L6 - 清理层 (5个任务)

| 编号 | 任务文件 | 优先级 | 复杂度 | 预计工时 |
|------|----------|--------|--------|----------|
| L6-01 | [01-remove-filters](./L6-cleanup/01-remove-filters.md) | P0 | 中 | 4-8h |
| L6-02 | [02-remove-instance-event-methods](./L6-cleanup/02-remove-instance-event-methods.md) | P0 | 中 | 4-8h |
| L6-03 | [03-remove-children-property](./L6-cleanup/03-remove-children-property.md) | P1 | 中 | 4-8h |
| L6-04 | [04-remove-destroy-method](./L6-cleanup/04-remove-destroy-method.md) | P2 | 低 | 2-4h |
| L6-05 | [05-remove-set-delete-methods](./L6-cleanup/05-remove-set-delete-methods.md) | P1 | 中 | 4-8h |

---

## 汇总统计

| 层级 | 任务数 | 预计总工时 |
|------|--------|-----------|
| L1 - 基础设施 | 1 | 2-4h |
| L2 - 全局层 | 5 | 13-26h |
| L3 - 组件定义层 | 9 | 38-76h |
| L4 - 模板层 | 8 | 32-64h |
| L5 - 渲染层 | 8 | 38-76h |
| L6 - 清理层 | 5 | 20-40h |
| **总计** | **36** | **143-286h** |

---

## 优先级分布

| 优先级 | 任务数 | 说明 |
|--------|--------|------|
| P0 | 10 | 必须完成，否则应用无法运行 |
| P1 | 19 | 推荐完成，确保功能完整 |
| P2 | 7 | 可选完成，优化体验 |

---

## 执行建议

1. **按层级顺序执行**：L1 → L2 → L3 → L4 → L5 → L6
2. **每个任务独立提交**：便于代码审查和回滚
3. **测试驱动**：每个任务完成后运行测试
4. **使用 @vue/compat**：渐进式迁移，降低风险

---

## 相关资源

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Migration Build](https://v3-migration.vuejs.org/migration-build.html)
