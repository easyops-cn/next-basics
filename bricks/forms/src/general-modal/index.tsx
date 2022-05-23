import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  method,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralModal } from "./GeneralModal";
import { FormItemElement } from "@next-libs/forms";
import style from "./index.shadow.less";
import { ButtonType } from "antd/lib/button";
import { get } from "lodash";
import { GeneralFormElement } from "../general-form";
import { MenuIcon } from "@next-core/brick-types";

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

export interface OpenCloseOption {
  noEvent?: boolean;
}

export interface ChildeFormElement extends HTMLElement {
  reset?: () => void;
  validate?: () => void;
}

/**
* @id forms.general-modal
* @name forms.general-modal
* @docKind brick
* @description 既可以作为一个独立的模态框表单，也可以作为表单里面的某个表单项存在
* @author
* @slots
* content:模态框里面的内容
* @history
* 1.65.0:新增属性 `okDisabled`
* 1.74.0:新增属性 `notResetWhenClose`、`dataSource`、`disableAfterClick`，事件 `modal.open`、`modal.close`
* 1.76.0:`open` 和 `close` 方法新增 `noEvent` 选项
* @memo
* 该构件既可以作为一个独立的模态框表单，也可以作为表单里面的某个表单项存在，具体查看实例。
*
* 1.当作为独立模态框表单，可由其他触发，比如按钮。与general-modal+general-form组合起来不一样的是，这个模态框表单已经默认有了提交按钮及校验失败模态框不关闭的能力
*
* 2.当作为表单里面的表单项存在，可用于某个字段较复杂配置的情况下，配置构件收集数据<br/>

* > Tips: slots.content 中的构件，如果不是用 general-forms，那么希望点击确认按钮有校验操作，则需自己实现类似于 general-forms 中的 validate 方法；希望点击取消按钮有重置操作，则需自己实现类似于 general-forms 中的 reset 方法。

* ### OpenCloseOption

*| property | type      | required | default | description |
*| -------- | --------- | -------- | ------- | ----------- |
*| noEvent  | `boolean` | -        | -       | 不触发事件  |
*/
export class GeneralModalElement extends FormItemElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单模态框标题
   */
  @property()
  modalTitle: string;

  /**
   * @kind string | number
   * @required false
   * @default `"520px"`
   * @description 表单模态框宽度
   */
  @property({
    attribute: false,
  })
  modalWidth: string | number;

  /**
   * @kind `MenuIcon | SrcIcon`
   * @required false
   * @default -
   * @description 标题图标
   * @group basic
   */
  @property({ attribute: false }) titleIcon?: MenuIcon | SrcIcon;

  /**
   * @kind `Record<string, any>`
   * @required false
   * @default -
   * @description 打开和关闭弹窗事件的 `detail` 的数据源
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind string
   * @required false
   * @default `"确定"`
   * @description 模态框确认按钮文字
   */
  @property()
  okText: string;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 是否禁用确认按钮
   */
  @property({ type: Boolean })
  okDisabled: boolean;

  /**
   * @kind string
   * @required false
   * @default `"取消"`
   * @description 模态框取消按钮文字
   * @group advanced
   */
  @property()
  cancelText: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 点击打开模态框的按钮文字
   */
  @property()
  btnText: string;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 点击确定按钮后自动禁用
   */
  @property({ type: Boolean })
  disableAfterClick: boolean;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 关闭模态框时不重置表单
   * @group advanced
   */
  @property({ type: Boolean })
  notResetWhenClose: boolean;

  /**
   * @kind `ButtonType`("link" | "default" | "primary" | "ghost" | "dashed" | "danger")
   * @required false
   * @default `"primary"`
   * @description 模态框确认按钮类型
   * @group advanced
   */
  @property()
  okType: ButtonType;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 是否点击背景关闭模态框
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  maskClosable: boolean;

  /**
   * @kind boolean
   * @required -
   * @default false
   * @description 是否显示模态框
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  isVisible: boolean;

  /**
   * @kind `{modalTitle: string}	`
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 modalTitle
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: {
    modalTitle: string;
  };

  private _mountPoint: HTMLElement;

  private _childFormElement: ChildeFormElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.addEventListener("click", this.listenToClick);
    this._render();
  }

  // 这里获取 modal 子构件中最外层的 form 自动 validate/reset
  // istanbul ignore next
  private getChildFormComponent = (element: ChildeFormElement): void => {
    if (!this._childFormElement) {
      if (element.validate) {
        this._childFormElement = element;
      } else {
        element.childNodes.forEach((node: any) => {
          this.getChildFormComponent(node);
        });
      }
    }
  };

  // istanbul ignore next
  private listenToClick = (e: MouseEvent): void => {
    const paths = e.composedPath() as HTMLElement[];
    const clickNode = paths[0];
    const nodeName = clickNode.nodeName.toLowerCase();
    const className = clickNode.className;
    // open
    if (nodeName === "a" && className.includes("openBtn")) {
      this.open();
      return;
    }

    const buttonNode =
      nodeName === "button" ? clickNode : clickNode.closest("button");

    // close
    if (
      (this.maskClosable &&
        nodeName === "div" &&
        className.includes("ant-modal-wrap")) ||
      (buttonNode &&
        (buttonNode.className.includes("cancelBtn") ||
          buttonNode.className.includes("ant-modal-close")))
    ) {
      this.close();
      // 触发容器内子构件的 reset 方法
      if (!this.notResetWhenClose) {
        this._childFormElement?.reset?.();
      }
      return;
    }

    if (buttonNode && buttonNode.className.includes("okBtn")) {
      // 触发容器内子构件的 validate 方法
      this._childFormElement?.validate?.();
      if (this.disableAfterClick) {
        this.okDisabled = true;
      }
      return;
    }
  };

  disconnectedCallback(): void {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    ReactDOM.unmountComponentAtNode(this._mountPoint);
    this.removeEventListener("click", this.listenToClick);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const mutableProps = {
        modalTitle: this.modalTitle,
      };
      if (this.fields && this.dataSource) {
        mutableProps.modalTitle = get(this.dataSource, this.fields.modalTitle);
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralModal
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            modalTitle={mutableProps.modalTitle}
            modalWidth={this.modalWidth}
            visible={this.isVisible}
            container={this._mountPoint}
            okText={this.okText}
            cancelText={this.cancelText}
            okType={this.okType}
            okDisabled={this.okDisabled}
            btnText={this.btnText}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            titleIcon={this.titleIcon}
          />
        </BrickWrapper>,
        this._mountPoint,
        () => {
          this._contentSlot = this.shadowRoot.querySelector(
            "#content"
          ) as HTMLSlotElement;
          if (this._contentSlot) {
            this._contentSlot.addEventListener(
              "slotchange",
              this._contentSlotChange
            );
            this._contentSlotChange();
          }
        }
      );
    }
  }

  private _contentSlot: HTMLSlotElement;

  private _contentSlotChange = (): void => {
    const slottedNodes = this._contentSlot?.assignedNodes();
    slottedNodes?.forEach((node) => {
      this.getChildFormComponent(node as HTMLElement);
    });
  };

  /**
   *
   * @description  当点击 modal 自带的取消按钮时发出该事件
   * @detail `dataSource`
   */
  @event({ type: "basic-bricks.general-modal.cancel" })
  cancelEvent: EventEmitter<Record<string, any>>;
  /**
   *
   * @description  当点击 modal 自带的确认按钮时发出该事件
   * @detail `dataSource`
   */
  @event({ type: "basic-bricks.general-modal.confirm" })
  confirmEvent: EventEmitter<Record<string, any>>;
  /**
   * @detail `dataSource`
   * @description  打开 modal 时发出该事件
   */
  @event({ type: "modal.open" }) openEvent: EventEmitter<Record<string, any>>;
  /**
   * @params `option?: OpenCloseOption`
   * @description  弹出模态框
   */
  @method()
  open(option?: OpenCloseOption): void {
    this.isVisible = true;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    if (!option?.noEvent) {
      this.openEvent.emit(this.dataSource);
    }
  }
  /**
   * @detail `dataSource`
   * @description  关闭 modal 时发出该事件
   */
  @event({ type: "modal.close" }) closeEvent: EventEmitter<Record<string, any>>;
  /**
   *
   * @params `option?: OpenCloseOption`
   * @description 关闭模态框
   */
  @method()
  close(option?: OpenCloseOption): void {
    this.isVisible = false;
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    if (!option?.noEvent) {
      this.closeEvent.emit(this.dataSource);
    }
  }
  /**
   *
   * @description  更新该表单项数据。通常在子构件为 general-form 的时候，校验成功事件"validate.success"中进行更新数据，参考[通用表单](developers/brick-book/brick/forms.general-form)
   */
  @method()
  updateValue(value: any): void {
    const element = this.getFormElement() as GeneralFormElement;
    element?.setInitValue({ [this.name]: value });
  }
}

customElements.define("forms.general-modal", GeneralModalElement);
