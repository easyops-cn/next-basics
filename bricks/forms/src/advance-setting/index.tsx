import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { AdvanceSetting } from "./AdvanceSetting";
import style from "./style.shadow.less";

/**
 * @id forms.advance-setting
 * @name forms.advance-setting
 * @docKind brick
 * @description
 * @author momo
 * @slots
 * content:内容插槽
 * @history
 * 1.87.0:新增构件 `forms.advance-setting`
 * @memo
 * @noInheritDoc
 */
export class AdvanceSettingElement extends FormItemElement {
  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 折叠展示名称
   */
  @property({
    attribute: false,
  })
  foldName: string;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否分割线
   */
  @property({ attribute: false })
  showDivider = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示折叠图标
   */
  @property({ attribute: false })
  showFoldIcon = true;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否展开
   */
  @property({
    type: Boolean,
  })
  show: boolean;

  /**
   * @kind "left"|"right"
   * @required false
   * @default center
   * @description 分割线标题的位置
   * @group advanced
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
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  dividerDashed: boolean;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 折叠展示的样式编写
   * @group advanced
   */
  @property({
    attribute: false,
  })
  foldStyle: Record<string, string>;

  /**
   * @detail {show: true}
   * @description 展开时发生事件
   */
  @event({ type: "advance.setting.expand" }) expandEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail {show: false}
   * @description 折叠时发生事件
   */
  @event({ type: "advance.setting.collapse" }) collapseEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleToggle = (value: boolean): void => {
    if (value) {
      this.expandEvent.emit({ show: value });
    } else {
      this.collapseEvent.emit({ show: value });
    }
  };

  listenOnClick(): void {
    this.addEventListener("click", this.listenToClick);
  }

  // istanbul ignore next
  listenToClick = (e: Event): void => {
    const paths = e.composedPath() as HTMLElement[];
    for (const path of paths) {
      if (path.id === "foldBrickButton") {
        this.show = !this.show;
        this._handleToggle(this.show);
        this._render();
        break;
      }
    }
  };

  connectedCallback(): void {
    this.listenOnClick();
    // Don't override user's style settings.
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

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <AdvanceSetting
            showFoldIcon={this.showFoldIcon}
            showDivider={this.showDivider}
            formElement={this.getFormElement()}
            foldName={this.foldName}
            foldStyle={this.foldStyle}
            show={this.show}
            dividerOrientation={this.dividerOrientation}
            dividerDashed={this.dividerDashed}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("forms.advance-setting", AdvanceSettingElement);
