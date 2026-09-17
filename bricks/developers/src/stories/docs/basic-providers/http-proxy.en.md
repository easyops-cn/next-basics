[//]: # "atom-bricks/other/http-proxy.ts"

<details>
<summary>History</summary>

| Version | Change                                 |
| ------- | -------------------------------------- |
| 1.0.0   | New brick `basic-providers.http-proxy` |

</details>

# INPUTS

| property    | type                | required | default | description                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------- | ------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| serviceName | string              | false    | -       | The service name proxied by api_gateway <br>[api_gateway forwarding rule configuration](https://github.com/easyops-cn/simple-user-admin#api_gateway-%E8%BD%AC%E5%8F%91%E8%A7%84%E5%88%99%E9%85%8D%E7%BD%AE)<br>If you want to send the request directly to the specified `origin` without forwarding through api_gateway, do not set this parameter. One of `serviceName` and `origin` must be set |
| origin      | string              | false    | -       | The origin of the request (protocol + server name + port)                                                                                                                                                                                                                                                                                                                                          |
| api         | string              | true     | -       | The url of the request                                                                                                                                                                                                                                                                                                                                                                             |
| method      | string              | true     | -       | The request method                                                                                                                                                                                                                                                                                                                                                                                 |
| params      | Record<string, any> | false    | -       | The params of the request                                                                                                                                                                                                                                                                                                                                                                          |
| body        | BodyInit            | false    | -       | The request body                                                                                                                                                                                                                                                                                                                                                                                   |
| headers     | Record<string, any> | false    | -       | The request headers                                                                                                                                                                                                                                                                                                                                                                                |

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
