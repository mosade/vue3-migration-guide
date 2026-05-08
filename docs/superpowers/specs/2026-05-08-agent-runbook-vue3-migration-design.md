# Agent Runbook Design for Vue 2 to Vue 3 Migration

## Context

The current `tasks/` directory is a Vue 2 to Vue 3 migration checklist. It intentionally targets a direct Vue 3 migration on `vue-cli` and does not use `@vue/compat`.

The checklist covers many core Vue 3 breaking changes, but each task is currently brief. That format assumes the executor can infer search strategy, dependency risk, validation depth, and rollback boundaries. The intended executor is a weaker code agent, so the tasks need to become explicit runbooks rather than reminders.

## Goal

Convert the migration guide into a safer agent-executable system for large legacy Vue 2 projects.

The improved guide should let a weaker code agent make incremental progress without relying on broad architectural judgment. It should also make it easier for a human reviewer to inspect each step, understand residual risk, and decide when to stop for manual intervention.

The guide must optimize for minimal change. The target applications are large legacy codebases with fragile implicit behavior, so the safest default is to leave code untouched unless a change is required to remove a Vue 3 migration blocker.

## Non-Goals

- Do not introduce `@vue/compat`.
- Do not migrate from `vue-cli` to Vite as part of this plan.
- Do not rewrite the app to Composition API or Pinia.
- Do not refactor unrelated business modules while migrating.
- Do not improve style, naming, formatting, architecture, or business logic while migrating.
- Do not treat build success as full migration completion.

## Recommended Approach

Use a two-layer structure.

The top layer is a migration pipeline that explains execution order and phase gates. It should group work into dependency and build preparation, app bootstrap, router and store migration, template migration, runtime API migration, third-party ecosystem handling, build repair, and business validation.

The lower layer is an agent runbook format for each task. Each task should tell the agent exactly what to search, what edits are allowed, what edits are forbidden, how to validate, what evidence to report, and when to stop.

This keeps the existing numbered task set useful while making each task concrete enough for a weaker executor.

## Task Template

Each migration task should use this shape:

- Purpose: what Vue 2 behavior is being removed or changed.
- Scope: files or patterns the task may edit.
- Search commands: exact `rg` commands to find candidates.
- Classification rules: how to distinguish real hits from false positives.
- Allowed edits: specific transformations the agent may perform.
- Forbidden edits: changes that require human review or a separate task.
- No-change rules: cases where the agent should explicitly leave code as-is.
- Third-party dependency handling: what to do when the hit belongs to a library, plugin, or vendor wrapper.
- Validation commands: commands to run after the task.
- Manual validation points: pages or interactions a human should check.
- Stop conditions: cases where the agent must stop and report instead of guessing.
- Completion report: required summary fields, including changed files, remaining matches, commands run, and unresolved risks.

## Execution Rules

Each task should be executed as a small unit. The agent should not combine unrelated migration tasks in one pass.

Minimal change is a hard rule. If existing code still works under Vue 3, or if the task cannot prove that a change is required, the agent should leave it alone and report why it was not changed. The agent should prefer small compatibility-preserving edits over cleanup, normalization, or architectural improvement.

The agent must preserve public component contracts unless the task explicitly changes them. This matters most for `v-model`, `.sync`, `$listeners`, `emits`, slots, event bus replacement, router behavior, and store access.

The agent should fix the first root cause when build or dev server commands fail. It should not chase secondary errors until the first failure has been addressed and rechecked.

Large search-and-replace operations must be avoided unless the task gives a precise mechanical rule and the agent reports the full hit list before changing many files.

Formatting-only diffs should be avoided. When formatting changes are unavoidable because a formatter runs as part of validation, the agent must mention that in the completion report.

Third-party dependency conflicts should be recorded as blockers. The agent should not patch `node_modules`, add broad webpack aliases, or silently downgrade dependencies unless a task explicitly allows it.

## Phase Gates

The migration should use these gates:

1. Inventory gate: dependency graph, Vue plugins, UI libraries, build customizations, and core business flows are listed.
2. Build-chain gate: Vue 3 compiler and loader chain can parse representative SFCs.
3. Bootstrap gate: the app entry, plugins, router, store, globals, and directives are installed through the Vue 3 app instance.
4. Syntax gate: known Vue 2 template and component syntax has been migrated or explicitly marked not applicable.
5. Runtime API gate: removed instance APIs and event bus patterns have been replaced.
6. Ecosystem gate: router, Vuex, UI libraries, and custom plugins are compatible with Vue 3.
7. Dev gate: dev server starts and the browser can load the app without startup white screen.
8. Production gate: production build completes and static assets load from the expected public path.
9. Business gate: agreed core flows pass manual or automated regression checks.

## Initial Rewrite Targets

Before rewriting all tasks, create three high-risk examples using the runbook format:

- `16-迁移组件-v-model-协议.md`
- `19-迁移-listeners-用法.md`
- `34-替换-new-Vue-事件总线.md`

These tasks are good samples because they affect component contracts and runtime behavior. If the template works for them, it should work for simpler tasks like lifecycle renames or `Vue.set` removal.

## Testing And Review

The guide itself is documentation, so verification is primarily structural:

- The task index should still link to every task.
- Each rewritten task should include all required runbook sections.
- The migration pipeline should make the no-compat strategy explicit.
- Each task should contain stop conditions and completion reporting requirements.

For real app execution, the required validation commands should be project-specific. The guide should instruct the executing agent to discover the package manager and scripts before running commands.

## Risks

Direct migration without `@vue/compat` increases the chance that the first dependency upgrade creates many compile and runtime failures at once.

A weaker code agent may still make semantic mistakes in components with unclear ownership or implicit contracts. The runbook reduces this risk by narrowing allowed edits and adding stop conditions, but it cannot remove the need for human review on high-risk diffs.

Build success is not enough for large applications. The final migration process must include business-flow validation, especially around login, permissions, dynamic routes, form validation, tables, modals, uploads, and cached pages.
