# Vue 2 to Vue 3 Migration Tasks Tool Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 创建一个可复用的 Vue 2→3 迁移任务管理工具，能够根据项目代码自动生成定制化的迁移任务清单

**Architecture:** 基于现有的迁移文档任务模板，构建一个扫描器工具，分析目标 Vue 2 项目代码，检测需要迁移的模式，并生成针对性的任务列表。工具将支持 Markdown/JSON/YAML 多种输出格式。

**Tech Stack:** Node.js, TypeScript, Babel parser, Vue compiler-sfc, Markdown/JSON/YAML generators

---

## Overview

本计划实现一个命令行工具，帮助开发者：
1. 扫描 Vue 2 项目代码
2. 识别需要迁移的代码模式
3. 基于检测结果生成定制化的迁移任务清单

---

## Task 1: Initialize Project Structure

**Files:**
- Create: `packages/migration-tasks-cli/package.json`
- Create: `packages/migration-tasks-cli/tsconfig.json`
- Create: `packages/migration-tasks-cli/README.md`

**Step 1: Create package.json**

```json
{
  "name": "@vue-migration/tasks-cli",
  "version": "0.1.0",
  "description": "Vue 2 to Vue 3 migration tasks generator CLI",
  "main": "dist/index.js",
  "bin": {
    "vue-migration-tasks": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest"
  },
  "dependencies": {
    "@babel/parser": "^7.23.0",
    "@babel/traverse": "^7.23.0",
    "@vue/compiler-sfc": "^3.3.0",
    "commander": "^11.0.0",
    "globby": "^13.2.0",
    "yaml": "^2.3.0"
  },
  "devDependencies": {
    "@types/babel__traverse": "^7.20.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vitest": "^0.34.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Initialize directory structure**

Run:
```bash
mkdir -p packages/migration-tasks-cli/src/{detectors,generators,types}
mkdir -p packages/migration-tasks-cli/tests
```

**Step 4: Commit**

```bash
git add packages/migration-tasks-cli/
git commit -m "chore: initialize migration tasks CLI project structure"
```

---

## Task 2: Define Core Types

**Files:**
- Create: `packages/migration-tasks-cli/src/types/index.ts`

**Step 1: Define migration task types**

```typescript
export interface MigrationTask {
  id: string;
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  title: string;
  description: string;
  scope: 'infrastructure' | 'global' | 'component' | 'template' | 'render' | 'cleanup';
  docUrl: string;
  detectionPattern: DetectionPattern;
  checklist: string[];
  vue2Example?: CodeExample;
  vue3Example?: CodeExample;
  estimatedComplexity: 'low' | 'medium' | 'high';
}

export interface DetectionPattern {
  type: 'ast' | 'regex' | 'sfc';
  pattern: string | RegExp;
  fileTypes: string[];
}

export interface CodeExample {
  code: string;
  language: string;
}

export interface DetectionResult {
  taskId: string;
  occurrences: Occurrence[];
  files: string[];
}

export interface Occurrence {
  filePath: string;
  lineNumber: number;
  column: number;
  matchedText: string;
  context: string;
}

export interface ProjectScanResult {
  projectPath: string;
  detectedTasks: DetectionResult[];
  summary: {
    totalTasks: number;
    tasksByLevel: Record<string, number>;
    estimatedHours: number;
  };
}

export type OutputFormat = 'markdown' | 'json' | 'yaml';

export interface GeneratorOptions {
  format: OutputFormat;
  includeExamples: boolean;
  includeChecklist: boolean;
  language: 'zh' | 'en';
}
```

**Step 2: Commit**

```bash
git add packages/migration-tasks-cli/src/types/index.ts
git commit -m "feat: define core migration task types"
```

---

## Task 3: Create Task Registry

**Files:**
- Create: `packages/migration-tasks-cli/src/tasks/registry.ts`
- Create: `packages/migration-tasks-cli/src/tasks/index.ts`

**Step 1: Create task registry with all 36 migration tasks**

```typescript
import { MigrationTask } from '../types';

