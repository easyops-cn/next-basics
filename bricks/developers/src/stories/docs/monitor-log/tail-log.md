[//]: # "business-bricks/monitor-log/tail-log.ts"

> Tips: 当前 developers 不支持定时刷新功能，所以此处看不到每隔五秒定时刷新的效果。可到[场景示例-查看日志](developers/demo/tail-log)中查看效果。

# INPUTS

| property  | type                                  | required | default | description            |
| --------- | ------------------------------------- | -------- | ------- | ---------------------- |
| targets   | { instanceId: string; ip: string; }[] | ✔️       | -       | 目标机器               |
| filePath  | string                                | ✔️       | -       | 文件路径               |
| lastLines | string                                | -        | -       | 读取行数，数字型字符串 |
| keyword   | string                                | -        | -       | 关键字                 |
