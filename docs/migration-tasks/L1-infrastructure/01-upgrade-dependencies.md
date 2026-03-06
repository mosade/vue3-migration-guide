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

### 核心依赖
- [ ] 升级 `vue` 到 ^3.x
- [ ] 升级 `vue-router` 到 ^4.x
- [ ] 升级 `vuex` 到 ^4.x 或迁移到 `pinia`
- [ ] 安装 @vue/compat（如需渐进式迁移）

### Vue CLI 及构建工具（继续使用 Vue CLI 方案）
- [ ] 升级 `@vue/cli-service` 到 ^5.x
- [ ] 升级 `@vue/cli-plugin-babel` 到 ^5.x
- [ ] 升级 `@vue/cli-plugin-eslint` 到 ^5.x
- [ ] 升级 `@vue/cli-plugin-typescript` 到 ^5.x（如使用 TS）
- [ ] 升级 `vue-loader` 到 ^17.x
- [ ] 升级 `eslint` 到 ^8.x
- [ ] 升级 `eslint-plugin-vue` 到 ^9.x
- [ ] 更新 ESLint 配置支持 Vue 3

### 其他开发工具
- [ ] 升级 `@babel/eslint-parser`（替换 babel-eslint）
- [ ] 升级 `sass-loader`、`less-loader` 等 CSS 预处理器 loader
- [ ] 检查并升级其他 webpack loader 和 plugin

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
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.8",
    "@vue/cli-plugin-babel": "^5.0.8",
    "@vue/cli-plugin-eslint": "^5.0.8",
    "eslint": "^8.57.0",
    "eslint-plugin-vue": "^9.24.0"
  }
}
```

## ESLint 配置升级

Vue CLI 5 + Vue 3 需要更新 ESLint 配置：

### .eslintrc.js 变更

```javascript
// Vue 2 配置
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',  // Vue 2
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'  // 已废弃
  }
}

// Vue 3 配置
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',  // Vue 3
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',  // 新解析器
    requireConfigFile: false
  }
}
```

### ESLint 预设选择

| Vue 2 | Vue 3 |
|-------|-------|
| `plugin:vue/essential` | `plugin:vue/vue3-essential` |
| `plugin:vue/recommended` | `plugin:vue/vue3-recommended` |
| `plugin:vue/strongly-recommended` | `plugin:vue/vue3-strongly-recommended` |

## 注意事项

1. 升级前确保有完整的测试覆盖
2. 考虑使用 `@vue/compat` 进行渐进式迁移
3. 检查第三方插件的 Vue 3 兼容性
4. 备份项目后再进行升级
5. Vue CLI 5 需要 Node.js 12+，建议使用 Node.js 16/18
6. ESLint 升级后可能会有新的规则报错，需要逐步修复或使用 `--fix`

## 验收标准

- [ ] `npm install` 或 `yarn install` 成功执行无错误
- [ ] 项目可以正常启动 (`npm run serve`)
- [ ] 项目可以正常构建 (`npm run build`)
- [ ] ESLint 检查通过 (`npm run lint`)
- [ ] 没有依赖版本冲突警告
- [ ] Vue CLI 5 相关命令正常工作
