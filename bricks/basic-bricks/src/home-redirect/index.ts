import {
  getRuntime,
  getHistory,
  UpdatingElement,
  property,
} from "@next-core/brick-kit";
/**
 * @id basic-bricks.home-redirect
 * @name basic-bricks.home-redirect
 * @docKind brick
 * @description 重定向到指定应用的首页
 * @author steve
 * @slots
 * @history
 * @memo
 * ### DEMO

*  ```json
*  {
*    "brick": "basic-bricks.home-redirect",
*    "properties": {
*      "appId": "search" // 目标应用Id
*    }
*  }
*  ```

 * @noInheritDoc
 */
export class HomeRedirectElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 指定的应用 Id
   */
  @property()
  appId: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 指定的跳转 url
   */
  @property()
  redirectUrl: string;

  connectedCallback(): void {
    this._render();
  }

  protected _render(): void {
    if (this.isConnected && (this.appId || this.redirectUrl)) {
      const apps = getRuntime().getMicroApps({ excludeInstalling: true });
      const app = apps.find((item) => item.id === this.appId);
      if (app && app.homepage) {
        getHistory().replace(app.homepage);
      } else if (this.redirectUrl) {
        // 找不到app，则fallback到指定跳转url
        if (window.STANDALONE_MICRO_APPS) {
          window.location.replace(this.redirectUrl.replace(/^\/*/, ""));
        } else {
          getHistory().replace(this.redirectUrl);
        }
      }
    }
  }
}

customElements.define("basic-bricks.home-redirect", HomeRedirectElement);
