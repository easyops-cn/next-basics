import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { NavMenu } from "./NavMenu";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id frame-bricks.nav-bar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `frame-bricks.nav-bar`
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

  /**
   * @required false
   * @default -
   * @description 配置主菜单文字样式
   */
  @property({
    attribute: false,
  })
  mainMenuTitleStyle: CSSProperties | undefined = { color: "white" };

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
            mainMenuTitleStyle={this.mainMenuTitleStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.nav-menu", NavMenuElement);
