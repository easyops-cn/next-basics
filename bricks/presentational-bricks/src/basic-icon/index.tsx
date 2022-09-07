import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  EventEmitter,
  property,
  event,
} from "@next-core/brick-kit";
import { BasicIcon, ImgIcon } from "./BasicIcon";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id presentational-bricks.basic-icon
 * @name presentational-bricks.basic-icon
 * @author qimengwu
 * @history
 * 1.0.0: 新增构件 `presentational-bricks.basic-icon`
 * @docKind brick
 * @description 基础icon构件
 * @noInheritDoc
 */
export class BasicIconElement extends UpdatingElement {
  /**
   * @kind MenuIcon ｜ ImgIcon
   * @required true
   * @default -
   * @description 图标
   * @group basic
   */
  @property({ attribute: false })
  icon: MenuIcon | ImgIcon;

  /**
   * @kind string
   * @required false
   * @default 24px
   * @description 图标大小
   * @group basic
   */
  @property({ attribute: false })
  size: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否渲染图标背景
   * @group basic
   */
  @property({ type: Boolean })
  renderBg: boolean;

  /**
   * @kind string
   * @required false
   * @default
   * @description 图标背景
   * @group basic
   */
  @property()
  bg: string;

  /**
   * @kind string
   * @required false
   * @default 46px
   * @description 图标背景大小
   * @group basic
   */
  @property({ attribute: false })
  bgSize: string;

  /**
   * @kind string
   * @required false
   * @default
   * @description 图标背景圆角大小
   * @group basic
   */
  @property()
  bgBorderRadius: string;

  /**
   * @kind unknown
   * @description 数据源
   * @group basic
   */
  @property({ attribute: false })
  dataSource: unknown;

  /**
   * @detail `any`
   * @description 按钮被点击时触发, detail 为 dataSource 数据
   */
  @event({ type: "icon.click", cancelable: true })
  itemClick: EventEmitter<any>;

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

  private _itemClick = (): void => {
    this.itemClick.emit(this.dataSource);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BasicIcon
            icon={this.icon}
            size={this.size}
            renderBg={this.renderBg}
            bg={this.bg}
            bgSize={this.bgSize}
            bgBorderRadius={this.bgBorderRadius}
            itemClick={this._itemClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.basic-icon", BasicIconElement);
