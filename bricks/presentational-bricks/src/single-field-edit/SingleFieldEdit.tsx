import React from "react";
import { Form } from "@ant-design/compatible";
import { Modal, Input, InputNumber, Radio, Select, Checkbox } from "antd";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";
import { ControlType } from "./index";

const fieldKey = "_field";

export interface SingleFieldEditProps extends FormComponentProps {
  visible: boolean;
  title: string;
  label: string;
  type: ControlType;
  placeholder?: string;
  initialValue?: any;
  options?: Record<string, any>[];
  labelKey?: string;
  valueKey?: string;
  rules: ValidationRule[];
  autoSize?: boolean | AutoSizeType;
  onOk?(value?: any): void;
  onCancel?(): void;
}

export function WrappedSingleFieldEdit(
  props: SingleFieldEditProps
): React.ReactElement {
  const {
    form,
    visible,
    title,
    label,
    type,
    placeholder,
    initialValue,
    rules,
  } = props;
  const { getFieldDecorator } = form;
  let required: boolean;

  const getControl = () => {
    let control: React.ReactElement;

    switch (type) {
      case ControlType.Text:
        control = <Input placeholder={placeholder} />;
        break;
      case ControlType.Textarea: {
        const { autoSize } = props;
        control = (
          <Input.TextArea
            placeholder={placeholder}
            autoSize={autoSize || { minRows: 2, maxRows: 6 }}
            style={{ marginBottom: 0 }}
          />
        );
        break;
      }
      case ControlType.Number:
        control = <InputNumber placeholder={placeholder} />;
        break;
      case ControlType.Radio:
      case ControlType.Select: {
        let { options, labelKey, valueKey } = props;

        labelKey = labelKey || "label";
        valueKey = valueKey || "value";
        switch (type) {
          case ControlType.Radio:
            control = (
              <Radio.Group>
                {options &&
                  options.map((option) => {
                    const value = option[valueKey];

                    return (
                      <Radio value={value} key={value}>
                        {option[labelKey]}
                      </Radio>
                    );
                  })}
              </Radio.Group>
            );
            break;
          case ControlType.Select:
            control = (
              <Select>
                {options &&
                  options.map((option) => {
                    const value = option[valueKey];

                    return (
                      <Select.Option value={value} key={value}>
                        {option[labelKey]}
                      </Select.Option>
                    );
                  })}
              </Select>
            );
            break;
        }
        break;
      }
      case ControlType.Checkbox:
        control = <Checkbox />;
        break;
    }

    return control
      ? getFieldDecorator(fieldKey, { initialValue, rules })(control)
      : null;
  };

  const onOk = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        if (props.onOk) {
          props.onOk(values[fieldKey]);
        }
      }
    });
  };

  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  if (rules) {
    required = rules.some((rule) => rule.required);
  }

  return (
    <Modal
      visible={visible}
      title={title}
      destroyOnClose
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item
          label={label}
          required={required}
          style={
            !rules || rules.length === 0
              ? { marginBottom: 0, paddingBottom: 0 }
              : undefined
          }
        >
          {getControl()}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export const SingleFieldEdit = Form.create<SingleFieldEditProps>()(
  WrappedSingleFieldEdit
);
