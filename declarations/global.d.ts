declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {
  const css: string;
  export default css;
}

declare module "*.less" {
  const lessValue: string;
  export default lessValue;
}

declare module "*.html" {
  const html: string;
  export default html;
}

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.txt" {
  const text: string;
  export default text;
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
  const url: string;
  export default url;
  export const ReactComponent: SvgrComponent;
}

declare module "*.png" {
  const url: string;
  export default url;
}

declare namespace JSX {
  interface IntrinsicElements {
    slot: any;
  }
}

declare module "*.worker.ts" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@babel/standalone" {
  export const transform: (
    code: string,
    options?: {
      ast?: boolean;
      filename?: string;
      inputSourceMap?: boolean;
      sourceType?: string;
      presets?: (string | [string, any])[];
      plugins?: (string | [string, any])[];
    }
  ) => { code: string; ast: any };
  export const availablePlugins: Record<string, string>;
}

interface Window {
  /** The app needs no auth guard.  */
  NO_AUTH_GUARD?: boolean;

  /** The public root, which is based on the public prefix and public cdn.
   *  E.g. "sa-static/-/", "https://cdn-air.uwintech.cn/next/sa-static/-/"
   **/
  PUBLIC_ROOT?: string;

  /** The public cdn, should contain base href 'next' and should endswith '/'. E.g. "https://cdn-air.uwintech.cn/next/" */
  PUBLIC_CDN?: string;

  /** The full location where user log out from, like: /next/my-app/some-page?q=abc */
  EASYOPS_AUTH_LOGOUT_FROM_FULL?: string;

  /** The location where user log out from, like: /my-app/some-page?q=abc */
  EASYOPS_AUTH_LOGOUT_FROM?: string;

  /** Markup for standalone micro-apps. */
  STANDALONE_MICRO_APPS?: boolean;
}
