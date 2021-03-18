import { Locale, K } from "../constants";

const locale: Locale = {
  [K.NEXT_BUILDER]: "Next Builder",
  [K.LIBRARY]: "构件库",
  [K.EVENTS]: "事件",
  [K.DATA]: "数据 (Context)",
  [K.SEARCH_BRICKS_IN_LIBRARY]: "搜索构件",
  [K.SEARCH_DATA]: "搜索数据",
  [K.SEARCH_BRICKS_WITH_EVENTS]: "搜索内含事件的构件",
  [K.SEARCH_ROUTE]: "搜索路由",
  [K.SEARCH_TEMPLATE]: "搜索模板",
  [K.ADD_DATA]: "添加数据",
  [K.SETTING]: "设置",
  [K.BRICK_LIBRARY]: "构件库",
  [K.VIEW_ROUTE]: "查看路由",
  [K.VIEW_TEMPLATE]: "查看模板",
  [K.BUILD_AND_PUSH_TOOLTIP]: "构建并推送 (Ctrl+B)",
  [K.PREVIEW]: "预览",
  [K.TIPS]: "提示",
  [K.STORYBOARD_VIEW_TIPS_1_ROUTE]:
    "<i>Storyboard</i> 视图显示当前路由的构件树。",
  [K.STORYBOARD_VIEW_TIPS_1_TEMPLATE]:
    "<i>Storyboard</i> 视图显示当前模板的构件树。",
  [K.STORYBOARD_VIEW_TIPS_2]:
    "拖放构件或挂载点来更改它们的排列顺序。或者拖放构件来更改挂载点。",
  [K.STORYBOARD_VIEW_TIPS_3]:
    "在搜索框中输入关键字，根据配置信息来搜索 Storyboard 中的构件。",
  [K.LIBRARY_VIEW_TIPS_1]: "<i>构件库</i>列出所有可用构件。",
  [K.LIBRARY_VIEW_TIPS_2]: "可以搜索并拖放构件到画布中。",
  [K.EVENTS_VIEW_TIPS_1]:
    "<i>事件</i>视图列出有事件监听器或被指定为事件目标的构件。",
  [K.EVENTS_VIEW_TIPS_2]: "点击一个构件来显示它的事件图表。",
  [K.DATA_VIEW_TIPS_1]: "在<i>数据</i>视图中可以管理当前路由的数据。",
  [K.DATA_VIEW_TIPS_2]:
    "数据可以是变量值，也可以是使用 Provider 构件调用获取的远端接口数据。",
  [K.DATA_VIEW_TIPS_3]: "数据在 Storyboard 中也被称作 <i>Context</i>。",
  [K.FIND]: "查找",
};

export default locale;
