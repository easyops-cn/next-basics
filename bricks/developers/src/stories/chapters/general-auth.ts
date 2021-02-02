import { Chapter } from "../interfaces";

const chapter: Chapter = {
  title: {
    en: "General Auth",
    zh: "普通认证"
  },
  stories: [
    {
      storyId: "general-login",
      text: {
        en: "General Login",
        zh: "普通登录"
      },
      conf: {
        brick: "general-auth.general-login",
        events: {
          "login.success": {
            action: "console.warn"
          }
        }
      },
      actions: [
        {
          text: "reset()",
          method: "reset"
        }
      ]
    },
    {
      storyId: "general-logout",
      text: {
        en: "General Logout",
        zh: "普通登出"
      },
      conf: {
        brick: "general-auth.general-logout",
        events: {
          "logout.success": {
            action: "console.warn"
          }
        }
      }
    }
  ]
};

export default chapter;
