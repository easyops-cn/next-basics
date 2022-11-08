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
      // standalone 模式下，redirectUrl 优先级更高。普通模式下，appId 优先级更高
      const apps = getRuntime().getMicroApps({ excludeInstalling: true });
      const app = apps.find((item) => item.id === this.appId);
      const appHomepage = app && app.homepage ? app.homepage : "";
      if (window.STANDALONE_MICRO_APPS) {
        const realUrl = this.redirectUrl || appHomepage;
        if (realUrl) {
          window.location.replace(realUrl.replace(/^\/*/, ""));
        }
      } else {
        const realUrl = appHomepage || this.redirectUrl;
        if (realUrl) {
          getHistory().replace(realUrl);
        }
      }
    }
  }
}

customElements.define("basic-bricks.home-redirect", HomeRedirectElement);
