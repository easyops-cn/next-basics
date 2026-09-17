[//]: # "atom-bricks/other/push-history-record.ts"

Tips: This brick needs to be set as bg:true. It only serves as a functional brick for adding visit records and is not displayed on the page.

# INPUTS

| property  | type               | required | default | description                                                                          |
| --------- | ------------------ | -------- | ------- | ------------------------------------------------------------------------------------ |
| namespace | string             | ✔️       | -       | The namespace stored in brick-next-history of localStorage                           |
| property  | string             | ✔️       | -       | The property name stored in brick-next-history of localStorage, commonly set to `id` |
| data      | Record<string,any> | ✔️       | -       | The record data                                                                      |
