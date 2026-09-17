[//]: # "business-bricks/agile/comment-brick.ts"

<details>
<summary>History</summary>

| Version | Change                                                                             |
| ------- | ---------------------------------------------------------------------------------- |
| 1.1.0   | New properties `value`, `placeholder`; new events `edit.comment`, `delete.comment` |
| 1.0.0   | New brick `agile.comment-brick`                                                    |

</details>

# INPUTS

| property    | type          | required | default | description                                                                                                           |
| ----------- | ------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| comments    | CommentInfo[] | -        | -       | The comment list, the type is defined in the table below                                                              |
| value       | string        | -        | -       | The value of the comment input box. Usually no need to set. Can be used in scenarios where `value` needs to be reset. |
| placeholder | string        | -        | -       | The placeholder of the comment input box                                                                              |

### CommentInfo

| property | type             | required | default | description                                                                                                                                                                                                                                            |
| -------- | ---------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| body     | string           | ✔️       | -       | The comment content                                                                                                                                                                                                                                    |
| ctime    | string\|number   | ✔️       | -       | The comment time                                                                                                                                                                                                                                       |
| author   | Author\|Author[] | ✔️       | -       | The comment author, the type is defined in the table below. If `type` is `Author`, the corresponding `name` and `user_icon` information is taken directly. If it is `Author[]`, the information corresponding to the first item of the array is taken. |

### Author

| property  | type   | required | default | description   |
| --------- | ------ | -------- | ------- | ------------- |
| name      | string | ✔️       | -       | Author name   |
| user_icon | string | ✔️       | -       | Author avatar |

# EVENTS

| type           | detail             | description                                                  |
| -------------- | ------------------ | ------------------------------------------------------------ |
| add.comment    | {body:string}      | The post-comment event. detail is the content of the comment |
| edit.comment   | {item:CommentInfo} | The edit-comment event                                       |
| delete.comment | {item:CommentInfo} | The delete-comment event                                     |
