import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { QuickVisitMenu } from "./QuickVisitMenu";

/**
 * @id basic-bricks.quick-visit-menu
 * @author annzhang
 * @history
 * 1.x.0: 新增构件 `basic-bricks.quick-visit-menu`
 * @docKind brick
 * @deprecated
 * @memo
 * 该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.menu-bar` 构件
 * @noInheritDoc
 */
export class QuickVisitMenuElement extends UpdatingElement {
  /**
   * @default
   * @required true
   * @description 菜单数据，可通过APP.getMenu(menuId)获取
   */
  @property({ attribute: false }) menu: Record<string, any>;
  /**
   * @default
   * @required true
   * @description 按钮文本
   */
  @property({ attribute: false }) buttonName: string;
  /**
   * @default false
   * @required false
   * @description 已添加到快捷访问中的菜单数组
   */
  @property({ attribute: false }) favouriteMenus: {
    text: string;
    to?: string;
    href?: string;
  }[];
  /**
   * @default 输入关键词搜索
   * @required false
   * @description 搜索框placeholder
   */
  @property({ attribute: false }) searchPlaceholder: string;
  /**
   * @detail 快捷访问全量菜单
   * @description 拖拽快捷访问的菜单标签时发出的事件
   */
  /**
   * @default
   * @required false
   * @description 支持收藏的最大数量
   */
  @property({ attribute: false }) maxFavouriteCount: number;
  @event({ type: "menu.drag" }) menuDragEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleMenuDrag = (item) => {
    this.menuDragEvent.emit(item);
  };
  /**
   * @detail 快捷访问全量菜单
   * @description 移除快捷访问里的菜单时发出的事件
   */
  @event({ type: "menu.remove" }) menuRemoveEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleMenuRemove = (item) => {
    this.menuRemoveEvent.emit(item);
  };
  /**
   * @detail 快捷访问全量菜单
   * @description 添加到快捷访问时发出的事件
   */
  @event({ type: "menu.add" }) menuAddEvent: EventEmitter<Record<string, any>>;
  private _handleMenuAdd = (item) => {
    this.menuAddEvent.emit(item);
  };
  /**
   * @detail 点击的菜单项，{text: 菜单标题，to/href: url}
   * @description 点击菜单标签时发出的事件，一般配置为history.push
   */
  @event({ type: "menu.click" }) menuClickEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleMenuClick = (item) => {
    this.menuClickEvent.emit(item);
  };
  /**
   * @detail
   * @description 收藏超过最大数量时发出的事件
   */
  @event({ type: "collect.failed" }) menuCollectFailedEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleCollectFailed = () => {
    this.menuCollectFailedEvent.emit({});
  };
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
          <QuickVisitMenu
            menu={this.menu}
            buttonName={this.buttonName}
            favouriteMenus={this.favouriteMenus}
            handleMenuDrag={this._handleMenuDrag}
            handleMenuRemove={this._handleMenuRemove}
            handleMenuAdd={this._handleMenuAdd}
            handleMenuClick={this._handleMenuClick}
            searchPlaceholder={this.searchPlaceholder}
            handleCollectFailed={this._handleCollectFailed}
            maxFavouriteCount={this.maxFavouriteCount}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.quick-visit-menu", QuickVisitMenuElement);
