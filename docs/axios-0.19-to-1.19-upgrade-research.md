# Axios 0.19 升级至 1.19.0 破坏性变更调研

> 调研日期：2026-08-10
>
> 目标版本：`axios@1.19.0`

## 结论

截至 2026-08-10，npm 最新版为 `axios@1.19.0`。

当前仓库是 Vue 迁移文档仓库，没有 `package.json`、锁文件或 Axios 调用，因此暂无项目代码可映射。若用于其他应用，从 `0.19` 直接升级到 `1.19.0` 时，重点风险集中在 `0.27` 和 `1.0` 两个版本节点。

## 版本时间线

| 版本节点 | 破坏性变化或行为变化 | 风险 |
| --- | --- | --- |
| `0.20` | `mergeConfig` 重构，`params`、`headers` 和自定义配置的合并结果可能变化；URL 参数编码行为变化 | 中 |
| `0.22` | `CancelToken` 弃用，推荐 `AbortController`；旧 API 目前仍可用 | 中 |
| `0.23` | TypeScript 类型变更：请求数据与响应数据类型分离，部分 `never` 改为 `unknown` | 中 |
| `0.25` | `maxBodyLength` 限制更严格生效；缺少 URL 时更早抛错 | 中 |
| `0.27` | 引入 `AxiosError`；FormData 行为重构；声明 `multipart/form-data` 时普通对象会自动转为 FormData | 高 |
| `1.0` | ESM/CJS 包入口和 `exports` 变化；`headers` 改为 `AxiosHeaders`；`paramsSerializer` 配置形式变化；代码基线升级到 ES2017 | 很高 |
| `1.15+` | 请求头包含 CR/LF 时直接抛错；代理绕过、SSRF 和重定向安全策略收紧 | 中 |
| `1.16+` | Fetch adapter 开始执行 `maxBodyLength` / `maxContentLength` 限制 | 中 |
| `1.18+` | 非法 URL 直接拒绝；跨域重定向会移除敏感请求头 | 中 |

## 重点迁移风险

### 1. Headers 运行时对象变化

Axios 1.x 在请求和响应处理中使用 `AxiosHeaders`。旧代码中的直接属性访问有一定兼容性，但已不推荐；下面这些写法需要重点审计：

```js
config.headers.common.Authorization = token
config.headers.Authorization = token
Object.keys(response.headers)
JSON.stringify(response.headers)
```

建议使用 `AxiosHeaders` API：

```js
config.headers.set('Authorization', token)
config.headers.get('Authorization')
config.headers.delete('Authorization')
```

需要普通对象时使用：

```js
const headers = response.headers.toJSON()
```

特别注意：在 Axios 1.x 的请求 interceptor 中，`config.headers` 通常已经完成扁平化，不应再依赖 `config.headers.common` 或 `config.headers[method]`。

### 2. `paramsSerializer` 配置变化

`0.19` 常见写法是直接传函数：

```js
paramsSerializer: params => qs.stringify(params)
```

建议迁移为 Axios 1.x 的对象写法：

```js
paramsSerializer: {
  serialize: params => qs.stringify(params)
}
```

当前版本重新支持直接传函数，但对象形式与 Axios 1.x 类型定义及后续兼容性更一致。升级后应对数组、嵌套对象、空值和特殊字符生成的 URL 做快照对比。

### 3. FormData 和请求体序列化

`0.27` 开始，Axios 支持在请求头声明 `multipart/form-data` 时，把普通对象自动序列化为 FormData。数组、FileList 以及带 `{}`、`[]` 后缀的字段可能产生特殊序列化结果。

浏览器中不要手动设置 FormData 的 `Content-Type`，否则可能缺少 multipart boundary：

```js
axios.post(url, formData)
```

还需要检查 `application/x-www-form-urlencoded` 请求。Axios 1.0 增加了普通对象的自动 URL-encoded 序列化，可能改变服务端实际收到的请求体。

### 4. 错误对象和错误判断

