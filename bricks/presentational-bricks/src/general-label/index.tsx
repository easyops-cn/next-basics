import React from "react";
import ReactDOM from "react-dom";
import { isEmpty } from "lodash";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralLabel } from "./GeneralLabel";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id presentational-bricks.general-label
 * @name presentational-bricks.general-label
 * @docKind brick
 * @description 可用来展示基本文案、前后缀图标，可配置点击事件和 url 的通用 label 构件
 * @author lynette
 * @slots
 * @history
 * 1.81.0:新增构件 `presentational-bricks.general-label`
 * 1.89.11:使用 `dataSource` 代替之前 `data`
 * @memo
 * @noInheritDoc
 */
export class GeneralLabelElement extends UpdatingElement {
  /**
   * @detail any
   * @description 点击 label 触发的事件，详情为编排者输入的 dataSource
   */
  @event({ type: "label.click" })
  labelClick: EventEmitter<any>;

  /**
   * @required false
   * @description 文字内容
   * @group basic
   */
  @property()
  text: string;

  /**
   * @required false
   * @description 前缀图标
   * @group basic
   */
  @property({
    attribute: false,
  })
  prefixIcon: MenuIcon;

  /**
   * @required false
   * @description 后缀图标
   * @group basic
   */
  @property({
    attribute: false,
  })
  suffixIcon: MenuIcon;

  /**
   * @required false
   * @description 链接的 URL
   * @group basic
   */
  @property()
  url: string;

  /**
   * @required false
   * @description 是否使用原生 <a> 标签，通常用于外链的跳转
   * @group basic
   */
  @property()
  href: string;

  /**
   * @required false
   * @description `label.click`事件的传出的数据
   * @group other
   */
  @property({
    attribute: false,
  })
  dataSource: any;

  /**
   * @required false
   * @description `label.click`事件的详情
   * @deprecated
   * @group other
   */
  @property({
    attribute: false,
  })
  data: any;

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _handleClick = (): void => {
    // istanbul ignore if
    if (!isEmpty(this.data)) {
      // eslint-disable-next-line no-console
      console.warn(
        "`data` of `<presentational-bricks.general-label>` are deprecated, use `dataSource` instead."
      );
    }
    this.labelClick.emit(this.dataSource ?? this.data);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralLabel
            prefixIcon={this.prefixIcon}
            suffixIcon={this.suffixIcon}
            text={this.text}
            url={this.url}
            href={this.href}
            handleClick={this._handleClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-label",
  GeneralLabelElement
);
