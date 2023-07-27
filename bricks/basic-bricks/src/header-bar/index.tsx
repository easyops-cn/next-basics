import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { HeaderBar } from "./HeaderBar";
import style from "./index.headerBar.less";
/**
 * @id basic-bricks.header-bar
 * @author zekunpan
 * @history
 * 1.x.0: 新增构件 `basic-bricks.header-bar`,便于用户在basic-view模式下自由设定header头部
 * @docKind brick
 * @slots
 * navbar:左侧导航栏插槽
 * toolbar: 右侧工具栏插槽
 * @noInheritDoc
 */
export class HeaderBarElement extends UpdatingElement {
  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;

  /**
   * @kind string
   * @required false
   * @default -
   * @description log 图片
   * @group basic
   */
  @property()
  logoUrl: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description  构件背景颜色
   * @group basic
   */
  @property()
  headerBackgroundColor: string;
  /**
   * @detail `-`
   * @description 点击logo时触发
   */
  @event({ type: "logo.click" })
  logoClickEvent: EventEmitter<any>;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }
  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.listenOnClick();
    this._render();
  }

  listenOnClick() {
    this.addEventListener("click", (e) => {
      const paths = e.composedPath() as HTMLElement[];
      for (const path of paths) {
        if (path.nodeName.toLowerCase() === "#document-fragment") {
          break;
        }
        if (path.className === "logo") {
          this.logoClickEvent?.emit();
          break;
        }
      }
    });
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <HeaderBar
            logoUrl={this.logoUrl}
            headerBackgroundColor={this.headerBackgroundColor}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("basic-bricks.header-bar", HeaderBarElement);
