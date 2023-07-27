import { isNil } from "lodash";

export class Base64 {
  static encode(value: string): string {
    if (isNil(value)) return "";
    const uint8array = new TextEncoder().encode(value);
    const str = String.fromCharCode.apply(null, Array.from(uint8array));
    return btoa(str);
  }

  static decode(x: string): string {
    const str = atob(x);
    const uint8array = new Uint8Array(
      str.split("").map((_, i) => str.charCodeAt(i))
    );
    const raw = new TextDecoder().decode(uint8array);
    return raw;
  }
}

export const encrypt = (value: string): string => Base64.encode(value);
export const decrypt = (x: string): string => Base64.decode(x);

export enum FileSizeUnit {
  KB,
  MB,
  GB,
}

interface fileItem {
  name?: string;
  uid?: string;
  size?: number;
  type?: string;
  [propName: string]: any;
}
export class FileUtils {
  /**
   * @description 比较文件大小
   * @param {fileItem | fileItem[]} file 文件或文件列表
   * @param {number} size 对比大小
   * @param {FileSizeUnit} unit 对比大小单位
   * @return - true : 文件大小 > size
   *         - false: 文件大小 < size
   */
  static sizeCompare(
    file: fileItem | fileItem[],
    size: number,
    unit: FileSizeUnit = FileSizeUnit.MB
  ): boolean {
    const sizeConst = {
      [FileSizeUnit.KB]: 1024,
      [FileSizeUnit.MB]: 1024 * 1024,
      [FileSizeUnit.GB]: 1024 * 1024 * 1024,
    };
    let totalFileSize: number;
    if (Array.isArray(file)) {
      totalFileSize = file.reduce((a, b) => a + b.size, 0);
    } else {
      totalFileSize = file.size;
    }
    const compareSize = size * sizeConst[unit];
    if (totalFileSize < compareSize) return false;
    return true;
  }
}
