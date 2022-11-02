import { Chapter } from "../interfaces";

const chapter: Chapter = {
  title: {
    en: "General Auth",
    zh: "普通认证",
  },
  stories: [
    {
      storyId: "general-login",
      text: {
        en: "General Login",
        zh: "普通登录",
      },
      conf: {
        brick: "general-auth.general-login",
        events: {
          "login.success": {
            action: "message.warn",
            args: ["Login Success"],
          },
        },
      },
      actions: [
        {
          text: "Reset",
          method: "reset",
        },
      ],
    },
    {
      storyId: "general-logout",
      text: {
        en: "General Logout",
        zh: "普通登出",
      },
      conf: {
        brick: "general-auth.general-logout",
        events: {
          "logout.success": {
            action: "message.warn",
            args: ["Logout Success"],
          },
        },
      },
    },
  ],
};

export default chapter;
