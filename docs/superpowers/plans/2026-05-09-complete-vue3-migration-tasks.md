# Complete Vue3 Migration Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `tasks/` 扩展为覆盖缺失 Vue3 迁移阻塞点的 58 个编号 runbook，并修正过期 README 链接。

**Architecture:** 保留现有 runbook 模板和绝大多数任务正文，只做编号重排、两个新增任务、索引更新、根 README 链接修正。所有变更都是 Markdown 文档变更，不运行 Vue 项目构建。

**Tech Stack:** Markdown, `git mv`, `rg`, `awk`, shell commands.

---

## File Structure

- Modify/Rename: `tasks/[23-58]-*.md`
  - Responsibility: 通过 `git mv` 插入两个新任务后的编号空间，并同步每个文件的一级标题编号。
- Create: `tasks/23-迁移无特殊指令-template-标签.md`
  - Responsibility: 新增 Vue3 无特殊指令 `<template>` 语义变化 runbook。
- Create: `tasks/36-移除-destroy-用法.md`
  - Responsibility: 新增 Vue3 移除实例 `$destroy()` runbook。
- Modify: `tasks/README.md`
  - Responsibility: 删除不再需要的盘点/业务门禁，更新 58 个任务链接和分组。
- Modify: `README.md`
  - Responsibility: 将 implementation docs 指向实际存在的 `tasks/README.md`。

## Global Rules

- 不新增盘点任务。
- 不新增收尾业务回归任务。
- 不改现有任务正文，除非是编号、标题、链接或明确错误。
- 不运行 `npm run build`、`npm run serve`、`pnpm build` 等项目构建命令。
- 每个任务完成后运行对应结构验证，并提交。

### Task 1: Renumber Existing Task Files

**Files:**
- Rename: `tasks/23-迁移自定义指令钩子名.md` through `tasks/56-确认主路由可跳转.md`

- [ ] **Step 1: Move downstream files in descending order**

Run these commands from the repository root:

```bash
git mv tasks/56-确认主路由可跳转.md tasks/58-确认主路由可跳转.md
git mv tasks/55-确认首屏可渲染.md tasks/57-确认首屏可渲染.md
git mv tasks/54-确认生产构建可通过.md tasks/56-确认生产构建可通过.md
git mv tasks/53-确认-dev-server-可启动.md tasks/55-确认-dev-server-可启动.md
git mv tasks/52-执行生产构建修复.md tasks/54-执行生产构建修复.md
git mv tasks/51-执行开发服务器启动修复.md tasks/53-执行开发服务器启动修复.md
git mv tasks/50-迁移渲染边界兼容差异.md tasks/52-迁移渲染边界兼容差异.md
git mv tasks/49-修正-vue-cli-构建配置以支持-vue3.md tasks/51-修正-vue-cli-构建配置以支持-vue3.md
git mv tasks/48-迁移-Options-API-兼容差异.md tasks/50-迁移-Options-API-兼容差异.md
git mv tasks/47-迁移-key-与-v-bind-顺序.md tasks/49-迁移-key-与-v-bind-顺序.md
git mv tasks/46-迁移自定义元素与-is-属性.md tasks/48-迁移自定义元素与-is-属性.md
git mv tasks/45-迁移异步组件定义.md tasks/47-迁移异步组件定义.md
git mv tasks/44-迁移全局-API-Tree-Shaking.md tasks/46-迁移全局-API-Tree-Shaking.md
git mv tasks/43-迁移-Vuex-安装方式.md tasks/45-迁移-Vuex-安装方式.md
git mv tasks/42-升级-vuex-到-4.x.md tasks/44-升级-vuex-到-4.x.md
git mv tasks/41-迁移-router-view-组合写法.md tasks/43-迁移-router-view-组合写法.md
git mv tasks/40-迁移-router.onReady.md tasks/42-迁移-router.onReady.md
git mv tasks/39-迁移-Router-catch-all-路由.md tasks/41-迁移-Router-catch-all-路由.md
git mv tasks/38-迁移-Router-history-配置.md tasks/40-迁移-Router-history-配置.md
git mv tasks/37-迁移-Router-创建方式.md tasks/39-迁移-Router-创建方式.md
git mv tasks/36-升级-vue-router-到-4.x.md tasks/38-升级-vue-router-到-4.x.md
git mv tasks/35-移除-children-依赖.md tasks/37-移除-children-依赖.md
git mv tasks/34-替换-new-Vue-事件总线.md tasks/35-替换-new-Vue-事件总线.md
git mv tasks/33-移除-once-用法.md tasks/34-移除-once-用法.md
git mv tasks/32-移除-off-用法.md tasks/33-移除-off-用法.md
git mv tasks/31-移除-on-用法.md tasks/32-移除-on-用法.md
git mv tasks/30-移除-Vue.delete.md tasks/31-移除-Vue.delete.md
git mv tasks/29-移除-Vue.set.md tasks/30-移除-Vue.set.md
git mv tasks/28-移除-functional-true.md tasks/29-移除-functional-true.md
git mv tasks/27-迁移-render-function-API.md tasks/28-迁移-render-function-API.md
git mv tasks/26-迁移-Transition-旧类名.md tasks/27-迁移-Transition-旧类名.md
git mv tasks/25-迁移-v-if-与-v-for-同节点写法.md tasks/26-迁移-v-if-与-v-for-同节点写法.md
git mv tasks/24-迁移数组-watch-行为差异.md tasks/25-迁移数组-watch-行为差异.md
git mv tasks/23-迁移自定义指令钩子名.md tasks/24-迁移自定义指令钩子名.md
```

