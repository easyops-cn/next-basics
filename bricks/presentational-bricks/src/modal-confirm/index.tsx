import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { ModalConfirm, ModalConfirmProps } from "./ModalConfirm";
import { ButtonProps, ButtonType } from "antd/lib/button";
import { pick } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";


export interface ModalConfirmElementProps {
  modalTitle?: string;
  content?: string;
  type?: ModalConfirmProps["type"] ;
  dataSource?: Record<string, any>;
  contentBrick?: { useBrick: UseBrickConf };
  extraContentSuffixBrick?: { useBrick: UseBrickConf };
  expect?: string;
  isDelete?: boolean;
  okText?: string;
  okType?: ButtonType;
  okButtonProps?: ButtonProps;
  confirmLoading?: boolean;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  extraContent?: string;
  visible?: boolean;
  width?: string | number;
  title?: string;
}

/**
 * @id presentational-bricks.modal-confirm
 * @name presentational-bricks.modal-confirm
 * @docKind brick
 * @description 用于提示和二次确认的场景
 * @description.en Used for prompts and secondary confirmation scenarios
 * @groupI18N
 * {
 *    "buttonAndInteract": {"en": "Button/Interact", "zh": "按钮及交互"}
 * }
 * @editor shared-editors.general-confirm--editor
 * @author jo
 * @slots
 * @history
 * 1.84.0:新增 `expect` 属性
 * 1.90.0:新增 `openWithArgs` 方法
 * 1.95.0:新增 `modalTitle` 属性代替原先的 title
 * @memo
 * @noInheritDoc
 */
