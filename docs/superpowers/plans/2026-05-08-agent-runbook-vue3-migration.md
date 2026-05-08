# Agent Runbook Vue3 Migration Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `tasks/` 从简短迁移清单改造成“不使用 `@vue/compat`、最小改动、面向弱 code agent 执行”的 Vue2 到 Vue3 迁移 runbook 样例体系。

**Architecture:** 保留现有编号任务和链接结构，在 `tasks/README.md` 增加全局执行契约和阶段门禁，新增一个统一任务模板，再重写 `16`、`19`、`34` 三个高风险任务作为样例。所有改动都是 Markdown 文档改动，不改变 Vue 迁移指南源码。

**Tech Stack:** Markdown, `rg`, `git`, shell commands.

---

## File Structure

- Modify: `tasks/README.md`
  - Responsibility: 总入口，说明 no-compat 迁移策略、最小改动原则、弱 agent 执行规则、阶段门禁和样例任务入口。
- Create: `tasks/RUNBOOK_TEMPLATE.md`
  - Responsibility: 所有任务改写时复用的标准结构，定义必须出现的章节和完成报告格式。
- Modify: `tasks/16-迁移组件-v-model-协议.md`
  - Responsibility: 高风险样例一，约束自定义组件 `v-model` 迁移，避免机械替换 `value` / `input`。
- Modify: `tasks/19-迁移-listeners-用法.md`
  - Responsibility: 高风险样例二，约束 `$listeners` 到 `$attrs` 的迁移，避免错误透传 attrs 和事件。
- Modify: `tasks/34-替换-new-Vue-事件总线.md`
  - Responsibility: 高风险样例三，约束 `new Vue()` 事件总线替换，强调保留事件名、payload 和取消订阅。

## Global Implementation Rules

- 最小改动是硬规则：能不改就不改，不能证明是 Vue3 迁移阻塞就不改。
- 不做顺手优化：不改命名、格式、目录、架构、业务逻辑。
- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不把构建通过当成业务完成。
- 每个任务单独提交，方便回滚和人工 review。
- 文档改动后只运行结构化验证命令，不运行项目构建。

### Task 1: Create Runbook Template

**Files:**
- Create: `tasks/RUNBOOK_TEMPLATE.md`

- [ ] **Step 1: Create the template file**

Create `tasks/RUNBOOK_TEMPLATE.md` with exactly this content:

```markdown
# 任务编号.任务名称

## 目标

- 明确当前任务要消除的 Vue2 行为或 Vue3 阻塞。
- 只处理本任务范围内的问题。
- 默认保持现有业务行为和组件外部 API。

## 最小改动原则

- 能不改就不改。
- 不能证明某处代码会阻塞 Vue3 迁移时，不修改，只记录。
- 不做命名、格式、目录、架构、业务逻辑优化。
- 不因为代码看起来旧、乱、重复就顺手重构。

## 允许修改范围

- 只修改本任务搜索命令命中的业务源码。
- 只修改与本任务目标直接相关的最小代码片段。
- 如果需要修改公共组件 API，必须先记录调用方影响，并停止等待人工确认。

## 禁止修改范围

- 不引入 `@vue/compat`。
- 不 patch `node_modules`。
- 不顺手升级无关依赖。
- 不迁移到 Vite、Pinia 或 Composition API。
- 不修改无关格式。

## 搜索命令

```bash
rg -n "在具体任务中替换为明确模式" .
```

## 命中分类

- 必改：命中内容直接使用了本任务要移除的 Vue2 API 或语法。
- 可不改：命中内容在 Vue3 下仍可工作，或只是变量名、字符串、注释、文档。
- 阻塞：命中内容属于第三方库、私有插件、公共 API 或业务语义不清，不能安全判断。

## 修改规则

- 对“必改”命中做最小兼容性修改。
- 对“可不改”命中保持原样，并在完成报告中说明。
- 对“阻塞”命中停止修改，记录文件、行号、原因和建议人工决策点。

## 第三方依赖处理

- 如果命中来自 `node_modules`、vendor 包、UI 组件库包装层或私有插件，先记录为阻塞。
- 不通过 webpack alias、降级依赖、复制源码等方式绕过问题。
- 只在任务明确允许时修改项目内自研适配层。

## 验证命令

```bash
rg -n "在具体任务中替换为剩余风险模式" .
git diff --check
git diff --stat
```

## 人工验收点

- 打开受影响页面。
- 验证原交互仍按原业务语义工作。
- 检查浏览器控制台没有由本任务引入的新错误。

## 停止条件

- 需要改变组件外部 API。
- 需要同时修改大量调用方才能保持行为。
- 命中第三方库或私有插件且兼容策略不明确。
- 无法判断某处代码是业务字段、普通事件还是 Vue2 迁移目标。
- 修改后出现与本任务无关的大面积 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 修改文件列表。
- 每个文件的修改原因。
- 剩余命中数量和保留原因。
- 运行过的验证命令及结果。
- 阻塞项和需要人工验收的页面或交互。
```

