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
 * >更多类型插画请移至[插画库](/next/developers/illustrations)
 * @docKind brick
 * @noInheritDoc
 */
export class BrickIllustrationElement extends UpdatingElement {
  /**
   * @required true
   * @description 插画名称
   */
  @property()
  name: string;

  /**
   * @default "default"
   * @required true
   * @description 插画类型
   * @group basic
   */
  @property()
  category: string;

  /**
   * @required false
   * @description 插画头部内容
   * @group other
   */
  @property({ attribute: false })
  header: IllustrationHeader;

  /**
   * @required false
   * @description 插画底部内容
   * @group other
   */
  @property({ attribute: false })
  footer: IllustrationFooter;

  /**
   * @required false
   * @description 插画模式
   * @group other
   * @deprecated
   */
  @property()
  mode: IllustrationMode;

  /**
   * @required false
   * @description 图片样式
   * @group ui
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