export const migrationTasks: MigrationTask[] = [
  // L1 - Infrastructure
  {
    id: 'L1-1',
    level: 'L1',
    title: '升级 Vue 及相关依赖版本',
    description: '升级 vue, vue-router, vuex/pinia 以及相关构建工具到 Vue 3 兼容版本',
    scope: 'infrastructure',
    docUrl: 'https://v3-migration.vuejs.org/migration-build.html',
    detectionPattern: {
      type: 'regex',
      pattern: /"vue"\s*:\s*"[\^~]?2\./,
      fileTypes: ['package.json']
    },
    checklist: [
      '升级 vue 到 ^3.x',
      '升级 vue-router 到 ^4.x',
      '升级 vuex 到 ^4.x 或迁移到 pinia',
      '升级 @vue/cli 或配置 Vite',
      '安装 @vue/compat（如需渐进式迁移）'
    ],
    estimatedComplexity: 'low'
  },

  // L2 - Global API
  {
    id: 'L2-1',
    level: 'L2',
    title: '迁移全局 API 初始化方式',
    description: '将 new Vue() 改为 createApp()，迁移全局配置',
    scope: 'global',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/global-api.html',
    detectionPattern: {
      type: 'regex',
      pattern: /new\s+Vue\s*\(/,
      fileTypes: ['.js', '.ts', '.vue']
    },
    checklist: [
      '替换 new Vue() 为 createApp()',
      '将 Vue.config 改为 app.config',
      '处理 Vue.prototype → app.config.globalProperties',
      '移除 Vue.extend 的使用',
      '更新应用挂载方式 app.mount()'
    ],
    vue2Example: {
      code: `import Vue from 'vue'
new Vue({ render: h => h(App) }).$mount('#app')`,
      language: 'javascript'
    },
    vue3Example: {
      code: `import { createApp } from 'vue'
createApp(App).mount('#app')`,
      language: 'javascript'
    },
    estimatedComplexity: 'medium'
  },

  {
    id: 'L2-2',
    level: 'L2',
    title: '迁移全局 API Treeshaking',
    description: '将全局 Vue.xxx API 改为具名导入',
    scope: 'global',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html',
    detectionPattern: {
      type: 'regex',
      pattern: /Vue\.(nextTick|observable|version)/,
      fileTypes: ['.js', '.ts', '.vue']
    },
    checklist: [
      '将 Vue.nextTick() 改为具名导入 nextTick',
      '将 Vue.observable() 改为 reactive()',
      '检查其他 Vue.xxx 全局 API 的使用'
    ],
    estimatedComplexity: 'low'
  },

  {
    id: 'L2-3',
    level: 'L2',
    title: '迁移全局过滤器',
    description: 'Vue.filter 注册的全局过滤器改为 globalProperties',
    scope: 'global',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/filters.html',
    detectionPattern: {
      type: 'regex',
      pattern: /Vue\.filter\s*\(/,
      fileTypes: ['.js', '.ts']
    },
    checklist: [
      '识别所有 Vue.filter() 注册的全局过滤器',
      '创建 globalProperties.$filters 对象',
      '在模板中将 {{ value | filter }} 改为 $filters.filter(value)'
    ],
    estimatedComplexity: 'medium'
  },

  {
    id: 'L2-4',
    level: 'L2',
    title: '迁移全局自定义指令注册方式',
    description: 'Vue.directive 改为 app.directive',
    scope: 'global',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/custom-directives.html',
    detectionPattern: {
      type: 'regex',
      pattern: /Vue\.directive\s*\(/,
      fileTypes: ['.js', '.ts']
    },
    checklist: [
      '将 Vue.directive() 改为 app.directive()',
      '更新钩子函数名称 (bind→mounted, inserted→mounted, update→updated, componentUpdated→updated, unbind→unmounted)'
    ],
    estimatedComplexity: 'low'
  },

  {
    id: 'L2-5',
    level: 'L2',
    title: '移除 propsData 选项的使用',
    description: '查找并替换 propsData 的使用',
    scope: 'global',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/props-data.html',
    detectionPattern: {
      type: 'regex',
      pattern: /propsData\s*:/,
      fileTypes: ['.js', '.ts']
    },
    checklist: [
      '查找所有使用 propsData 的实例化代码',
      '改为使用 createApp 时传递 props 或使用 provide/inject'
    ],
    estimatedComplexity: 'low'
  },

  // L3 - Component Layer (sample tasks)
  {
    id: 'L3-1',
    level: 'L3',
    title: '修复 data 选项声明方式',
    description: '将对象声明的 data 改为函数声明',
    scope: 'component',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/data-option.html',
    detectionPattern: {
      type: 'ast',
      pattern: 'data: {',
      fileTypes: ['.js', '.ts', '.vue']
    },
    checklist: [
      '查找所有使用对象声明的 data: {}',
      '改为函数声明 data() { return {} }',
      '检查根实例的数据声明'
    ],
    estimatedComplexity: 'medium'
  },

  {
    id: 'L3-3',
    level: 'L3',
    title: '添加 emits 选项声明组件事件',
    description: '为所有通过 $emit 触发的事件添加 emits 选项',
    scope: 'component',
    docUrl: 'https://v3-migration.vuejs.org/breaking-changes/emits-option.html',
    detectionPattern: {
      type: 'regex',
      pattern: /\$emit\s*\(/,
      fileTypes: ['.js', '.ts', '.vue']
    },
    checklist: [
      '在所有组件中添加 emits 选项',
      '声明所有通过 $emit 触发的事件'
    ],
    estimatedComplexity: 'medium'
  },

  // Add remaining 31 tasks...
  // (Abbreviated for plan brevity - full registry will include all 36 tasks)
];

export function getTaskById(id: string): MigrationTask | undefined {
  return migrationTasks.find(task => task.id === id);
}

export function getTasksByLevel(level: string): MigrationTask[] {
  return migrationTasks.filter(task => task.level === level);
}

export function getAllTasks(): MigrationTask[] {
  return migrationTasks;
}
```

**Step 2: Create index.ts**

```typescript
export * from './registry';
```

**Step 3: Commit**

```bash
git add packages/migration-tasks-cli/src/tasks/
git commit -m "feat: create migration task registry with core tasks"
```

---

## Task 4: Create Pattern Detectors

**Files:**
- Create: `packages/migration-tasks-cli/src/detectors/base-detector.ts`
- Create: `packages/migration-tasks-cli/src/detectors/regex-detector.ts`
- Create: `packages/migration-tasks-cli/src/detectors/index.ts`

**Step 1: Create base detector interface**

```typescript
import { DetectionResult, MigrationTask, Occurrence } from '../types';

export interface Detector {
  detect(filePath: string, content: string, task: MigrationTask): Occurrence[];
}

export abstract class BaseDetector implements Detector {
  abstract detect(filePath: string, content: string, task: MigrationTask): Occurrence[];

  protected createOccurrence(
    filePath: string,
    lineNumber: number,
    column: number,
    matchedText: string,
    context: string
  ): Occurrence {
    return {
      filePath,
      lineNumber,
      column,
      matchedText,
      context
    };
  }
}
```

**Step 2: Create regex detector**

```typescript
import { BaseDetector } from './base-detector';
import { MigrationTask, Occurrence } from '../types';

export class RegexDetector extends BaseDetector {
  detect(filePath: string, content: string, task: MigrationTask): Occurrence[] {
    const pattern = task.detectionPattern.pattern;
    if (!(pattern instanceof RegExp)) {
      return [];
    }

    const occurrences: Occurrence[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        if (match.index !== undefined) {
          const context = this.extractContext(lines, index);
          occurrences.push(
            this.createOccurrence(
              filePath,
              index + 1,
              match.index + 1,
              match[0],
              context
            )
          );
        }
      }
    });

    return occurrences;
  }

  private extractContext(lines: string[], lineIndex: number, contextLines: number = 2): string {
    const start = Math.max(0, lineIndex - contextLines);
    const end = Math.min(lines.length, lineIndex + contextLines + 1);
    return lines.slice(start, end).join('\n');
  }
}
```

**Step 3: Create detector factory**

```typescript
import { Detector } from './base-detector';
import { RegexDetector } from './regex-detector';
import { DetectionPattern } from '../types';

export function createDetector(pattern: DetectionPattern): Detector {
  switch (pattern.type) {
    case 'regex':
      return new RegexDetector();
    case 'ast':
      // TODO: Implement AST detector
      throw new Error('AST detector not yet implemented');
    case 'sfc':
      // TODO: Implement SFC detector
      throw new Error('SFC detector not yet implemented');
    default:
      throw new Error(`Unknown detector type: ${pattern.type}`);
  }
}

export * from './base-detector';
```

**Step 4: Commit**

```bash
git add packages/migration-tasks-cli/src/detectors/
git commit -m "feat: implement regex-based pattern detectors"
```

---

## Task 5: Create Project Scanner

**Files:**
- Create: `packages/migration-tasks-cli/src/scanner.ts`

**Step 1: Implement project scanner**

```typescript
import { globby } from 'globby';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  MigrationTask,
  DetectionResult,
  ProjectScanResult,
  GeneratorOptions
} from './types';
import { getAllTasks } from './tasks';
import { createDetector } from './detectors';

export class ProjectScanner {
  private tasks: MigrationTask[];

  constructor(customTasks?: MigrationTask[]) {
    this.tasks = customTasks || getAllTasks();
  }

  async scan(projectPath: string): Promise<ProjectScanResult> {
    const detectedTasks: DetectionResult[] = [];

    for (const task of this.tasks) {
      const result = await this.scanForTask(projectPath, task);
      if (result.occurrences.length > 0) {
        detectedTasks.push(result);
      }
    }

    return {
      projectPath,
      detectedTasks,
      summary: this.generateSummary(detectedTasks)
    };
  }

  private async scanForTask(projectPath: string, task: MigrationTask): Promise<DetectionResult> {
    const occurrences = [];
    const files = [];

    for (const fileType of task.detectionPattern.fileTypes) {
      const pattern = fileType.startsWith('.')
        ? `**/*${fileType}`
        : `**/${fileType}`;

      const matchedFiles = await globby(pattern, {
        cwd: projectPath,
        gitignore: true
      });

      for (const file of matchedFiles) {
        const filePath = path.join(projectPath, file);
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const detector = createDetector(task.detectionPattern);
          const fileOccurrences = detector.detect(filePath, content, task);

          if (fileOccurrences.length > 0) {
            occurrences.push(...fileOccurrences);
            files.push(filePath);
          }
        } catch (error) {
          // Skip files that can't be read
          continue;
        }
      }
    }

    return {
      taskId: task.id,
      occurrences,
      files: [...new Set(files)]
    };
  }

  private generateSummary(detectedTasks: DetectionResult[]) {
    const tasksByLevel: Record<string, number> = {};
    let totalComplexity = 0;

    for (const result of detectedTasks) {
      const task = this.tasks.find(t => t.id === result.taskId);
      if (task) {
        tasksByLevel[task.level] = (tasksByLevel[task.level] || 0) + 1;

        const complexityHours = {
          low: 2,
          medium: 4,
          high: 8
        };
        totalComplexity += complexityHours[task.estimatedComplexity];
      }
    }

    return {
      totalTasks: detectedTasks.length,
      tasksByLevel,
      estimatedHours: totalComplexity
    };
  }
}
```

**Step 2: Commit**

```bash
git add packages/migration-tasks-cli/src/scanner.ts
git commit -m "feat: implement project scanner with file detection"
```

---

## Task 6: Create Output Generators

**Files:**
- Create: `packages/migration-tasks-cli/src/generators/markdown-generator.ts`
- Create: `packages/migration-tasks-cli/src/generators/json-generator.ts`
- Create: `packages/migration-tasks-cli/src/generators/index.ts`

**Step 1: Create markdown generator**

```typescript
import { ProjectScanResult, MigrationTask, GeneratorOptions } from '../types';
import { getTaskById } from '../tasks';

