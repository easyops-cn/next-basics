[//]: # "business-bricks/cmdb-instances/instance-create.ts"

# INPUTS

| property            | type                                          | required | default                                          | description                                                                      |
| ------------------- | --------------------------------------------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| objectId            | string                                        | ✔️       | -                                                | Model ID                                                                         |
| allowContinueCreate | boolean                                       | -        | false                                            | Whether another instance needs to be created continuously                       |
| brickList           | ModelAttributeFormChildren[]                  | -        | -                                                | Bricks for custom form items                                                     |
| fieldsByTag         | fieldsByTag[]                                 | -        | -                                                | Set the specified fields and the category they belong to                         |
| formItemProps       | FormItemProps（ant-design）                   | -        | {labelCol: { span: 3 },wrapperCol: { span: 17 }} | Set the ratio of form.item                                                       |
| blackList           | string[]                                      | -        | -                                                | Blacklist composed of an array of property IDs; fieldsByTag should not be set when setting this property |
| bindRelationId      | string                                        | -        | -                                                | Relation ID to bind after a single instance is created successfully              |
| bindInstanceId      | string                                        | -        | -                                                | Peer instance ID to bind after a single instance is created successfully         |
| showCancelButton    | boolean                                       | -        | true                                             | Whether to display the cancel button                                             |
| cancelText          | string                                        | -        | Cancel                                           | Cancel button name                                                               |
| cancelType          | default\|primary\|ghost\|dashed\|danger\|link | -        | default                                          | Cancel button type                                                               |
| isApprove           | boolean                                       | - ｜ -   | Whether to apply for creation                    |

## ModelAttributeFormChildren

| property | type     | required | default | description             |
| -------- | -------- | -------- | ------- | ----------------------- |
| header   | string   | ✔️       | -       | Category name           |
| name     | string   | ✔️       | -       | Name of the brick used  |
| label    | string[] | ✔️       | -       | Label of the form item  |
| options  | string[] | -        | -       | Params of the brick     |

## fieldsByTag

| property | type     | required | default | description                              |
| -------- | -------- | -------- | ------- | ---------------------------------------- |
| name     | string   | ✔️       | -       | Category name                            |
| fields   | string[] | ✔️       | -       | Array of property IDs under the category |

# METHODS

| name        | params                                                                          | description                    |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------ |
| onSubmitted | (data: { data: InstanceApi.CreateInstanceResponseBody;failed:boolean;}) => void | Callback for creating a single instance |

# EVENTS

| type                  | detail                                                        | description                              |
| --------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| create.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | Single instance created successfully     |
| create.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | Failed to create a single instance       |
| create.single.cancel  | null                                                          | Event triggered by the cancel button     |
