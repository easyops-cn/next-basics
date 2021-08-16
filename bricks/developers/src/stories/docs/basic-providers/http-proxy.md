[//]: # "atom-bricks/other/http-proxy.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 1.x.0   | 新增构件 `basic-providers.http-proxy` |

</details>

# INPUTS

| property    | type                | required | default | description                                                                                                                                                                                                                                                                                                     |
| ----------- | ------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| serviceName | string              | false    | -       | api_gateway 代理的服务名称 <br>[api_gateway 转发规则配置](https://github.com/easyops-cn/simple-user-admin#api_gateway-%E8%BD%AC%E5%8F%91%E8%A7%84%E5%88%99%E9%85%8D%E7%BD%AE)<br>如果想要直接将请求发到指定的 `origin` 而不通过 api_gateway 转发，请不要设置这个参数，`serviceName`和`origin`两者必须要设置一个 |
| origin      | string              | false    | -       | 请求的 origin(协议+服务器名称+端口号)                                                                                                                                                                                                                                                                           |
| api         | string              | true     | -       | 请求的 url                                                                                                                                                                                                                                                                                                      |
| method      | string              | true     | -       | 请求方式                                                                                                                                                                                                                                                                                                        |
| params      | Record<string, any> | false    | -       | 请求的参数                                                                                                                                                                                                                                                                                                      |
| body        | BodyInit            | false    | -       | 请求主体                                                                                                                                                                                                                                                                                                        |
| headers     | Record<string, any> | false    | -       | 请求头                                                                                                                                                                                                                                                                                                          |

```typescript
type BodyInit =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | string;
```

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
