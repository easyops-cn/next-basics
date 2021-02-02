[//]: # "business-bricks/cmdb-instances/instance-remove-relation-wrapper.ts"

# INPUTS

| property       | type     | required | default | description                                                                 |
| -------------- | -------- | -------- | ------- | --------------------------------------------------------------------------- |
| description    | string   | ✔️       | -       | 实例移除关系提示                                                            |
| objectId       | string   | ✔️       | -       | CMDB 模型 ID                                                                |
| instanceId     | string   | ✔️       | -       | 实例 ID                                                                     |
| relationSideId | string   | ✔️       | -       | 关联实例 ID                                                                 |
| selectedKeys   | string[] | -        | -       | 默认选中的实例                                                              |
| configProps    | object   | -        | -       | ant-design 的 Button 相关[配置项](https://ant.design/components/button-cn/) |
