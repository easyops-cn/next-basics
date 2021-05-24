import { getRuntime } from "@next-core/brick-kit";
import i18n from "i18next";
import { NS_FORMS, K } from "../i18n/constants";

getRuntime().registerCustomTemplate("forms.tpl-cmdb-object-attr-add", {
  proxy: {
    properties: {
      isProtected: {
        asVariable: true,
      },
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
      attrValueDisabled: {
        ref: "attrValue",
        refProperty: "disabled",
      },
      attrOptions: {
        ref: "attrOptions",
        refProperty: "options",
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
      resetFields: {
        ref: "addCmdbObjectAttrForm",
        refMethod: "resetFields",
      },
      validate: {
        ref: "addCmdbObjectAttrForm",
        refMethod: "validate",
      },
    },
  },
  bricks: [
    {
      brick: "forms.general-form",
      ref: "addCmdbObjectAttrForm",
      properties: {
        dataset: {
          testid: "cmdb-object-attr-add-form",
        },
      },
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
                dataset: {
                  testid: "cmdb-object-attr-add-id-input",
                },
                name: "id",
                label: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_ID}`),
                required: true,
                pattern: "^[A-Za-z_][A-Za-z0-9_]{0,31}$",
                message: {
                  required: i18n.t(`${NS_FORMS}:${K.MUST_NEED_ATTRIBUTE_ID}`),
                  pattern: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_ID_LIMIT}`),
                },
                placeholder: i18n.t(
                  `${NS_FORMS}:${K.PLEASE_INPUT_ATTRIBUTE_ID}`
                ),
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                dataset: {
                  testid: "cmdb-object-attr-add-name-input",
                },
                name: "name",
                label: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_NAME}`),
                required: true,
                message: {
                  required: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_NAME_LIMIT}`),
                },
                placeholder: i18n.t(
                  `${NS_FORMS}:${K.PLEASE_INPUT_ATTRIBUTE_NAME}`
                ),
              },
            },
            {
              brick: "forms.cmdb-object-attr-value",
              ref: "attrValue",
              properties: {
                dataset: {
                  testid: "cmdb-object-attr-add-value-type-select",
                },
                name: "attrValue",
                label: i18n.t(`${NS_FORMS}:${K.VALUE_TYPE}`),
                required: true,
                message: {
                  required: i18n.t(`${NS_FORMS}:${K.PLEASE_SELECT_VALUE_TYPE}`),
                },
                placeholder: i18n.t(
                  `${NS_FORMS}:${K.PLEASE_SELECT_VALUE_TYPE}`
                ),
              },
              events: {
                "forms.cmdb-object-attr-value.change": [
                  {
                    if:
                      "<% EVENT.detail.type === 'str' && ( EVENT.detail.default_type === 'series-number' || EVENT.detail.default_type === 'auto-increment-id') %>",
                    targetRef: "addCmdbObjectAttrForm",
                    method: "setInitValue",
                    args: [{ attrOptions: ["required", "readonly", "unique"] }],
                  },
                  {
                    if:
                      "<% !TPL.isProtected && EVENT.detail.default_type !== 'series-number' &&  EVENT.detail.default_type !== 'auto-increment-id' %>",
                    targetRef: "addCmdbObjectAttrForm",
                    method: "resetFields",
                    args: ["attrOptions"],
                  },
                  {
                    if:
                      "<% !TPL.isProtected && EVENT.detail.type !== 'struct' && EVENT.detail.type !== 'structs' && EVENT.detail.type !== 'enums' && EVENT.detail.type !== 'arr' %>",
                    targetRef: "attrOptions",
                    properties: {
                      options: [
                        {
                          label: i18n.t(`${NS_FORMS}:${K.REQUIRED}`),
                          value: "required",
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.READONLY}`),
                          value: "readonly",
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.UNIQUE}`),
                          value: "unique",
                        },
                      ],
                    },
                  },
                  {
                    if:
                      "<% !TPL.isProtected && (EVENT.detail.type === 'struct' || EVENT.detail.type === 'structs') %>",
                    targetRef: "attrOptions",
                    properties: {
                      options: [
                        {
                          label: i18n.t(`${NS_FORMS}:${K.REQUIRED}`),
                          value: "required",
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.READONLY}`),
                          value: "readonly",
                          disabled: true,
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.UNIQUE}`),
                          value: "unique",
                          disabled: true,
                        },
                      ],
                    },
                  },
                  {
                    if:
                      "<% !TPL.isProtected && (EVENT.detail.type === 'enums' || EVENT.detail.type === 'arr') %>",
                    targetRef: "attrOptions",
                    properties: {
                      options: [
                        {
                          label: i18n.t(`${NS_FORMS}:${K.REQUIRED}`),
                          value: "required",
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.READONLY}`),
                          value: "readonly",
                        },
                        {
                          label: i18n.t(`${NS_FORMS}:${K.UNIQUE}`),
                          value: "unique",
                          disabled: true,
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                dataset: {
                  testid: "cmdb-object-attr-add-tag-input",
                },
                name: "tag",
                label: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_CATEGROY}`),
                placeholder: i18n.t(
                  `${NS_FORMS}:${K.PLEASE_INPUT_ATTRIBUTE_CATEGROY}`
                ),
              },
            },
            {
              brick: "forms.general-checkbox",
              ref: "attrOptions",
              properties: {
                dataset: {
                  testid: "cmdb-object-attr-add-limit-option",
                },
                name: "attrOptions",
                label: i18n.t(`${NS_FORMS}:${K.LIMIT}`),
                options: [
                  {
                    label: i18n.t(`${NS_FORMS}:${K.REQUIRED}`),
                    value: "required",
                  },
                  {
                    label: i18n.t(`${NS_FORMS}:${K.READONLY}`),
                    value: "readonly",
                  },
                  {
                    label: i18n.t(`${NS_FORMS}:${K.UNIQUE}`),
                    value: "unique",
                  },
                ],
              },
            },
            {
              brick: "forms.general-buttons",
              ref: "submitButton",
              properties: {
                dataset: {
                  testid: "cmdb-object-attr-add-submit-button",
                },
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
