[//]: # "atom-bricks/data-convert/provider-query-adapter.ts"

# INPUTS

| property | type                 | required | default | description                   |
| -------- | -------------------- | -------- | ------- | ----------------------------- |
| op       | "$and"\|"$or"        | ✔️       | -       | 条件粘合运算符$and\|$or       |
| query    | Record<string,any>[] | ✔️       | -       | 配置查询条件模板              |
| values   | Record<string,any>   | ✔️       | -       | 查询条件值，通常来自 url 参数 |
