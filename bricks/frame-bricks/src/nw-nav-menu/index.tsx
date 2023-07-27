import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { NavMenu } from "./NavMenu";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id frame-bricks.nw-nav-bar
 * @author weiliye
 * @history
 * 1.x.0: 新增构件 `frame-bricks.nw-nav-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class NavMenuElement extends UpdatingElement {
  /**
   * @kind SidebarSubMenu
   * @required false
   * @default -
   * @description 菜单项
   */
  @property({
    attribute: false,
  })
  menu: SidebarSubMenu;

  /**
   * @default
   * @required false
   * @description 选择菜单
   */
  @property({
    attribute: false,
  })
  selectedKeys: string[];

  /**
   * @required false
   * @default -
   * @description 是否在hover菜单项的时候显示tooltip
   */
  @property({
    type: Boolean,
  })
  showTooltip: boolean;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "inline-block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <NavMenu
            menuItems={this.menu?.menuItems ?? []}
            showTooltip={this.showTooltip}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.nw-nav-menu", NavMenuElement);
