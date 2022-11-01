import { Story } from "../../../interfaces";
import docMD from "../../../docs/presentational-bricks/brick-form.md";

export const story: Story = {
  storyId: "presentational-bricks.brick-form",
  type: "brick",
  author: "jo",
  category: "form-input-basic",
  text: {
    en: "Brick Form (Legacy)",
    zh: "表单",
  },
  deprecated: true,
  description: {
    en: "",
    zh: "通用表单容器，支持指定fields及其类型",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: {
    brick: "presentational-bricks.brick-form",
    properties: {
      layout: "horizontal",
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 10,
      },
      fields: [
        {
          field: "name",
          label: "名称",
          component: "Input",
          isRequire: true,
        },
        {
          field: "tool",
          label: "选择工具",
          component: "Select",
          defaultValue: "zaqss",
          optionList: [
            { text: "test1", id: "bda32" },
            { text: "test2", id: "42abd" },
            { text: "test3", id: "dasda" },
            { text: "test4", id: "zaqss" },
          ],
        },
        {
          field: "priority",
          label: "优先级",
          component: "InputNumber",
          defaultValue: 3,
        },
        {
          field: "type",
          label: "类型",
          component: "CheckBox",
          isRequire: true,
          optionList: [
            { text: "pipeline", id: "a2c34da" },
            { text: "tool", id: "b46cbd5" },
            { text: "flows", id: "c964db" },
          ],
        },
        {
          field: "file",
          label: "选择文件",
          isRequire: true,
          component: "Radio",
          componentType: "Button",
          optionList: [
            { text: ".text", id: "a" },
            { text: ".doc", id: "b" },
            { text: ".yaml", id: "c" },
          ],
        },
        {
          field: "switch",
          label: "开关",
          component: "Switch",
          defaultValue: true,
          valuePropName: "checked",
        },
        {
          field: "date",
          label: "选择日期",
          component: "DatePicker",
        },
        {
          field: "time",
          label: "选择时间",
          component: "TimePicker",
          isRequire: true,
        },
      ],
    },
    events: {
      "brick.form.submit": {
        action: "console.log",
      },
    },
  },
  doc: docMD,
};
