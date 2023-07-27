[//]: # "business-bricks/tool-and-flow/tool-execution-results-table-template.ts"

# 描述

工具执行结果用列表的方式展示，这个 template 需要定制化 provider，返回数据 columns 和 dataSource。

# INPUTS

| property   | type                  | required | default | description                                                                              |
| ---------- | --------------------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| columns    | CustomColumn[]        | ✔️       | -       | 同[brick-table](developers/brick-book/brick/presentational-bricks.brick-table)的 columns |
| dataSource | Record<string, any>[] | ✔️       | -       | table 的数据源                                                                           |
