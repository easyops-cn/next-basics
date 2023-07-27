import { Chapter } from "../interfaces";
import generalFormMD from "../docs/forms/general-form.md";
import generalInputMD from "../docs/forms/general-input.md";
import generalSelectMD from "../docs/forms/general-select.md";

const chapter: Chapter = {
  title: {
    en: "Form Bricks",
    zh: "表单构件"
  },
  stories: [
    {
      storyId: "general-form",
      text: {
        en: "General Form",
        zh: "普通表单"
      },
      conf: {
        brick: "forms.general-form",
        properties: {
          values: {
            username: "easyops",
            nickname: "lucy"
          }
        },
        slots: {
          items: {
            type: "bricks",
            bricks: [
              {
                brick: "forms.general-input",
                properties: {
                  name: "username",
                  label: "用户名",
                  placeholder: "请输入用户名"
                }
              },
              {
                brick: "forms.general-input",
                properties: {
                  name: "password",
                  type: "password",
                  label: "密码",
                  placeholder: "请输入密码"
                }
              },
              {
                brick: "forms.general-select",
                properties: {
                  name: "nickname",
                  label: "昵称",
                  placeholder: "请输入密码",
                  options: ["jack", "lucy"]
                }
              }
            ]
          }
        }
      },
      doc: generalFormMD
    },
    {
      storyId: "general-input",
      text: {
        en: "General Input",
        zh: "普通输入框"
      },
      conf: {
        brick: "forms.general-input",
        properties: {
          name: "username",
          type: "email",
          label: "邮箱",
          value: "test",
          placeholder: "请输入邮箱地址"
        }
      },
      doc: generalInputMD
    },
    {
      storyId: "general-select",
      text: {
        en: "General Select",
        zh: "普通下拉选择框"
      },
      conf: {
        brick: "forms.general-select",
        properties: {
          name: "gender",
          label: "性别",
          value: "female",
          placeholder: "请选择性别",
          options: [
            {
              label: "男",
              value: "male"
            },
            {
              label: "女",
              value: "female"
            }
          ]
        }
      },
      doc: generalSelectMD
    }
  ]
};

export default chapter;
