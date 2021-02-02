import React from "react";
import { Form } from "@ant-design/compatible";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { FieldDefinition } from "../../BrickForm";
import { BrickOptionProps } from "../../interfaces";
import { forEach } from "lodash";
import rewritePattern from "regexpu-core";

export interface WrapperFormItemProps
  extends FieldDefinition,
    FormComponentProps {
  allFields: FieldDefinition[];
  optionList: string[] & BrickOptionProps[];
  onFieldChange: (value: any, field: string) => void;
}

export function WrapperFormItem(WrapperComponent: any) {
  return function WithWrapperItem(props: WrapperFormItemProps) {
    const {
      isRequire,
      label,
      form,
      field,
      allFields,
      hideFromField,
      optionList,
      defaultValue,
      valuePropName = "value",
      onFieldChange,
      rules,
      ...restProps
    } = props;
    let itemShow = true;
    const overwriteProps: Record<string, any> = {};

    overwriteProps.onChange = (value: any) => {
      onFieldChange && onFieldChange(value, field);
    };

    // 根据其他表单项的值控制该表单隐藏和显示
    if (hideFromField !== undefined) {
      const targetField = allFields.find(
        (item: FieldDefinition) => item.field === hideFromField
      ).defaultValue;
      const value = form.getFieldValue(hideFromField);
      itemShow = !!(value !== undefined ? value : targetField);
    }

    if (optionList !== undefined) {
      overwriteProps.optionList = optionList.map((option) =>
        typeof option === "string" ? { id: option, text: option } : option
      );
    }

    // storyboard 中无法写正则表达式，所以写成字符串这里再进行转化。
    // storyboard 中配置的正则表达式字符串需要进行双重转义，例如希望匹配/\.at/，则写成"\\.at"，规则同jest
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description
    if (rules) {
      forEach(rules, (rule) => {
        if (rule.pattern && typeof rule.pattern === "string") {
          const rewriteRulePattern = rewritePattern(rule.pattern, rule.flags, {
            unicodePropertyEscape: true,
            useUnicodeFlag: false,
          });
          rule.pattern = new RegExp(rewriteRulePattern, rule.flags);
          delete rule.flags;
        }
      });
    }

    return (
      itemShow && (
        <Form.Item label={label}>
          {form.getFieldDecorator(field, {
            initialValue: defaultValue,
            rules: rules || [],
            valuePropName,
          })(<WrapperComponent {...restProps} {...overwriteProps} />)}
        </Form.Item>
      )
    );
  };
}
