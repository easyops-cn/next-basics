[//]: # "business-bricks/agile/comment-brick.ts"

<details>
<summary>History</summary>

| Version | Change                                                                   |
| ------- | ------------------------------------------------------------------------ |
| 1.1.0   | 新增属性 `value`、`placeholder`;新增事件`edit.comment`、`delete.comment` |
| 1.0.0   | 新增构件 `agile.comment-brick`                                           |

</details>

# INPUTS

| property    | type          | required | default | description                                                 |
| ----------- | ------------- | -------- | ------- | ----------------------------------------------------------- |
| comments    | CommentInfo[] | -        | -       | 评论列表，具体类型如下表                                    |
| value       | string        | -        | -       | 评论输入框的值，一般不用设置，可用于需重置 `value` 的场景。 |
| placeholder | string        | -        | -       | 评论输入框占位说明                                          |

### CommentInfo

| property | type             | required | default | description                                                                                                                         |
| -------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| body     | string           | ✔️       | -       | 评论内容                                                                                                                            |
| ctime    | string\|number   | ✔️       | -       | 评论时间                                                                                                                            |
| author   | Author\|Author[] | ✔️       | -       | 评论作者，具体类型如下表，如果`type`为`Author`，则直接取对应的`name`和`user_icon`信息。如果为`Author[]`，则取数组第一项对应的信息。 |

### Author

| property  | type   | required | default | description |
| --------- | ------ | -------- | ------- | ----------- |
| name      | string | ✔️       | -       | 作者名称    |
| user_icon | string | ✔️       | -       | 作者头像    |

# EVENTS

| type           | detail             | description                       |
| -------------- | ------------------ | --------------------------------- |
| add.comment    | {body:string}      | 发表评论事件，detail 为评论的内容 |
| edit.comment   | {item:CommentInfo} | 编辑评论事件                      |
| delete.comment | {item:CommentInfo} | 删除评论事件                      |
