import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { NavBar } from "./NavBar";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id frame-bricks.nav-bar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `frame-bricks.nav-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class NavBarElement extends UpdatingElement {
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

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
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
          <NavBar
            menuItems={this.menu?.menuItems ?? []}
            selectedKeys={this.selectedKeys}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.nav-bar", NavBarElement);
