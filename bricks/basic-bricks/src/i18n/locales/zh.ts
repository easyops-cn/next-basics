import { Locale, K } from "../constants";

const locale: Locale = {
  [K.BASIC_BRICKS]: "基础构件",
  [K.LOGOUT]: "登出",
  [K.LOGIN]: "登录",
  [K.ACCOUNT_MANAGEMENT]: "我的账户",
  [K.PAGE_NOT_FOUND_TITLE]: "糟糕！页面没有找到。",
  [K.PAGE_NOT_FOUND_DESC]: "请求的页面 “{{url}}” 没有找到。",
  [K.PAGE_ERROR_TITLE]: "糟糕！页面出现了一些问题。",
  [K.BRICK_ERROR]: "糟糕！构件出现了一些问题。",
  [K.LEGACY_TEMPLATE_ERROR]: "糟糕！（老）模板出现了一些问题。",
  [K.HELP]: "帮助",
  [K.CANCEL]: "取消",
  [K.OK]: "确定",
  [K.COVERT_TO_LANGUAGE]: "Convert to English",
  [K.SWITCH_THEME]: "切换主题",
  [K.LIGHT_THEME]: "默认主题",
  [K.DARK_THEME]: "暗黑主题",
  [K.SEARCH_BY_NAME_KEYWORD]: "通过名称/关键字搜索",
  [K.FORBIDDEN]: "无访问权限",
  [K.NOT_FOUND]: "未找到页面",
  [K.SERVER_ERROR]: "服务端异常",
};

export default locale;
