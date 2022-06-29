import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UploadImg, UploadImgValue } from "./UploadImg";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.upload-img
 * @name forms.upload-img
 * @docKind brick
 * @description 对接平台对象存储，提供上传图片功能的构件
 * @author lynette
 * @slots
 * @history
 * 1.81.0:新增属性`hideUploadButton`
 * 1.79.0:新增属性`uploadDraggable`，预废弃属性 `draggable`
 * 1.60.0:新增属性 `placeholder`,`autoSize`
 * 1.54.0:新增属性 `draggableUploadText`
 * 1.46.0:新增构件 `draggableUploadHint`
 * @excludesInherit
 *  pattern
 * @memo
 */
export class UploadImgElement extends FormItemElement {
  // 对象存储桶名字，业务编排的时候创建，一般一个业务需求对应一个存储桶名称，相当于 namespace
  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 对象存储桶名字，请在业务编排的时候与后台同学商量创建，一般一个业务需求对应一个存储桶名称，相当于 namespace。
   */
  @property()
  bucketName: string;

  /**
   * @kind {text?: string;images?:{url:string,name?:string}[]}
   * @required false
   * @default -
   * @description 上传图片表单项的值，`text` 为 textarea 输入框的值，`images` 为图片的值，其中`url`为图片的资源路径，`name`为图片名称。
   */
  @property({ attribute: false })
  value: UploadImgValue;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框占位说明
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示 textArea
   */
  @property({
    type: Boolean,
  })
  showTextarea: boolean;

  /**
   * @kind "text"|"picture"|"picture-card"
   * @required false
   * @default picture-card
   * @description 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
   */
  @property({
    attribute: false,
  })
  listType?: "picture" | "picture-card" | "text" = "picture-card";

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最大上传图片数量
   * @group advanced
   */
  @property({
    type: Number,
  })
  maxNumber: number;

  /**
   * @kind number
   * @required false
   * @default 10
   * @description 图片上传大小限制(MB)
   * @group advanced
   */
  @property({
    type: Number,
  })
  limitSize: number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否可以拖拽上传
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  uploadDraggable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏上传按钮，当`uploadDraggable`为`true`时不生效
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  hideUploadButton: boolean;

  /**
   * @kind string
   * @required false
   * @default 单击或拖拽图像到此区域上传
   * @description 拖拽上传的文字
   * @group advanced
   */
  @property()
  draggableUploadText: string;

  /**
   * @kind string
   * @required false
   * @default 支持扩展名：.jpg .jpeg .png .gif ...
   * @description 拖拽上传的提示信息
   * @group advanced
   */
  @property()
  draggableUploadHint: string;

  /**
   * @kind boolean|{minRows:number,maxRows:number}
   * @required false
   * @default false
   * @description 自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }
   * @group advanced
   */
  @property({ attribute: false })
  autoSize: boolean | { minRows: number; maxRows: number };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 配置图片上传事件(change，remove等)返回的 url 是否为绝对路径，不配置该属性为相对路径。采用绝对路径时会加上 `/next/` 前缀，其中一个使用场景是当上传的图片用在 markdown 构件内展示时，请设置该属性
   * @group advanced
   */
  @property({ type: Boolean })
  useFullUrlPath: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 配置图片上传事件(change，remove等)是否返回Data URL，常用于预览，形如：data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQ...。注意，图片较大时，这个数据可能会很大。
   * @group advanced
   */
  @property({ type: Boolean })
  getPreview: boolean;

  /**
   * @required false
   * @default -
   * @description 是否可拖拽
   * @deprecated
   * @group advanced
   */
  @property({
    type: Boolean,
    __deprecated_and_for_compatibility_only: true,
  })
  draggable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示 Mentions,  当`showTextarea`为`true`时不生效
   */
  @property({
    type: Boolean,
  })
  showMentions: boolean;

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
   * @detail `{text?: string;images?: {url:string,name:string}[];}	`
   * @description 	上传图片表单项变化发出的事件
   */
  @event({ type: "upload.img.change" }) changeEvent: EventEmitter<any>;
  private _handleChange = (value: any): void => {
    this.value = value;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  /**
   * @detail `{name?: string;status?:string;size: number;type: string;}	`
   * @description 	点击已上传图片删除按钮发出的事件
   */
  @event({ type: "upload.img.remove" }) removeEvent: EventEmitter<any>;
  private _handleRemove = (value: any): void => {
    this.removeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      if (this.draggable) {
        // eslint-disable-next-line no-console
        console.warn(
          "`draggable` of `<forms.upload-img>` is deprecated, use `uploadDraggable` instead."
        );
      }
      ReactDOM.render(
        <BrickWrapper>
          <UploadImg
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            value={this.value}
            placeholder={this.placeholder}
            autoSize={this.autoSize}
            listType={this.listType}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            onRemove={this._handleRemove}
            bucketName={this.bucketName}
            maxNumber={this.maxNumber}
            limitSize={this.limitSize}
            showTextarea={this.showTextarea}
            uploadDraggable={this.uploadDraggable || this.draggable}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            draggableUploadText={this.draggableUploadText}
            draggableUploadHint={this.draggableUploadHint}
            hideUploadButton={this.hideUploadButton}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            useFullUrlPath={this.useFullUrlPath}
            getPreview={this.getPreview}
            showMentions={this.showMentions}
            labelTooltip={this.labelTooltip}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.upload-img", UploadImgElement);
