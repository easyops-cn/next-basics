import React from "react";
import ReactDOM from "react-dom";
import { UpdatingElement, property } from "@next-core/brick-kit";
import hotkeys from "hotkeys-js";
import { isEmpty, map, find } from "lodash";

interface HotkeysConfig {
  key: string;
  eventName: string;
}

/**
* @id basic-bricks.general-hotkeys
* @name basic-bricks.general-hotkeys
* @docKind brick
* @description 可配置通用快捷键以及相关事件名
* @author lynette
* @slots
* @history
* 1.66.0:新增构件 `basic-bricks.general-hotkeys`
* @memo
* ### Supported Keys

*  HotKeys 构件可以识别以下修饰符，方便配置：`⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`和 `⌘`.

*  以下特殊键可用于配置快捷键：`backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`, `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete` , `f1` 到 `f19`.

*  其中：

*  - `⌘` Command()
*  - `⌃` Control
*  - `⌥` Option(alt)
*  - `⇧` Shift
*  - `⇪` Caps Lock(Capital)
*  - `↩︎` return/Enter space
* @noInheritDoc
*/
export class GeneralHotkeysElement extends UpdatingElement {
  /**
   * @kind {key: string,eventName: string}[]
   * @required false
   * @default -
   * @description 快捷键配置，支持的 keys 列表如下
   * @group basic
   */
  @property({
    attribute: false,
  })
  hotkeysConfig: HotkeysConfig[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @group basic
   * @description 是否禁用
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  connectedCallback(): void {
    if (!isEmpty(this.hotkeysConfig)) {
      hotkeys.filter = function (event) {
        return true;
      };
      hotkeys(map(this.hotkeysConfig, "key").join(","), (event, handler) => {
        event.preventDefault();
        const found = find(this.hotkeysConfig, ["key", handler.key]);
        if (found?.eventName) {
          if (!this.disabled) {
            this.dispatchEvent(new CustomEvent(found.eventName));
          }
        }
      });
    }
  }

  disconnectedCallback(): void {
    if (!isEmpty(this.hotkeysConfig)) {
      hotkeys.unbind(map(this.hotkeysConfig, "key").join(","));
    }
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // Nothing to do.
  }
}

customElements.define("basic-bricks.general-hotkeys", GeneralHotkeysElement);
