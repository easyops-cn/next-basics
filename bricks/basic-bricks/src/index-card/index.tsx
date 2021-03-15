import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";

import { IndexCard } from "./IndexCard";
import styles from "./IndexCard.shadow.css";

/**
 * @id basic-bricks.index-card
 * @name basic-bricks.index-card
 * @docKind brick
 * @description 页面容器，注意与micro-app的区别
 * @author william
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class IndexCardElement extends HTMLElement {
  private _mountPoint: HTMLElement;
  private _contentGridGap = 24;
  private _title: string;

  /**
   * @kind number
   * @required no
   * @default 24
   * @description 内容区的 gap，内容区固定为 grid 布局
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set contentGridGap(value: number) {
    this._contentGridGap = value;
    this._render();
  }

  get contentGridGap(): number {
    return this._contentGridGap;
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  /**
   * @kind string
   * @required no
   * @default -
   * @description 卡片标题
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set title(value: string) {
    this._title = value;
    this._render();
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <IndexCard title={this._title} contentGridGap={this.contentGridGap} />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("basic-bricks.index-card", IndexCardElement);
