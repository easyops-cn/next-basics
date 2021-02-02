[//]: # "atom-bricks/form-input/upload-img.ts"

<details>
<summary>History</summary>

| Version | Change                                            |
| ------- | ------------------------------------------------- |
| 1.81.0  | 新增属性`hideUploadButton`                        |
| 1.79.0  | 新增属性`uploadDraggable`，预废弃属性 `draggable` |
| 1.60.0  | 新增属性 `placeholder`,`autoSize`                 |
| 1.54.0  | 新增属性 `draggableUploadText`                    |
| 1.46.0  | 新增构件 `draggableUploadHint`                    |

</details>

# INPUTS

| property            | type                                                | required | default                              | description                                                                                                           |
| ------------------- | --------------------------------------------------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| bucketName          | string                                              | ✔️       | -                                    | 对象存储桶名字，请在业务编排的时候与后台同学商量创建，一般一个业务需求对应一个存储桶名称，相当于 namespace。          |
| value               | {text?: string;images?:{url:string,name?:string}[]} | -        | -                                    | 上传图片表单项的值，`text` 为 textarea 输入框的值，`images` 为图片的值，其中`url`为图片的资源路径，`name`为图片名称。 |
| listType            | "text"\|"picture"\|"picture-card"                   | -        | picture-card                         | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card                                                    |
| maxNumber           | number                                              | -        | -                                    | 最大上传图片数量                                                                                                      |
| showTextarea        | boolean                                             | -        | false                                | 是否显示 textArea                                                                                                     |
| placeholder         | string                                              | -        | -                                    | textArea 输入框占位说明                                                                                               |
| autoSize            | boolean\|{minRows:number,maxRows:number}            | -        | false                                | 自适应内容高度，可设置为 true\|false 或对象：{ minRows: 2, maxRows: 6 }                                               |
| name                | `string`                                            | -        | -                                    | 上传图片表单构件的字段名                                                                                              |
| label               | `string`                                            | -        | -                                    | 上传图片表单构件的字段说明                                                                                            |
| required            | `boolean`                                           | -        | false                                | 是否是必填项                                                                                                          |
| uploadDraggable     | boolean                                             | -        | false                                | 是否可以拖拽上传                                                                                                      |
| draggableUploadText | string                                              | -        | 单击或拖拽图像到此区域上传           | 拖拽上传的文字                                                                                                        |
| draggableUploadHint | string                                              | -        | 支持扩展名：.jpg .jpeg .png .gif ... | 拖拽上传的提示信息                                                                                                    |
| hideUploadButton    | boolean                                             | -        | false                                | 是否隐藏上传按钮，当`uploadDraggable`为`true`时不生效                                                                 |

# EVENTS

| type              | detail                                               | description                  |
| ----------------- | ---------------------------------------------------- | ---------------------------- |
| upload.img.change | {text?: string;images?: {url:string,name:string}[];} | 上传图片表单项变化发出的事件 |
