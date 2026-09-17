[//]: # "business-bricks/cmdb-instances/instance-create-modal.ts"

# INPUTS

| property            | type                                                                            | required | default | description                |
| ------------------- | ------------------------------------------------------------------------------- | -------- | ------- | -------------------------- |
| title               | string                                                                          | true     | -       | Modal title                 |
| objectId            | string                                                                          | true     | -       | Model ID                    |
| visible             | boolean                                                                         | true     | -       | Whether it is visible                   |
| allowContinueCreate | boolean                                                                         | false    | -       | Whether to show the 'Continue Creating' checkbox |
| attributeKeys       | string[]                                                                        | false    | -       | The property fields to display             |
| onSubmitted         | (data: { data: InstanceApi.CreateInstanceResponseBody;failed:boolean;}) => void | false    | -       | Callback after creating the instance               |

# EVENTS

| type                  | detail                                                        | description  |
| --------------------- | ------------------------------------------------------------- | ------------ |
| create.single.failed  | {data: InstanceApi.CreateInstanceResponseBody,failed: true;}  | Failed to create the instance |
| create.single.success | {data: InstanceApi.CreateInstanceResponseBody,failed: false;} | The instance was created successfully |

# METHODS

| name      | params | description |
| --------- | ------ | ----------- |
| openModal | -      | Open the modal  |