Expected: all commands exit `0`.

- [ ] **Step 2: Update heading numbers in renamed files**

Run:

```bash
perl -0pi -e 's/^# 58\./# 58./m' tasks/58-确认主路由可跳转.md
perl -0pi -e 's/^# 56\./# 58./m' tasks/58-确认主路由可跳转.md
perl -0pi -e 's/^# 55\./# 57./m' tasks/57-确认首屏可渲染.md
perl -0pi -e 's/^# 54\./# 56./m' tasks/56-确认生产构建可通过.md
perl -0pi -e 's/^# 53\./# 55./m' tasks/55-确认-dev-server-可启动.md
perl -0pi -e 's/^# 52\./# 54./m' tasks/54-执行生产构建修复.md
perl -0pi -e 's/^# 51\./# 53./m' tasks/53-执行开发服务器启动修复.md
perl -0pi -e 's/^# 50\./# 52./m' tasks/52-迁移渲染边界兼容差异.md
perl -0pi -e 's/^# 49\./# 51./m' tasks/51-修正-vue-cli-构建配置以支持-vue3.md
perl -0pi -e 's/^# 48\./# 50./m' tasks/50-迁移-Options-API-兼容差异.md
perl -0pi -e 's/^# 47\./# 49./m' tasks/49-迁移-key-与-v-bind-顺序.md
perl -0pi -e 's/^# 46\./# 48./m' tasks/48-迁移自定义元素与-is-属性.md
perl -0pi -e 's/^# 45\./# 47./m' tasks/47-迁移异步组件定义.md
perl -0pi -e 's/^# 44\./# 46./m' tasks/46-迁移全局-API-Tree-Shaking.md
perl -0pi -e 's/^# 43\./# 45./m' tasks/45-迁移-Vuex-安装方式.md
perl -0pi -e 's/^# 42\./# 44./m' tasks/44-升级-vuex-到-4.x.md
perl -0pi -e 's/^# 41\./# 43./m' tasks/43-迁移-router-view-组合写法.md
perl -0pi -e 's/^# 40\./# 42./m' tasks/42-迁移-router.onReady.md
perl -0pi -e 's/^# 39\./# 41./m' tasks/41-迁移-Router-catch-all-路由.md
perl -0pi -e 's/^# 38\./# 40./m' tasks/40-迁移-Router-history-配置.md
perl -0pi -e 's/^# 37\./# 39./m' tasks/39-迁移-Router-创建方式.md
perl -0pi -e 's/^# 36\./# 38./m' tasks/38-升级-vue-router-到-4.x.md
perl -0pi -e 's/^# 35\./# 37./m' tasks/37-移除-children-依赖.md
perl -0pi -e 's/^# 34\./# 35./m' tasks/35-替换-new-Vue-事件总线.md
perl -0pi -e 's/^# 33\./# 34./m' tasks/34-移除-once-用法.md
perl -0pi -e 's/^# 32\./# 33./m' tasks/33-移除-off-用法.md
perl -0pi -e 's/^# 31\./# 32./m' tasks/32-移除-on-用法.md
perl -0pi -e 's/^# 30\./# 31./m' tasks/31-移除-Vue.delete.md
perl -0pi -e 's/^# 29\./# 30./m' tasks/30-移除-Vue.set.md
perl -0pi -e 's/^# 28\./# 29./m' tasks/29-移除-functional-true.md
perl -0pi -e 's/^# 27\./# 28./m' tasks/28-迁移-render-function-API.md
perl -0pi -e 's/^# 26\./# 27./m' tasks/27-迁移-Transition-旧类名.md
perl -0pi -e 's/^# 25\./# 26./m' tasks/26-迁移-v-if-与-v-for-同节点写法.md
perl -0pi -e 's/^# 24\./# 25./m' tasks/25-迁移数组-watch-行为差异.md
perl -0pi -e 's/^# 23\./# 24./m' tasks/24-迁移自定义指令钩子名.md
```

