import React from "react";
import ReactDOM from "react-dom";

import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { http } from "@next-core/brick-http";

import { UploadFiles, UploadFilesTextProps } from "./UploadFiles";
import { FileUtils } from "../utils";

/**
* @id forms.upload-files
* @name forms.upload-files
* @docKind brick
* @description 通过指定 API 上传文件
* @author cyril
* @slots
* @history
* 1.x.0:新增构件 `forms.upload-file`
* @memo
* ### UploadFileTextProps

* | property | type   | required | default | description |
* | -------- | ------ | -------- | ------- | ----------- |
* | main     | string | -        | -       | 主文本      |
* | hint     | string | -        | -       | 提示文本    |
* @noInheritDoc
*/
export class UploadFilesElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 上传的地址
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default post
   * @description 上传请求的方法
   */
  @property()
  method: string;

  /**
   * @kind string
   * @required false
   * @default file
   * @description 发到后台的文件参数名
   */
  @property()
  declare name: string;

  /**
   * @kind { [key: string]: string; }
   * @required false
   * @default -
   * @description 上传所需额外参数
   */
  @property({ attribute: false })
  data: { [key: string]: string };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否允许上传多个文件
   */
  @property({ type: Boolean })
  multiple: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 选择文件后是否直接上传
   */
  @property({ type: Boolean })
  autoUpload: boolean;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 文件上传大小限制(MB), 最大上传大小为: 100MB
   * @group advanced
   */
  @property({
    type: Number,
  })
  limitSize: number;

  /**
   * @kind UploadFileTextProps
   * @required false
   * @default -
   * @description 文本
   */
  @property({ attribute: false })
  text: UploadFilesTextProps;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 接受上传的文件类型
   */
  @property()
  accept: string;

  private _files: (File | Blob)[] = [];

  constructor() {
    super();

    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnSuccess = this._handleOnSuccess.bind(this);
    this._handleOnError = this._handleOnError.bind(this);
  }

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
   * @detail -
   * @description 选择文件变更事件，仅当 `autoUpload` 属性为 `false` 时触发
   */
  @event({ type: "upload.files.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `any`
   * @description `detail` 为后台接口返回数据
   */
  @event({ type: "upload.files.success" }) successEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `any`
   * @description `detail` 为后台接口返回数据
   */
  @event({ type: "upload.files.failed" }) failedEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @description 触发上传
   */
  @method()
  public async upload(): Promise<void> {
    if (!this.autoUpload) {
      const formData = new FormData();
      this._files.forEach((file) => {
        formData.append(this.name || "file", file);
      });
      this.data &&
        Object.entries(this.data).map(([key, value]) =>
          formData.append(key, value)
        );

      if (FileUtils.sizeCompare(this._files, this.limitSize ?? 100)) {
        this._handleOnError("上传文件体积大于限定体积");
        return;
      }

      try {
        let response;
        if (this.method === "put") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response = await http.put<{ data: any }>(this.url, formData);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response = await http.post<{ data: any }>(this.url, formData);
        }
        this.successEvent.emit(response);
      } catch (error) {
        this.failedEvent.emit(error);
      }
    }
  }

  private _handleOnChange(data: {
    type: "added" | "removed";
    fileList: (File | Blob)[];
  }): void {
    this._files = data.fileList;
    this.changeEvent.emit(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handleOnSuccess(data: any): void {
    this.dispatchEvent(
      new CustomEvent("upload.files.success", {
        detail: data,
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handleOnError(data: any): void {
    this.dispatchEvent(
      new CustomEvent("upload.files.failed", {
        detail: data,
      })
    );
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <UploadFiles
            url={this.url}
            method={this.method}
            name={this.name}
            data={this.data}
            multiple={this.multiple}
            limitSize={this.limitSize}
            autoUpload={this.autoUpload}
            text={this.text}
            accept={this.accept}
            onChange={this._handleOnChange}
            onSuccess={this._handleOnSuccess}
            onError={this._handleOnError}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.upload-files", UploadFilesElement);