- [ ] **Step 2: Verify the template has required sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/RUNBOOK_TEMPLATE.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Check markdown diff**

Run:

```bash
git diff --check
git diff --stat
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows only `tasks/RUNBOOK_TEMPLATE.md`.

- [ ] **Step 4: Commit**

Run:

```bash
git add tasks/RUNBOOK_TEMPLATE.md
git commit -m "docs: add migration task runbook template"
```

Expected: commit succeeds.

### Task 2: Update Task Index With Execution Contract

**Files:**
- Modify: `tasks/README.md`

- [ ] **Step 1: Replace the opening goal paragraph**

Replace the paragraph after `# Vue2 到 Vue3 迁移任务索引` with this content:

```markdown
目标：基于 `vue-cli` 直接迁移到 Vue 3，不使用 `@vue/compat`。这套任务面向大型遗留项目和弱 code agent 执行，核心原则是最小改动：能不改就不改，不能证明是 Vue3 迁移阻塞就不改。

完成以下任务后，项目应至少能够成功 `build`，能启动开发服务器进入主流程，并完成约定核心业务流的人工回归。构建成功不是迁移完成。
```

- [ ] **Step 2: Insert global execution rules before `## 核心实施任务`**

Insert this section before `## 核心实施任务`:

```markdown
## Agent 执行契约

- 每次只执行一个任务，不合并无关迁移点。
- 默认不改代码；只有命中明确 Vue3 阻塞时才做最小修改。
- 不做顺手优化，包括命名、格式、目录、架构、业务逻辑和依赖升级。
- 不引入 `@vue/compat`，不 patch `node_modules`，不通过宽泛 alias 掩盖第三方依赖冲突。
- 修改公共组件 API、事件名、payload、路由行为、store 结构前必须停止并报告。
- 大范围替换前必须先输出命中列表，不能直接机械替换。
- 每个任务完成后必须报告修改文件、剩余命中、验证命令、阻塞项和人工验收点。

标准任务模板见 [RUNBOOK_TEMPLATE.md](./RUNBOOK_TEMPLATE.md)。

## 阶段门禁

1. 盘点门禁：列出依赖图、Vue 插件、UI 库、构建自定义项和核心业务流。
2. 构建链门禁：Vue 3 compiler 和 loader 链能解析代表性 SFC。
3. 入口门禁：入口、插件、router、store、全局属性、组件、指令都通过 Vue 3 app 实例安装。
4. 语法门禁：已知 Vue2 模板和组件语法已迁移或明确标记为无需修改。
5. 运行时门禁：已删除实例 API 和事件总线模式已替换。
6. 生态门禁：router、Vuex、UI 库、自研插件与 Vue3 兼容。
7. 开发门禁：dev server 可启动，浏览器加载后没有启动白屏。
8. 生产门禁：生产构建完成，静态资源按预期 publicPath 加载。
9. 业务门禁：登录、权限、动态路由、表单、表格、弹窗、上传下载、缓存页面等核心流完成回归。
```

- [ ] **Step 3: Verify links and required phrases**

Run:

```bash
rg -n "最小改动|不使用 `@vue/compat`|Agent 执行契约|阶段门禁|RUNBOOK_TEMPLATE" tasks/README.md
```

