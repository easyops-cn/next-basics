import { getHistory, UpdatingElement, property } from "@next-core/brick-kit";
import { createLocation, locationsAreEqual } from "history";
/**
 * @id basic-bricks.redirect-to
 * @name basic-bricks.redirect-to
 * @docKind brick
 * @description 用于重定向的工具构件
 * @author steve
 * @slots
 * @history
 * 1.27.0:新增 href2 能力
 * @memo
 * ### DEMO
 * ```json
 * {
 *   "brick": "basic-bricks.redirect-to",
 *   "properties": {
 *     "href": "" // 目标url
 *   }
 * }
 * ```
 * 如果没数据则跳转到指引页面
 *
 * ```json
 * {
 *   "brick": "basic-bricks.redirect-to",
 *   "properties": {
 *     "href": "${APP.homepage}/guide",
 *     "href2": "${APP.homepage}/list"
 *    },
 *    "lifeCycle": {
 *      "useResolves": [
 *        {
 *          "provider": "xxxxx",
 *          "transform": {
 *            "useHref2": "@{list.length}"
 *          }
 *        }
 *      ]
 *    }
 * }
 *```
 * >Tips: 新增 href2 用来解决如下场景：如果有数据则跳转到列表页面，如果没数据则跳转到提示新建页面
 * @noInheritDoc
 */
export class RedirectToElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 重定向的 url
   */
  @property()
  href: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 重定向的 url2
   */
  @property()
  href2: string;
  /**
   * @kind boolean
   * @required true
   * @default -
   * @description 是否选用 href2 作为最终的跳转链接
   */
  @property({
    type: Boolean,
  })
  useHref2: boolean;

  connectedCallback(): void {
    this.style.display = "none";
    this._render();
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const history = getHistory();
      const currentLocation = { ...history.location };
      const toHref = this.useHref2 ? this.href2 : this.href;
      const toLocation = createLocation(toHref);

      delete currentLocation.key;

      if (!locationsAreEqual(currentLocation, toLocation)) {
        history.replace(toHref);
      }
    }
  }
}

customElements.define("basic-bricks.redirect-to", RedirectToElement);
