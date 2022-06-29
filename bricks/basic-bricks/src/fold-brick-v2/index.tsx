import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { FoldBrickV2 } from "./FoldBrickV2";
import style from "./style.shadow.less";
import { uniqueId } from "lodash";

/**
 * @id basic-bricks.fold-brick-v2
 * @name basic-bricks.fold-brick-v2
 * @docKind brick
 * @description 折叠容器，只折叠单个内容，支持slot
 * @groupI18N
 * {
 *   "divider": {
 *     "en": "Divider",
 *     "zh": "分割线"
 *   }
 * }
 * @author momo
 * @slots
 * content:内容插槽
 * @history
 * 1.87.0:新增属性 `isShowFoldIcon`, `type`
 * 1.64.0:新增属性 `showDivider`,`dividerOrientation`,`dividerDashed`,`show`
 * 1.56.0:新增构件 `basic-bricks.fold-brick-v2`
 * @memo
 * @noInheritDoc
 */
export class FoldBrickV2Element extends UpdatingElement {
  private _id = uniqueId("foldBrickButton");
  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 折叠展示名称
   * @group basic
   */
  @property({
    attribute: false,
  })
  foldName: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否默认展开
   * @group basic
   */
  @property({
    attribute: false,
  })
  defaultShow?: boolean;

  /**
   * @kind "normal" | "primary"
   * @required false
   * @default "normal"
   * @description 折叠面板类型
   * @group basic
   */
  @property({
    attribute: false,
  })
  type: "normal" | "primary";

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示展开图标
   * @group ui
   */
  @property({
    attribute: false,
  })
  isShowFoldIcon = true;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 折叠展示的样式编写
   * @group ui
   */
  @property({
    attribute: false,
  })
  foldStyle: Record<string, string>;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否展示分割线
   * @group divider
   */
  @property({
    type: Boolean,
  })
  showDivider: boolean;

  /**
   * @kind "left"|"right"
   * @required false
   * @default center
   * @description 分割线标题的位置
   * @group divider
   */
  @property({
    attribute: false,
  })
  dividerOrientation: "left" | "right";

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否虚线
   * @group divider
   */
  @property({
    type: Boolean,
  })
  dividerDashed: boolean;

  /**
   * @private
   */
  @property({
    type: Boolean,
  })
  show: boolean;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }

  listenOnClick(): void {
    this.addEventListener("click", this.listenToClick);
  }
  // istanbul ignore next
  listenToClick = (e: Event): void => {
    const paths = e.composedPath() as HTMLElement[];
    for (const path of paths) {
      if (path.id === this._id) {
        this.show = !this.show;
        this._render();
        break;
      }
    }
  };

  connectedCallback(): void {
    this.listenOnClick();

    this.show = this.defaultShow;
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    this.removeEventListener("click", this.listenToClick);
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <FoldBrickV2
            _id={this._id}
            foldName={this.foldName}
            foldStyle={this.foldStyle}
            show={this.show}
            showDivider={this.showDivider}
            dividerOrientation={this.dividerOrientation}
            dividerDashed={this.dividerDashed}
            isShowFoldIcon={this.isShowFoldIcon}
            type={this.type}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("basic-bricks.fold-brick-v2", FoldBrickV2Element);
