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
   * @required true
   * @default -
   * @description 指定的应用 Id
   */
  @property()
  appId: string;

  connectedCallback(): void {
    this._render();
  }

  protected _render(): void {
    if (this.isConnected && this.appId) {
      const apps = getRuntime().getMicroApps({ excludeInstalling: true });
      const app = apps.find((item) => item.id === this.appId);
      if (app && app.homepage) {
        getHistory().replace(app.homepage);
      }
    }
  }
}

customElements.define("basic-bricks.home-redirect", HomeRedirectElement);
