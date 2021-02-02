[//]: # "atom-bricks/other/push-history-record.ts"

Tips: 该构件需要设置成 bg:true。它只作为新增访问记录的功能构件，在页面中是不显示的。

# INPUTS

| property  | type               | required | default | description                                                                 |
| --------- | ------------------ | -------- | ------- | --------------------------------------------------------------------------- |
| namespace | string             | ✔️       | -       | 储存在 localStorage 的 brick-next-history 中的 namespace                    |
| property  | string             | ✔️       | -       | 储存在 localStorage 的 brick-next-history 中的 属性名，常见情况是设置成`id` |
| data      | Record<string,any> | ✔️       | -       | 记录数据                                                                    |