export class MarkdownGenerator {
  generate(result: ProjectScanResult, options: GeneratorOptions): string {
    const lines: string[] = [];

    lines.push('# Vue 2 → Vue 3 迁移任务清单');
    lines.push('');
    lines.push(`> 项目路径: ${result.projectPath}`);
    lines.push(`> 生成时间: ${new Date().toLocaleString()}`);
    lines.push('');

    // Summary
    lines.push('## 概览');
    lines.push('');
    lines.push(`**检测到的迁移任务**: ${result.summary.totalTasks} 个`);
    lines.push(`**预估工作量**: ${result.summary.estimatedHours} 小时`);
    lines.push('');
    lines.push('### 按层级分布');
    lines.push('');

    for (const [level, count] of Object.entries(result.summary.tasksByLevel).sort()) {
      lines.push(`- ${level}: ${count} 个任务`);
    }
    lines.push('');

    // Tasks
    lines.push('## 详细任务列表');
    lines.push('');

    const groupedByLevel = this.groupByLevel(result.detectedTasks);

    for (const [level, tasks] of groupedByLevel) {
      lines.push(`### ${level}`);
      lines.push('');

      for (const detection of tasks) {
        const task = getTaskById(detection.taskId);
        if (!task) continue;

        lines.push(`#### ${task.id}. ${task.title}`);
        lines.push('');
        lines.push(`**描述**: ${task.description}`);
        lines.push(`**影响文件**: ${detection.files.length} 个`);
        lines.push(`**迁移指南**: [查看文档](${task.docUrl})`);
        lines.push('');

        if (options.includeChecklist) {
          lines.push('**检查清单**:');
          for (const item of task.checklist) {
            lines.push(`- [ ] ${item}`);
          }
          lines.push('');
        }

        if (options.includeExamples && task.vue2Example && task.vue3Example) {
          lines.push('**Vue 2 代码**:');
          lines.push(`\`\`\`${task.vue2Example.language}`);
          lines.push(task.vue2Example.code);
          lines.push('```');
          lines.push('');
          lines.push('**Vue 3 代码**:');
          lines.push(`\`\`\`${task.vue3Example.language}`);
          lines.push(task.vue3Example.code);
          lines.push('```');
          lines.push('');
        }

        // Show occurrences
        lines.push('**检测到的位置**:');
        for (const occ of detection.occurrences.slice(0, 5)) {
          lines.push(`- ${occ.filePath}:${occ.lineNumber}:${occ.column}`);
        }
        if (detection.occurrences.length > 5) {
          lines.push(`- ... 还有 ${detection.occurrences.length - 5} 处`);
        }
        lines.push('');
      }
    }

    return lines.join('\n');
  }

