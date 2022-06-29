import React from "react";
import ReactDOM from "react-dom";

import {
  BrickWrapper,
  property,
  UpdatingElement,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralDrawer } from "./GeneralDrawer";
import style from "./index.shadow.less";
import { DrawerProps } from "antd/lib/drawer";
export interface OpenCloseOption {
  noEvent?: boolean;
}
/**
 * 文字和图标只会显示其中一个，优先显示图标，文字最多显示4个字符。
 */
export interface ICustomSwitchConfig {
  openText?: string;
  openIcon?: any;
  closeText?: string;
  closeIcon?: any;
  top?: string;
}
/**
 * @id basic-bricks.general-drawer
 * @name basic-bricks.general-drawer
 * @docKind brick
 * @description 提供插槽以展示其他构件
 * @author ice
 * @slots
 * headerLeft:标题左侧插槽位，当设置 `customTitle` 属性时，该插槽无效
 * headerRight:标题右侧插槽位，当使用该插槽时，应设置 `closable` 为 false
 * content:内容插槽位
 * footer:底部插槽位，仅当 `hasFooter` 为真时，该插槽才会存在
 * @history
 * 1.60.0:`open` 和 `close` 方法新增 `noEvent` 选项
 * 1.34.0:新增插槽 `headerLeft`, `headerRight` 和 `footer`，新增 `general.drawer.open` 事件
 * 1.30.0:新增 `bodyStyle` 和 `drawerStyle` 配置
 * @memo
 * ### OpenCloseOption

* | property | type      | required | default | description |
* | -------- | --------- | -------- | ------- | ----------- |
* | noEvent  | `boolean` | -        | -       | 不触发事件  |
 * @noInheritDoc
 */
export class GeneralDrawerElement extends UpdatingElement {
  private _mountPoint: HTMLElement;
  private isVisible = false;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 标题
   * @group basic
   */
  @property()
  customTitle: string;
  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示loading效果
   * @group basic
   */
  @property({ type: Boolean })
  loading: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示右上角的关闭按钮
   * @group basic
   */
  @property({ type: Boolean })
  closable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 点击蒙层是否允许关闭
   * @group basic
   */
  @property({ type: Boolean })
  maskClosable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否提供 `footer` 插槽
   * @group basic
   */
  @property({ type: Boolean })
  hasFooter: boolean;
  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否展示遮罩
   * @group ui
   */
  @property({ attribute: false })
  mask = true;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 宽度
   * @group ui
   */
  @property({ type: Number })
  width: number;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 可用于设置 Drawer 内容部分的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  bodyStyle: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 用于设置 Drawer 弹出层的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  drawerStyle: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 用于设置 Drawer 头部的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  headerStyle: Record<string, any>;
  /**
   * @default false
   * @required false
   * @description 是否浮层样式，如果设为true,则抽屉边缘会有外边距，圆角和阴影
   * @group ui
   */
  @property({ type: Boolean })
  isFloat: boolean;
  /**
   * @kind object
   * @required false
   * @default -
   * @description 完全透传给 antd 的 Drawer 属性，详见：[https://ant.design/components/drawer-cn/#API](https://ant.design/components/drawer-cn/#API)
   * @group advanced
   */
  @property({ attribute: false })
  configProps: DrawerProps;

  hasOuterSwitch: boolean;
  useBigOuterSwitch: boolean;
  customSwitchConfig: ICustomSwitchConfig;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 打开抽屉时内容区是否自动滚动到顶部
   * @group advanced
   */
  @property({ attribute: false })
  scrollToTopWhenOpen = true;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.listenOnClose();
    this._render();
  }

  // istanbul ignore next
  listenOnClose() {
    this.addEventListener("click", (e) => {
      const paths = e.composedPath() as HTMLElement[];

      const maybeMaskDom = paths[0];
      if (
        maybeMaskDom.nodeName.toLowerCase() === "div" &&
        maybeMaskDom.className.includes("ant-drawer-mask")
      ) {
        e.stopPropagation();
        if (this.maskClosable) {
          this.close();
          return;
        }
      }

      if (!this.closable && !this.hasOuterSwitch) {
        return;
      }

      for (const dom of paths) {
        if (
          dom.nodeName &&
          dom.nodeName.toLowerCase() === "#document-fragment"
        ) {
          break;
        }
        if (
          !this.hasOuterSwitch &&
          dom.nodeName &&
          dom.nodeName.toLowerCase() === "button" &&
          dom.className.includes("ant-drawer-close")
        ) {
          e.stopPropagation();
          this.close();
          break;
        }
        if (
          this.hasOuterSwitch &&
          dom.nodeName &&
          typeof dom.className === "string" &&
          dom.className.includes("outerBtn")
        ) {
          e.stopPropagation();
          let node = dom.parentElement;
          while (node.className) {
            if (node.className.split(" ").includes("ant-drawer")) {
              if (node.className.includes("ant-drawer-open")) {
                this.close();
              } else {
                this.open();
              }
              break;
            }
            node = node.parentElement;
          }
          break;
        }
      }
    });
  }

  disconnectedCallback(): void {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralDrawer
            closable={this.closable}
            title={this.customTitle}
            visible={this.isVisible}
            width={this.width}
            getContainer={this._mountPoint}
            bodyStyle={this.bodyStyle}
            drawerStyle={this.drawerStyle}
            hasFooter={this.hasFooter}
            loading={this.loading}
            headerStyle={this.headerStyle}
            mask={this.mask}
            configProps={this.configProps}
            isFloat={this.isFloat}
            hasOuterSwitch={this.hasOuterSwitch}
            useBigOuterSwitch={this.useBigOuterSwitch}
            customSwitchConfig={this.customSwitchConfig}
            scrollToTopWhenOpen={this.scrollToTopWhenOpen}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
  /**
   *
   * @detail
   * @description 构件打开时所发出的事件, 事件数据为空
   */
  @event({ type: "general.drawer.open" }) drawerOpen: EventEmitter<
    Record<string, any>
  >;
  /**
   *
   * @description 显示抽屉构件
   */
  @method()
  open(option?: OpenCloseOption): void {
    this.isVisible = true;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    this._render();

    if (!option?.noEvent) {
      this.drawerOpen.emit({});
    }
  }
  /**
   * @description 抽屉内部内容上下滚动
   */
  @method() bodyScroll(top: number): void {
    this._mountPoint
      .querySelector(".ant-drawer-body")
      .scroll({ top, behavior: "smooth" });
  }
  /**
   *
   * @detail
   * @description 构件关闭时所发出的事件, 事件数据为空
   */
  @event({ type: "general.drawer.close" }) drawerClose: EventEmitter<
    Record<string, any>
  >;
  /**
   *
   * @description 显示抽屉构件
   */
  @method()
  close(option?: OpenCloseOption): void {
    this.isVisible = false;
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    this._render();

    if (!option?.noEvent) {
      this.drawerClose.emit({});
    }

    // refs: https://github.com/ant-design/ant-design/issues/21894
    document.body.style.removeProperty("overflow");
  }
}

customElements.define("basic-bricks.general-drawer", GeneralDrawerElement);