Expected: commands exit `0`. The first command is harmless if no `# 58.` line exists; the second command performs the real update for `tasks/58-确认主路由可跳转.md`.

- [ ] **Step 3: Verify file count and numeric continuity**

Run:

```bash
find tasks -maxdepth 1 -type f -name '[0-9][0-9]-*.md' | sort | wc -l
find tasks -maxdepth 1 -type f -name '[0-9][0-9]-*.md' | sed 's|.*/||;s|-.*||' | sort | awk 'BEGIN{prev=0; ok=1} {n=$1+0; if(n!=prev+1){print "gap before " n " after " prev; ok=0} prev=n} END{print "last " prev; exit ok?0:1}'
```

Expected before adding new tasks: `56` files, with gaps at `23` and `36`. This task intentionally creates gaps for the two new files.

- [ ] **Step 4: Commit renames**

Run:

```bash
git diff --check
git diff --stat
git add tasks
git commit -m "docs: renumber migration task runbooks"
```

Expected: `git diff --check` exits `0`; commit succeeds.

### Task 2: Add Plain Template Tag Runbook

**Files:**
- Create: `tasks/23-迁移无特殊指令-template-标签.md`

- [ ] **Step 1: Create the new runbook**

Create `tasks/23-迁移无特殊指令-template-标签.md` with exactly this content:

```markdown
# 23.迁移无特殊指令 template 标签

## 目标

- 修复 Vue 3 中无特殊指令 `<template>` 会渲染为原生 `<template>` 元素的行为差异。
- 只处理嵌套在组件模板内部、原本依赖 Vue 2 透明包裹行为的 `<template>`。
- 默认保持现有 DOM 结构、样式选择器、插槽内容和组件外部 API。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- 不把所有 `<template>` 都替换成真实元素，只处理 Vue 3 语义会变化的嵌套普通 `<template>`。

## 允许修改范围

- 只修改本任务搜索命令命中的业务源码、配置或依赖声明。
- 只修改与本任务目标直接相关的最小代码片段。
- 如果需要修改公共组件 API，必须先记录调用方影响，并停止等待人工确认。
- 如果命中构建、入口或依赖配置，只修改能证明是 Vue3 迁移阻塞的配置项。

## 禁止修改范围

- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不顺手升级无关依赖。
- 不迁移到 Vite、Pinia 或 Composition API。
- 不修改无关格式。
- 不改变业务条件、插槽 payload、列表数据来源或组件外部 API。

## 搜索命令

原搜索线索：全局搜索 `<template>`，排除 SFC 顶层模板、插槽模板和带结构指令的模板。

```bash
rg -n '<template(\s[^>]*)?>|</template>' src
```

## 命中分类

- 必改：嵌套 `<template>` 没有 `v-if`、`v-else-if`、`v-else`、`v-for`、`v-slot` 或 `#` 插槽简写，且用于透明包裹多个节点。
- 必改：嵌套 `<template>` 没有特殊指令，且 Vue 3 下渲染为原生 `<template>` 会影响布局、样式选择器或 DOM 查询。
- 可不改：SFC 顶层 `<template>`。
- 可不改：带 `v-if`、`v-else-if`、`v-else`、`v-for`、`v-slot` 或 `#` 插槽简写的 `<template>`。
- 可不改：字符串、文档、注释中的 `<template>`。
- 阻塞：无法判断删除包裹、换成 `<div>`、换成 `<span>` 或使用 Fragment 是否会改变布局。
- 阻塞：命中位于 `table`、`ul`、`ol`、`select`、`tr`、`tbody` 等受限 HTML 结构中，替换元素不明确。

