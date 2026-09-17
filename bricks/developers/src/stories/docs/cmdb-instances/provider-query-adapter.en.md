[//]: # "atom-bricks/data-convert/provider-query-adapter.ts"

# INPUTS

| property | type                 | required | default | description                   |
| -------- | -------------------- | -------- | ------- | ----------------------------- |
| op       | "$and"\|"$or"        | ✔️       | -       | Condition joining operator $and\|$or       |
| query    | Record<string,any>[] | ✔️       | -       | Query condition template configuration              |
| values   | Record<string,any>   | ✔️       | -       | Query condition values, usually from url params |
