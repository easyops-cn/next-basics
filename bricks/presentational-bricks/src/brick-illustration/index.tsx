import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { BrickIllustration } from "./BrickIllustration";

export interface IllustrationHeader {
  title?: string;
  description?: string;
}

export interface IllustrationFooter {
  text?: string;
  label?: string;
  target?: string;
  url?: string;
}

export type IllustrationMode = "feedback" | "guide";

/**
 * @id presentational-bricks.brick-illustration
 * @author alexchen
 * @history
 * 1.148.0: 新增构件 `presentational-bricks.brick-illustration`
 * @memo
 * >更多类型插画请移至[插画库](/developers/illustrations)
 * @docKind brick
 * @noInheritDoc
 */
export class BrickIllustrationElement extends UpdatingElement {
  /**
   * @default -
   * @required true
   * @description 插画名称
   */
  @property()
  name: string;

  /**
   * @default `default`
   * @required true
   * @description 插画类型
   */
  @property()
  category: string;

  /**
   * @default -
   * @required -
   * @description 插画头部内容
   */
  @property({ attribute: false })
  header: IllustrationHeader;

  /**
   * @default -
   * @required false
   * @description 插画底部内容
   */
  @property({ attribute: false })
  footer: IllustrationFooter;

  /**
   * @default -
   * @required -
   * @description 插画模式
   */
  @property()
  mode: IllustrationMode;

  /**
   * @default -
   * @required -
   * @description 图片样式
   */
  @property({ attribute: false })
  imageStyle: CSSProperties;

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
          <BrickIllustration
            mode={this.mode}
            name={this.name}
            category={this.category}
            imageStyle={this.imageStyle}
            header={this.header}
            footer={this.footer}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-illustration",
  BrickIllustrationElement
);
