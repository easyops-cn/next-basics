import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { DynamicGridContainer } from "./DynamicGridContainer";
import { UseBrickConf } from "@next-core/brick-types";

/**
 * @id presentational-bricks.dynamic-grid-container
 * @author astrid
 * @history
 * 1.149.0: 新增构件 `presentational-bricks.dynamic-grid-container`
 * @docKind brick
 * @noInheritDoc
 */
export class DynamicGridContainerElement extends UpdatingElement {
  /**
   * @kind [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)
   * @required false
   * @default -
   * @description 使用的子构件配置
   */
  @property({ attribute: false })
  useBrick: UseBrickConf;

  /**
   * @kind any[]
   * @required false
   * @default -
   * @description 传递给子构件的数据，应与 `useBrick` 一一对应
   */
  @property({ attribute: false })
  data: any[];

  /**
   * @required false
   * @default -
   * @description 容器的样式
   */
  @property({ attribute: false })
  containerStyle: React.CSSProperties;

  /**
   * @detail `data`为输出的数据，
   * @description 当`useBrick`渲染完后触发
   */
  @event({ type: "dynamic-grid-container.rendered" }) changEvent: EventEmitter;
  private _handleChange = (value: any): void => {
    this.changEvent.emit(value);
  };
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DynamicGridContainer
            useBrick={this.useBrick}
            data={this.data}
            containerStyle={this.containerStyle}
            onRendered={this._handleChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.dynamic-grid-container",
  DynamicGridContainerElement
);
