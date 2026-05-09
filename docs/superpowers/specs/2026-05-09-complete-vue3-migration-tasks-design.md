# Complete Vue3 Migration Tasks Design

## Context

The repository contains a `tasks/` directory with 56 numbered Vue 2 to Vue 3 migration runbooks plus a shared `RUNBOOK_TEMPLATE.md`. Each numbered task already follows the same 12-section runbook structure:

- `目标`
- `最小改动原则`
- `允许修改范围`
- `禁止修改范围`
- `搜索命令`
- `命中分类`
- `修改规则`
- `第三方依赖处理`
- `验证命令`
- `人工验收点`
- `停止条件`
- `完成报告`

The existing task numbers are continuous from `01` through `56`, and the current files are structurally consistent. The remaining work is not a full rewrite. It is a focused gap-filling and correction pass for the migration runbook set.

The root `README.md` currently points to `docs/README.md` and numbered docs files that are not present in this repository. The actual actionable migration guide is `tasks/README.md`.

## Goal

Expand `tasks/` into a complete Vue 3 migration runbook set by adding missing Vue 3 migration blockers and correcting stale documentation references.

The result should remain practical for weak code agents:

- each task stays narrowly scoped;
- no unrelated refactoring guidance is added;
- existing runbook sections remain consistent;
- task numbering, filenames, titles, and index links all match.

## Non-Goals

- Do not add an inventory or discovery task.
- Do not add new final business regression or acceptance tasks.
- Do not introduce `@vue/compat`.
- Do not migrate from `vue-cli` to Vite.
- Do not migrate Vuex to Pinia.
- Do not rewrite existing task content unless there is a clear error.
- Do not run Vue project build commands as part of this documentation change.

## Recommended Approach

Use an incremental expansion with minimal renumbering.

Add two missing Vue 3 migration tasks at their natural execution points:

- `迁移无特殊指令 template 标签`
- `移除 $destroy 用法`

Then renumber downstream tasks, update task filenames, update file headings, and update `tasks/README.md` links and grouping. Existing runbook body content should stay intact except for required numbering/title/link updates and explicit error fixes.

This approach keeps the runbook complete without turning the current task set into a broad rewrite.

## Numbering Design

The final numbered task set should contain 58 tasks.

Insert `迁移无特殊指令 template 标签` in the template and component phase after `移除 inline-template` and before custom directive hook migration. This is a template semantics change, not a directive registration or runtime API change.

Insert `移除 $destroy 用法` in the runtime compatibility phase after the removed instance events tasks and before `$children`. It is another removed instance API and belongs next to `$on`, `$off`, and `$once`.

After insertion:

- task numbers remain continuous from `01` to `58`;
- every numbered task filename begins with its two-digit number;
- every numbered task heading uses the same number as its filename;
- `tasks/README.md` links point to the renamed files.

## New Task: Plain Template Tags

Title: `迁移无特殊指令 template 标签`

Purpose: handle the Vue 3 change where `<template>` tags without special directives render as native `<template>` elements instead of acting as transparent wrappers.

Search command:

```bash
rg -n '<template(\s[^>]*)?>|</template>' src
```

Classification:

- Required change: a nested `<template>` has no `v-if`, `v-else-if`, `v-else`, `v-for`, `v-slot`, or shorthand slot marker, and it is used as a transparent wrapper.
- No change: SFC top-level templates, slot templates, and templates with supported structural directives.
- Blocker: the correct replacement element cannot be determined without knowing layout, CSS selectors, table/list/select DOM rules, or component contract details.

Edit rules:

- Prefer removing a meaningless wrapper when that preserves DOM structure.
- If a real wrapper is needed, use the smallest semantically safe element.
- Stop for table, list, select, or other constrained HTML structures unless the replacement is obvious.
- Do not change business conditions, slot payloads, or component APIs.

Manual validation should focus on pages where the wrapper affected layout, CSS selectors, table/list rendering, or slot output.

## New Task: Removed `$destroy`

Title: `移除 $destroy 用法`

Purpose: remove direct dependency on the Vue 2 instance `$destroy()` API.

Search command:

```bash
rg -n '\.\$destroy\(|\$destroy\(|destroy\s*\(' src
```

Classification:

- Required change: direct calls to Vue instance `$destroy()`, especially instances created with `Vue.extend`, `new Ctor()`, or manual `$mount()`.
- No change: ordinary business `destroy()` methods, third-party object cleanup methods, comments, and documentation.
- Blocker: the receiver cannot be proven to be a Vue instance, or cleanup is coupled to global events, DOM containers, popup services, micro-frontends, or third-party lifecycle contracts.

Edit rules:

- For dynamic component mounting, migrate to `createApp(Component)`, keep the returned app instance, and call `app.unmount()`.
- Preserve existing DOM removal and event cleanup semantics.
- Do not rewrite popup services, global component services, or manual mounting architecture beyond the minimum required API replacement.
- Stop if changing the cleanup path would affect public behavior or many call sites.

Manual validation should focus on dynamic dialogs, message services, temporary mounted components, repeated open/close flows, and memory-leak-prone global listeners.

## Index And README Corrections

Update `tasks/README.md` so it matches the new task set:

- remove the inventory gate because no inventory task will be added;
- remove the business gate because no new business regression task will be added;
- include the two new tasks in their proper groups;
- update all renumbered task links.

Update the root `README.md` so its implementation docs section points to `tasks/README.md`, not the missing `docs/README.md` and non-existent `docs/01...37...` files.

## Verification

This is a Markdown documentation change. Verification should focus on structure and links, not application build output.

Required checks:

- numbered task file count is 58;
- task numbers are continuous from `01` through `58`;
- every numbered task includes the 12 standard runbook sections;
- each filename number matches the first heading number in the same file;
- every task link in `tasks/README.md` points to an existing file;
- `tasks/README.md` no longer includes the inventory gate or business gate;
- root `README.md` no longer references missing `docs/README.md` or `docs/[0-9][0-9]-...` files;
- `git diff --check` exits successfully;
- `git diff --stat` is reviewed for expected Markdown changes.

Do not run project build commands for this spec. Build and runtime checks belong to the individual migration tasks when executed against a real Vue application.

## Risks

Renumbering can break links or create filename/title mismatches. The implementation plan must include mechanical validation for numbering and link existence.

The plain `<template>` search is broad. The task must clearly distinguish SFC top-level templates and structural directive templates from problematic nested plain templates.

The `$destroy` search intentionally includes `destroy(` and will produce many false positives. The task must emphasize classification before edits so agents do not rewrite unrelated cleanup APIs.
