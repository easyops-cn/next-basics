import { getActionOptions } from "./getActionOptions";

describe("processor", () => {
  it("getActionOptions", () => {
    const actions = [
      {
        label: "页面跳转(history.push)",
        value: "history.push",
      },
      {
        label: "返回上一个页面(history.goBack)",
        value: "history.goBack",
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
        label: "页面快捷跳转，并替换最新浏览记录(segue.replace)",
        value: "segue.replace",
      },
      {
        label: "写入本地 localStorage 缓存数据(localStorage.setItem)",
        value: "localStorage.setItem",
      },
      {
        label: "阻止默认操作(event.preventDefault)",
        value: "event.preventDefault",
      },
      {
        label: "设置暗黑主题(theme.setDarkTheme)",
        value: "theme.setDarkTheme",
      },
    ];

    expect(getActionOptions(actions)).toEqual([
      {
        label: "history",
        options: [
          { label: "页面跳转(history.push)", value: "history.push" },
          { label: "返回上一个页面(history.goBack)", value: "history.goBack" },
        ],
      },
      {
        label: "message",
        options: [
          { label: "信息提示(message.info)", value: "message.info" },
          { label: "告警提示(message.warn)", value: "message.warn" },
        ],
      },
      {
        label: "segue",
        options: [
          {
            label: "页面快捷跳转，并替换最新浏览记录(segue.replace)",
            value: "segue.replace",
          },
        ],
      },
      {
        label: "localStorage",
        options: [
          {
            label: "写入本地 localStorage 缓存数据(localStorage.setItem)",
            value: "localStorage.setItem",
          },
        ],
      },
      {
        label: "event",
        options: [
          {
            label: "阻止默认操作(event.preventDefault)",
            value: "event.preventDefault",
          },
        ],
      },
      {
        label: "theme",
        options: [
          {
            label: "设置暗黑主题(theme.setDarkTheme)",
            value: "theme.setDarkTheme",
          },
        ],
      },
    ]);
  });
});
