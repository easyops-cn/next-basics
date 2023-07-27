import React from "react";
import ReactDOM from "react-dom";
import { isNil, get } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickAlertLevel } from "./BrickAlertLevel";

export type AlertLevel = 0 | 1 | 2 | "info" | "warning" | "critical";

/**
 * @id presentational-bricks.brick-alert-level
 * @name presentational-bricks.brick-alert-level
 * @docKind brick
 * @description 将数值渲染成通用告警等级显示方式
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickAlertLevelElement extends UpdatingElement {
  /**
   * @kind AlertLevel
   * @required false
   * @default -
   * @description 告警等级: 0 - 通知, 1 - 警告, 2 - 紧急
   */
  @property({
    attribute: false,
  })
  value: AlertLevel;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind { value: string }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   */
  @property({
    attribute: false,
  })
  fields: { value: string };

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
      const mutableProps = {
        value: this.value,
      };
      if (isNil(this.value) && this.dataSource && this.fields) {
        mutableProps.value = get(this.dataSource, this.fields.value);
      }
      ReactDOM.render(
        <BrickWrapper>
          <BrickAlertLevel value={mutableProps.value} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-alert-level",
  BrickAlertLevelElement
);
