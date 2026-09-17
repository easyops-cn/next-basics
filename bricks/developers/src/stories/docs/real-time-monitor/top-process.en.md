[//]: # "business-bricks/real-time-monitor/top-process.ts"

> Tips: The developers site currently does not support scheduled refresh, so the effect of refreshing every three seconds cannot be seen here. It can be seen when configured in the storyboard.

# INPUTS

| params     | type         | required | default | description           |
| ---------- | ------------ | -------- | ------- | --------------------- |
| instanceId | string       | ✔️       | -       | Host instance ID      |
| topN       | string       | -        | 10      | top number            |
| sort       | "cpu"\|"mem" | -        | "cpu"   | Sort by cpu or memory |
