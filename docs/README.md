# Vue2 升级 Vue3 实施文档

这组文档按“先升级依赖，再逐条处理 Vue 3 breaking changes，最后统一运行与验收”的方式组织。除第 `01` 步和最后一步外，中间每个编号文档都只对应一个具体破坏性更新任务。

## 使用方式

- 从 `01` 开始按顺序推进。
- 每一篇文档只处理当前这一项，不要在同一次修改里混入别的 breaking change。
- 当前项改完后先本地保存，再进入下一项；所有项处理完之后，最后统一做运行和回归。

## 目录

1. [01-升级核心依赖与构建链路](./01-升级核心依赖与构建链路.md)
2. [02-迁移全局 API 到 createApp](./02-迁移全局 API 到 createApp.md)
3. [03-迁移全局 API 的具名导入](./03-迁移全局 API 的具名导入.md)
4. [04-迁移组件 v-model 与 .sync](./04-迁移组件 v-model 与 .sync.md)
5. [05-修正 key 的使用方式](./05-修正 key 的使用方式.md)
6. [06-拆开同节点上的 v-if 与 v-for](./06-拆开同节点上的 v-if 与 v-for.md)
7. [07-调整 v-bind object 的覆盖顺序](./07-调整 v-bind object 的覆盖顺序.md)
8. [08-移除 .native 事件修饰符](./08-移除 .native 事件修饰符.md)
9. [09-迁移函数式组件](./09-迁移函数式组件.md)
10. [10-迁移异步组件写法](./10-迁移异步组件写法.md)
11. [11-为组件补 emits 声明](./11-为组件补 emits 声明.md)
12. [12-迁移 render function API](./12-迁移 render function API.md)
13. [13-统一 slots 与 scopedSlots](./13-统一 slots 与 scopedSlots.md)
14. [14-移除 $listeners](./14-移除 listeners.md)
15. [15-处理 $attrs 包含 class 和 style](./15-处理 attrs 包含 class 和 style.md)
16. [16-迁移自定义元素与 is 用法](./16-迁移自定义元素与 is 用法.md)
17. [17-重命名 beforeDestroy 与 destroyed](./17-重命名 beforeDestroy 与 destroyed.md)
18. [18-迁移 props 默认值里的 this](./18-迁移 props 默认值里的 this.md)
19. [19-迁移自定义指令 API](./19-迁移自定义指令 API.md)
20. [20-修正 data 选项和 mixin 数据合并](./20-修正 data 选项和 mixin 数据合并.md)
21. [21-调整 attribute coercion 行为](./21-调整 attribute coercion 行为.md)
22. [22-迁移 transition class 名称](./22-迁移 transition class 名称.md)
23. [23-修正 transition 作为根节点的写法](./23-修正 transition 作为根节点的写法.md)
24. [24-为 TransitionGroup 显式补 wrapper](./24-为 TransitionGroup 显式补 wrapper.md)
25. [25-修正 watch 数组行为](./25-修正 watch 数组行为.md)
26. [26-修正挂载点不再被替换](./26-修正挂载点不再被替换.md)
27. [27-迁移 vnode 生命周期事件](./27-迁移 vnode 生命周期事件.md)
28. [28-移除 keyCode 修饰符与 keyCodes 配置](./28-移除 keyCode 修饰符与 keyCodes 配置.md)
29. [29-移除实例事件总线 API](./29-移除实例事件总线 API.md)
30. [30-移除过滤器](./30-移除过滤器.md)
31. [31-移除 inline-template](./31-移除 inline-template.md)
32. [32-移除 $children](./32-移除 children.md)
33. [33-移除 propsData](./33-移除 propsData.md)
34. [34-移除 $destroy $set $delete 与全局 set delete](./34-移除 destroy set delete.md)
35. [35-移除无指令的 template 包裹层](./35-移除无指令的 template 包裹层.md)
36. [36-升级 Vuex 到 4](./36-升级 Vuex 到 4.md)
37. [37-统一运行与回归验收](./37-统一运行与回归验收.md)

## 主要来源

- `src/breaking-changes/index.md`
- `src/breaking-changes/`
- `src/migration-build.md`