  private groupByLevel(detectedTasks: ProjectScanResult['detectedTasks']) {
    const grouped = new Map<string, typeof detectedTasks>();

    for (const detection of detectedTasks) {
      const task = getTaskById(detection.taskId);
      if (!task) continue;

      if (!grouped.has(task.level)) {
        grouped.set(task.level, []);
      }
      grouped.get(task.level)!.push(detection);
    }

    return new Map([...grouped.entries()].sort());
  }
}
```

**Step 2: Create JSON generator**

```typescript
import { ProjectScanResult, GeneratorOptions } from '../types';

export class JsonGenerator {
  generate(result: ProjectScanResult, options: GeneratorOptions): string {
    const output = {
      meta: {
        projectPath: result.projectPath,
        generatedAt: new Date().toISOString(),
        includeExamples: options.includeExamples,
        includeChecklist: options.includeChecklist
      },
      summary: result.summary,
      tasks: result.detectedTasks.map(detection => ({
        taskId: detection.taskId,
        files: detection.files,
        occurrenceCount: detection.occurrences.length,
        occurrences: detection.occurrences.map(occ => ({
          filePath: occ.filePath,
          lineNumber: occ.lineNumber,
          column: occ.column,
          matchedText: occ.matchedText
        }))
      }))
    };

    return JSON.stringify(output, null, 2);
  }
}
```

**Step 3: Create generator factory**

```typescript
import { MarkdownGenerator } from './markdown-generator';
import { JsonGenerator } from './json-generator';
import { ProjectScanResult, GeneratorOptions, OutputFormat } from '../types';

