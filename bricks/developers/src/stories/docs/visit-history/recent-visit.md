[//]: # "atom-bricks/other/recent-visit.ts"

> Tips: 可以配合构件 [visit-history.push-history-record](developers/brick-book/brick/visit-history.push-history-record) 使用，将该构件放在对应需要新增记录的页面（常见详情页）中，将会自动新增访问记录。而最近访问构件直接用来展示访问记录。

# INPUTS

| property          | type                                             | required | default | description                                                                                                                                          |
| ----------------- | ------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| namespace         | string                                           | ✔️       | -       | 储存在 localStorage 的 brick-next-history 中的 namespace                                                                                             |
| property          | string                                           | ✔️       | -       | 储存在 localStorage 的 brick-next-history 中的 属性名，常见情况是设置成`id`                                                                          |
| visitCountLimit   | string                                           | -        | 5       | 读取最近访问数量                                                                                                                                     |
| fields            | { label?: string;compareSourceProperty?:string;} | -        | -       | 列表数据的哪个字段作为标签文案，compareSourceProperty 可配置 compareSource 中哪个数据作为 property，一般情况不需配置。                               |
| detailUrlTemplate | string                                           | -        | -       | 点击标签跳转的 url 链接，支持模版变量                                                                                                                |
| compareSource     | Record<string,any>[]                             | -        | -       | 最近访问数据的对比源，不传的时候会直接返回最近访问的数据，传了会对访问数据进行过滤，排除掉对比源中不存在的数据，例如被删除的数据将不会显示在页面上。 |

> Tips: 可配合以下 provider 使用

| provider name                          | args                                                        | description      |
| -------------------------------------- | ----------------------------------------------------------- | ---------------- |
| "visit-history.provider-push-history"  | (namespace: string, property: any, data: any)               | 新增一个访问记录 |
| "visit-history.provider-get-history"   | (namespace: string, property: any, visitCountLimit: number) | 获取访问记录     |
| "visit-history.provider-clear-history" | (namespace: string, property: any)                          | 清空访问记录     |

# EVENTS

| type               | detail | description                                          |
| ------------------ | ------ | ---------------------------------------------------- |
| recent.visit.click | object | 最近访问标签点击事件，事件内容为被点击的那条访问记录 |
