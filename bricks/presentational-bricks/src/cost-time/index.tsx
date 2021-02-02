import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { CostTime } from "./CostTime";
import { get } from "lodash";

/**
 * @id presentational-bricks.cost-time
 * @name presentational-bricks.cost-time
 * @docKind brick
 * @description 如：15秒、1天
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class CostTimeElement extends UpdatingElement {
  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    if (this.isConnected) {
      if (this.dataSource) {
        // eslint-disable-next-line no-console
        console.warn(
          "`dataSource` and `fields` of `<presentational-bricks.cost-time>` are deprecated, use `transform` instead."
        );
        this._initData();
      }
      ReactDOM.render(
        <BrickWrapper>
          <CostTime
            cost={this.cost}
            startTime={this.startTime}
            endTime={this.endTime}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  private _initData(): void {
    if (this.fields) {
      const { cost, startTime, endTime } = this.fields;
      if (cost) {
        this.cost = get(this.dataSource, cost);
      }
      if (startTime) {
        this.startTime = get(this.dataSource, startTime);
      }
      if (endTime) {
        this.endTime = get(this.dataSource, endTime);
      }
    }
  }

  /**
   * @kind number
   * @required false
   * @default -
   * @description 消耗时间（毫秒级）
   */
  @property({
    type: Number,
  })
  cost: number;

  /**
   * @kind string|number
   * @required false
   * @default -
   * @description 起始时间
   */
  @property({
    attribute: false,
  })
  startTime: string | number;

  /**
   * @kind string|number
   * @required false
   * @default -
   * @description 结束时间
   */
  @property({
    attribute: false,
  })
  endTime: string | number;

  /**
   * @kind any
   * @required false
   * @default -
   * @description [已废弃]数据源
   */
  @property({
    attribute: false,
  })
  dataSource: any;

  /**
   * @kind { cost?: string; startTime?: string; endTime?: string; }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段
   */
  @property({ attribute: false }) fields: {
    cost?: string;
    startTime?: string;
    endTime?: string;
  };
}

customElements.define("presentational-bricks.cost-time", CostTimeElement);