`0.27` 引入并推广 `AxiosError`。旧版错误本质上是增强后的原生 `Error`，新版本增加了标准化错误类型、错误码和 `isAxiosError` 标记。

建议使用：

```js
axios.isAxiosError(error)
error.response?.status
error.code
```

不要依赖以下内容保持不变：

- 错误构造函数名称
- 完整错误消息文本
- 错误对象属性是否可枚举
- 不同 adapter 返回的底层错误细节

`validateStatus` 的默认语义没有因 Axios 1.x 变成“所有错误统一抛出”；response interceptor 仍可通过返回 resolved Promise 处理错误。

### 5. 包入口、模块系统和内部导入

Axios 1.x 使用 ESM、CJS 条件导出和 `exports`。应用应优先使用公开入口：

```js
import axios from 'axios'
```

CommonJS、旧版 bundler、TypeScript 的模块互操作需要在实际构建链中验证。以下内部导入尤其容易被 `exports` 限制：

```js
require('axios/lib/...')
import helper from 'axios/lib/...'
```

自定义 adapter、内部工具、直接读取 Axios 源码路径的代码，不应依赖未公开的内部路径。

### 6. TypeScript 类型变化

从 `0.19` 的宽松类型升级后，以下代码可能出现编译错误：

- `headers` 不再是任意 `any`，而是 `AxiosRequestHeaders` / `AxiosHeaders`
- 请求体和响应体使用不同泛型
- 部分类型从 `never` 改为 `unknown`
- `paramsSerializer` 直接函数形式的类型发生变化
- 自定义 transformer 和 adapter 的 `config`、`headers` 类型更严格

建议为 API 响应显式指定泛型：

```ts
interface UserResponse {
  id: number
  name: string
}

const response = await axios.get<UserResponse>('/api/user')
```

### 7. 取消请求

`CancelToken` 自 `0.22.0` 起已弃用，但 `1.19.0` 仍保留。新代码建议使用：

```js
const controller = new AbortController()

axios.get(url, { signal: controller.signal })
controller.abort()
```

现有 `CancelToken` 可以先保持，后续再逐步替换；同时验证 `axios.isCancel(error)` 和 `error.code === 'ERR_CANCELED'` 的判断逻辑。

## 其他行为变化

以下变化主要是安全修复，但可能影响既有业务：

- 设置包含 `\r` 或 `\n` 的请求头值会直接抛错。
- `NO_PROXY` / `no_proxy` 的主机匹配规则更严格，代理路径可能改变。
- 跨域重定向时，Authorization 等敏感请求头会被移除。
- Fetch adapter 现在会执行请求体和响应体大小限制。
- 格式错误的 `http:` / `https:` URL 会抛出 `ERR_INVALID_URL`。

## 升级前审计关键词

```text
axios/lib
headers.common
headers[method]
CancelToken
isCancel
paramsSerializer
maxBodyLength
maxContentLength
multipart/form-data
application/x-www-form-urlencoded
transformRequest
transformResponse
axios.all
axios.spread
require('axios')
```

## 验证清单

升级前后应至少对比以下场景：

- 请求和响应 interceptor 中 headers 的修改、读取和序列化
- 自定义 `paramsSerializer` 生成的最终 URL
- JSON、URL-encoded、FormData 请求体
- 大文件上传和流式响应
- `CancelToken`、`AbortController` 取消请求
- 超时、网络错误、HTTP `4xx` / `5xx` 错误码
- Node.js `require`、浏览器打包和 TypeScript 编译
- 代理、跨域重定向和认证头传递

## 参考资料

- [Axios 1.x CHANGELOG](https://github.com/axios/axios/blob/v1.x/CHANGELOG.md)
- [Axios 1.0.0 CHANGELOG](https://github.com/axios/axios/blob/v1.0.0/CHANGELOG.md)
- [Axios 0.27.0 CHANGELOG](https://github.com/axios/axios/blob/v0.27.0/CHANGELOG.md)
- [Axios npm package](https://www.npmjs.com/package/axios)
- [Axios documentation](https://axios-http.com/)
