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
import { UploadButtonProps } from "../interfaces";

export interface UploadFilesV2ElementProps {
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  autoUpload?: boolean;
  url?: string;
  method?: string;
  uploadName?: string;
  fileNamePattern?: string;
  autoDownload?: boolean;
  autoDownloadUrlTemplate?: string;
  accept?: string;
  data?: { [key: string]: string };
  value?: UploadFileValueItem[];
  maxNumber?: number;
  limitSize?: number;
  uploadDraggable?: boolean;
  hideUploadButton?: boolean;
  draggableUploadText?: string;
  draggableUploadHint?: string;
  uploadButtonName?: string;
  uploadButtonProps?: UploadButtonProps;
  showPreviewIcon?: boolean;
}

/**
 * @id forms.upload-files-v2
 * @name forms.upload-files-v2
 * @description 通过指定 API 上传文件，用于表单项
 * @description.en Upload files through the specified API, used as a form item
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `forms.upload-files-v2`
 * @docKind brick
 * @excludesInherit
 *  placeholder
 *  pattern
 */

export class UploadFilesV2Element
  extends FormItemElement
  implements UploadFilesV2ElementProps
{
  /**
   * @group basicFormItem
   * @required true
   * @description 表单项字段名sss
   * @description.en Form item field name
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 表单项字段说明
   * @description.en Description of the form item field
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否必填项
   * @description.en Whether the form item is required
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否禁用
   * @description.en Whether it is disabled
   */
  @property({ type: Boolean }) disabled: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default true
   * @description 达到最大上传数量时是否隐藏拖拽上传按钮，仅当`uploadDraggable`为`true`且设置`maxNumber`时有效
   * @description.en Whether to hide the drag-and-drop upload button when the maximum number of uploads is reached; valid only when `uploadDraggable` is `true` and `maxNumber` is set
   */
  @property({ attribute: false }) hideDragBtnWhenAchieveMax = true;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 选择文件后是否直接上传。autoUpload为true时，文件会自动上传到url地址，每个value中存在response属性存储上传地址的返回信息。autoUpload为false时，文件不会自动上传，需要用户自行上传，每个value中存在file属性存储文件信息。
   * @description.en Whether to upload directly after a file is selected. When autoUpload is true, the file is uploaded automatically to the url address, and each value has a response property that stores the returned information of the upload address. When autoUpload is false, the file is not uploaded automatically and the user needs to upload it manually, and each value has a file property that stores the file information.
   */
  @property({ type: Boolean }) autoUpload: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 上传的地址，仅在autoUpload为true时有效
   * @description.en Upload address; valid only when autoUpload is true
   */
  @property()
  url: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 'post'
   * @description 上传请求的方法，仅在autoUpload为true时有效
   * @description.en Method of the upload request; valid only when autoUpload is true
   */
  @property({ attribute: false })
  method: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 'file'
   * @description 发到后台的文件参数名，仅在autoUpload为true时有效
   * @description.en Parameter name of the file sent to the backend; valid only when autoUpload is true
   */
  @property({ attribute: false })
  uploadName: string;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 文件名称校验格式（正则表达式）
   * @description.en File name validation format (regular expression)
   */
  @property({ attribute: false })
  fileNamePattern: string;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否支持展示下载图标,仅在showDownloadIcon为true时有效
   * @description.en Whether to display the download icon; valid only when showDownloadIcon is true
   *
   */
  @property({ attribute: false })
  showDownloadIcon = false;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否展示预览图标，点击后触发`upload.files.preview`事件
   * @description.en Whether to display the preview icon; clicking it triggers the `upload.files.preview` event
   *
   */
  @property({ attribute: false })
  showPreviewIcon = false;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否支持自动下载
   * @description.en Whether to support automatic download
   */
  @property({ type: Boolean }) autoDownload: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 自动下载的url模板
   * @description.en url template for automatic download
   */
  @property() autoDownloadUrlTemplate: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 接受上传的文件类型，多个之间用,连接
   * @description.en Accepted file types for upload; multiple types are separated by ,
   */
  @property({ attribute: false })
  accept: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 上传所需额外参数，仅在autoUpload为true时有效
   * @description.en Extra parameters required for upload; valid only when autoUpload is true
   */
  @property({ attribute: false })
  data: { [key: string]: string };

  /**
   * @group basicFormItem
   * @required false
   * @description 上传文件表单项的值，其中`url`为文件的资源路径，`name`为文件名称。
   * @description.en Value of the file upload form item, where `url` is the resource path of the file and `name` is the file name.
   */
  @property({ attribute: false })
  value: UploadFileValueItem[];

  /**
   * @group basicFormItem
   * @required false
   * @description 最大上传数量
   * @description.en Maximum number of uploads
   */
  @property({
    type: Number,
  })
  maxNumber: number;

  /**
   * @group basicFormItem
   * @required false
   * @default 100
   * @description 文件上传大小限制(MB)
   * @description.en File upload size limit (MB)
   */
  @property({
    type: Number,
  })
  limitSize: number;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否可以拖拽上传
   * @description.en Whether drag-and-drop upload is supported
   */
  @property({
    type: Boolean,
  })
  uploadDraggable: boolean;

  /**
   * @group ui
   * @required false
   * @default false
   * @description 是否隐藏上传按钮，当`uploadDraggable`为`true`时不生效
   * @description.en Whether to hide the upload button; invalid when `uploadDraggable` is `true`
   */
  @property({
    type: Boolean,
  })
  hideUploadButton: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default 单击或拖拽图像到此区域上传
   * @description 拖拽上传的文字
   * @description.en Text of drag-and-drop upload
   */
  @property({ attribute: false })
  draggableUploadText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 支持扩展名：.jpg .jpeg .png .gif ...
   * @description 拖拽上传的提示信息
   * @description.en Hint of drag-and-drop upload
   */
  @property({ attribute: false })
  draggableUploadHint: string;
  /**
   * @kind string
   * @required false
   * @default Upload
   * @deprecated
   * @description [已废弃]上传按钮文字，请使用uploadButtonProps.buttonName
   * @description.en [Deprecated] Upload button text; use uploadButtonProps.buttonName instead
   */
  @property({ attribute: false })
  uploadButtonName: string;

  /**
   * @group advancedFormItem
   * @required false
   * @description 上传按钮设置
   * @description.en Upload button settings
   */
  @property({
    attribute: false,
  })
  uploadButtonProps: UploadButtonProps;

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
   * @description.en Event emitted when the value of the file upload form item changes
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
   * @description.en Event emitted when the file upload fails; valid only when autoUpload is true
   */
  @event({ type: "upload.files.error" }) errorEvent: EventEmitter<any>;
  private _handleError = (value: any): void => {
    Promise.resolve().then(() => {
      this.errorEvent.emit(value);
    });
  };

  /**
   * @detail `{errorType:string,url?:string,response?:object,file?:object,uid:string,name:string}`
   * @description 上传文件失败发出的事件，仅在autoUpload为true时有效
   * @description.en Event emitted when the file upload fails; valid only when autoUpload is true
   */
  @event({ type: "upload.files.custom.error" })
  customErrorEvent: EventEmitter<any>;
  private _handleCustomError = (type: any, value: any): void => {
    Promise.resolve().then(() => {
      this.customErrorEvent.emit({ message: value, errorType: type });
    });
  };

  /**
   * @detail `file`
   * @description 	删除文件发出的事件
   * @description.en Event emitted when a file is removed
   */
  @event({ type: "upload.files.remove" }) removeEvent: EventEmitter<any>;
  private _handleRemove = (value: any): void => {
    this.removeEvent.emit(value);
  };
  /**
   * @detail `file`
   * @description 	下载文件发出的事件
   * @description.en Event emitted when a file is downloaded
   */
  @event({ type: "upload.files.download" }) downloadEvent: EventEmitter<any>;
  private _handleDownload = (value: any): void => {
    this.downloadEvent.emit(value);
  };

  /**
   * @detail `{url?:string,response?:object,file?:object,uid:string,name:string}`
   * @description   点击预览图标发出的事件
   * @description.en Event emitted when the preview icon is clicked
   */
  @event({ type: "upload.files.preview" }) previewEvent: EventEmitter<any>;
  private _handlePreview = (value: any): void => {
    this.previewEvent.emit(value);
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            url={this.url}
            method={this.method}
            uploadName={this.uploadName}
            fileNamePattern={this.fileNamePattern}
            accept={this.accept}
            data={this.data}
            disabled={this.disabled}
            uploadButtonName={this.uploadButtonName}
            value={this.value}
            maxNumber={this.maxNumber}
            limitSize={this.limitSize}
            uploadDraggable={this.uploadDraggable}
            hideUploadButton={this.hideUploadButton}
            draggableUploadText={this.draggableUploadText}
            draggableUploadHint={this.draggableUploadHint}
            onChange={this._handleChange}
            onRemove={this._handleRemove}
            onError={this._handleError}
            onCustomError={this._handleCustomError}
            onDownload={this._handleDownload}
            onPreview={this._handlePreview}
            showDownloadIcon={this.showDownloadIcon}
            showPreviewIcon={this.showPreviewIcon}
            autoDownload={this.autoDownload}
            autoDownloadUrlTemplate={this.autoDownloadUrlTemplate}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            labelTooltip={this.labelTooltip}
            hideDragBtnWhenAchieveMax={this.hideDragBtnWhenAchieveMax}
            uploadButtonProps={this.uploadButtonProps}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.upload-files-v2", UploadFilesV2Element);
