[//]: # "business-bricks/real-time-monitor/process-monitor.ts"

> Tips: 当前 developers 不支持定时刷新功能，所以此处看不到每隔五秒定时刷新的效果。可到[场景示例-进程监控](developers/demo/process-monitor)中查看效果。

# INPUTS

| property      | type                                  | required | default | description                  |
| ------------- | ------------------------------------- | -------- | ------- | ---------------------------- |
| targets       | { instanceId: string; ip: string; }[] | ✔️       | -       | 目标机器                     |
| keyword       | string                                | ✔️       | -       | 进程关键字                   |
| maxDataPoints | number                                | -        | 30      | 最大数据点个数，默认 30 个。 |
