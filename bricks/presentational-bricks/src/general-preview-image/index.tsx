import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { GeneralPreviewImage } from "./GeneralPreviewImage";

/**
 * @id presentational-bricks.general-preview-image
 * @author Albert Jie
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.general-preview-image`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralPreviewImageElement extends UpdatingElement {
  /**
   * @default -
   * @required
   * @description 图像高度
   */
  @property({
    attribute: false,
  })
  height: string | number;

  /**
   * @default -
   * @required
   * @description 图像宽度
   */
  @property({
    attribute: false,
  })
  width: string | number;

  /**
   * @default -
   * @required
   * @description 图片地址
   */
  @property()
  src: string;

  /**
   * @default -
   * @description 多图预览时所有图片地址
   */
  @property({ attribute: false })
  srcList: string[];

  /**
   * @default -
   * @required
   * @description 图像描述
   */
  @property()
  alt: string;

  /**
   * @default -
   * @required
   * @description 加载失败容错地址
   */
  @property()
  fallback: string;

  /**
   * @default -
   * @description 是否可以预览
   */
  @property({ type: Boolean })
  canPreview: boolean;

  /**
   * @default -
   * @description 预览时图片操作按钮是否放置于图片下方
   */
  @property({ type: Boolean })
  customOperationPosition: boolean;

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralPreviewImage
            src={this.src}
            srcList={this.srcList}
            alt={this.alt}
            width={this.width}
            height={this.height}
            fallback={this.fallback}
            canPreview={this.canPreview}
            customOperationPosition={this.customOperationPosition}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-preview-image",
  GeneralPreviewImageElement
);