Expected: exit code `0`, with matches for all five phrases.

- [ ] **Step 4: Check markdown diff**

Run:

```bash
git diff --check
git diff --stat
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows only `tasks/README.md`.

- [ ] **Step 5: Commit**

Run:

```bash
git add tasks/README.md
git commit -m "docs: add migration task execution contract"
```

Expected: commit succeeds.

### Task 3: Rewrite Task 16 as a Runbook

**Files:**
- Modify: `tasks/16-迁移组件-v-model-协议.md`

- [ ] **Step 1: Replace the entire file**

Replace `tasks/16-迁移组件-v-model-协议.md` with exactly this content:

```markdown
# 16.迁移组件 v-model 协议

## 目标

- 修复自定义组件在 Vue3 下的双向绑定协议。
- 默认 `v-model` 从 Vue2 的 `value` / `input` 迁移到 Vue3 的 `modelValue` / `update:modelValue`。
- 保留原业务语义、校验触发、清空、重置和异步回填行为。

## 最小改动原则

- 能不改就不改。
- 不机械替换所有 `value`、`input`、`@input`。
- 原生表单、业务字段名、普通 DOM input 事件、非 Vue 组件事件保持原样。
- 只有能确认是自定义组件双向绑定协议时才修改。

## 允许修改范围

- 使用 `model:` 选项的自定义组件。
- 声明 `value` prop 且通过 `$emit('input', ...)` 对外同步的自定义组件。
- 父组件中绑定到自定义组件的 `v-model`。
- 与同一个受控值直接相关的最小父子组件调用链。

## 禁止修改范围

- 不修改原生 `<input>`、`<textarea>`、`<select>` 的 `v-model`。
- 不把业务字段 `value` 改名为 `modelValue`。
- 不重构表单组件架构。
- 不顺手补 Composition API、TypeScript 类型或格式化。
- 不修改第三方组件库源码。

## 搜索命令

```bash
rg -n "model\\s*:|props\\s*:.*value|value\\s*:[^,}]+|\\$emit\\(['\\\"]input['\\\"]|@input=|v-model" src .
```

如果项目源码不在 `src`，先运行：

```bash
rg -n "model\\s*:|\\$emit\\(['\\\"]input['\\\"]|v-model" .
```

## 命中分类

- 必改：自定义组件声明 `value` prop，并通过 `$emit('input', nextValue)` 与父组件 `v-model` 配套。
- 必改：组件使用 Vue2 `model: { prop, event }` 选项定义双向绑定协议。
- 可不改：原生表单元素上的 `v-model`。
- 可不改：普通业务字段名 `value`，例如表格列、选项值、接口字段。
- 可不改：普通 DOM `input` 事件处理，例如输入框内部 `@input="handleInput"`。
- 阻塞：无法判断某个 `input` 是业务事件、DOM 事件还是组件对外协议。
- 阻塞：命中第三方 UI 组件或私有公共组件，且调用方数量很大。

## 修改规则

- Vue2 默认协议：
  - 子组件 `props: { value: ... }` 改为 `props: { modelValue: ... }`。
  - 子组件 `$emit('input', nextValue)` 改为 `$emit('update:modelValue', nextValue)`。
  - 子组件内部读取受控值从 `this.value` 改为 `this.modelValue`。
  - 同一组件内其他业务字段名 `value` 不改。
- Vue2 `model` 选项：
  - 如果原协议是 `model: { prop: 'checked', event: 'change' }`，优先把父组件改为 `v-model:checked`。
  - 子组件对外同步事件改为 `$emit('update:checked', nextValue)`。
  - 删除 `model` 选项。
- 父组件：
  - 对已迁移子组件保留 `v-model` 或改为带参数 `v-model:xxx`。
  - 不把所有 `@input` 改为 `@update:modelValue`，只修改与已迁移子组件配套的调用点。

## 第三方依赖处理

- 第三方组件库的 Vue2 `value` / `input` 协议不在本任务内修改。
- 如果第三方库没有 Vue3 版本或兼容层，记录库名、组件名、调用位置和阻塞原因。
- 项目内自研 UI 包装层可以修改，但必须保留对业务调用方的外部语义。

