import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  EventEmitter,
  UpdatingElement,
  event,
  method,
  property,
} from "@next-core/brick-kit";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { get } from "lodash";
import { CheckboxInfo } from "./MarkdownDisplay";

/**
 * @id presentational-bricks.markdown-display
 * @name presentational-bricks.markdown-display
 * @editor shared-editors.general-code--editor
 * @docKind brick
 * @description Markdown展示
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class MarkdownDisplayElement extends UpdatingElement {
  /**
   * @required false
   * @description markdown 展示内容
   * @group basic
   */
  @property({ attribute: false }) value: string;

  /**
   * @required false
   * @description [已废弃]数据来源
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @required false
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) fields: {
    value?: string;
  };

  /**
   * @required false
   * @default true
   * @description markdown 图片是否支持预览
   * @group basic
   */
  @property({ attribute: false }) imagePreview: boolean;

  /**
   * @required false
   * @default true
   * @description 是否隐藏图片预览遮罩
   * @group basic
   */
  @property({ attribute: false }) hideImgPreviewMask: boolean;

  /**
   * @kind boolean
   * @default -
   * @description 预览图片时，图片操作(放大、缩小等操作)是否在下方显示
   */
  @property({ type: Boolean })
  imagePreviewOperationInBottom: boolean;

  /**
   * @kind boolean
   * @default -
   * @description 内容中链接打开位置，_blank为新窗口打开
   */
  @property({ type: String })
  linkTarget: string;

  /**
   * @kind boolean
   * @default true
   * @description 是否启用代码块复制功能（语法高亮默认启用）
   * @group basic
   */
  @property({ attribute: false })
  enableCodeCopy = true;

  // ⚠️ For qa use only, not for production
  @property({ attribute: false })
  __unstable_property_collectCheckboxInfo = false;

  @event({
    type: "checkbox.change",
  })
  checkboxChange: EventEmitter<CheckboxInfo[]>;

  handleCheckboxChange = (checkboxInfos: CheckboxInfo[]): void => {
    this.checkboxChange.emit(checkboxInfos);
  };

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

  protected _render(): void {
    if (this.isConnected) {
      const mutableProps = {
        value: this.value,
      };
      if (this.dataSource) {
        mutableProps.value = this.fields?.value
          ? get(this.dataSource, this.fields.value)
          : this.dataSource;
      }
      ReactDOM.render(
        <BrickWrapper>
          <MarkdownDisplay
            value={mutableProps.value}
            imagePreview={this.imagePreview}
            hideImgPreviewMask={this.hideImgPreviewMask}
            imagePreviewOperationInBottom={this.imagePreviewOperationInBottom}
            linkTarget={this.linkTarget}
            collectCheckboxInfo={this.__unstable_property_collectCheckboxInfo}
            onCheckboxChange={this.handleCheckboxChange}
            enableCodeCopy={this.enableCodeCopy}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.markdown-display",
  MarkdownDisplayElement
);
