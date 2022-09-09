import { Story } from "@next-core/brick-types";
import { cmdbObjectAttrValue } from "../images";

export const cmdbObjectAttrValueStory: Story = {
  storyId: "forms.cmdb-object-attr-value",
  category: "form-input",
  type: "brick",
  author: "dophi",
  text: {
    en: "Cmdb Object Attr Value ",
    zh: "cmdb 模型属性值类型定义",
  },
  description: {
    en: "The attribute value type  of a Cmdb Object",
    zh: "cmdb模型添加属性值，输出值类型",
  },
  icon: {
    imgSrc: cmdbObjectAttrValue,
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        labelCol: {
          span: 6,
        },
        values: {
          name: "",
          attr_value: "",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-input",
              properties: {
                name: "name",
                label: "属性名称",
                required: true,
                message: {
                  required: "属性名称为必填项",
                },
                placeholder: "请输入属性名称",
              },
            },
            {
              brick: "forms.cmdb-object-attr-value",
              properties: {
                label: "请输入值类型",
                name: "attr_value",
                required: true,
                dataset: {
                  testid: "basic-usage-demo",
                },
              },
              events: {
                "forms.cmdb-object-attr-value.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
            },
          ],
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
