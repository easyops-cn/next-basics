import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { ExpandedState, SideBar } from "./SideBar";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id frame-bricks.side-bar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `frame-bricks.side-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class SideBarElement extends UpdatingElement {
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
   * @kind ExpandedState
   * @required false
   * @default collapsed
   * @description 展开状态，默认折叠收起, 数据会做通过 localStorage 存储
   */
  @property({
    attribute: false,
  })
  expandedState: ExpandedState;

  /**
   * @default false
   * @required false
   * @description 是否隐藏固定按钮
   */
  @property({
    type: Boolean,
  })
  hiddenFixedIcon: boolean;

  /**
   * @default false
   * @description 是否跟导航栏搭配使用，之前默认搭配导航栏使用，当隐藏上方导航栏，单独显示左侧
   * 菜单栏时，由于该菜单的位置偏移量为固定值，需要重新计算位置和样式
   */
  @property({
    type: Boolean,
  })
  noAppNavBar: boolean;

  /**
   * @detail
   * @description
   */
  @event({ type: "side.bar.fixed" })
  _handleSideBarFixed: EventEmitter<boolean>;
  handleSideBarFixed = (isFixed: boolean): void => {
    this._handleSideBarFixed.emit(isFixed);
  };

  /**
   * @detail
   * @description
   */
  @event({ type: "side.bar.resize" })
  _handleSideBarResize: EventEmitter<string>;
  // istanbul ignore next
  handleSideBarResize = (value: string): void => {
    this._handleSideBarResize.emit(value);
  };

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
      this.style.transition =
        "width var(--side-bar-collapse-transition-duration) var(--side-bar-collapse-transition-timing-function)";
      this.style.position = "fixed";
      this.style.left = "0px";
      this.style.top = this.noAppNavBar
        ? "0px"
        : "var(--app-bar-height-with-tips, var(--app-bar-height))";
      this.style.zIndex = "999";
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
          <SideBar
            wrapperDOM={this}
            menu={this.menu}
            expandedState={this.expandedState}
            hiddenFixedIcon={this.hiddenFixedIcon}
            onSideBarFixed={this.handleSideBarFixed}
            onSideBarResize={this.handleSideBarResize}
            noAppNavBar={this.noAppNavBar}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.side-bar", SideBarElement);
