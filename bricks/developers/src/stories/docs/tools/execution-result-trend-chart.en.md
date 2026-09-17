[//]: # "business-bricks/tool-and-flow/execution-result-trend-chart-template.ts"

# Description

Obtains the tool execution result through `execId`, and displays the tool output as a trend chart with IP as the dimension

**`Limited to tool output with only two columns of data: the first column is a time string, and the second column is data`**

For example:

```
2019-10-20T23:41:27 29.9
2019-10-20T23:41:31 4
2019-10-20T23:41:35 9.9
2019-10-20T23:41:38 0
2019-10-20T23:41:42 4
2019-10-20T23:41:45 0
2019-10-20T23:41:49 2
2019-10-20T23:41:53 0
2019-10-20T23:41:56 4
```

# INPUTS

| property | type   | required | default | description     |
| -------- | ------ | -------- | ------- | --------------- |
| execId   | string | ✔️       | -       | Execution tool result id |
