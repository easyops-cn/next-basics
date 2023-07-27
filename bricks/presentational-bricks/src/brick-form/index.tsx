import React from "react";
import { get, compact, isEmpty } from "lodash";
import ReactDOM from "react-dom";
import { WrappedFormUtils } from "@ant-design/compatible/lib/form/Form";
import { FormLayout } from "@ant-design/compatible/lib/form/Form";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickEvent, ReadSelectionChangeDetail } from "@next-core/brick-types";
import { BrickForm, LegacyBrickFormProps, FieldDefinition } from "./BrickForm";

interface BrickFormElement extends LegacyBrickFormProps {}

interface BrickFormRefProps {
  form: WrappedFormUtils;
  [key: string]: any;
}

class BrickFormElement extends UpdatingElement {
  @property()
  contractName: string;

  @property({
    attribute: false,
  })
  fields: LegacyBrickFormProps["fields"] = [];

  @property({
    attribute: false,
  })
  showCancel = true;

  @property()
  cancelText: string;

  @property({
    attribute: false,
  })
  showConfirm = true;

  @property()
  confirmText: string;

  @property({
    attribute: false,
  })
  tailFormBtnLayout: LegacyBrickFormProps["tailFormBtnLayout"];

  @property()
  layout: FormLayout;

  @property({
    attribute: false,
  })
  labelCol: LegacyBrickFormProps["labelCol"];

  @property({
    attribute: false,
  })
  wrapperCol: LegacyBrickFormProps["wrapperCol"];

  @property({
    attribute: false,
  })
  showCard = true;

  private brickFormRef: React.Component<BrickFormRefProps>;
  private _submitFormDataKey: string | number = null;
  _resetDataAfterCancel = false;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.init();
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickForm
            contractName={this.contractName}
            fields={this.fields}
            showCancel={this.showCancel}
            cancelText={this.cancelText}
            showConfirm={this.showConfirm}
            confirmText={this.confirmText}
            tailFormBtnLayout={this.tailFormBtnLayout}
            layout={this.layout}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            showCard={this.showCard}
            onBrickFormRef={(ref: React.Component<BrickFormRefProps>) =>
              (this.brickFormRef = ref)
            }
            onFieldChange={this.handleFieldChange}
            dispatchCustomEvent={this.handleCustomEvent}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  attributeChangedCallback(): void {
    this._render();
  }

  handleFieldChange = (value: any, field: string) => {
    const find = this.fields.find((item) => item.field === field);
    if (find && find.emitChangeEvent !== undefined) {
      this.dispatchEvent(
        new CustomEvent(find.emitChangeEvent, {
          detail: value,
        })
      );
    }
  };

  dealCustomEvent(event: CustomEvent) {
    // todo(ice): should be delegated to specific field component
    if (event.type === BrickEvent.READ_SELECTION_CHANGE) {
      const field = this.fields.find((f) => f.emitCustomEvent);
      const detail = event.detail as ReadSelectionChangeDetail;
      if (!isEmpty(detail.selectedItems)) {
        field.optionList = detail.selectedItems;
        this._render();
      }
    }
  }

  handleCustomEvent = (field: FieldDefinition, detail: any) => {
    this.dispatchEvent(new CustomEvent(field.emitCustomEvent, { detail }));
  };

  handleSubmit = (data: any) => {
    const formated = this.formatData(data);
    // refs: micro-apps/mysql-resource/src/storyboard.ts#L100
    const detail =
      this._submitFormDataKey !== null
        ? { [this._submitFormDataKey]: formated }
        : formated;
    this.dispatchEvent(new CustomEvent("brick.form.submit", { detail }));
  };

  handleCancel = () => {
    this.dispatchEvent(new CustomEvent("brick.form.cancel"));
    if (this._resetDataAfterCancel) {
      this.brickFormRef.props.form.resetFields();
    }
  };

  formatData(data: Record<string, any>) {
    return Object.keys(data).reduce(
      (formData: Record<string, any>, key: string) => {
        const fieldPath = this.fields.find((item) => item.field === key)
          .fieldPath;
        formData[fieldPath] = data[key];
        return formData;
      },
      {}
    );
  }

  init() {
    this.fields.forEach((field) => {
      if (field.dataSource !== undefined) {
        field.optionList = this.assignResolveToFieldComponent(field);
      }

      if (field.computeDefaultValue !== undefined) {
        field.defaultValue = this.computeDefaultValue(
          field.computeDefaultValue
        );
      }
    });
  }

  computeDefaultValue(config: Record<string, any>) {
    const { target, method, args = [] } = config;

    const found = document.querySelector(target);
    if (found && typeof found[method] === "function") {
      return found[method](...args);
    }
  }

  // 动态赋值与 computeDefaultValue 搭配使用
  get(resolveName: string, path: string) {
    return get(this[resolveName as keyof BrickFormElement], path);
  }

  assignResolveToFieldComponent(field: Record<string, any>) {
    const dataSource = field.dataSource;
    const { resolveName, path } = dataSource;

    const resolveData = this[resolveName as keyof BrickFormElement];
    if (resolveData === undefined) return;

    const options =
      path !== undefined ? get(resolveData, `${path}`) : resolveData;

    const { useIdField, useTextField } = dataSource;
    if (useIdField && useTextField) {
      return options.map((item: Record<string, any>) => {
        return {
          id: get(item, useIdField) || "",
          text: get(item, useTextField) || "",
        };
      });
    } else {
      return compact(options) as FieldDefinition["optionList"];
    }
  }

  set resetDataAfterCancel(value: boolean) {
    this._resetDataAfterCancel = value;
  }

  set submitFormDataKey(value: string | number) {
    this._submitFormDataKey = value;
  }

  set fieldData(responseData: any) {
    this.fields.forEach((field) => {
      /**
       * fieldPath: [0].batchStrategy.batchNum
       * 前面第一位[0]代表参数的顺序，api 为 Put/Post 类型时根据根据参数序号传入参数，api 为 Get 类型时不需要前面的数字，后面路径相同
       */

      const path = field.fieldPath.replace(/^\[\d+\]\./, "");
      field.defaultValue = get(responseData, path, field.defaultValue);
    });
  }

  async stepOut(eventName: string): Promise<void> {
    const defaultEvent = "brick.form.update";
    const form = this.brickFormRef.props.form;
    return new Promise((resolve, reject) => {
      form.validateFields((error, data) => {
        if (error) {
          reject(null);
        }

        this.dispatchEvent(
          new CustomEvent(eventName || defaultEvent, {
            detail: {
              ...this.formatData(data),
              formData: data,
            },
          })
        );
        resolve();
      });
    });
  }

  validateFormFields() {
    this.brickFormRef.props.form.validateFields((error, data) => {
      if (error) {
        this.dispatchEvent(
          new CustomEvent(`form.validate.failed`, {
            detail: error,
          })
        );
        return;
      }

      this.dispatchEvent(
        new CustomEvent(`form.validate.success`, {
          detail: this.formatData(data),
        })
      );
    });
  }
}

customElements.define("presentational-bricks.brick-form", BrickFormElement);
