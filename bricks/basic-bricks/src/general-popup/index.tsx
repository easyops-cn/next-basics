import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
} from "@next-core/brick-kit";
import styles from "./style.shadow.css";
import { GeneralPopup, OpenDirection } from "./GeneralPopup";

export interface GeneralPopupElementProps {
  popupId?: string;
  popupWidth?: React.CSSProperties["width"];
  popupHeight?: React.CSSProperties["height"];
  popupTitle?: string;
  openDirection?: OpenDirection;
  isVisible?: boolean;
  dragHeaderStyle?: Record<string, any>;
  dragWrapperStyle?: Record<string, any>;
  resize?: boolean;
}

/**
 * @id basic-bricks.general-popup
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.general-popup`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralPopupElement extends UpdatingElement implements GeneralPopupElementProps {
  /**
   * @default -
   * @required false
   * @description 浮层Id, 如果有设置浮层id, 会开启位置记录功能
   */
  @property({ type: String })
  popupId: string;

  /**
   * @default 500
   * @required false
   * @description 弹窗宽度
   */
  @property({ type: String })
  popupWidth: React.CSSProperties["width"];

  /**
   * @default -
   * @required false
   * @description 弹窗高度
   */
  @property({ type: String })
  popupHeight: React.CSSProperties["height"];

  /**
   * @default -
   * @required false
   * @description 弹窗标题
   */
  @property({ type: String })
  popupTitle: string;

  /**
   * @default center
   * @required false
   * @description 弹窗打开位置
   */
  @property({ type: String })
  openDirection: OpenDirection;

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
   * @required false
   * @default -
   * @description 用于设置 popup head的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  dragHeaderStyle: Record<string, any> = {};

  /**
   * @required false
   * @default -
   * @description 用于设置 popup wrapper的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  dragWrapperStyle: Record<string, any> = {};

  /**
   * @description 是否可调整尺寸
   * @group ui
   */
  @property({
    type: Boolean,
  })
  resize?: boolean;

  /**
   * @description 显示弹窗
   */
  @method()
  open(): void {
    this.isVisible = true;
  }

  /**
   * @description 关闭弹窗
   */
  @method()
  close(): void {
    this.closePopup();
  }

  closePopup = (): void => {
    this.isVisible = false;
  };

  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._shadowRoot);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{styles}</style>
          <BrickWrapper>
            <GeneralPopup
              popupId={this.popupId}
              popupWidth={this.popupWidth}
              popupHeight={this.popupHeight}
              popupTitle={this.popupTitle}
              visible={this.isVisible}
              closePopup={this.closePopup}
              openDirection={this.openDirection}
              dragHeaderStyle={this.dragHeaderStyle}
              dragWrapperStyle={this.dragWrapperStyle}
              resize={this.resize}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.general-popup", GeneralPopupElement);