## 验证命令

```bash
rg -n "model\\s*:|\\$emit\\(['\\\"]input['\\\"]|props\\s*:.*value|@input=|v-model" src .
git diff --check
git diff --stat
```

如果项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 表单输入、清空、重置、异步回填。
- 校验触发时机。
- 弹窗表单打开、编辑、关闭后再次打开。
- 包装组件透传 `disabled`、`readonly`、`placeholder`、`class`、`style`。

## 停止条件

- 需要改变组件对业务方暴露的 prop 名或事件名。
- 一个公共组件有大量调用方，无法在本任务中确认全部调用语义。
- 命中同时涉及 `.sync`、`$listeners`、`inheritAttrs` 或复杂表单校验。
- 无法判断 `value` 是业务字段还是受控值。
- 修改会导致大面积格式化 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 已迁移的组件文件。
- 已修改的父组件调用点。
- 保留的 `value` / `input` 命中及原因。
- 阻塞组件和需要人工确认的问题。
- 运行过的验证命令及结果。
```

- [ ] **Step 2: Verify required sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/16-迁移组件-v-model-协议.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Check task-specific safety phrases**

Run:

```bash
rg -n "不机械替换|原生表单|业务字段名|第三方组件库|停止条件" tasks/16-迁移组件-v-model-协议.md
```

Expected: exit code `0`, with matches for all five phrases.

- [ ] **Step 4: Check markdown diff**

Run:

```bash
git diff --check
git diff --stat
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows only `tasks/16-迁移组件-v-model-协议.md`.

- [ ] **Step 5: Commit**

Run:

```bash
git add tasks/16-迁移组件-v-model-协议.md
git commit -m "docs: expand v-model migration task runbook"
```

Expected: commit succeeds.

### Task 4: Rewrite Task 19 as a Runbook

**Files:**
- Modify: `tasks/19-迁移-listeners-用法.md`

- [ ] **Step 1: Replace the entire file**

Replace `tasks/19-迁移-listeners-用法.md` with exactly this content:

