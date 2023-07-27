import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { AvatarUpload } from "./AvatarUpload";

/**
 * @id presentational-bricks.avatar-upload
 * @author momomo
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.avatar-upload`
 * @docKind brick
 * @noInheritDoc
 */
export class AvatarUploadElement extends UpdatingElement {
  connectedCallback(): void {
    // Don't override user's style settings.
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
   * @detail `string`
   * @description 	上传图片成功发出事件，返回的是对应图片地址
   */
  @event({ type: "avatar.upload.success" })
  changeEvent: EventEmitter<any>;
  private _handleUploadSuccess = (url: string): void => {
    this.changeEvent.emit(url);
  };
  /**
   * @kind string
   * @required false
   * @default -
   * @description 展示图片的src
   */
  @property({ attribute: false })
  imgSrc: string;

  /**
   * @kind number
   * @required false
   * @default 150
   * @description 展示框大小
   */
  @property({ attribute: false })
  size = 150;

  /**
   * @kind number
   * @required false
   * @default 确定
   * @description 展示框大小
   */
  @property({ attribute: false })
  modalOkText = "确定";

  /**
   * @kind number
   * @required false
   * @default 14px
   * @description 展示框大小
   */
  @property({ attribute: false })
  textStyle = {};

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <AvatarUpload
            modalOkText={this.modalOkText}
            size={this.size}
            imgSrc={this.imgSrc}
            uploadSuccess={this._handleUploadSuccess}
            textStyle={this.textStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.avatar-upload",
  AvatarUploadElement
);