export class ModalConfirmElement extends UpdatingElement implements ModalConfirmElementProps {
  // -------------------------------- basic --------------------------------

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框标题，代替之前 title 属性, 支持模板(即通过 #{xxx} 方式获取数据源字段的上值，由于框架目前提供了 transform 机制也可以达到此需求，推荐使用框架提供的能力)
   * @description.en Modal title, replacing the previous title property, supports templates (i.e. getting the value of a data source field via #{xxx}; since the framework now provides the transform mechanism to achieve this requirement, using the capability provided by the framework is recommended)
   * @group basic
   */
  @property() modalTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框内容，支持模板和 HTML（自动消毒）
   * @description.en Modal content, supports templates and HTML (auto-sanitized)
   * @group basic
   */
  @property() content: string;

  /**
   * @kind "info" | "success" | "error" | "warning" | "confirm"
   * @required false
   * @default confirm
   * @description 对话框类型
   * @description.en Dialog type
   * @enums "info"|"success"|"error"|"warning"|"confirm"
   * @group basic
   */
  @property({
    attribute: false,
  })
  type: ModalConfirmProps["type"] = "confirm";

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 解析模板时的数据源，配合content、extraContent使用
   * @description.en Data source used when parsing templates, used together with content and extraContent
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @kind  {useBrick: UseBrickConf}
   * @required false
   * @default false
   * @description  panelBrick
   */
  @property({
    attribute: false,
  })
  contentBrick: { useBrick: UseBrickConf };

  @property({
    attribute: false,
  })
  extraContentSuffixBrick: { useBrick: UseBrickConf };

  // -------------------------------- ui --------------------------------

  /**
   * @kind string
   * @required false
   * @default -
   * @description 支持模板，若设置，需输入该文本方可删除
   * @description.en Supports templates; if set, this text must be entered to allow deletion
   * @group ui
   */
  @property() expect: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description `已废弃` (可以用`okType`属性代替) 删除模式的模态框：确定按钮的文本为删除，并红色高亮显示
   * @description.en `Deprecated` (can be replaced by the `okType` property) Modal in delete mode: the text of the OK button is Delete, highlighted in red
   * @deprecated
   * @group ui
   */
  @property() isDelete: boolean;

  // -------------------------------- buttonAndInteract --------------------------------

  /**
   * @kind string
   * @required false
   * @default -
   * @description 确定按钮文字
   * @description.en OK button text
   * @group buttonAndInteract
   */
  @property() okText: string;

  /**
   * @kind ButtonType ("link" | "default" | "primary" | "ghost" | "dashed" | "danger")
   * @required false
   * @default -
   * @description 确定按钮类型
   * @description.en OK button type
   * @enums "link"|"default"|"primary"|"ghost"|"dashed"|"danger"
   * @group buttonAndInteract
   */
  @property() okType: ButtonType;

  /**
   * @kind ButtonProps
   * @required false
   * @default -
   * @description 确定按钮属性，同 ant design 的 Modal 的 [okButtonProps](https://ant.design/components/modal-cn#API)
   * @description.en OK button props, same as [okButtonProps](https://ant.design/components/modal-cn#API) of the ant design Modal
   * @group buttonAndInteract
   */
  @property({ attribute: false }) okButtonProps?: ButtonProps;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 点击确定按钮是否关闭模态框
   * @description.en Whether clicking the OK button closes the modal
   * @group buttonAndInteract
   */
  @property({
    attribute: false,
  })
  closeWhenOk = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 确定按钮是否为 loading 状态，在发起后台请求并且请求较慢的情况下可以设置 loading 状态优化用户体验
   * @description.en Whether the OK button is in loading state; the loading state can be set to optimize the user experience when a backend request is made and the request is slow
   * @group buttonAndInteract
   */
  @property({ type: Boolean }) confirmLoading: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 取消按钮文字
   * @description.en Cancel button text
   * @group buttonAndInteract
   */
  @property() cancelText: string;

  /**
   * @kind ButtonProps
   * @required false
   * @default -
   * @description 取消按钮属性，同 ant design 的 Modal 的 [cancelButtonProps](https://ant.design/components/modal-cn#API)
   * @description.en Cancel button props, same as [cancelButtonProps](https://ant.design/components/modal-cn#API) of the ant design Modal
   * @group buttonAndInteract
   */
  @property({ attribute: false }) cancelButtonProps?: ButtonProps;

  // -------------------------------- other --------------------------------

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框的额外内容，支持模板和 HTML（自动消毒）
   * @description.en Extra content of the modal, supports templates and HTML (auto-sanitized)
   * @group other
   */
  @property() extraContent: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description `已废弃` 模态框是否可见，请使用 `open` 和 `close` 方法打开和关闭模态框
   * @description.en `Deprecated` Whether the modal is visible; please use the `open` and `close` methods to open and close the modal
   * @deprecated
   * @group other
   */
  @property({ type: Boolean })
  visible: boolean;

  /**
   * @kind string | number
   * @required false
   * @default -
   * @description 模态框宽度
   * @description.en Modal width
   * @group ui
   */
  @property({ attribute: false })
  width: string | number;

  /**
   * @kind string
   * @required false
   * @default -
   * @description `已废弃` 请使用 modalTitle 代替
   * @description.en `Deprecated` Please use modalTitle instead
   * @deprecated
   * @group other
   */
  @property({ __deprecated_and_for_compatibility_only: true }) title: string;

  /**
   * @detail `Record<string, any>`
   * @description 点击确定按钮的事件，事件的 detail 为构件的 dataSource 属性的当前值
   * @description.en Event of clicking the OK button; the detail of the event is the current value of the dataSource property of the brick
   */
  @event({ type: "confirm.ok", cancelable: true })
  confirmOk: EventEmitter<any>;

  /**
   * @detail -
   * @description 点击取消按钮的事件
   * @description.en Event of clicking the Cancel button
   */
  @event({ type: "confirm.cancel", cancelable: true })
  confirmCancel: EventEmitter<any>;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  /**
   * @params CustomEvent
   * @description 打开模态框，如果需要同时更新参数，推荐使用 `openWithArgs` 方法
   * @description.en Open the modal; if the arguments need to be updated at the same time, the `openWithArgs` method is recommended
   */
  @method()
  open(event?: CustomEvent): void {
    if (event && event.detail) {
      // eslint-disable-next-line no-console
      console.warn(
        "please use `openWithArgs` method instead when open `presentational-bricks.modal-confirm` with args."
      );
      const props = pick(event.detail, [
        "visible",
        "title",
        "modalTitle",
        "content",
        "extraContent",
        "okText",
        "expect",
        "okType",
        "cancelText",
        "isDelete",
        "confirmLoading",
        "dataSource",
        "okButtonProps",
        "cancelButtonProps",
      ]);

      const okButtonProps = props.okButtonProps;
      okButtonProps &&
        (props.okButtonProps = {
          ...this.okButtonProps,
          ...okButtonProps,
        });

      const cancelButtonProps = props.cancelButtonProps;
      cancelButtonProps &&
        (props.cancelButtonProps = {
          ...this.cancelButtonProps,
          ...cancelButtonProps,
        });

      Object.assign(this, props);
    }
    this.visible = true;
  }

  /**
   * @params Record<string, any>
   * @description 打开模态框的同时更新模态框相关属性
   * @description.en Update the modal-related properties while opening the modal
   */
  @method()
  openWithArgs(args?: ModalConfirmProps): void {
    const props = pick(args, [
      "visible",
      "title",
      "modalTitle",
      "content",
      "extraContent",
      "okText",
      "expect",
      "okType",
      "cancelText",
      "isDelete",
      "confirmLoading",
      "dataSource",
      "okButtonProps",
      "cancelButtonProps",
      "contentBrick",
      "width",
    ]);

    const okButtonProps = props.okButtonProps;
    okButtonProps &&
      (props.okButtonProps = {
        ...this.okButtonProps,
        ...okButtonProps,
      });

    const cancelButtonProps = props.cancelButtonProps;
    cancelButtonProps &&
      (props.cancelButtonProps = {
        ...this.cancelButtonProps,
        ...cancelButtonProps,
      });

    Object.assign(this, props);
    this.visible = true;
  }

  /**
   * @params -
   * @description 关闭模态框
   * @description.en Close the modal
   */
  @method()
  close(): void {
    this.visible = false;
  }

  handleOk = () => {
    const defaultAction = this.confirmOk.emit(this.dataSource);
    if (defaultAction && this.closeWhenOk) {
      this.close();
    }
  };

  handleCancel = () => {
    const defaultAction = this.confirmCancel.emit(this.dataSource);
    if (defaultAction) {
      this.close();
    }
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ModalConfirm
            visible={this.visible}
            dataSource={this.dataSource}
            title={this.modalTitle || this.title}
            content={this.content}
            contentBrick={this.contentBrick}
            extraContent={this.extraContent}
            okText={this.okText}
            okType={this.okType}
            okButtonProps={this.okButtonProps}
            cancelText={this.cancelText}
            cancelButtonProps={this.cancelButtonProps}
            isDelete={this.isDelete}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            type={this.type}
            closeWhenOk={this.closeWhenOk}
            confirmLoading={this.confirmLoading}
            expect={this.expect}
            width={this.width}
            extraContentSuffixBrick={this.extraContentSuffixBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.modal-confirm",
  ModalConfirmElement
);
