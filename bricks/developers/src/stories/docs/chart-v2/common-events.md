# EVENTS

| type                | detail                                             | description                                                                                         |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| chart-v2.click      | { data: object, clientX: number, clientY: number } | data 代表该点数据；clientX, clientY 为点击事件发生的屏幕位置                                        |
| chart-v2.plot.click | { data: object, clientX: number, clientY: number } | data 代表 tooltip 上的原始数据；clientX, clientY 为点击事件发生的屏幕位置(只支持`折线图`，`面积图`) |
