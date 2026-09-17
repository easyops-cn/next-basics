[//]: # "business-bricks/monitor-log/tail-log.ts"

> Tips: The developers site does not currently support scheduled refresh, so the effect of refreshing every five seconds cannot be seen here. See [Scenario Example - View Logs](developers/demo/tail-log) for the effect.

# INPUTS

| property  | type                                  | required | default | description                     |
| --------- | ------------------------------------- | -------- | ------- | ------------------------------- |
| targets   | { instanceId: string; ip: string; }[] | ✔️       | -       | Target machines                 |
| filePath  | string                                | ✔️       | -       | File path                       |
| lastLines | string                                | -        | -       | Number of lines to read, as a numeric string |
| keyword   | string                                | -        | -       | Keyword                         |
