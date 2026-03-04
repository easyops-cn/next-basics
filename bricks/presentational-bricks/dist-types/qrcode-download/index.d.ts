export type QrCodeItem = {
  /** 二维码名称 */
  name: string;
  /** 二维码地址 */
  url: string;
};

export interface QrcodeDownloadProps {
  width?: number;
  downloadMaxNum?: number;
  colorDark?: string;
  colorLight?: string;
  domain?: string;
  isEnablePack?: boolean;
}

export declare class QrcodeDownloadElement extends HTMLElement {
  width: number | undefined;
  downloadMaxNum: number | undefined;
  colorDark: string | undefined;
  colorLight: string | undefined;
  domain: string | undefined;
  isEnablePack: boolean | undefined;
  downloadFile(data: QrCodeItem[], name?: string): void;
}
