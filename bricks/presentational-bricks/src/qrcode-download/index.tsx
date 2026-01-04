import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  method,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { transformToBase64 } from "./utils";
import { Modal, message } from "antd";
import QRCode from "qrcode";
import type { QRCodeToDataURLOptions } from "qrcode";


export interface QrcodeDownloadElementProps {
  domain?: string;
}

export type QrCodeItem = {
  /** 二维码名称 */
  name: string;
  /** 二维码地址 */
  url: string;
};

/**
 * @id presentational-bricks.qrcode-download
 * @author abert
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.qrcode-download`
 * @docKind brick
 * @noInheritDoc
 */
export class QrcodeDownloadElement extends UpdatingElement implements QrcodeDownloadElementProps {
  /**
   * @default  60
   * @required false
   * @description 二维码宽高
   */
  @property({ attribute: false })
  width = 60;

  /**
   * @default 500
   * @required false
   * @description 下载二维码最大数量
   */
  @property({ attribute: false })
  downloadMaxNum = 500;

  /**
   * @default #000000ff
   * @required false
   * @description 二维码暗色颜色
   */
  @property({ attribute: false })
  colorDark = "#000000ff";

  /**
   * @default #ffffff
   * @required false
   * @description 二维码亮色颜色
   */
  @property({ attribute: false })
  colorLight = "#ffffff";

  /**
   * @default
   * @required false
   * @description 二维码图片地址域名
   */
  @property({ type: String })
  domain: string;

  /**
   * @default false
   * @required false
   * @description 是否开启打包压缩成zip
   */
  @property({ attribute: false })
  isEnablePack = false;

  /**
   * @description 下载二维码图片
   */
  @method() downloadFile(data: QrCodeItem[], name?: string): void {
    this._downloadFile(data, name);
  }

  private async _downloadFile(
    data: QrCodeItem[],
    name?: string
  ): Promise<void> {
    if (!data.length || data.length > this.downloadMaxNum) {
      Modal.warning({
        title:
          data.length > this.downloadMaxNum
            ? `最多可以导出${this.downloadMaxNum}条实例的二维码`
            : "请添加实例的二维码",
      });
      return;
    }
    // 处理data数据
    const qrCodeData = data.map((v) => ({
      ...v,
      url: this.domain ? `${this.domain}${v.url}` : v.url,
    }));
    // 默认配置
    const options: QRCodeToDataURLOptions = {
      width: this.width,
      margin: 0,
      color: {
        dark: this.colorLight,
        light: this.colorDark,
      },
    };
    if (this.isEnablePack) {
      this.downloadZipFile(qrCodeData, options, name);
      return;
    }
    this.downloadSingleFile(qrCodeData, options);
  }
  /**
   * 打包zip下二维码图片
   * @param data QrCodeItem[]
   * @param options  QRCodeToDataURLOptions
   * @param name string
   */
  private async downloadZipFile(
    data: QrCodeItem[],
    options: QRCodeToDataURLOptions,
    name?: string
  ): Promise<void> {
    message.loading("正在导出中...", 0);
    const zip = new JSZip();
    const promises: any[] = [];
    // 批量创建二维码
    // todo 分片
    // todo webworker 优化计算阻塞
    await data.forEach((item) => {
      /* istanbul ignore next */
      const promise = QRCode.toDataURL(item.url, options).then((value) => {
        const content = transformToBase64(value);
        // qrcode 默认生成 png 图片
        zip.file(`${item.name}.png`, content, { base64: true });
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      /* istanbul ignore next */
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // 下载文件
        FileSaver.saveAs(content, `${name || "实例二维码"}.zip`);
        message.destroy();
        message.success("导出成功!");
      });
    });
  }
  /**
   *  直接下载二维码图片
   * @param data   QrCodeItem[]
   * @param options QRCodeToDataURLOptions
   */
  private downloadSingleFile(
    data: QrCodeItem[],
    options: QRCodeToDataURLOptions
  ): void {
    const aEle = document.createElement("a");
    data.forEach((item) => {
      /* istanbul ignore next */
      QRCode.toDataURL(item.url, options).then((value) => {
        aEle.href = value;
        aEle.download = item.name;
        aEle.click();
      });
    });
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(<BrickWrapper></BrickWrapper>, this);
    }
  }
}

customElements.define(
  "presentational-bricks.qrcode-download",
  QrcodeDownloadElement
);
