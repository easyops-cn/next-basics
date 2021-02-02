[//]: # "atom-bricks/layout-and-container/carousel-template.ts"

# 描述

<del>该轮播图模板与构件的区别在于，轮播模板提供了运行时处理数据的能力。轮播原子构件只能配置静态的数据，模板则提供了基于动态数据配置的能力，例如根据 provider 数据的返回配置相关轮播内容</del>.

随着框架能力的增强，目前框架已经提供了动态处理数据的能力，所以可以不需要再使用该模板，使用 [轮播构件](developers/brick-book/brick/presentational-bricks.general-carousel) 搭配 `transform` 的能力即可。

# INPUTS

| property             | type              | required | default | description                                                                                                                                                              |
| -------------------- | ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| carouselConfig       | `CarouselProps`   | -        | -       | 轮播相应的属性配置具体详情可参考 [轮播构件](developers/brick-book/brick/presentational-bricks.general-carousel)                                                          |
| component            | `CustomCompProps` | -        | -       | 轮播内容的自定义构件配置项,支持自定义构件使用平台 provider，具体如下所示                                                                                                 |
| events               | `BrickEventsMap`  | -        | -       | 轮播构件的 events 事件配置，目前可传出轮播的点击事件 `general.carousel.click`                                                                                            |
| compsFactoryProvider | `BrickConf`       | -        | -       | 当轮播内容的数量是基于动态数据生成的时候，也就是 components 属性是动态生成的时候使用该配置项。 具体用法可参考 `micro-apps/micro-app-store/storyboard` 中相关轮播内容片段 |

### component

| property      | type                     | required | default | description                                   |
| ------------- | ------------------------ | -------- | ------- | --------------------------------------------- |
| brick         | string                   | ✔️       | -       | 自定义构件名称                                |
| properties    | `Record<string, string>` | -        | -       | 自定义构件属性                                |
| events        | `BrickEventsMap`         | -        | -       | 自定义构件相关事件配置                        |
| resolveConfig | `object`                 | -        | -       | 自定义构件使用 provider 时相关配置， 如下所示 |

### resolveConfig

| property | type   | required | default | description                              |
| -------- | ------ | -------- | ------- | ---------------------------------------- |
| name     | string | ✔️       | -       | 使用 provider 的名称                     |
| path     | string | ✔️       | -       | 使用 provider 的哪些字段作为数据源       |
| key      | string | ✔️       | -       | 把选择好的数据源赋值到相应的自定义构件上 |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |


# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
