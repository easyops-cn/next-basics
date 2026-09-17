[//]: # "business-bricks/cmdb-instances/instance-edit.ts"

# INPUTS

| property         | type                                          | required | default                                          | description                                                                      |
| ---------------- | --------------------------------------------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| objectId         | string                                        | true     | -                                                | Model ID                                                                         |
| instanceId       | string                                        | true     | -                                                | Instance ID                                                                      |
| brickList        | ModelAttributeFormChildren[]                  | false    | -                                                | Bricks for custom form items                                                     |
| fieldsByTag      | fieldsByTag[]                                 | false    | -                                                | Set the specified fields and the category they belong to                         |
| formItemProps    | FormItemProps（ant-design）                   | false    | {labelCol: { span: 3 },wrapperCol: { span: 17 }} | Set the ratio of form.item                                                        |
| blackList        | string[]                                      | false    | -                                                | Blacklist, composed of an array of property IDs. fieldsByTag should not be set when this property is set |
| bindRelationId   | string                                        | false    | -                                                | The relation ID to bind after successfully creating a single instance            |
| bindInstanceId   | string                                        | false    | -                                                | The peer instance ID to bind after successfully creating a single instance       |
| showCancelButton | boolean                                       | -        | true                                             | Whether to show the cancel button                                                |
| cancelText       | string                                        | -        | Cancel                                           | Cancel button name                                                               |
| cancelType       | default\|primary\|ghost\|dashed\|danger\|link | -        | default                                          | Cancel button type                                                               |

## ModelAttributeFormChildren

| property | type     | required            | default | description                      |
| -------- | -------- | ------------------- | ------- | -------------------------------- |
| header   | string   | true                | -       | Category name                    |
| name     | string   | true                | -       | Name of the brick used           |
| label    | string[] | true                | -       | The label of the form item       |
| options  | string[] | Record<string, any> | -       | Params of the brick              |

## fieldsByTag

| property | type     | required | default | description                                     |
| -------- | -------- | -------- | ------- | ----------------------------------------------- |
| name     | string   | true     | -       | Category name                                   |
| fields   | string[] | true     | -       | An array of property IDs under the category     |

# METHODS

| name        | params                                                                          | description                    |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------ |
| onSubmitted | (data: { data: InstanceApi.UpdateInstanceResponseBody;failed:boolean;}) => void | Callback for updating the instance |

# EVENTS

| type                  | detail                                                        | description                            |
| --------------------- | ------------------------------------------------------------- | -------------------------------------- |
| update.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | Failed to update a single instance     |
| update.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | Successfully updated a single instance |
| update.single.cancel  | null                                                          | Event triggered by the cancel button   |