```markdown
# 19.迁移 $listeners 用法

## 目标

- 迁移 Vue2 `$listeners` 相关透传逻辑。
- 在 Vue3 中监听器并入 `$attrs`，需要明确 attrs 和事件落点。
- 保持父组件监听事件的触发次数、payload 和触发时机不变。

## 最小改动原则

- 能不改就不改。
- 不把 `$attrs` 无脑整包透传到错误 DOM 节点。
- 不因为发现 `inheritAttrs` 就重构组件结构。
- 只迁移明确依赖 `$listeners` 的包装组件或 render 函数。

## 允许修改范围

- 使用 `$listeners` 的组件模板、render 函数和 JS 逻辑。
- 使用 `v-on="$listeners"` 的包装组件。
- 与同一包装组件事件透传直接相关的 `emits` 声明。
- 为了避免重复触发而必须调整的最小 `$attrs` 绑定点。

## 禁止修改范围

- 不重写组件插槽结构。
- 不修改业务事件名和 payload。
- 不把所有 `$attrs` 都透传到根节点。
- 不为内部 DOM 事件错误添加 `emits`。
- 不顺手迁移无关 `v-bind="$attrs"` 代码。

## 搜索命令

```bash
rg -n "\\$listeners|v-on=\\\"\\$listeners\\\"|v-on='\\$listeners'|inheritAttrs|\\$attrs|emits\\s*:" src .
```

如果项目源码不在 `src`，先运行：

```bash
rg -n "\\$listeners|v-on=\\\"\\$listeners\\\"|v-on='\\$listeners'" .
```

## 命中分类

- 必改：模板中存在 `v-on="$listeners"`。
- 必改：JS 或 render 函数读取 `this.$listeners` 或 `context.listeners`。
- 必改：包装组件依赖 `$listeners` 手动转发父组件事件。
- 可不改：已有 Vue3 写法 `$attrs`，且事件落点明确。
- 可不改：字符串、注释、文档中的 `$listeners`。
- 阻塞：多根组件无法判断 attrs 应落在哪个元素。
- 阻塞：组件既转发事件又消费事件，无法判断哪些事件属于对外 API。

## 修改规则

- 简单单根包装组件：
  - `v-on="$listeners"` 改为 `v-bind="$attrs"`，前提是 attrs、class、style 和事件都应该落在同一个元素或子组件上。
- 需要控制事件的包装组件：
  - 为组件对外 `$emit` 的事件补充 `emits`。
  - 对需要继续转发的事件显式绑定，例如 `@click="$attrs.onClick"` 只在确认项目使用渲染函数事件名时使用。
  - 模板中优先使用明确事件转发，例如 `@click="$emit('click', $event)"`。
- 多根组件：
  - 不自动透传 `$attrs`。
  - 先选择明确落点；无法确认时停止并报告。
- render 函数：
  - 将 `listeners` 合并到 Vue3 props 事件字段时，只处理当前组件明确转发的事件。

## 第三方依赖处理

- 第三方组件库内部 `$listeners` 不修改。
- 项目内二次封装组件可以修改，但必须说明 attrs 和事件最终落点。
- 如果 UI 库 Vue3 版本改变了事件名，记录为生态依赖阻塞，不在本任务中猜测替换。

## 验证命令

```bash
rg -n "\\$listeners|context\\.listeners|v-on=\\\"\\$listeners\\\"|v-on='\\$listeners'" src .
git diff --check
git diff --stat
```

如果项目有明确脚本，再运行项目实际脚本，例如：

```bash
npm run lint
npm run test
npm run build
```

## 人工验收点

- 包装按钮、表单项、弹窗、上传组件的点击、输入、关闭、确认事件。
- 父组件监听事件是否仍触发一次且只触发一次。
- `class`、`style`、`disabled`、`placeholder` 等 attrs 是否落在原预期元素。
- 多根组件是否出现 Vue attrs 警告。

## 停止条件

- 无法判断 `$attrs` 应落到哪个元素或子组件。
- 修改会改变父组件监听的事件名、payload 或触发次数。
- 组件同时涉及 `v-model`、`.sync`、`emits` 大量缺失。
- 需要统一重构包装组件体系。
- 修改会导致大面积格式化 diff。

## 完成报告

执行 agent 必须在最终回复中包含：

- 已迁移的 `$listeners` 文件。
- 每个组件 attrs 和事件的最终落点。
- 保留的 `$attrs` / `inheritAttrs` 命中及原因。
- 阻塞组件和需要人工确认的问题。
- 运行过的验证命令及结果。
```

- [ ] **Step 2: Verify required sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/19-迁移-listeners-用法.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Check task-specific safety phrases**

Run:

```bash
rg -n "无脑整包透传|多根组件|触发一次|payload|attrs 和事件" tasks/19-迁移-listeners-用法.md
```

Expected: exit code `0`, with matches for all five phrases.

- [ ] **Step 4: Check markdown diff**

Run:

```bash
git diff --check
git diff --stat
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows only `tasks/19-迁移-listeners-用法.md`.

- [ ] **Step 5: Commit**

Run:

```bash
git add tasks/19-迁移-listeners-用法.md
git commit -m "docs: expand listeners migration task runbook"
```

Expected: commit succeeds.

### Task 5: Rewrite Task 34 as a Runbook

**Files:**
- Modify: `tasks/34-替换-new-Vue-事件总线.md`

- [ ] **Step 1: Replace the entire file**

Replace `tasks/34-替换-new-Vue-事件总线.md` with exactly this content:

```markdown
# 34.替换 new Vue 事件总线

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

```bash
rg -n "new Vue\\(|eventBus|EventBus|bus\\.\\$on|bus\\.\\$off|bus\\.\\$once|bus\\.\\$emit|\\.\\$on\\(|\\.\\$off\\(|\\.\\$once\\(|\\.\\$emit\\(" src .
```

如果项目源码不在 `src`，先运行：

```bash
rg -n "new Vue\\(|\\.\\$on\\(|\\.\\$off\\(|\\.\\$once\\(|\\.\\$emit\\(" .
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

```bash
rg -n "new Vue\\(|\\.\\$on\\(|\\.\\$off\\(|\\.\\$once\\(" src .
git diff --check
git diff --stat
```

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
```

