export const recommendActionIds = [
  "history.push",
  "segue.push",
  "history.reload",
  "history.goBack",
];

export const pageSwitchActionIds = [
  "history.push",
  "history.replace",
  "history.goBack",
  "history.goForward",
  "history.reload",
  "history.pushQuery",
  "history.replaceQuery",
  "history.pushAnchor",
  "history.block",
  "history.unblock",
  "legacy.go",
  "location.reload",
  "location.assign",
  "window.open",
];

export const builtinActions = [
  {
    label: "页面跳转(history.push)",
    value: "history.push",
  },
  {
    label: "页面跳转，并替换最新浏览记录(history.replace)",
    value: "history.replace",
  },
  {
    label: "返回上一个页面(history.goBack)",
    value: "history.goBack",
  },
  {
    label: "前进到下一个页面(history.goForward)",
    value: "history.goForward",
  },
  {
    label: "刷新当前页面(history.reload)",
    value: "history.reload",
  },
  {
    label: "更新页面 query 参数(history.pushQuery)",
    value: "history.pushQuery",
  },
  {
    label: "更新页面 query 参数，并替换最新浏览记录(history.replaceQuery)",
    value: "history.replaceQuery",
  },
  {
    label: "跳转到指定的 URL Hash 地址(history.pushAnchor)",
    value: "history.pushAnchor",
  },
  {
    label: "阻止页面离开(history.block)",
    value: "history.block",
  },
  {
    label: "取消之前设置的页面阻止操作(history.unblock)",
    value: "history.unblock",
  },
  {
    label: "成功提示(message.success)",
    value: "message.success",
  },
  {
    label: "错误提示(message.error)",
    value: "message.error",
  },
  {
    label: "信息提示(message.info)",
    value: "message.info",
  },
  {
    label: "告警提示(message.warn)",
    value: "message.warn",
  },
  {
    label: "报错弹框(handleHttpError)",
    value: "handleHttpError",
  },
  {
    label: "更新 Context 值(context.assign)",
    value: "context.assign",
  },
  {
    label: "替换 Context 值(context.replace)",
    value: "context.replace",
  },
  {
    label: "模板发送自定义事件(tpl.dispatchEvent)",
    value: "tpl.dispatchEvent",
  },
  {
    label: "订阅消息(message.subscribe)",
    value: "message.subscribe",
  },
  {
    label: "取消订阅(message.unsubscribe)",
    value: "message.unsubscribe",
  },
  {
    label: "输出信息(console.log)",
    value: "console.log",
  },
  {
    label: "输出错误信息(console.error)",
    value: "console.error",
  },
  {
    label: "输出警告信息(console.warn)",
    value: "console.warn",
  },
  {
    label: "输出提示信息(console.info)",
    value: "console.info",
  },
  {
    label: "页面快捷跳转(segue.push)",
    value: "segue.push",
  },
  {
    label: "页面快捷跳转，并替换最新浏览记录(segue.replace)",
    value: "segue.replace",
  },
  {
    label: "写入本地 localStorage 缓存数据(localStorage.setItem)",
    value: "localStorage.setItem",
  },
  {
    label: "移除本地 localStorage 缓存数据(localStorage.removeItem)",
    value: "localStorage.removeItem",
  },
  {
    label: "写入 sessionStorage 缓存数据(sessionStorage.setItem)",
    value: "sessionStorage.setItem",
  },
  {
    label: "移除 sessionStorage 缓存数据(sessionStorage.removeItem)",
    value: "sessionStorage.removeItem",
  },
  {
    label: "通知 iframe 嵌套的 console 跳转页面(legacy.go)",
    value: "legacy.go",
  },
  {
    label: "浏览器刷新当前页面(location.reload)",
    value: "location.reload",
  },
  {
    label: "浏览器跳转指定页面(location.assign)",
    value: "location.assign",
  },
  {
    label: "浏览器打开新窗口(window.open)",
    value: "window.open",
  },
  {
    label: "阻止默认操作(event.preventDefault)",
    value: "event.preventDefault",
  },
  {
    label: "设置暗黑主题(theme.setDarkTheme)",
    value: "theme.setDarkTheme",
  },
  {
    label: "设置浅色主题(theme.setLightTheme)",
    value: "theme.setLightTheme",
  },
  {
    label: "设置 Dashboard 大屏模式(mode.setDashboardMode)",
    value: "mode.setDashboardMode",
  },
  {
    label: "设置默认模式(mode.setDefaultMode)",
    value: "mode.setDefaultMode",
  },
  {
    label: "清除菜单标题缓存(menu.clearMenuTitleCache)",
    value: "menu.clearMenuTitleCache",
  },
  {
    label: "清除菜单缓存(menu.clearMenuCache)",
    value: "menu.clearMenuCache",
  },
];

export const hasCallbackActions = ["message.subscribe", "message.unsubscribe"];
