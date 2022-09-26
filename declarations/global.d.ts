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

interface Window {
  /** The app needs no auth guard.  */
  NO_AUTH_GUARD?: boolean;

  /** The public root, E.g. "hello-world/-/" */
  PUBLIC_ROOT?: string;

  /** The public cdn, E.g. "/sa-static/-/" */
  PUBLIC_CDN?: string;

  /** The full location where user log out from, like: /next/my-app/some-page?q=abc */
  EASYOPS_AUTH_LOGOUT_FROM_FULL?: string;

  /** The location where user log out from, like: /my-app/some-page?q=abc */
  EASYOPS_AUTH_LOGOUT_FROM?: string;

  /** Markup for standalone micro-apps. */
  STANDALONE_MICRO_APPS?: boolean;
}