- [ ] **Step 2: Verify required sections**

Run:

```bash
rg -n "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" tasks/34-替换-new-Vue-事件总线.md
```

Expected: exit code `0`, with 12 matching section lines.

- [ ] **Step 3: Check task-specific safety phrases**

Run:

```bash
rg -n "不改事件名|payload|匿名 handler|重复响应|适配层" tasks/34-替换-new-Vue-事件总线.md
```

Expected: exit code `0`, with matches for all five phrases.

- [ ] **Step 4: Check markdown diff**

Run:

```bash
git diff --check
git diff --stat
```

Expected: `git diff --check` exits `0`; `git diff --stat` shows only `tasks/34-替换-new-Vue-事件总线.md`.

- [ ] **Step 5: Commit**

Run:

```bash
git add tasks/34-替换-new-Vue-事件总线.md
git commit -m "docs: expand event bus migration task runbook"
```

Expected: commit succeeds.

### Task 6: Run Structural Verification

**Files:**
- Verify: `tasks/README.md`
- Verify: `tasks/RUNBOOK_TEMPLATE.md`
- Verify: `tasks/16-迁移组件-v-model-协议.md`
- Verify: `tasks/19-迁移-listeners-用法.md`
- Verify: `tasks/34-替换-new-Vue-事件总线.md`

- [ ] **Step 1: Verify the task index links still resolve as text**

Run:

```bash
rg -n "RUNBOOK_TEMPLATE|16-迁移组件-v-model-协议|19-迁移-listeners-用法|34-替换-new-Vue-事件总线" tasks/README.md
```

Expected: exit code `0`, with matches for the template and all three sample task links.

- [ ] **Step 2: Verify every sample task has required sections**

Run:

```bash
for f in tasks/RUNBOOK_TEMPLATE.md tasks/16-迁移组件-v-model-协议.md tasks/19-迁移-listeners-用法.md tasks/34-替换-new-Vue-事件总线.md; do echo "$f"; rg -c "^## (目标|最小改动原则|允许修改范围|禁止修改范围|搜索命令|命中分类|修改规则|第三方依赖处理|验证命令|人工验收点|停止条件|完成报告)$" "$f"; done
```

Expected: each file prints count `12`.

- [ ] **Step 3: Verify no forbidden placeholder markers exist**

Run:

```bash
rg -n "TB""D|TO""DO|PLACE""HOLDER|待""定|以后""再补|稍后""补" tasks/README.md tasks/RUNBOOK_TEMPLATE.md tasks/16-迁移组件-v-model-协议.md tasks/19-迁移-listeners-用法.md tasks/34-替换-new-Vue-事件总线.md
```

Expected: exit code `1`, with no matches.

- [ ] **Step 4: Verify no-compat and minimal-change rules are present**

Run:

```bash
rg -n "@vue/compat|最小改动|能不改就不改|不做顺手优化|不 patch `node_modules`" tasks/README.md tasks/RUNBOOK_TEMPLATE.md tasks/16-迁移组件-v-model-协议.md tasks/19-迁移-listeners-用法.md tasks/34-替换-new-Vue-事件总线.md
```

Expected: exit code `0`, with matches in `tasks/README.md`, `tasks/RUNBOOK_TEMPLATE.md`, and each sample task.

- [ ] **Step 5: Verify diff cleanliness**

Run:

```bash
git diff --check
git status --short
```

Expected: `git diff --check` exits `0`; `git status --short` is empty after all prior task commits.

## Self-Review Checklist

- Spec coverage: this plan implements the two-layer structure through `tasks/README.md` and `tasks/RUNBOOK_TEMPLATE.md`.
- Spec coverage: this plan rewrites the three initial high-risk targets: task `16`, task `19`, and task `34`.
- Spec coverage: this plan preserves the no-compat strategy and makes minimal change a hard rule.
- Spec coverage: each rewritten task includes stop conditions and completion reporting requirements.
- Scope control: this plan changes Markdown documentation only and does not edit app source.
- Verification: structural `rg`, `git diff --check`, `git diff --stat`, and `git status --short` commands are specified.
