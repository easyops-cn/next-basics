[//]: # "business-bricks/real-time-monitor/process-monitor.ts"

> Tips: The developers site does not currently support scheduled refresh, so the effect of refreshing every five seconds cannot be seen here. See [Demo - Process Monitor](developers/demo/process-monitor) for the effect.

# INPUTS

| property      | type                                  | required | default | description                  |
| ------------- | ------------------------------------- | -------- | ------- | ---------------------------- |
| targets       | { instanceId: string; ip: string; }[] | ✔️       | -       | Target machine                     |
| keyword       | string                                | ✔️       | -       | Process keyword                   |
| maxDataPoints | number                                | -        | 30      | Maximum number of data points. 30 by default. |
