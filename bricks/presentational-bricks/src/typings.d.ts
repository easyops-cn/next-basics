// Type declarations for missing third-party modules

declare module 'regexpu-core' {
  function rewritePattern(pattern: string, flags?: string, options?: any): string;
  export = rewritePattern;
}

declare module 'rc-util/lib/Dom/css' {
  export function get(element: HTMLElement, name: string): string;
  export function set(element: HTMLElement, name: string, value: string | number): void;
  export function getComputedStyle(element: HTMLElement): CSSStyleDeclaration;
}

declare module 'rc-util/lib/Dom/addEventListener' {
  function addEventListener(
    target: any,
    eventType: string,
    callback: (...args: any[]) => void,
    options?: any
  ): { remove: () => void };
  export default addEventListener;
}

declare module 'antd/lib/date-picker/interface' {
  export interface PickerLocale {
    lang: any;
    timePickerLocale: any;
  }
  export type PickerMode = 'time' | 'date' | 'month' | 'year' | 'decade';
}
