import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MonitorModels } from "@sdk/monitor-sdk";
import { BrickAlertValue } from "./BrickAlertValue";

/**
 * @id presentational-bricks.brick-alert-value
 * @name presentational-bricks.brick-alert-value
 * @docKind brick
 * @description 将告警数值组合触发条件，显示成 90%↑ 的模式
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickAlertValueElement extends UpdatingElement {
  /**
   * @kind monitor-sdk/MonitorModels.ModelAlertEvent
   * @required true
   * @default -
   * @description 告警事件
   */
  @property({
    attribute: false,
  })
  dataSource: MonitorModels.ModelAlertEvent;

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
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickAlertValue alertEvent={this.dataSource} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-alert-value",
  BrickAlertValueElement
);
