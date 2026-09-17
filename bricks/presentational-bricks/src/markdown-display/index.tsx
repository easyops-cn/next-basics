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


export interface MarkdownDisplayElementProps {
  value?: string;
  dataSource?: Record<string, any>;
  fields?: {
    value?: string;
  }
  imagePreview?: boolean;
  hideImgPreviewMask?: boolean;
  imagePreviewOperationInBottom?: boolean;
  linkTarget?: string;
}

/**
 * @id presentational-bricks.markdown-display
 * @name presentational-bricks.markdown-display
 * @editor shared-editors.general-code--editor
 * @docKind brick
 * @description Markdown展示
 * @description.en Markdown display
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class MarkdownDisplayElement extends UpdatingElement implements MarkdownDisplayElementProps {
  /**
   * @required false
   * @description markdown 展示内容
   * @description.en Markdown content to display
   * @group basic
   */
  @property({ attribute: false }) value: string;

  /**
   * @required false
   * @description [已废弃]数据来源
   * @description.en [Deprecated] Data source
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @required false
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @description.en [Deprecated] Field mapping, used together with dataSource to obtain the value at runtime
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
   * @description.en Whether markdown images support preview
   * @group basic
   */
  @property({ attribute: false }) imagePreview: boolean;

  /**
   * @required false
   * @default true
   * @description 是否隐藏图片预览遮罩
   * @description.en Whether to hide the image preview mask
   * @group basic
   */
  @property({ attribute: false }) hideImgPreviewMask: boolean;

  /**
   * @kind boolean
   * @default -
   * @description 预览图片时，图片操作(放大、缩小等操作)是否在下方显示
   * @description.en Whether image operations (zooming in, zooming out, etc.) are displayed at the bottom when previewing an image
   */
  @property({ type: Boolean })
  imagePreviewOperationInBottom: boolean;

  /**
   * @kind boolean
   * @default -
   * @description 内容中链接打开位置，_blank为新窗口打开
   * @description.en Position where links in the content are opened; _blank opens in a new window
   */
  @property({ type: String })
  linkTarget: string;

  /**
   * @kind boolean
   * @default true
   * @description 是否启用代码块复制功能（语法高亮默认启用）
   * @description.en Whether to enable the code block copy function (syntax highlighting is enabled by default)
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
