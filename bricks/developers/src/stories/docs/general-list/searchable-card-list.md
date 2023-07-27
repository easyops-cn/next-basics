[//]: # "atom-bricks/card/searchable-card-list.ts"

<details>
<summary>History</summary>

| Version | Change                                   |
| ------- | ---------------------------------------- |
| 1.27.0  | 新属性 `target`,`href`,`fields.disabled` |

</details>

# INPUTS

扩展自`general-card-list`，其他属性参考[general-card-list](developers/brick-book/template/general-list.general-card-list)。

| property              | type                 | required | default | description                                                                                                                                          |
| --------------------- | -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| showCard              | boolean              | -        | true    | 是否显示外层卡片                                                                                                                                     |
| cardProps             | object               | -        | -       | 配置外层卡片相关属性 具体详情参考 [通用卡片构件](developers/brick-book/brick/basic-bricks.general-card)                                              |
| toolbarBricks         | BrickConf[]          | -        | -       | 右上角操作区 toolbar slots 的 bricks。                                                                                                               |
| beforeSearchBricks    | BrickConf[]          | -        | -       | 搜索框前面插入的 bricks。                                                                                                                            |
| afterSearchBricks     | BrickConf[]          | -        | -       | 搜索框后面插入的 bricks。                                                                                                                            |
| belowSearchBricks     | BrickConf[]          | -        | -       | 搜索框下面插入的 bricks。                                                                                                                            |
| searchProps           | Record<string, any>  | -        | -       | [brick-general-search](developers/brick-book/brick/presentational-bricks.brick-general-search)的一些属性                                             |
| showRecent            | boolean              | -        | false   | 是否显示最近访问构件                                                                                                                                 |
| namespace             | string               | -        | -       | 储存在 localStorage 的 brick-next-history 中的 namespace                                                                                             |
| property              | string               | -        | -       | 储存在 localStorage 的 brick-next-history 中的 property                                                                                              |
| visitCountLimit       | number               | -        | -       | 读取最近访问数量                                                                                                                                     |
| label                 | string               | -        | -       | 列表数据的哪个字段作为标签文案                                                                                                                       |
| compareSource         | Record<string,any>[] | -        | -       | 最近访问数据的对比源，不传的时候会直接返回最近访问的数据，传了会对访问数据进行过滤，排除掉对比源中不存在的数据，例如被删除的数据将不会显示在页面上。 |
| compareSourceProperty | string               | -        | -       | 可配置 compareSource 中哪个数据作为 property，一般情况不需配置。                                                                                     |
| emptyInnerHtml        | string               | -        | -       | 空数据时的额外提示，支持 HTML 格式                                                                                                                   |
