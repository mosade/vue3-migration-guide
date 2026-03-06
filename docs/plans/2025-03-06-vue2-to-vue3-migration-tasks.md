# Vue 2 → Vue 3 代码迁移任务清单

> 本清单基于 [Vue 3 Migration Guide](https://v3-migration.vuejs.org/) 整理，按照影响范围从外到内的顺序排列，便于渐进式迁移和代码审查。

---

## L1 - 基础设施层

依赖升级必须在所有代码变更之前完成。

### L1-1. 升级 Vue 及相关依赖版本
**影响范围**: 全局
**迁移指南**: [Migration Build](https://v3-migration.vuejs.org/migration-build.html)

- [ ] 升级 `vue` 到 ^3.x
- [ ] 升级 `vue-router` 到 ^4.x
- [ ] 升级 `vuex` 到 ^4.x 或迁移到 `pinia`
- [ ] 升级 `@vue/cli` 或 Vite 配置
- [ ] 升级相关插件 (vue-loader, @vitejs/plugin-vue 等)
- [ ] 安装 @vue/compat（如需渐进式迁移）

**Vue 2**:
```json
{
  "dependencies": {
    "vue": "^2.6.14",
    "vue-router": "^3.5.1",
    "vuex": "^3.6.2"
  }
}
```

**Vue 3**:
```json
{
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0"
  }
}
```

---

## L2 - 全局层

应用初始化和全局注册相关的变更。

### L2-1. 迁移全局 API 初始化方式
**影响范围**: 全局 (main.js/app.js)
**迁移指南**: [Global API](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

- [ ] 替换 `new Vue()` 为 `createApp()`
- [ ] 将 `Vue.config` 改为 `app.config`
- [ ] 处理 `Vue.prototype` → `app.config.globalProperties`
- [ ] 移除 `Vue.extend` 的使用
- [ ] 更新应用挂载方式 `app.mount()`

**Vue 2**:
```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App)
}).$mount('#app')
```

**Vue 3**:
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')
```

---

### L2-2. 迁移全局 API Treeshaking
**影响范围**: 全局
**迁移指南**: [Global API Treeshaking](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html)

- [ ] 将 `Vue.nextTick()` 改为具名导入 `nextTick`
- [ ] 将 `Vue.observable()` 改为 `reactive()`
- [ ] 将 `Vue.version` 改为具名导入
- [ ] 检查其他 `Vue.xxx` 全局 API 的使用

**Vue 2**:
```js
import Vue from 'vue'

Vue.nextTick(() => {
  // ...
})

const state = Vue.observable({ count: 0 })
```

**Vue 3**:
```js
import { nextTick, reactive, version } from 'vue'

nextTick(() => {
  // ...
})

const state = reactive({ count: 0 })
```

---

### L2-3. 迁移全局过滤器
**影响范围**: 全局
**迁移指南**: [Filters](https://v3-migration.vuejs.org/breaking-changes/filters.html)

- [ ] 识别所有 `Vue.filter()` 注册的全局过滤器
- [ ] 创建 `globalProperties.$filters` 对象
- [ ] 在模板中将 `{{ value | filter }}` 改为 `$filters.filter(value)`

**Vue 2**:
```js
// main.js
Vue.filter('currency', (value) => '$' + value)
```
```html
<!-- template -->
<p>{{ price | currency }}</p>
```

**Vue 3**:
```js
// main.js
app.config.globalProperties.$filters = {
  currency(value) {
    return '$' + value
  }
}
```
```html
<!-- template -->
<p>{{ $filters.currency(price) }}</p>
```

---

### L2-4. 迁移全局自定义指令注册方式
**影响范围**: 全局
**迁移指南**: [Custom Directives](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html)

- [ ] 将 `Vue.directive()` 改为 `app.directive()`
- [ ] 更新钩子函数名称 (bind→mounted, inserted→mounted, update→updated, componentUpdated→updated, unbind→unmounted)

**Vue 2**:
```js
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
```

**Vue 3**:
```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

---

### L2-5. 移除 propsData 选项的使用
**影响范围**: 全局
**迁移指南**: [Props Data](https://v3-migration.vuejs.org/breaking-changes/props-data.html)

- [ ] 查找所有使用 `propsData` 的实例化代码
- [ ] 改为使用 `createApp` 时传递 props

**Vue 2**:
```js
const app = new Vue({
  propsData: {
    foo: 'bar'
  }
})
```

**Vue 3**:
```js
const app = createApp({
  props: {
    foo: {
      type: String,
      default: 'bar'
    }
  }
})

app.mount('#app', {
  propsData: {
    foo: 'bar'
  }
})
// 或使用 provide/inject 传递数据
```

---

## L3 - 组件定义层

组件选项和生命周期相关的变更。

### L3-1. 修复 data 选项声明方式
**影响范围**: 组件
**迁移指南**: [Data Option](https://v3-migration.vuejs.org/breaking-changes/data-option.html)

- [ ] 查找所有使用对象声明的 `data: {}`
- [ ] 改为函数声明 `data() { return {} }`
- [ ] 检查根实例的数据声明

**Vue 2**:
```js
export default {
  data: {
    count: 0
  }
}
```

**Vue 3**:
```js
export default {
  data() {
    return {
      count: 0
    }
  }
}
```

---

### L3-2. 修复 mixin 中 data 的合并行为
**影响范围**: 组件 (使用 mixins)
**迁移指南**: [Data Option](https://v3-migration.vuejs.org/breaking-changes/data-option.html#mixin-merge-behavior-change)

- [ ] 检查所有 mixins 的数据合并逻辑
- [ ] 注意：Vue 3 中是浅合并，嵌套对象会被覆盖而非合并

**Vue 2 (深度合并)**:
```js
// Mixin
{ data() { return { user: { name: 'Jack', id: 1 } } } }
// Component
{ mixins: [Mixin], data() { return { user: { id: 2 } } } }
// 结果: { user: { name: 'Jack', id: 2 } }
```

**Vue 3 (浅合并)**:
```js
// 结果: { user: { id: 2 } } - name 被覆盖
```

---

### L3-3. 添加 emits 选项声明组件事件
**影响范围**: 组件
**迁移指南**: [Emits Option](https://v3-migration.vuejs.org/breaking-changes/emits-option.html)

- [ ] 在所有组件中添加 `emits` 选项
- [ ] 声明所有通过 `$emit` 触发的事件

**Vue 2**:
```js
export default {
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
```

**Vue 3**:
```js
export default {
  emits: ['submit'],
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
```

---

### L3-4. 修复 props default 工厂函数中的 this 访问
**影响范围**: 组件
**迁移指南**: [Props Default This](https://v3-migration.vuejs.org/breaking-changes/props-default-this.html)

- [ ] 查找 `default()` 中使用 `this` 的 props
- [ ] 改为使用注入或其他方式获取数据

**Vue 2**:
```js
export default {
  props: {
    items: {
      default() {
        return this.parentItems || []
      }
    }
  }
}
```

**Vue 3**:
```js
import { inject } from 'vue'

export default {
  props: {
    items: {
      default() {
        // 无法访问 this，使用 inject 或其他方式
        return []
      }
    }
  },
  setup() {
    const parentItems = inject('parentItems', [])
    return { parentItems }
  }
}
```

---

### L3-5. 迁移异步组件定义方式
**影响范围**: 组件
**迁移指南**: [Async Components](https://v3-migration.vuejs.org/breaking-changes/async-components.html)

- [ ] 查找所有动态导入的组件定义
- [ ] 使用 `defineAsyncComponent` 包裹

**Vue 2**:
```js
const AsyncComp = () => import('./MyComponent.vue')
```

**Vue 3**:
```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./MyComponent.vue'))

// 或使用高级选项
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComp,
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
})
```

---

### L3-6. 迁移函数式组件
**影响范围**: 组件
**迁移指南**: [Functional Components](https://v3-migration.vuejs.org/breaking-changes/functional-components.html)

- [ ] 查找 `<template functional>` 的 SFC
- [ ] 查找 `functional: true` 的组件选项
- [ ] 改为纯函数组件

**Vue 2**:
```html
<template functional>
  <div>{{ props.message }}</div>
</template>
```
```js
export default {
  functional: true,
  props: ['message'],
  render(h, { props }) {
    return h('div', props.message)
  }
}
```

**Vue 3**:
```js
import { h } from 'vue'

const FunctionalComp = (props) => {
  return h('div', props.message)
}

FunctionalComp.props = ['message']

export default FunctionalComp
```

---

### L3-7. 修复自定义元素互操作性 (is 属性)
**影响范围**: 组件/模板
**迁移指南**: [Custom Elements Interop](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html)

- [ ] 检查 `<component is="custom-element">` 的使用
- [ ] 自定义内置元素需改为 `<component :is="'custom-element'"` 或添加 `vue:""` 前缀

**Vue 2**:
```html
<!-- 自定义内置元素 -->
<button is="custom-button"></button>
```

**Vue 3**:
```html
<!-- 使用 component 标签 -->
<component :is="'custom-button'"></component>
<!-- 或添加 vue 前缀 -->
<button vue:is="custom-button"></button>
```

---

### L3-8. 修复 watch 数组的深度监听行为
**影响范围**: 组件
**迁移指南**: [Watch](https://v3-migration.vuejs.org/breaking-changes/watch.html)

- [ ] 查找所有 watch 数组的选项
- [ ] 如需监听数组内容变化，添加 `deep: true` 或使用 `deep: 1`

**Vue 2**:
```js
export default {
  watch: {
    items(newVal, oldVal) {
      // 数组内容变化也会触发
    }
  }
}
```

**Vue 3**:
```js
export default {
  watch: {
    items: {
      handler(newVal, oldVal) {
        // 只有数组引用变化时触发
      },
      deep: true // 监听内容变化
      // 或使用 deep: 1 提高性能（Vue 3.5+）
    }
  }
}
```

---

### L3-9. 修复自定义指令生命周期对齐
**影响范围**: 组件 (自定义指令)
**迁移指南**: [Custom Directives](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html)

- [ ] 将所有指令钩子重命名
- [ ] 移除 `binding.expression` 的使用

| Vue 2      | Vue 3         |
|------------|---------------|
| bind       | mounted       |
| inserted   | mounted       |
| update     | updated       |
| componentUpdated | updated |
| unbind     | unmounted     |

---

## L4 - 模板层

模板指令和语法相关的变更。

### L4-1. 迁移 v-model 语法变化
**影响范围**: 模板
**迁移指南**: [v-model](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

- [ ] 将 `:value` + `@input` 改为 `:modelValue` + `@update:modelValue`
- [ ] 将 `.sync` 修饰符改为 `v-model:` 参数形式
- [ ] 更新组件的 `model` 选项为 `emits` + props

**Vue 2**:
```html
<!-- .sync 修饰符 -->
<Child :title.sync="pageTitle" />

<!-- 等价于 -->
<Child :title="pageTitle" @update:title="pageTitle = $event" />
```
```js
export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: ['title']
}
```

**Vue 3**:
```html
<!-- 多个 v-model -->
<Child v-model:title="pageTitle" v-model:content="pageContent" />
```
```js
export default {
  props: ['title', 'content'],
  emits: ['update:title', 'update:content']
}
```

---

### L4-2. 修复 key 属性在 template v-for 上的使用
**影响范围**: 模板
**迁移指南**: [Key Attribute](https://v3-migration.vuejs.org/breaking-changes/key-attribute.html)

- [ ] 将 `<template v-for>` 上的 `key` 移到子元素上
- [ ] 检查非 v-for 节点上不必要的 key

**Vue 2**:
```html
<template v-for="item in items" :key="item.id">
  <div>{{ item.name }}</div>
</template>
```

**Vue 3**:
```html
<template v-for="item in items">
  <div :key="item.id">{{ item.name }}</div>
</template>
```

---

### L4-3. 修复 v-if 与 v-for 优先级变化
**影响范围**: 模板
**迁移指南**: [v-if-v-for](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html)

- [ ] 检查同时存在 `v-if` 和 `v-for` 的元素
- [ ] Vue 3 中 v-if 优先级更高，可能需要调整逻辑

**Vue 2 (v-for 优先级更高)**:
```html
<ul>
  <li v-for="item in items" v-if="item.visible" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

**Vue 3 (v-if 优先级更高 - 报错)**:
```html
<!-- 方案 1: 先过滤数据 -->
<ul>
  <li v-for="item in visibleItems" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```
```html
<!-- 方案 2: 使用 template -->
<ul>
  <template v-for="item in items" :key="item.id">
    <li v-if="item.visible">{{ item.name }}</li>
  </template>
</ul>
```

---

### L4-4. 修复 v-bind="object" 的顺序敏感性
**影响范围**: 模板
**迁移指南**: [v-bind](https://v3-migration.vuejs.org/breaking-changes/v-bind.html)

- [ ] 检查 `v-bind="object"` 与其他独立属性的组合
- [ ] Vue 3 中独立属性始终覆盖 object 中的同名属性

**Vue 2 (顺序敏感)**:
```html
<!-- object 中的 id 会覆盖 "my-id" -->
<div id="my-id" v-bind="object">

<!-- "my-id" 会覆盖 object 中的 id -->
<div v-bind="object" id="my-id">
```

**Vue 3 (独立属性始终优先)**:
```html
<!-- 两种情况都是 "my-id" 优先 -->
<div id="my-id" v-bind="object">
<div v-bind="object" id="my-id">
```

---

### L4-5. 移除 v-on 的 .native 修饰符
**影响范围**: 模板
**迁移指南**: [v-on native modifier](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html)

- [ ] 查找所有 `@event.native` 的使用
- [ ] 移除 `.native`，Vue 3 中非声明事件自动作为原生事件

**Vue 2**:
```html
<MyComponent @click.native="onClick" />
```

**Vue 3**:
```html
<MyComponent @click="onClick" />
```

---

### L4-6. 移除 keyCode 作为 v-on 修饰符
**影响范围**: 模板
**迁移指南**: [Keycode Modifiers](https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html)

- [ ] 查找 `@keydown.13` 等数字 keyCode
- [ ] 改为使用别名或 `@keydown` + 方法内判断

**Vue 2**:
```html
<input @keydown.13="submit">
<input @keydown.enter="submit">
```

**Vue 3**:
```html
<!-- 保留内置别名 -->
<input @keydown.enter="submit">
<!-- 自定义 keyCode 改为方法内处理 -->
<input @keydown="handleKeydown">
```
```js
methods: {
  handleKeydown(event) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }
}
```

---

### L4-7. 修复属性强制策略变更
**影响范围**: 模板
**迁移指南**: [Attribute Coercion](https://v3-migration.vuejs.org/breaking-changes/attribute-coercion.html)

- [ ] 检查布尔属性的绑定（如 `disabled="false"`）
- [ ] Vue 3 中 `false` 会作为字符串保留，不再移除属性

**Vue 2**:
```html
<!-- 空字符串也会设置 disabled -->
<button :disabled="''">Disabled</button>
```

**Vue 3**:
```html
<!-- 只有 true 才会设置 disabled -->
<button :disabled="true">Disabled</button>
```

---

### L4-8. 移除 inline-template 属性
**影响范围**: 模板
**迁移指南**: [Inline Template](https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html)

- [ ] 查找 `inline-template` 属性的使用
- [ ] 改为使用 `<slot>` 或单独的组件文件

**Vue 2**:
```html
<MyComponent inline-template>
  <div>
    <p>These are compiled as the component's own template</p>
  </div>
</MyComponent>
```

**Vue 3**:
```html
<!-- 使用默认 slot -->
<MyComponent v-slot="{ data }">
  <div>
    <p>{{ data.message }}</p>
  </div>
</MyComponent>
```

---

## L5 - 渲染层

渲染函数、插槽和高级特性相关的变更。

### L5-1. 修复 $attrs 包含 class 和 style 的变化
**影响范围**: 渲染/组件
**迁移指南**: [$attrs Includes Class and Style](https://v3-migration.vuejs.org/breaking-changes/attrs-includes-class-style.html)

- [ ] 检查 `$attrs` 的使用
- [ ] 确保组件正确处理可能包含 `class` 和 `style` 的 attrs

**Vue 2**:
```js
// $attrs 不包含 class 和 style
h('div', { attrs: this.$attrs })
```

**Vue 3**:
```js
// $attrs 包含 class 和 style
h('div', this.$attrs)

// 如需分离
const { class: cls, style, ...attrs } = this.$attrs
```

---

### L5-2. 迁移 $listeners 到 $attrs
**影响范围**: 渲染/组件
**迁移指南**: [$listeners Removed](https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html)

- [ ] 查找所有 `this.$listeners` 的使用
- [ ] 合并到 `$attrs` 中（`$attrs` 包含所有事件监听器）

**Vue 2**:
```js
export default {
  mounted() {
    console.log(this.$listeners)
  },
  render(h) {
    return h('input', {
      on: this.$listeners
    })
  }
}
```

**Vue 3**:
```js
export default {
  mounted() {
    // $attrs 包含所有非 prop 属性和事件监听器
    console.log(this.$attrs)
  },
  render() {
    return h('input', this.$attrs)
  }
}
```

---

### L5-3. 迁移 $slots 和 $scopedSlots 统一
**影响范围**: 渲染/组件
**迁移指南**: [Slots Unification](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html)

- [ ] 将 `$scopedSlots` 改为 `$slots`
- [ ] 所有插槽都作为函数访问
- [ ] 移除 `this.$slots.default` 的静态访问

**Vue 2**:
```js
// 作用域插槽
this.$scopedSlots.header({ msg: 'hello' })

// 普通插槽
this.$slots.header
```

**Vue 3**:
```js
// 统一为函数调用
this.$slots.header({ msg: 'hello' })

// 检查插槽是否存在
if (this.$slots.header) {
  this.$slots.header({ msg: 'hello' })
}
```

---

### L5-4. 迁移渲染函数 API
**影响范围**: 渲染函数
**迁移指南**: [Render Function API](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html)

- [ ] 更新 `h` 函数导入方式
- [ ] 更新 VNode props 结构（扁平化）
- [ ] 更新组件注册引用方式

**Vue 2**:
```js
export default {
  render(h) {
    return h('div', {
      class: 'foo',
      attrs: { id: 'bar' },
      on: { click: this.onClick }
    }, [
      h(MyComponent, {
        props: { msg: 'hello' },
        scopedSlots: {
          default: props => h('span', props.text)
        }
      })
    ])
  }
}
```

**Vue 3**:
```js
import { h } from 'vue'

export default {
  render() {
    return h('div', {
      class: 'foo',
      id: 'bar',
      onClick: this.onClick
    }, [
      h(MyComponent, {
        msg: 'hello'
      }, {
        default: props => h('span', props.text)
      })
    ])
  }
}
```

---

### L5-5. 迁移过渡类名变化
**影响范围**: 样式/模板
**迁移指南**: [Transition](https://v3-migration.vuejs.org/breaking-changes/transition.html)

- [ ] 将 `v-enter` 改为 `v-enter-from`
- [ ] 将 `v-leave` 改为 `v-leave-from`

**Vue 2**:
```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

**Vue 3**:
```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

---

### L5-6. 修复 <TransitionGroup> 默认不渲染包裹元素
**影响范围**: 模板
**迁移指南**: [Transition Group](https://v3-migration.vuejs.org/breaking-changes/transition-group.html)

- [ ] 检查所有 `<transition-group>` 的使用
- [ ] 如需包裹元素，显式添加 `tag` 属性

**Vue 2**:
```html
<transition-group>
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</transition-group>
<!-- 渲染为 <span> 包裹 -->
```

**Vue 3**:
```html
<!-- 默认不渲染包裹元素 -->
<transition-group>
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</transition-group>

<!-- 如需包裹元素，显式指定 tag -->
<transition-group tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</transition-group>
```

---

### L5-7. 修复 Transition 作为根节点时的行为
**影响范围**: 组件/模板
**迁移指南**: [Transition as Root](https://v3-migration.vuejs.org/breaking-changes/transition-as-root.html)

- [ ] 检查 `<transition>` 作为组件根节点的情况
- [ ] 确保切换时触发生命周期钩子

**Vue 2**:
```html
<transition>
  <component :is="view"></component>
</transition>
```

**Vue 3**:
```html
<!-- 行为相同，但内部实现变化 -->
<transition>
  <component :is="view"></component>
</transition>
```

---

### L5-8. 修复 vnode 生命周期事件前缀
**影响范围**: 模板
**迁移指南**: [VNode Lifecycle Events](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html)

- [ ] 将 `@hook:mounted` 改为 `@vue:mounted`
- [ ] 更新其他生命周期钩子事件

**Vue 2**:
```html
<ChildComponent @hook:updated="onUpdated" />
```

**Vue 3**:
```html
<ChildComponent @vue:updated="onUpdated" />
```

---

## L6 - 清理层

已废弃需要移除的 API。

### L6-1. 移除 Filters 使用
**影响范围**: 模板/组件
**迁移指南**: [Filters](https://v3-migration.vuejs.org/breaking-changes/filters.html)

- [ ] 查找所有 `{{ value | filter }}` 语法
- [ ] 替换为计算属性或方法调用
- [ ] 迁移全局过滤器（见 L2-3）

**Vue 2**:
```html
<p>{{ msg | capitalize }}</p>
```
```js
filters: {
  capitalize(value) {
    return value.toUpperCase()
  }
}
```

**Vue 3**:
```html
<p>{{ capitalizedMsg }}</p>
```
```js
computed: {
  capitalizedMsg() {
    return this.msg.toUpperCase()
  }
}
// 或使用方法
<p>{{ capitalize(msg) }}</p>
```

---

### L6-2. 移除 $on/$off/$once 实例方法
**影响范围**: 组件
**迁移指南**: [Events API](https://v3-migration.vuejs.org/breaking-changes/events-api.html)

- [ ] 查找 `this.$on`, `this.$off`, `this.$once` 的使用
- [ ] 使用外部事件库（如 mitt）或 provide/inject

**Vue 2**:
```js
// 事件总线
export const eventBus = new Vue()

// 组件内
this.$on('event', handler)
this.$off('event', handler)
this.$once('event', handler)
```

**Vue 3**:
```js
// 使用 mitt
import mitt from 'mitt'
export const emitter = mitt()

// 组件内
emitter.on('event', handler)
emitter.off('event', handler)
emitter.once('event', handler)
```

---

### L6-3. 移除 $children 实例属性
**影响范围**: 组件
**迁移指南**: [$children](https://v3-migration.vuejs.org/breaking-changes/children.html)

- [ ] 查找 `this.$children` 的使用
- [ ] 使用 `ref` 和 `provide/inject` 替代

**Vue 2**:
```js
// 访问子组件
this.$children.forEach(child => {
  child.doSomething()
})
```

**Vue 3**:
```js
// 使用 ref
<ChildComponent v-for="i in 3" :ref="el => setItemRef(el, i)" />

export default {
  setup() {
    const itemRefs = ref([])
    const setItemRef = (el, index) => {
      if (el) {
        itemRefs.value[index] = el
      }
    }
    return { itemRefs, setItemRef }
  }
}
```

---

### L6-4. 移除 $destroy 实例方法
**影响范围**: 组件
**迁移指南**: [Global API](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

- [ ] 查找 `this.$destroy()` 的使用
- [ ] 使用条件渲染控制组件生命周期

**Vue 2**:
```js
this.$destroy()
```

**Vue 3**:
```js
// 使用条件渲染替代
const showComponent = ref(true)
// 隐藏即卸载
showComponent.value = false
```

---

### L6-5. 移除全局 set/delete 及 $set/$delete 方法
**影响范围**: 组件
**迁移指南**: [Vue 3 Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html)

- [ ] 查找 `Vue.set`, `Vue.delete`, `this.$set`, `this.$delete` 的使用
- [ ] Vue 3 Proxy 响应式不再需要这些方法

**Vue 2**:
```js
// 添加响应式属性
Vue.set(this.obj, 'newProp', 'value')
this.$set(this.items, index, newValue)

// 删除属性
Vue.delete(this.obj, 'prop')
this.$delete(this.items, index)
```

**Vue 3**:
```js
// Proxy 自动追踪，直接使用
this.obj.newProp = 'value'
this.items[index] = newValue

// 删除属性
delete this.obj.prop
this.items.splice(index, 1)
```

---

## 迁移检查清单汇总

### 执行顺序

| 顺序 | 层级 | 任务数 | 预估工作量 |
|------|------|--------|-----------|
| 1 | L1 - 基础设施 | 1 | 低 |
| 2 | L2 - 全局层 | 5 | 中 |
| 3 | L3 - 组件定义层 | 9 | 高 |
| 4 | L4 - 模板层 | 8 | 高 |
| 5 | L5 - 渲染层 | 8 | 中 |
| 6 | L6 - 清理层 | 5 | 中 |

**总计**: 36 个迁移任务

### 使用建议

1. **渐进式迁移**: 使用 `@vue/compat` (迁移构建) 可以逐步修复，不必一次完成所有变更
2. **自动化工具**: 考虑使用 [vue-codemod](https://github.com/vuejs/vue-codemod) 自动处理部分变更
3. **测试覆盖**: 每完成一层变更，运行完整测试套件确保功能正常
4. **代码审查**: 按层级分组提交 PR，便于审查和回滚

### 相关资源

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 Documentation](https://vuejs.org/)
- [Migration Build](https://v3-migration.vuejs.org/migration-build.html)
