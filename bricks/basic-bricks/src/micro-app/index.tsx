import React from "react";
import ReactDOM from "react-dom";
import { MicroApp } from "./MicroApp";
import {
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";

import styles from "./MicroApp.shadow.css";

// ** Best Practices **
// https://developers.google.com/web/fundamentals/web-components/best-practices

// ** Set a :host display style (e.g. block, inline-block, flex)
//    unless you prefer the default of inline. **
// ** Add a :host display style that respects the hidden attribute. **

/**
 * @id basic-bricks.micro-view
 * @name basic-bricks.micro-view
 * @docKind brick
 * @description 通用页面视图容器, 提供了 titleBar、toolbar、content、subMenu、banner、bannerTitleBar、bannerToolbar 插槽
 * @author steve
 * @slots
 * titleBar: 左上角页面标题
 * toolbar: 右上角页面操作栏
 * content: 内容区
 * subMenu: 内面内的左侧子菜单
 * banner: 顶部的 banner 的内容区
 * bannerTitleBar: 顶部的 banner 的标题
 * bannerToolbar: 顶部的 banner 的操作栏
 * @history
 * 1.19.0:新增构件
 * 1.89.0:新增 bannerPageTitle、bannerStyle 属性，banner、bannerTitleBar、bannerToolbar 插槽
 * @memo
 * @noInheritDoc
 */
export class MicroViewElement extends UpdatingElement {
  /**
   * @kind string
   * @required -
   * @default -
   * @description 设置标题。如果要使用复杂的标题构件，请使用插槽 `titleBar`
   * @group basic
   */
  @property()
  pageTitle: string;

  /**
   * @kind string
   * @required -
   * @default -
   * @description 设置 banner 标题。如果要使用复杂的标题构件，请使用插槽 `bannerTitleBar`
   * @group basic
   */
  @property()
  bannerPageTitle: string;

  /**
   * @kind boolean
   * @required -
   * @default false
   * @description 内容区是否需要设置`overflow-x: auto`
   * @group ui
   */
  @property({
    type: Boolean,
  })
  overflowXAuto: boolean;

  /**
   * @kind boolean
   * @required -
   * @default false
   * @description 内容区默认为 grid 布局且有默认的 gap，设为 `true` 则使之没有 gap。
   * @group ui
   */
  @property({
    type: Boolean,
  })
  noGap: boolean;

  /**
   * @kind boolean
   * @default false
   * @description 是否启用大屏模式。
   * @group ui
   */
  @property({
    type: Boolean,
  })
  dashboardMode: boolean;

  /**
   * @description 标题栏大小比例，默认为 1，仅用于暗黑大屏模式。
   * @group ui
   */
  @property({
    type: Number,
  })
  pageTitleScale: number;

  /**
   * @kind boolean
   * @default false
   * @description 是否隐藏工具栏（常用语大屏模式）。
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideToolbar: boolean;

  /**
   * @default -
   * @description banner 的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  bannerStyle: React.CSSProperties;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  hasSubMenu: boolean;

  /**
   * @private
   *
   */
  @property({
    type: Boolean,
  })
  hasTitleBar: boolean;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  hasToolbar: boolean;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  hasBanner: boolean;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  hasBannerTitleBar: boolean;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  hasBannerToolbar: boolean;

  /**
   * @description 用户点击退出大屏模式时触发。
   */
  @event({
    type: "mode.dashboard.exit",
  })
  private _modeDashboardExitEmitter: EventEmitter;

  private _mountPoint: HTMLElement;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);

    this._mountPoint = document.createElement("div");
    // ** Place any children the element creates into its shadow root. **
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    this._initInternalListeners();
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <MicroApp
          noGap={this.noGap}
          pageTitle={this.pageTitle}
          pageTitleScale={this.pageTitleScale}
          dashboardMode={this.dashboardMode}
          bannerPageTitle={this.bannerPageTitle}
          bannerStyle={this.bannerStyle}
        />,
        this._mountPoint,
        () => {
          const subMenuSlotSelector = "#subMenuSlot";
          const subMenuSlot = this._getSlotBySelector(subMenuSlotSelector);
          if (subMenuSlot) {
            this.hasSubMenu = this._checkSlotBySelector(subMenuSlotSelector);
            subMenuSlot.addEventListener("slotchange", () => {
              this.hasSubMenu = this._checkSlotBySelector(subMenuSlotSelector);
            });
          }
          const titleBarSlotSelector = "#titleBarSlot";
          const titleBarSlot = this._getSlotBySelector(titleBarSlotSelector);
          if (this.pageTitle) {
            this.hasTitleBar = true;
          } else if (titleBarSlot) {
            this.hasTitleBar = this._checkSlotBySelector(titleBarSlotSelector);
            titleBarSlot.addEventListener("slotchange", () => {
              this.hasTitleBar =
                this._checkSlotBySelector(titleBarSlotSelector);
            });
          }
          const toolbarSlotSelector = "#toolbarSlot";
          const toolbarSlot = this._getSlotBySelector(toolbarSlotSelector);
          if (toolbarSlot) {
            this.hasToolbar = this._checkSlotBySelector(toolbarSlotSelector);
            toolbarSlot.addEventListener("slotchange", () => {
              this.hasToolbar = this._checkSlotBySelector(toolbarSlotSelector);
            });
          }
          const bannerSlotSelector = "#bannerSlot";
          const bannerSlot = this._getSlotBySelector(bannerSlotSelector);
          if (this.bannerStyle) {
            this.hasBanner = true;
          } else if (bannerSlot) {
            this.hasBanner = this._checkSlotBySelector(bannerSlotSelector);
            bannerSlot.addEventListener("slotchange", () => {
              this.hasBanner = this._checkSlotBySelector(bannerSlotSelector);
            });
          }
          const bannerTitleBarSlotSelector = "#bannerTitleBarSlot";
          const bannerTitleBarSlot = this._getSlotBySelector(
            bannerTitleBarSlotSelector
          );
          if (this.bannerPageTitle) {
            this.hasBannerTitleBar = true;
          } else if (bannerTitleBarSlot) {
            this.hasBannerTitleBar = this._checkSlotBySelector(
              bannerTitleBarSlotSelector
            );
            bannerTitleBarSlot.addEventListener("slotchange", () => {
              this.hasBannerTitleBar = this._checkSlotBySelector(
                bannerTitleBarSlotSelector
              );
            });
          }
          const bannerToolbarSlotSelector = "#bannerToolbarSlot";
          const bannerToolbarSlot = this._getSlotBySelector(
            bannerToolbarSlotSelector
          );
          if (bannerToolbarSlot) {
            this.hasBannerToolbar = this._checkSlotBySelector(
              bannerToolbarSlotSelector
            );
            bannerToolbarSlot.addEventListener("slotchange", () => {
              this.hasBannerToolbar = this._checkSlotBySelector(
                bannerToolbarSlotSelector
              );
            });
          }
        }
      );
    }
  }

  // Todo(steve): refactor after upgraded to react v17.
  // istanbul ignore next
  private _initInternalListeners(): void {
    this.addEventListener("click", (e) => {
      const paths = e.composedPath() as HTMLElement[];
      for (const dom of paths) {
        if (dom === this) {
          break;
        }
        if (
          dom.tagName &&
          dom.tagName === "A" &&
          dom.className.includes("btn-exit-dashboard-mode")
        ) {
          this._modeDashboardExitEmitter.emit();
          break;
        }
      }
    });
  }

  private _getSlotBySelector(selector: string): HTMLSlotElement {
    return this.shadowRoot.querySelector(selector) as HTMLSlotElement;
  }

  private _checkSlotBySelector = (selector: string): boolean => {
    const slot = this._getSlotBySelector(selector);
    if (slot) {
      const assignedNodes = slot.assignedNodes();
      return (
        assignedNodes.length > 0 &&
        (assignedNodes as HTMLElement[]).some((node) => node.hidden !== true)
      );
    }
  };
}

// `basic-bricks.micro-app` is deprecated cause its misunderstanding name.
// Use `basic-bricks.micro-view` instead.
customElements.define("basic-bricks.micro-view", MicroViewElement);
class MicroAppElement extends MicroViewElement {}
customElements.define("basic-bricks.micro-app", MicroAppElement);
