# Task L1-01: 升级 Vue 及相关依赖版本

## 基本信息

- **任务ID**: L1-01
- **层级**: L1 - 基础设施层
- **优先级**: P0 (必须在所有代码变更之前完成)
- **影响范围**: 全局
- **复杂度**: 低
- **预计工时**: 2-4小时

## 任务描述

升级项目中的 Vue 及相关依赖到 Vue 3 兼容版本，包括 vue、vue-router、状态管理库以及构建工具。

## 迁移指南

- [Migration Build](https://v3-migration.vuejs.org/migration-build.html)

## 检查清单

- [ ] 升级 `vue` 到 ^3.x
- [ ] 升级 `vue-router` 到 ^4.x
- [ ] 升级 `vuex` 到 ^4.x 或迁移到 `pinia`
- [ ] 升级 `@vue/cli` 或 Vite 配置
- [ ] 升级相关插件 (vue-loader, @vitejs/plugin-vue 等)
- [ ] 安装 @vue/compat（如需渐进式迁移）

## 代码对比

### Vue 2

```json
{
  "dependencies": {
    "vue": "^2.6.14",
    "vue-router": "^3.5.1",
    "vuex": "^3.6.2"
  }
}
```

### Vue 3

```json
{
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0"
  }
}
```

## 注意事项

1. 升级前确保有完整的测试覆盖
2. 考虑使用 `@vue/compat` 进行渐进式迁移
3. 检查第三方插件的 Vue 3 兼容性
4. 备份项目后再进行升级

## 验收标准

- [ ] `npm install` 或 `yarn install` 成功执行无错误
- [ ] 项目可以正常启动
- [ ] 没有依赖版本冲突警告