## 修改规则

- 如果 `<template>` 只是无意义透明包裹，优先删除开始和结束标签，保留内部节点原顺序。
- 如果必须保留真实包裹，选择最小且语义安全的元素，例如块级布局用 `<div>`，行内文本片段用 `<span>`。
- 表格、列表、选择框等受限结构中，只有在替换元素明显合法时才修改；否则停止并报告。
- 不移动业务条件，不改变 `v-for` 数据源，不改变 slot 名称、slot props 或组件 props。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n '<template(\s[^>]*)?>|</template>' src
git diff --check
git diff --stat
```

如果搜索范围与项目实际目录不一致，把命令中的路径替换为实际源码、配置或依赖文件范围。若项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 受影响页面的布局、间距和 CSS 选择器仍符合原效果。
- 表格、列表、下拉选项、插槽内容渲染结构正确。
- 依赖 DOM 查询、自动化测试选择器或第三方组件插槽结构的页面没有新增异常。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断某个 `<template>` 是透明包裹、结构占位还是文档/字符串。
- 无法判断替换元素是否合法或是否影响布局。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
```

- [ ] **Step 2: Verify the new runbook sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/23-迁移无特殊指令-template-标签.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Commit**

Run:

```bash
git diff --check
git add tasks/23-迁移无特殊指令-template-标签.md
git commit -m "docs: add plain template migration task"
```

Expected: commit succeeds.

### Task 3: Add Removed `$destroy` Runbook

**Files:**
- Create: `tasks/36-移除-destroy-用法.md`

- [ ] **Step 1: Create the new runbook**

Create `tasks/36-移除-destroy-用法.md` with exactly this content:

```markdown
# 36.移除 $destroy 用法

## 目标

- 移除 Vue 3 已删除的实例 `$destroy()` API 依赖。
- 只处理能确认接收者是 Vue 实例的手动销毁逻辑。
- 默认保持动态挂载组件、弹窗、消息服务和临时组件的创建、关闭、DOM 清理语义。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。
- 不把弹窗服务、全局组件服务或手动挂载架构重写为另一套模式。

## 允许修改范围

- 只修改本任务搜索命令命中的业务源码、配置或依赖声明。
- 只修改与本任务目标直接相关的最小代码片段。
- 如果需要修改公共组件 API，必须先记录调用方影响，并停止等待人工确认。
- 如果命中构建、入口或依赖配置，只修改能证明是 Vue3 迁移阻塞的配置项。

## 禁止修改范围

- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不顺手升级无关依赖。
- 不迁移到 Vite、Pinia 或 Composition API。
- 不修改无关格式。
- 不把普通业务对象或第三方实例的 `destroy()` 误改为 Vue app 生命周期。

## 搜索命令

原搜索线索：全局搜索 `$destroy()`、手动挂载组件和宽泛 `destroy(` 命中，再人工分类。

```bash
rg -n '\.\$destroy\(|\$destroy\(|destroy\s*\(' src
```

复杂动态挂载场景再补充搜索：

```bash
rg -n 'Vue\.extend|new\s+[A-Z][A-Za-z0-9_]*\(|\$mount\(|document\.createElement|appendChild|removeChild' src
```

## 命中分类

- 必改：直接调用 Vue 实例的 `$destroy()`。
- 必改：`Vue.extend(...)`、`new Ctor(...)`、`instance.$mount(...)` 创建的临时组件随后通过 `$destroy()` 清理。
- 可不改：普通业务对象、图表库、编辑器、播放器、地图、WebSocket、微前端容器等第三方实例的 `destroy()`。
- 可不改：字符串、文档、注释中的 `$destroy` 或 `destroy(`。
- 阻塞：无法证明 `destroy()` 接收者是否为 Vue 实例。
- 阻塞：销毁逻辑同时负责全局事件、DOM 容器、body 子节点、计时器或跨应用资源，无法安全判断最小替换。

## 修改规则

- 动态挂载组件改为 `createApp(Component, props)`，保存返回的 app 实例。
- 原来调用 `vm.$destroy()` 的位置改为调用 `app.unmount()`。
- 如果原逻辑手动移除 DOM 容器，保留等价的 `parentNode.removeChild(container)` 或现有清理逻辑。
- 保留原事件解绑、定时器清理、回调触发顺序；无法确认顺序时停止。
- 不顺手把服务式组件改为全局 store、provide/inject、Composition API 或插件重构。
- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n '\.\$destroy\(|\$destroy\(' src
rg -n 'Vue\.extend|new\s+[A-Z][A-Za-z0-9_]*\(|\$mount\(' src
git diff --check
git diff --stat
```

如果搜索范围与项目实际目录不一致，把命令中的路径替换为实际源码、配置或依赖文件范围。若项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 动态弹窗、消息提示、确认框、临时挂载组件能正常打开和关闭。
- 反复打开关闭后没有重复 DOM 节点、重复事件监听或控制台报错。
- 原关闭回调、销毁回调、Promise resolve/reject 时机保持一致。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断 `destroy()` 接收者是否为 Vue 实例。
- 销毁逻辑耦合全局事件、DOM 容器、计时器、弹窗队列或微前端生命周期，无法确认最小替换。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
```

- [ ] **Step 2: Verify the new runbook sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/36-移除-destroy-用法.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Commit**

Run:

```bash
git diff --check
git add tasks/36-移除-destroy-用法.md
git commit -m "docs: add destroy api migration task"
```

Expected: commit succeeds.

### Task 4: Update Task Index

**Files:**
- Modify: `tasks/README.md`

- [ ] **Step 1: Replace stage gates**

Replace the current `## 阶段门禁` list with:

```markdown
## 阶段门禁

1. 构建链门禁：Vue 3 compiler 和 loader 链能解析代表性 SFC。
2. 入口门禁：入口、插件、router、store、全局属性、组件、指令都通过 Vue 3 app 实例安装。
3. 语法门禁：已知 Vue2 模板和组件语法已迁移或明确标记为无需修改。
4. 运行时门禁：已删除实例 API 和事件总线模式已替换。
5. 生态门禁：router、Vuex、UI 库、自研插件与 Vue3 兼容。
6. 开发门禁：dev server 可启动，浏览器加载后没有启动白屏。
7. 生产门禁：生产构建完成，静态资源按预期 publicPath 加载。
```

- [ ] **Step 2: Replace task lists**

Replace the task list sections from `## 核心实施任务` through the end of `## 完成标准` with:

```markdown
## 核心实施任务

- [01.升级 vue 到 3.x](./01-升级-vue-到-3.x.md)
- [02.替换 vue-template-compiler](./02-替换-vue-template-compiler.md)
- [03.升级单文件组件编译链](./03-升级单文件组件编译链.md)
- [04.迁移应用入口到 createApp](./04-迁移应用入口到-createApp.md)
- [05.迁移根实例挂载写法](./05-迁移根实例挂载写法.md)
- [06.迁移全局插件注册](./06-迁移全局插件注册.md)
- [07.迁移全局组件注册](./07-迁移全局组件注册.md)
- [08.迁移全局指令注册](./08-迁移全局指令注册.md)
- [09.迁移全局 mixin 注册](./09-迁移全局-mixin-注册.md)
- [10.迁移 Vue.prototype 扩展](./10-迁移-Vue.prototype-扩展.md)
- [11.替换 beforeDestroy 生命周期](./11-替换-beforeDestroy-生命周期.md)
- [12.替换 destroyed 生命周期](./12-替换-destroyed-生命周期.md)

## 模板与组件实施任务

- [13.移除模板 filters](./13-移除模板-filters.md)
- [14.移除 v-on.native](./14-移除-v-on.native.md)
- [15.移除 .sync](./15-移除-.sync.md)
- [16.迁移组件 v-model 协议](./16-迁移组件-v-model-协议.md)
- [17.迁移旧插槽语法](./17-迁移旧插槽语法.md)
- [18.迁移 $scopedSlots 用法](./18-迁移-scopedSlots-用法.md)
- [19.迁移 $listeners 用法](./19-迁移-listeners-用法.md)
- [20.补充组件 emits 声明](./20-补充组件-emits-声明.md)
- [21.移除 keyCode 修饰符](./21-移除-keyCode-修饰符.md)
- [22.移除 inline-template](./22-移除-inline-template.md)
- [23.迁移无特殊指令 template 标签](./23-迁移无特殊指令-template-标签.md)
- [24.迁移自定义指令钩子名](./24-迁移自定义指令钩子名.md)
- [25.迁移数组 watch 行为差异](./25-迁移数组-watch-行为差异.md)
- [26.迁移 v-if 与 v-for 同节点写法](./26-迁移-v-if-与-v-for-同节点写法.md)
- [27.迁移 Transition 旧类名](./27-迁移-Transition-旧类名.md)
- [28.迁移 render function API](./28-迁移-render-function-API.md)
- [29.移除 functional: true](./29-移除-functional-true.md)

## 运行时兼容实施任务

- [30.移除 Vue.set](./30-移除-Vue.set.md)
- [31.移除 Vue.delete](./31-移除-Vue.delete.md)
- [32.移除 $on 用法](./32-移除-on-用法.md)
- [33.移除 $off 用法](./33-移除-off-用法.md)
- [34.移除 $once 用法](./34-移除-once-用法.md)
- [35.替换 new Vue 事件总线](./35-替换-new-Vue-事件总线.md)
- [36.移除 $destroy 用法](./36-移除-destroy-用法.md)
- [37.移除 $children 依赖](./37-移除-children-依赖.md)

## 生态依赖实施任务

- [38.升级 vue-router 到 4.x](./38-升级-vue-router-到-4.x.md)
- [39.迁移 Router 创建方式](./39-迁移-Router-创建方式.md)
- [40.迁移 Router history 配置](./40-迁移-Router-history-配置.md)
- [41.迁移 Router catch-all 路由](./41-迁移-Router-catch-all-路由.md)
- [42.迁移 router.onReady](./42-迁移-router.onReady.md)
- [43.迁移 router-view 组合写法](./43-迁移-router-view-组合写法.md)
- [44.升级 vuex 到 4.x](./44-升级-vuex-到-4.x.md)
- [45.迁移 Vuex 安装方式](./45-迁移-Vuex-安装方式.md)

## 补充兼容实施任务

- [46.迁移全局 API Tree-Shaking](./46-迁移全局-API-Tree-Shaking.md)
- [47.迁移异步组件定义](./47-迁移异步组件定义.md)
- [48.迁移自定义元素与 is 属性](./48-迁移自定义元素与-is-属性.md)
- [49.迁移 key 与 v-bind 顺序](./49-迁移-key-与-v-bind-顺序.md)
- [50.迁移 Options API 兼容差异](./50-迁移-Options-API-兼容差异.md)
- [52.迁移渲染边界兼容差异](./52-迁移渲染边界兼容差异.md)

## 构建实施任务

- [51.修正 vue-cli 构建配置以支持 Vue3](./51-修正-vue-cli-构建配置以支持-vue3.md)
- [53.执行开发服务器启动修复](./53-执行开发服务器启动修复.md)
- [54.执行生产构建修复](./54-执行生产构建修复.md)

## 完成标准

- [55.确认 dev server 可启动](./55-确认-dev-server-可启动.md)
- [56.确认生产构建可通过](./56-确认生产构建可通过.md)
- [57.确认首屏可渲染](./57-确认首屏可渲染.md)
- [58.确认主路由可跳转](./58-确认主路由可跳转.md)
```

- [ ] **Step 3: Verify removed gates**

Run:

```bash
rg -n '盘点门禁|业务门禁' tasks/README.md
```

Expected: exit code `1`, no matches.

- [ ] **Step 4: Verify task links exist**

Run:

```bash
awk 'match($0, /\]\(\.\/[^)]+\.md\)/) {link=substr($0, RSTART+4, RLENGTH-5); path="tasks/" link; gsub(/^\.\//, "", path); if (system("[ -f \"" path "\" ]") != 0) {print "missing " path; bad=1}} END{exit bad}' tasks/README.md
```

Expected: exit code `0`, no output.

- [ ] **Step 5: Commit**

Run:

```bash
git diff --check
git add tasks/README.md
git commit -m "docs: update migration task index"
```

Expected: commit succeeds.

### Task 5: Fix Root README Implementation Docs Link

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace implementation docs section**

Replace:

```markdown
## Implementation docs

The actionable migration implementation guide is in `docs/README.md`.

It is organized as numbered steps under `docs/01-升级核心依赖与构建链路.md` through `docs/37-统一运行与回归验收.md`.
```

with:

```markdown
## Implementation docs

The actionable migration implementation guide is in `tasks/README.md`.

It is organized as numbered runbooks under `tasks/01-升级-vue-到-3.x.md` through `tasks/58-确认主路由可跳转.md`.
```

- [ ] **Step 2: Verify stale docs links are gone**

Run:

```bash
rg -n 'docs/README|docs/[0-9][0-9]-' README.md tasks docs
```

Expected: exit code `1`, no matches.

- [ ] **Step 3: Commit**

Run:

```bash
git diff --check
git add README.md
git commit -m "docs: point implementation guide to tasks"
```

Expected: commit succeeds.

### Task 6: Final Structural Verification

**Files:**
- Verify only; no planned file edits.

- [ ] **Step 1: Verify numbered task count**

Run:

```bash
find tasks -maxdepth 1 -type f -name '[0-9][0-9]-*.md' | sort | wc -l
```

Expected: `58`.

- [ ] **Step 2: Verify numbering continuity**

Run:

```bash
find tasks -maxdepth 1 -type f -name '[0-9][0-9]-*.md' | sed 's|.*/||;s|-.*||' | sort | awk 'BEGIN{prev=0; ok=1} {n=$1+0; if(n!=prev+1){print "gap before " n " after " prev; ok=0} prev=n} END{print "last " prev; exit ok?0:1}'
```

Expected:

```text
last 58
```

- [ ] **Step 3: Verify all runbook sections exist**

Run:

```bash
awk 'BEGIN{split("目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告", req, "|")} FNR==1{if(file){for(i=1;i<=12;i++) if(!seen[req[i]]) {print file ": missing " req[i]; bad=1}; delete seen} file=FILENAME} /^## /{sub(/^## /, ""); seen[$0]=1} END{for(i=1;i<=12;i++) if(!seen[req[i]]) {print file ": missing " req[i]; bad=1}; exit bad}' tasks/[0-9][0-9]-*.md
```

Expected: exit code `0`, no output.

- [ ] **Step 4: Verify filename number matches heading number**

Run:

```bash
for f in tasks/[0-9][0-9]-*.md; do n=${f#tasks/}; n=${n%%-*}; h=$(sed -n '1s/^# \([0-9][0-9]\)\..*/\1/p' "$f"); if [ "$n" != "$h" ]; then echo "$f filename=$n heading=$h"; bad=1; fi; done; exit ${bad:-0}
```

Expected: exit code `0`, no output.

- [ ] **Step 5: Verify README task links exist**

Run:

```bash
awk 'match($0, /\]\(\.\/[^)]+\.md\)/) {link=substr($0, RSTART+4, RLENGTH-5); path="tasks/" link; gsub(/^\.\//, "", path); if (system("[ -f \"" path "\" ]") != 0) {print "missing " path; bad=1}} END{exit bad}' tasks/README.md
```

Expected: exit code `0`, no output.

- [ ] **Step 6: Verify removed gates and stale links**

Run:

```bash
rg -n '盘点门禁|业务门禁' tasks/README.md
rg -n 'docs/README|docs/[0-9][0-9]-' README.md tasks docs
```

Expected: both commands exit `1`, no matches.

- [ ] **Step 7: Verify diff format and scope**

Run:

```bash
git diff --check
git diff --stat
git status --short
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows Markdown-only task/index/README changes or no unstaged changes if previous tasks were committed; `git status --short` shows a clean worktree after all commits.

- [ ] **Step 8: Final commit if verification required small fixes**

Only if verification required edits, run:

```bash
git add README.md tasks
git commit -m "docs: verify migration task runbook structure"
```

Expected: commit succeeds. If no edits were needed, skip this step and report that no final verification commit was necessary.

## Self-Review

Spec coverage:

- Two missing Vue3 migration blockers are covered by Task 2 and Task 3.
- Renumbering and filename/title consistency are covered by Task 1 and Task 6.
- `tasks/README.md` gate and link corrections are covered by Task 4.
- Root `README.md` stale docs link correction is covered by Task 5.
- Structural verification is covered by Task 6.

Placeholder scan:

- No marker strings or open-ended implementation gaps are used.
- Every planned edit has exact file paths and exact replacement content or commands.

Scope check:

- The plan does not add inventory tasks.
- The plan does not add new business regression tasks.
- The plan does not run Vue project build commands for this documentation change.
