[//]: # "atom-bricks/form-input/upload-files.ts"

<details>
<summary>History</summary>

| Version | Change                       |
| ------- | ---------------------------- |
| 1.x.0   | 新增构件 `forms.upload-file` |

</details>

# INPUTS

| property   | type                       | required | default | description            |
| ---------- | -------------------------- | -------- | ------- | ---------------------- |
| url        | string                     | ✔️       | -       | 上传的地址             |
| name       | string                     | -        | file    | 发到后台的文件参数名   |
| data       | { [key: string]: string; } | -        | -       | 上传所需额外参数       |
| multiple   | boolean                    | -        | false   | 是否允许选择多个文件   |
| autoUpload | boolean                    | -        | false   | 选择文件后是否直接上传 |
| accept     | string                     | -        | -       | 接受上传的文件类型     |
| text       | UploadFileTextProps        | -        | -       | 文本                   |

### UploadFileTextProps

| property | type   | required | default | description |
| -------- | ------ | -------- | ------- | ----------- |
| main     | string | -        | -       | 主文本      |
| hint     | string | -        | -       | 提示文本    |

# EVENTS

| type                | detail | description                                               |
| ------------------- | ------ | --------------------------------------------------------- |
| upload.file.change  | -      | 选择文件变更事件，仅当 "autoUpload" 属性为 "false" 时触发 |
| upload.file.success | any    | detail 为后台接口返回数据                                 |
| upload.file.failed  | any    | detail 为后台接口返回数据                                 |

# METHODS

| name   | params | description |
| ------ | ------ | ----------- |
| upload | -      | 触发上传    |
