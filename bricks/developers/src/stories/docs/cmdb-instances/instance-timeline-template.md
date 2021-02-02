[//]: # "business-bricks/cmdb-instances/instance-timeline-template.ts"

# INPUTS

| property           | type             | required | default | description    |
| ------------------ | ---------------- | -------- | ------- | -------------- |
| instanceId         | string           | true     | -       | 实例 id        |
| objectId           | string           | true     | -       | 模型 id        |
| showFilter         | boolean          | false    | -       | 是否显示过滤项 |
| detailUrlTemplates | {default:string} | true     | -       | 实例关系的链接 |
