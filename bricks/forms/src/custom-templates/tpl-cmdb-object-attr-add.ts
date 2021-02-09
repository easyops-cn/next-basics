import { getRuntime } from "@next-core/brick-kit";

getRuntime().registerCustomTemplate("forms.tpl-cmdb-object-attr-add", {
  proxy: {
    properties: {
      values: {
        ref: "addCmdbObjectAttrForm",
        refProperty: "values",
      },
      submitBtnHidden: {
        ref: "submitButton",
        refProperty: "hidden",
      },
      attrIdInputDisabled: {
        ref: "attrIdInput",
        refProperty: "disabled",
      },
    },
    events: {
      "validate.success": {
        ref: "addCmdbObjectAttrForm",
        refEvent: "validate.success",
      },
      "validate.error": {
        ref: "addCmdbObjectAttrForm",
        refEvent: "validate.error",
      },
    },
    methods: {
      setInitValue: {
        ref: "addCmdbObjectAttrForm",
        refMethod: "setInitValue",
      },
    },
  },
  bricks: [
    {
      brick: "forms.general-form",
      ref: "addCmdbObjectAttrForm",
      events: {
        "validate.success": {
          action: "console.log",
        },
        "validate.error": {
          action: "console.warn",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-input",
              ref: "attrIdInput",
              properties: {
                name: "id",
                label: "属性ID",
                required: true,
                pattern: "^[a-zA-Z][a-zA-Z_0-9]{0,31}$",
                message: {
                  required: "属性ID为必填项",
                  pattern:
                    "请输入1至32个字符，以字母开头，只能包含字母、数字和下划线",
                },
                placeholder: "请输入属性ID",
              },
            },
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
                name: "attrValue",
                label: "值类型",
                required: true,
                message: {
                  required: "请选择值类型",
                },
                placeholder: "请选择值类型",
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                name: "tag",
                label: "属性分类",
                placeholder: "请输入属性分类",
              },
            },
            {
              brick: "forms.general-checkbox",
              properties: {
                name: "attrOptions",
                label: "限制",
                options: [
                  {
                    label: "必填",
                    value: "required",
                  },
                  {
                    label: "只读",
                    value: "readonly",
                  },
                  {
                    label: "唯一",
                    value: "unique",
                  },
                ],
              },
            },
            {
              brick: "forms.general-buttons",
              ref: "submitButton",
              properties: {
                id: "saveBtn",
                submitText: "保存",
              },
            },
          ],
        },
      },
    },
  ],
});
