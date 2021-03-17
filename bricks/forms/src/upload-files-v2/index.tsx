import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UploadFilesV2, UploadFileValueItem } from "./UploadFilesV2";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.upload-files-v2
 * @name forms.upload-files-v2
 * @description 通过指定 API 上传文件，用于表单项
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `forms.upload-files-v2`
 * @docKind brick
 */
export class UploadFilesV2Element extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   */
  @property({ type: Boolean }) disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 选择文件后是否直接上传。autoUpload为true时，文件会自动上传到url地址，每个value中存在response属性存储上传地址的返回信息。autoUpload为false时，文件不会自动上传，需要用户自行上传，每个value中存在file属性存储文件信息。
   */
  @property({ type: Boolean }) autoUpload: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 上传的地址，仅在autoUpload为true时有效
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default 'post'
   * @description 上传请求的方法，仅在autoUpload为true时有效
   */
  @property({ attribute: false })
  method: string;

  /**
   * @kind string
   * @required false
   * @default 'file'
   * @description 发到后台的文件参数名，仅在autoUpload为true时有效
   */
  @property({ attribute: false })
  uploadName: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 接受上传的文件类型，多个之间用,连接
   */
  @property({ attribute: false })
  accept: string;

  /**
   * @kind { [key: string]: string; }
   * @required false
   * @default -
   * @description 上传所需额外参数，仅在autoUpload为true时有效
   */
  @property({ attribute: false })
  data: { [key: string]: string };

  /**
   * @kind {url:string,name:string}[]
   * @required false
   * @default -
   * @description 上传文件表单项的值，其中`url`为文件的资源路径，`name`为文件名称。
   */
  @property({ attribute: false })
  value: UploadFileValueItem[];

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最大上传数量
   */
  @property({
    type: Number,
  })
  maxNumber: number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否可以拖拽上传
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
   */
  @property({ attribute: false })
  draggableUploadText: string;

  /**
   * @kind string
   * @required false
   * @default 支持扩展名：.jpg .jpeg .png .gif ...
   * @description 拖拽上传的提示信息
   */
  @property({ attribute: false })
  draggableUploadHint: string;
  /**
   * @kind string
   * @required false
   * @default Upload
   * @description 上传按钮文字
   */
  @property({ attribute: false })
  uploadButtonName: string;

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
   * @detail `{url?:string,response?:object,file?object,uid:string,name:string}[]`
   * @description 	上传文件表单项变化发出的事件
   */
  @event({ type: "upload.files.change" }) changeEvent: EventEmitter<any>;
  private _handleChange = (value: any): void => {
    this.value = value;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  /**
   * @detail `{url?:string,response?:object,file?:object,uid:string,name:string}[]`
   * @description 	上传文件失败发出的事件，仅在autoUpload为true时有效
   */
  @event({ type: "upload.files.error" }) errorEvent: EventEmitter<any>;
  private _handleError = (value: any): void => {
    Promise.resolve().then(() => {
      this.errorEvent.emit(value);
    });
  };

  /**
   * @detail `file`
   * @description 	删除文件发出的事件
   */
  @event({ type: "upload.files.remove" }) removeEvent: EventEmitter<any>;
  private _handleRemove = (value: any): void => {
    this.removeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <UploadFilesV2
            formElement={this.getFormElement()}
            autoUpload={this.autoUpload}
            name={this.name}
            label={this.label}
            required={this.required}
            url={this.url}
            method={this.method}
            uploadName={this.uploadName}
            accept={this.accept}
            data={this.data}
            disabled={this.disabled}
            uploadButtonName={this.uploadButtonName}
            value={this.value}
            maxNumber={this.maxNumber}
            uploadDraggable={this.uploadDraggable}
            hideUploadButton={this.hideUploadButton}
            draggableUploadText={this.draggableUploadText}
            draggableUploadHint={this.draggableUploadHint}
            onChange={this._handleChange}
            onRemove={this._handleRemove}
            onError={this._handleError}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.upload-files-v2", UploadFilesV2Element);
