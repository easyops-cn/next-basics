[//]: # "business-bricks/tool-and-flow/tool-execution-results-table-template.ts"

# Description

Tool execution results are displayed as a list. This template requires a customized provider that returns the data columns and dataSource.

# INPUTS

| property   | type                  | required | default | description                                                                              |
| ---------- | --------------------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| columns    | CustomColumn[]        | ✔️       | -       | The same as the columns of [brick-table](developers/brick-book/brick/presentational-bricks.brick-table) |
| dataSource | Record<string, any>[] | ✔️       | -       | The data source of the table                                                             |
