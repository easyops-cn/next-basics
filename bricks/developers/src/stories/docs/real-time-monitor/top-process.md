[//]: # "business-bricks/real-time-monitor/top-process.ts"

> Tips: 当前 developers 不支持定时刷新功能，所以此处看不到每隔三秒定时刷新的效果。在 storyboard 中配置是可以看到效果的。

# INPUTS

| params     | type         | required | default | description         |
| ---------- | ------------ | -------- | ------- | ------------------- |
| instanceId | string       | ✔️       | -       | 主机实例 ID         |
| topN       | string       | -        | 10      | top number          |
| sort       | "cpu"\|"mem" | -        | "cpu"   | 按 cpu 或者内存排序 |
