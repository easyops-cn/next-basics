[//]: # "business-bricks/cmdb-instances/instance-change-history-template.ts"

# INPUTS

| property           | type             | required | default | description    |
| ------------------ | ---------------- | -------- | ------- | -------------- |
| event_id           | string           | true     | -       | 事件 id        |
| event              | string           | true     | -       | 事件名         |
| showCard           | boolean          | false    | true    | 是否显示卡片   |
| detailUrlTemplates | {default:string} | true     | -       | 实例关系的链接 |
| objectUrlTemplates | {default:string} | false    | -       | 模型的链接     |
