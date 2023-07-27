import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS } from "../i18n/constants";
import { Form } from "@ant-design/compatible";
import { Button, Card } from "antd";
import {
  FormComponentProps,
  ValidationRule,
} from "@ant-design/compatible/lib/form";
import { FormLayout } from "@ant-design/compatible/lib/form/Form";
import { ColProps } from "antd/lib/grid";
import { BrickInput } from "./components/brick-input/BrickInput";
import {
  BrickSelect,
  SearchInCmdb,
} from "./components/brick-select/BrickSelect";
import { BrickDatePicker } from "./components/brick-date-picker/BrickDatePicker";
import { BrickRadio } from "./components/brick-radio/BrickRadio";
import { BrickSwitch, SwitchMap } from "./components/brick-switch/BrickSwitch";
import { BrickTimePicker } from "./components/brick-time-picker/BrickTimePicker";
import { BrickInputNumber } from "./components/brick-input-number/BrickInputNumber";
import { BrickCheckbox } from "./components/brick-checkbox/BrickCheckbox";
import { BrickOptionProps } from "./interfaces";
import { BrickMarkdownEditor } from "../markdown-editor/MarkdownEditor";
import { BrickInstanceSelector } from "./components/brick-instance-selector/BrickInstanceSelector";
import { CustomColumn } from "../brick-table/BrickTable";

export interface FieldDefinition {
  field: string;
  label: string;
  fieldPath: string;
  component: string;
  isRequire?: boolean;
  valuePropName?: string;
  properties?: any;
  defaultValue?: boolean | string | number;
  hideFromField?: string;
  optionList?: string[] | BrickOptionProps[];
  emitChangeEvent?: string;
  emitCustomEvent?: string;
  dataSource?: {
    resolveName: string;
    path?: string;
    useIdField?: string;
    useTextField?: string;
  };
  // for brick-select control
  searchInCmdb?: SearchInCmdb;
  // for brick-switch control
  switchMap?: SwitchMap;
  // for brick-instance-selector control
  instanceList?: {
    query?: Record<string, any>;
    columns: CustomColumn[];
  };
  computeDefaultValue?: {
    target: string;
    method: string;
    args: any;
  };
  rules: ValidationRule & flags[];
  configProps: Record<string, any>;
}
type flags = any;

export interface LegacyBrickFormProps
  extends WithTranslation,
    FormComponentProps {
  contractName?: string;
  fields: FieldDefinition[];
  showCancel?: boolean;
  cancelText?: string;
  showConfirm?: boolean;
  confirmText?: string;
  layout?: FormLayout;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  tailFormBtnLayout?: Record<"wrapperCol", ColProps>;
  onSubmit?(data: Record<string, any>): void;
  onCancel?(): void;
  onBrickFormRef: any;
  showCard: boolean;
  onFieldChange: (value: any, field: string) => void;
  dispatchCustomEvent: (field: FieldDefinition, detail: any) => void;
}

export class LegacyBrickForm extends React.Component<LegacyBrickFormProps> {
  static formItemComp: Record<string, any> = {
    Markdown: BrickMarkdownEditor,
    Input: BrickInput,
    InputNumber: BrickInputNumber,
    Select: BrickSelect,
    DatePicker: BrickDatePicker,
    Radio: BrickRadio,
    Switch: BrickSwitch,
    TimePicker: BrickTimePicker,
    Checkbox: BrickCheckbox,
    InstanceSelector: BrickInstanceSelector,
  };

  constructor(props: LegacyBrickFormProps) {
    super(props);
  }

  componentDidMount(): void {
    this.props.onBrickFormRef(this);
  }

  componentWillUnmount(): void {
    this.props.onBrickFormRef(undefined);
  }

  dispatchCustomEvent(field: FieldDefinition) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (field.emitCustomEvent) {
      return (query: any) => {
        self.props.dispatchCustomEvent(field, query);
      };
    }
  }

  render(): React.ReactNode {
    const {
      layout,
      labelCol,
      wrapperCol,
      fields = [],
      tailFormBtnLayout,
      showCard,
    } = this.props;

    const WrapperElement = showCard ? Card : React.Fragment;

    return (
      <WrapperElement>
        <Form
          layout={layout}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          onSubmit={this.handleSubmit.bind(this)}
        >
          {fields.map((field) => {
            const { component, ...others } = field;

            const BrickComponent = LegacyBrickForm.formItemComp[component];

            if (BrickComponent !== undefined) {
              return (
                <BrickComponent
                  {...others}
                  allFields={fields}
                  key={field.field}
                  onFieldChange={this.handleFieldChange.bind(this)}
                  dispatchCustomEvent={this.dispatchCustomEvent(field)}
                  form={this.props.form}
                />
              );
            } else {
              return (
                <field.component
                  key={field.field}
                  ref={(el: any) => {
                    el &&
                      Object.assign(el, {
                        form: this.props.form,
                        field: field,
                        onFieldChange: this.handleFieldChange.bind(this),
                      });
                  }}
                />
              );
            }
          })}

          <Form.Item {...tailFormBtnLayout}>
            {this.props.showConfirm && (
              <Button type="primary" htmlType="submit">
                {this.props.confirmText || "确定"}
              </Button>
            )}
            {this.props.showCancel && (
              <Button style={{ marginLeft: 8 }} onClick={this.props.onCancel}>
                {this.props.cancelText || "取消"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </WrapperElement>
    );
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) {
        return;
      }
      const { onSubmit } = this.props;
      onSubmit && onSubmit(data);
    });
  }

  handleFieldChange(value: any, field: string) {
    const { onFieldChange } = this.props;
    onFieldChange && onFieldChange(value, field);
  }
}

export const BrickForm = withTranslation(NS_PRESENTATIONAL_BRICKS)(
  Form.create<LegacyBrickFormProps>({ name: "brick_form" })(LegacyBrickForm)
);
