import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { MarkdownEditor } from "./MarkdownEditor";
import { get } from "lodash";

export interface ImageInfo {
  name: string;
  url: string;
}

/**
 * @id presentational-bricks.markdown-editor
 * @name presentational-bricks.markdown-editor
 * @docKind brick
 * @description Markdown编辑构件
 * @author lynette
 * @slots
 * @history
 * 1.146.1: 支持粘贴图片，新增属性 `supportUploadImg`,`bucketName`，新增事件 `image.upload`。
 * 1.90.0: 新增属性 `previewContainerStyle`
 * @memo
 * @noInheritDoc
 */
export class MarkdownEditorElement extends FormItemElement {
  /**
   * @detail string
   * @description 编辑 value 变化的值
   */
  @event({ type: "markdown.value.change" })
  markdownValueChange: EventEmitter<string>;

  /**
   * @detail ImageInfo
   * @description 上传图片时触发的事件
   */
  @event({ type: "image.upload" })
  UploadImage: EventEmitter<ImageInfo>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description markdown 编辑器的值
   */
  @property({ attribute: false }) value: string;

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 预览容器的样式
   */
  @property({
    attribute: false,
  })
  previewContainerStyle: React.CSSProperties;

  /**
   * @kind boolean
   * @required -
   * @default false
   * @description 支持上传图片，为 `true` 时需要设置 `bucketName`。对接平台统一资源存储。
   */
  @property({
    type: Boolean,
  })
  supportUploadImg: boolean;

  /**
   * @kind string
   * @required -
   * @default -
   * @description 对象存储桶名字，请在业务编排的时候与后台同学商量创建，一般一个业务需求对应一个存储桶名称，相当于 namespace。需要上传图片的功能（`supportUploadImg:true`)时可用。
   */
  @property()
  bucketName: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @kind { value?: string; }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @description
   * @group advanced
   */
  @property({ attribute: false }) fields: {
    value?: string;
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

  private handleChange = (value: string): void => {
    this.value = value;
    this.markdownValueChange.emit(value);
  };

  private handleUploadImage = (value: ImageInfo): void => {
    this.UploadImage.emit(value);
  };

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
          <MarkdownEditor
            formElement={this.getFormElement()}
            value={mutableProps.value}
            onChange={this.handleChange}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            required={this.required}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            previewContainerStyle={this.previewContainerStyle}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            supportUploadImg={this.supportUploadImg}
            bucketName={this.bucketName}
            onUploadImage={this.handleUploadImage}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.markdown-editor",
  MarkdownEditorElement
);
