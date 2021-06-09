import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import {
  SidebarMenu,
  SidebarSubMenu,
  MenuBarBrick,
} from "@next-core/brick-types";
import { MenuBar } from "./MenuBar/MenuBar";

/**
* @id basic-bricks.menu-bar
* @name basic-bricks.menu-bar
* @docKind brick
* @editor shared-editors.general-menu--editor
* @description 点击后注意左侧菜单即为效果图，点击浏览器返回
* @author steve
* @slots
* @history
* @memo
* > Tips: 因为绝对定位的原因，当前菜单被覆盖，右侧即为效果图，如果需要返回开发者中心，请点击浏览器返回
*```typescript
* export interface SidebarMenu {
*  title: string;
*  icon?: MenuIcon;
*  link?: LocationDescriptor;
*  defaultCollapsed?: boolean;
*  menuItems: SidebarMenuItem[];
* }
* export declare type SidebarMenuItem = SidebarMenuSimpleItem | SidebarMenuGroup;
* export interface SidebarMenuSimpleItem {
*  text: string;
*  to: LocationDescriptor;
*  icon?: MenuIcon;
*  type?: "default";
*  exact?: boolean;
*  activeIncludes?: string[];
*  activeExcludes?: string[];
*  key?: string;
*}
*export interface SidebarMenuGroup {
*  type: "group" | "subMenu";
*  title: string;
*  items: SidebarMenuItem[];
*  key?: string;
*}
* export declare type MenuIcon = AntdIcon | FaIcon | EasyopsIcon;
* export interface AntdIcon {
*  lib: "antd";
*  type: string;
*  theme?: ThemeType;
*}
*export interface FaIcon {
*  lib: "fa";
*  icon: IconName;
*  prefix?: IconPrefix;
*}
*export interface EasyopsIcon {
*  lib: "easyops";
*  icon: string;
*  category?: string;
*}
*```

*
* @noInheritDoc
*/
export class MenuBarElement extends UpdatingElement implements MenuBarBrick {
  /**
   * @kind SidebarMenu
   * @required true
   * @default -
   * @description 菜单项
   */
  @property({
    attribute: false,
  })
  menu: SidebarMenu;
  /**
   * @kind SidebarMenu
   * @required true
   * @default -
   * @description 二级菜单项
   */
  @property({
    attribute: false,
  })
  subMenu: SidebarSubMenu;

  /**
   * @kind boolean
   * @required true
   * @default -
   * @description 是否折叠
   */
  @property({
    type: Boolean,
  })
  collapsed: boolean;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.style.width = "inherit";
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
          <MenuBar
            menu={this.menu}
            subMenu={this.subMenu}
            collapsed={this.collapsed}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  set softExpanded(value: boolean) {
    // Do nothing now.
  }

  get softExpanded(): boolean {
    return false;
  }
}

customElements.define("basic-bricks.menu-bar", MenuBarElement);
