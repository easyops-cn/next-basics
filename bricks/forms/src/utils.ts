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