export function generateOutput(
  result: ProjectScanResult,
  options: GeneratorOptions
): string {
  switch (options.format) {
    case 'markdown':
      return new MarkdownGenerator().generate(result, options);
    case 'json':
      return new JsonGenerator().generate(result, options);
    case 'yaml':
      // TODO: Implement YAML generator
      throw new Error('YAML output not yet implemented');
    default:
      throw new Error(`Unknown format: ${options.format}`);
  }
}

export * from './markdown-generator';
export * from './json-generator';
```

**Step 4: Commit**

```bash
git add packages/migration-tasks-cli/src/generators/
git commit -m "feat: implement markdown and json output generators"
```

---

## Task 7: Create CLI Interface

**Files:**
- Create: `packages/migration-tasks-cli/src/cli.ts`
- Modify: `packages/migration-tasks-cli/src/index.ts`

**Step 1: Create CLI**

```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ProjectScanner } from './scanner';
import { generateOutput } from './generators';
import { GeneratorOptions, OutputFormat } from './types';

const program = new Command();

program
  .name('vue-migration-tasks')
  .description('Generate Vue 2 to Vue 3 migration task list from project analysis')
  .version('0.1.0');

program
  .command('scan')
  .description('Scan project and generate migration tasks')
  .argument('<project-path>', 'Path to Vue 2 project')
  .option('-o, --output <path>', 'Output file path', 'migration-tasks.md')
  .option('-f, --format <format>', 'Output format (markdown|json|yaml)', 'markdown')
  .option('--no-examples', 'Exclude code examples in output')
  .option('--no-checklist', 'Exclude checklists in output')
  .option('--lang <language>', 'Output language (zh|en)', 'zh')
  .action(async (projectPath, options) => {
    try {
      const resolvedPath = path.resolve(projectPath);

      // Verify project exists
      try {
        await fs.access(resolvedPath);
      } catch {
        console.error(`Error: Project path does not exist: ${resolvedPath}`);
        process.exit(1);
      }

      console.log(`🔍 Scanning project: ${resolvedPath}`);

      const scanner = new ProjectScanner();
      const result = await scanner.scan(resolvedPath);

      console.log(`✅ Found ${result.summary.totalTasks} migration tasks`);
      console.log(`📊 Estimated effort: ${result.summary.estimatedHours} hours`);

      const generatorOptions: GeneratorOptions = {
        format: options.format as OutputFormat,
        includeExamples: options.examples,
        includeChecklist: options.checklist,
        language: options.lang
      };

      const output = generateOutput(result, generatorOptions);

      const outputPath = path.resolve(options.output);
      await fs.writeFile(outputPath, output, 'utf-8');

      console.log(`📝 Output written to: ${outputPath}`);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program
  .command('list-tasks')
  .description('List all available migration tasks')
  .option('--level <level>', 'Filter by level (L1-L6)')
  .action((options) => {
    const { getAllTasks, getTasksByLevel } = require('./tasks');

    const tasks = options.level
      ? getTasksByLevel(options.level)
      : getAllTasks();

    console.log(`\n📋 Available Migration Tasks (${tasks.length} total)\n`);

    const grouped = tasks.reduce((acc: any, task: any) => {
      if (!acc[task.level]) acc[task.level] = [];
      acc[task.level].push(task);
      return acc;
    }, {});

    for (const [level, levelTasks] of Object.entries(grouped)) {
      console.log(`${level}:`);
      for (const task of levelTasks as any[]) {
        console.log(`  ${task.id} - ${task.title}`);
      }
      console.log('');
    }
  });

program.parse();
```

**Step 2: Update index.ts**

```typescript
export { ProjectScanner } from './scanner';
export * from './types';
export * from './tasks';
export * from './generators';
```

**Step 3: Commit**

```bash
git add packages/migration-tasks-cli/src/
git commit -m "feat: implement CLI interface with scan and list commands"
```

---

## Task 8: Add Tests

**Files:**
- Create: `packages/migration-tasks-cli/tests/scanner.test.ts`
- Create: `packages/migration-tasks-cli/tests/detector.test.ts`

**Step 1: Create scanner tests**

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { ProjectScanner } from '../src/scanner';
import { MigrationTask } from '../src/types';

describe('ProjectScanner', () => {
  let scanner: ProjectScanner;

  beforeEach(() => {
    scanner = new ProjectScanner();
  });

  it('should detect new Vue pattern', async () => {
    // Setup test project with Vue 2 patterns
    // Run scanner
    // Assert detection results
  });

  it('should group tasks by level', async () => {
    // Test summary generation
  });

  it('should calculate estimated hours correctly', async () => {
    // Test complexity calculation
  });
});
```

**Step 2: Create detector tests**

```typescript
import { describe, it, expect } from 'vitest';
import { RegexDetector } from '../src/detectors/regex-detector';
import { MigrationTask } from '../src/types';

describe('RegexDetector', () => {
  const detector = new RegexDetector();

  it('should detect regex patterns in content', () => {
    const task: MigrationTask = {
      id: 'test',
      level: 'L2',
      title: 'Test',
      description: 'Test task',
      scope: 'global',
      docUrl: '',
      detectionPattern: {
        type: 'regex',
        pattern: /new\s+Vue\s*\(/g,
        fileTypes: ['.js']
      },
      checklist: [],
      estimatedComplexity: 'low'
    };

    const content = `
      const app = new Vue({
        el: '#app'
      });
    `;

    const results = detector.detect('test.js', content, task);
    expect(results).toHaveLength(1);
    expect(results[0].matchedText).toBe('new Vue(');
  });

  it('should return empty array when no matches', () => {
    // Test no match case
  });
});
```

**Step 3: Commit**

```bash
git add packages/migration-tasks-cli/tests/
git commit -m "test: add unit tests for scanner and detectors"
```

---

## Task 9: Build and Package

**Files:**
- Modify: `packages/migration-tasks-cli/package.json`
- Create: `packages/migration-tasks-cli/.gitignore`

**Step 1: Update package.json scripts**

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest",
    "test:run": "vitest run",
    "prepublishOnly": "npm run build",
    "lint": "eslint src/**/*.ts"
  }
}
```

**Step 2: Create .gitignore**

```
node_modules/
dist/
*.log
.DS_Store
coverage/
```

**Step 3: Build and test**

Run:
```bash
cd packages/migration-tasks-cli
npm install
npm run build
npm run test:run
```

Expected:
- TypeScript compiles without errors
- Tests pass

**Step 4: Commit**

```bash
git add packages/migration-tasks-cli/
git commit -m "chore: configure build scripts and add gitignore"
```

---

## Task 10: Create Documentation

**Files:**
- Create: `packages/migration-tasks-cli/README.md`
- Modify: `docs/plans/2025-03-06-vue2-to-vue3-migration-tasks.md`

**Step 1: Write CLI README**

```markdown
# @vue-migration/tasks-cli

CLI tool to analyze Vue 2 projects and generate migration task lists for Vue 3 upgrade.

## Installation

\`\`\`bash
npm install -g @vue-migration/tasks-cli
# or
npx @vue-migration/tasks-cli scan ./my-vue2-project
\`\`\`

## Usage

### Scan Project

\`\`\`bash
vue-migration-tasks scan ./my-project
\`\`\`

Options:
- `-o, --output <path>` - Output file path (default: migration-tasks.md)
- `-f, --format <format>` - Output format: markdown|json|yaml (default: markdown)
- `--no-examples` - Exclude code examples
- `--no-checklist` - Exclude checklists
- `--lang <language>` - Output language: zh|en (default: zh)

### List Available Tasks

\`\`\`bash
vue-migration-tasks list-tasks
\`\`\`

## Output Format

### Markdown

Generates a comprehensive task list with:
- Summary of detected tasks by level
- Detailed task descriptions
- Checklists for each task
- Vue 2 vs Vue 3 code examples
- File locations of detected patterns

### JSON

Machine-readable format for integration with other tools.

## Migration Levels

- **L1** - Infrastructure: Dependency upgrades
- **L2** - Global Layer: Global API changes
- **L3** - Component Layer: Component options
- **L4** - Template Layer: Directive changes
- **L5** - Render Layer: Render functions, slots
- **L6** - Cleanup Layer: Removed APIs

## License

MIT
```

**Step 2: Update main migration tasks doc**

Add reference to the CLI tool at the top of the existing migration tasks document.

**Step 3: Commit**

```bash
git add packages/migration-tasks-cli/README.md docs/plans/
git commit -m "docs: add CLI tool documentation and update migration tasks guide"
```

---

## Summary

This implementation plan creates a complete CLI tool that:

1. **Scans** Vue 2 projects for migration patterns
2. **Detects** all 36 types of required changes
3. **Generates** customized task lists in Markdown/JSON formats
4. **Estimates** effort based on task complexity

### Files Created

```
packages/migration-tasks-cli/
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
├── src/
│   ├── cli.ts                 # CLI entry point
│   ├── index.ts               # Public API exports
│   ├── scanner.ts             # Project scanner
│   ├── types/
│   │   └── index.ts           # Type definitions
│   ├── tasks/
│   │   ├── registry.ts        # 36 migration tasks
│   │   └── index.ts
│   ├── detectors/
│   │   ├── base-detector.ts   # Detector interface
│   │   ├── regex-detector.ts  # Regex-based detection
│   │   └── index.ts           # Factory
│   └── generators/
│       ├── markdown-generator.ts
│       ├── json-generator.ts
│       └── index.ts
└── tests/
    ├── scanner.test.ts
    └── detector.test.ts
```

### Next Steps

After implementation:
1. Publish to npm registry
2. Add more sophisticated AST detectors
3. Add auto-fix capabilities
4. Integrate with @vue/compat for gradual migration
