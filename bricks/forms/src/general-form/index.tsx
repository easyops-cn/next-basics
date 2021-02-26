import React from "react";
import ReactDOM from "react-dom";
import {
  WrappedFormUtils,
  FormLayout,
} from "@ant-design/compatible/lib/form/Form";
import { ColProps } from "antd/lib/col";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralFormGen, ConnectedForm } from "./GeneralForm";
import { AbstractGeneralFormElement, FormItemElement } from "@next-libs/forms";
import styles from "./GeneralForm.shadow.less";
import moment from "moment";
import { merge, cloneDeep, isNil } from "lodash";
import { FormAlignment } from "../interfaces";

export const LAYOUT_ENUMS = ["horizontal", "vertical", "inline"];
/**
* @id forms.general-form
* @name forms.general-form
* @docKind brick
* @description
* @author steve
* @slots
 * items:表单项插槽
* @history
* 1.58.0  新增 `name` 属性
* 1.63.0   新增 `resetFields` 方法
* @memo
* > Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给日期选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化日期的选项，以`|`分隔。（如上述 demo 所示）
### ITEM INPUTS

*下列属性是 form 为表单子项所申明的共有属性，但并不是所有属性都被每个表单项所实现，如 `placeholder,pattern` 只在 `input` 相关的表单项中使用才行。

*| property     | type                                                                                                 | required                                                               | default | description                                                                                                      |
*| ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
*| name         | `string`                                                                                             | ✔️                                                                     | -       | 字段名                                                                                                           |
*| label        | `string`                                                                                             | ✔️                                                                     | -       | 字段名说明                                                                                                       |
*| required     | `string`                                                                                             | -️                                                                     | -       | 字段名说明                                                                                                       |
*| placeholder  | `string`                                                                                             | -                                                                      | -       | 占位说明                                                                                                         |
*| pattern      | `string`                                                                                             | -️                                                                     | -       | 正则表达式校验, 由于在 json 中配置仅支持 string 类型， 对于特殊字符需要额外再转义 /\w{3}/ -> '\\w{3}'            |
*| message      | `Record<string,string>`                                                                              | -️                                                                     | -       | 校验文本信息                                                                                                     |
*| validator    | `Pick<ValidationRule, "validator" \| "message"> \| Pick<ValidationRule, "validator" \| "message">[]` | -️                                                                     | -       | 自定义校验方法，[ValidationRule](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) |
*| labelTooltip | `LabelTooltipProps`                                                                                  | -️                                                                     | -       | 表单项 label 支持 tooltip，具体如 demo 所示                                                                      |
*| helpBrick    | `HelpBrickProps \| string`| -️           | -       | 在每个表单项的右侧或者下侧插入一些文案或者复杂的提示, 配置如 demo 所示 |
*| labelBrick   | `LabelBrick`          | -     | -        | 表单项 label 支持 useBrick，具体如 demo 所示  |
*| labelCol | `ColProps` | - | - | 标签列布局样式（仅当 `layout="horizontal"` 时有效） |
*| wrapperCol | `ColProps` | - | - | 输入控件列布局样式（仅当 `layout="horizontal"` 时有效） |
*| notRender | `Boolean` | - | - | 为true时不渲染该表单项，配合表单项的setNotRender方法使用，实现动态表单 |

*下列方法是 form 为表单子项所申明的共有方法。

*| property     | params                 |  description                                                                                                      |
*| ------------ | ---------------------- |  ---------------------------------------------------------------------------------------------------------------- |
*| setNotRender | `notRender:Boolean`    |  动态表单。参数为true时，不渲染该表单子项；反之，为false时，则渲染改表单子项。不渲染时，validate.success事件详情将不输出该表单子项的值。|
*

*```typescript
*export interface LabelTooltipProps {
*   \\ tooltip 的文本内容
*   content: string;
*   \\ 图标设值跟平台图标设置一致
*   icon: MenuIcon;
*   \\ tooltip 的样式设置
*   style?: React.CSSProperties;
*   \\ 图标的样式设置
*   iconStyle?: React.CSSProperties;
*}

* export interface HelpBrickProps {
*   \\ 支持自定义组件
*   useBrick: UseBrickConf;
*   \\ 所放的位置，目前仅支持右侧和底部显示
*   placement?: "right" | "bottom";
*   \\ 组件容器的样式 可通过 top, bottom, left, right 精确调整位置
*   containerStyle?: React.CSSProperties;
* }

*export interface LabelBrick {
*   \\ 支持自定义组件
*   useBrick: UseBrickConf;
*}
* ```
* @noInheritDoc
*/
export class GeneralFormElement
  extends UpdatingElement
  implements AbstractGeneralFormElement {
  readonly isFormElement = true;

  private _mountPoint: HTMLElement;

  /**
   * @kind `Record<string,any>`
   * @default -
   * @required false
   * @description 默认值。因为目前使用了 `mapPropsToFields` 来将 `values` 映射到表单项的值，当 `values` 有多个层级时，需要按表单项的 `name` 平铺。如源数据为 `{a: {b: 123}}` ，表单项的 `name` 为 `a.b`，那么需要将源数据转换为 `{"a.b": 123}` 传给 `values`
   * @group basic
   */
  @property({
    attribute: false,
  })
  values: Record<string, any>;

  /**
   * @kind `Record<string, any>`
   * @required false
   * @default -
   * @description 静态值（在 `validate.success` 中将和表单值合并作为事件详情传递出去）
   * @group basic
   */
  staticValues: Record<string, any>; // PS: 暂时不能使用 @property 装饰, 因为更新 staticValues 会重新渲染表单，但是 values 不是跟表单当前的值同步的，结果导致表单被重置

  /**
   * @kind string
   * @description 设置表单域内字段 id 的前缀
   * @default -
   * @required false
   * @group basic
   */
  @property()
  name: string;

  /**
   * @kind `'horizontal'|'vertical'|'inline'`
   * @required -
   * @default `horizontal`
   * @description 表单布局
   * @group basic
   */
  @property({
    // Ensure `layout` is `FormLayout`.
    converter: {
      fromAttribute(value: string): string {
        if (value && LAYOUT_ENUMS.includes(value)) {
          return value;
        }
        return "horizontal";
      },
      toAttribute(value: string): string {
        if (LAYOUT_ENUMS.includes(value)) {
          return value;
        }
      },
    },
  })
  layout: FormLayout;

  /**
   * @kind `ColProps`
   * @description 标签列布局样式（仅当 `layout="horizontal"` 时有效）
   * @default -
   * @require false
   * @group advanced
   */
  @property({
    attribute: false,
  })
  labelCol = {
    sm: {
      span: 24,
    },
    md: {
      span: 24,
    },
    lg: {
      span: 7,
    },
    xl: {
      span: 5,
    },
    xxl: {
      span: 4,
    },
  };

  /**
   * @kind `ColProps`
   * @description 输入控件列布局样式（仅当 `layout="horizontal"` 时有效）
   * @default -
   * @require false
   * @group advanced
   */
  @property({
    attribute: false,
  })
  wrapperCol = {
    sm: {
      span: 18,
    },
    md: {
      span: 18,
    },
    lg: {
      span: 13,
    },
    xl: {
      span: 16,
    },
    xxl: {
      span: 18,
    },
  };

  // Will be Set in React component.
  formUtils: WrappedFormUtils;
  /**
   * @kind `object`
   * @required -
   * @default -
   * @description 对 `values` 属性的数据进行申明和格式化，提供了表单提交后格式化表单项数据的功能。目前仅支持时间相关的表单项数据的格式化（因为时间相关的表单项构件提交后的数据为 moment 对象，需要根据不同场景定义给后台的数据），`{time: moment|YYYY-MM-DD}` 表示该字段为 moment 类型，数据提交后格式化为 `YYYY-MM-DD` 字符串的形式，详情如 demo 所示
   * @group advanced
   */
  @property({
    attribute: false,
  })
  valueTypes: Record<string, string>;

  private _GeneralForm: ConnectedForm;

  /**
   * @kind boolean
   * @description 是否不显示冒号
   * @default `false`
   * @required false
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  noColon: boolean;

  /**
   * @description 是否限制表单的最大宽度
   * @default `false`
   * @group advanced
   */
  @property({ type: Boolean })
  maxWidthLimited: boolean;
  /**
   * @description 表单达到最大宽度后的对齐方式
   * @default `FormAlignment.Center`
   * @group advanced
   */
  @property({ attribute: false })
  alignment: FormAlignment = FormAlignment.Center;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);

    this._mountPoint = document.createElement("div");
    // ** Place any children the element creates into its shadow root. **
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  private _getGeneralForm(): ConnectedForm {
    if (this._GeneralForm) return this._GeneralForm;
    this._GeneralForm = GeneralFormGen(this.name);
    return this._GeneralForm;
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      LAYOUT_ENUMS.forEach((layout) => {
        if (layout === this.layout) {
          this.classList.add(`ant-legacy-form-${layout}`);
        } else {
          this.classList.remove(`ant-legacy-form-${layout}`);
        }
      });
      const GeneralForm = this._getGeneralForm();
      ReactDOM.render(
        <BrickWrapper>
          <GeneralForm
            formElement={this as any}
            layout={this.layout}
            values={this.values}
            valueTypes={this.valueTypes}
            maxWidthLimited={this.maxWidthLimited}
            alignment={this.alignment}
          />
        </BrickWrapper>,
        this._mountPoint
        // Todo(steve)
        /* () => {
          const itemsSlot = this.shadowRoot.querySelector(
            "#itemsSlot"
          ) as HTMLSlotElement;
          if (itemsSlot) {
            itemsSlot.assignedNodes().forEach(node => {
              node.addEventListener("submit", () => {
              });
            });
          }
        } */
      );
    }
  }

  // 兼容没有 isFormItemElement 的 FormItemElement 构件
  /* istanbul ignore next */
  private _forceUpdateSlot(
    element: HTMLElement = this,
    renderedElementSet: WeakSet<HTMLElement>
  ): void {
    if (element.shadowRoot) {
      const slots = element.shadowRoot.querySelectorAll(
        element === this ? "#itemsSlot" : "slot"
      ) as NodeListOf<HTMLSlotElement>;
      if (slots.length) {
        slots.forEach((slot) => {
          slot.assignedNodes().forEach((node: any) => {
            if (typeof node._render === "function") {
              // Manually trigger to render validation messages.
              node._render();
              renderedElementSet.add(node);
              this._forceUpdateSlot(node, renderedElementSet);
            }
          });
        });
      }
    }
  }

  /* istanbul ignore next */
  private _forceUpdateChild(
    element: HTMLElement = this,
    renderedElementSet: WeakSet<HTMLElement>
  ): void {
    if (
      (element as FormItemElement).isFormItemElement &&
      !renderedElementSet.has(element)
    ) {
      // Manually trigger to render validation messages.
      (element as any)._render?.();
    } else {
      element.childNodes.forEach((child) => {
        this._forceUpdateChild(child as HTMLElement, renderedElementSet);
      });
    }
  }

  /* istanbul ignore next */
  private _forceUpdate(element = this): void {
    const renderedElementSet = new WeakSet<HTMLElement>();

    this._forceUpdateSlot(element, renderedElementSet);
    this._forceUpdateChild(element, renderedElementSet);
  }

  /* istanbul ignore next */
  forceUpdate(): void {
    this._forceUpdate();
  }
  /**
   * @description 表单设置初始值
   * @param value
   */
  @method()
  setInitValue(value: any): void {
    // 日期格式的字符串需要 moment 包裹一层
    const formatValues = Object.entries(value).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        const valueType = this.valueTypes?.[key];
        if (typeof valueType === "string") {
          const matches = valueType.match(/^moment(?:\|(.+))?$/);
          if (matches && !isNil(value)) {
            value = moment(value);
          }
        }

        acc[key] = value;
        return acc;
      },
      {}
    );

    this.formUtils.setFieldsValue(formatValues);

    // workaround for dynamic-form-item set value
    this.childNodes.forEach((node: any) => {
      /* istanbul ignore next */
      if (
        node.nodeName === "FORMS.DYNAMIC-FORM-ITEM" &&
        formatValues[node.name]
      ) {
        node.setDynamicValue(formatValues[node.name]);
      }
    });
    this._forceUpdate();
  }

  reset(): void {
    this.formUtils.resetFields();
    this._forceUpdate();
  }
  /**
   *
   * @param `string[]`
   * @description 重置表单项的值，传入的是每个表单项的 `name`, 如果需要重置所有表单项传递 `null` 即可
   */
  @method()
  resetFields(names: string[]): void {
    this.formUtils.resetFields(names);

    // workaround for dynamic-form-item reset value
    this.childNodes.forEach((node: any) => {
      /* istanbul ignore next */
      if (
        node.nodeName === "FORMS.DYNAMIC-FORM-ITEM" &&
        (isNil(names) || names.includes(node.name))
      ) {
        node.setDynamicValue([]);
      }
    });
    this._forceUpdate();
  }

  formatFormValues(values: Record<string, any>): Record<string, any> {
    // 格式化表单的数据
    // 日期相关的数据传出为 moment 对象，格式化为指定形式的 string
    const formatValues = Object.entries(values).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        const valueType = this.valueTypes?.[key];
        if (typeof valueType === "string") {
          const matches = valueType.match(/^moment(?:\|(.+))?$/);
          if (matches && !isNil(value)) {
            value = moment(value).format(matches[1]);
          }
        }

        acc[key] = value;
        return acc;
      },
      {}
    );

    // 合并表单常量值
    return merge(cloneDeep(this.staticValues), formatValues);
  }
  /**
   * @description 	验证表单
   */
  @method() validate(): void {
    this.lowLevelValidate();
  }
  /**
   * @description 表单验证成功时触发
   */
  @event({ type: "validate.success" }) successEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @description 表单验证报错时触发
   */
  @event({ type: "validate.error" }) errorEvent: EventEmitter<
    Record<string, any>
  >;
  lowLevelValidate(callback?: (params?: any) => void): void {
    this.formUtils.validateFields((err, values) => {
      // Todo(steve): shadowRoot is readonly
      /* istanbul ignore next */
      this._forceUpdate();

      if (err) {
        this.errorEvent.emit(err);
      } else {
        //  日期相关的数据传出为 moment 对象，格式化为指定形式的 string
        const formatValues = this.formatFormValues(values);
        // 结构体数据不能通过validate获得
        this.childNodes.forEach((node: any) => {
          if (node.nodeName === "FORMS.GENERAL-STRUCTS-FORM-ITEM") {
            formatValues[node.name] = node.value;
          }
        });
        if (callback) {
          callback(formatValues);
        }
        this.successEvent.emit(formatValues);
      }
    });
  }
  formatData(data: Record<string, any>) {
    return Object.keys(data).reduce(
      (formData: Record<string, any>, key: string) => {
        // TODO(Cyril):
        const fieldPath = `[0].${key}`;
        formData[fieldPath] = data[key];
        return formData;
      },
      {}
    );
  }

  // 用于分步容器
  stepOut(eventName = "form.update"): Promise<void> {
    return new Promise((resolve, reject) => {
      this.formUtils.validateFields((error, values) => {
        this._forceUpdate();
        if (error) {
          this.dispatchEvent(
            new CustomEvent(`${eventName}.error`, {
              detail: error,
            })
          );
          // general-form的事件名是validate.error和validate.success，这里发两个事件是因为之前误搞了${eventName}.error，所以为了兼容，只能发两个
          this.dispatchEvent(
            new CustomEvent("validate.error", {
              detail: error,
            })
          );
          return reject();
        } else {
          // 这边是因为之前使用的是 provider 的 updateArgs 方法, 用this.formatData，将{'a': 0} => {'[0].a': 0} 能够直接使用，现已调整到新事件不再需要
          this.dispatchEvent(
            new CustomEvent(`${eventName}.success`, {
              detail: this.formatData(values),
            })
          );
          // 这边用于validate.success就不用this.formatData再包了
          this.dispatchEvent(
            new CustomEvent("validate.success", {
              detail: this.formatFormValues(values),
            })
          );
          return resolve();
        }
      });
    });
  }
}

customElements.define("forms.general-form", GeneralFormElement);
