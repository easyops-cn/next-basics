[//]: # "atom-bricks/data-convert/script-brick.ts"

<details>
<summary>History</summary>

| Version | Change                                                   |
| ------- | -------------------------------------------------------- |
| 1.x36.0 | 新增方法 `sendNotify` 和事件 `data.true` 和 `data.false` |

</details>

# INPUTS

| property  | type               | required | default | description                                                                                                                         |
| --------- | ------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| fun       | string             | ✔️       | -       | 自定义函数，入参为`data`，注意要`return`，如`return {'a': data.split('.')};"`                                                       |
| target    | string             | -        | -       | 目标构件，格式为`css selector`，如果不在这边填，也可以通过事件来给其他构件赋值                                                      |
| data      | any                | -        | -       | 可通过 useResolve 来更新 data 字段并执行，具体见第 2 个示例                                                                         |
| multiple  | boolean            | -        | -       | 目标构件是否为多个，target 有值时生效                                                                                               |
| transform | `GeneralTransform` | -        | -       | 属性数据转换配置，请参考[Transform 数据转换]，当 target 有值时，可直接在此处做数据的转换，注意，如果`target`有值，`transform`也要填 |

# EVENTS

| type           | detail | description             |
| -------------- | ------ | ----------------------- |
| script.execute | any    | 自定义函数`fun`返回的值 |
| data.true      | any    | 自定义函数`fun`返回的值 |
| data.false     | any    | 自定义函数`fun`返回的值 |

# METHODS

| name       | params | description                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------ |
| execute    | data   | 透传给自定义函数的入参`data`，并发送`script.execute`事件，注意该函数不改变内部的 data 变量 |
| sendNotify | -      | 根据内部 data 的值决定发送`data.true`或`data.false`事件                                    |

> `sendNotify`使用场景
>
> 在编排的时候，如果想要动态根据某个条件来决定是否做某个事情，可以：
>
> 1. 在事件或`useResolve`中通过`properties`给`script-brick`的`data`设定标记位，注意不能用`execute`，因为`execute`不改变内部的 data 变量
> 2. 在`script-brick`根据所需绑定的`data.true`的事件或`data.false`事件
> 3. 执行`sendNotify`，则会根据`data`发送`data.true`或`data.false`事件，从而执行不同的绑定行为

[transform 数据转换]: http://docs.developers.easyops.cn/docs/brick-next/transform
