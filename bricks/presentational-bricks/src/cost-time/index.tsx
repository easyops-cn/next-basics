import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { CostTime } from "./CostTime";
import { get } from "lodash";

export interface CostTimeElementProps {
  cost?: number;
  startTime?: string | number;
  endTime?: string | number;
  unitStyle?: React.CSSProperties;
  dataSource?: any;
  fields?: {
    cost?: string;
    startTime?: string;
    endTime?: string;
  };
}

/**
 * @id presentational-bricks.cost-time
 * @name presentational-bricks.cost-time
 * @docKind brick
 * @description 耗时展示构件，将毫秒级时间自动转换为人类可读的时间文本（如"15秒"、"1天"），支持直接传入耗时或通过起止时间自动计算
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class CostTimeElement
  extends UpdatingElement
  implements CostTimeElementProps
{
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
            unitStyle={this.unitStyle}
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
   * @required false
   * @description 消耗时间（毫秒级）
   * @group basic
   */
  @property({
    type: Number,
  })
  cost: number;

  /**
   * @required false
   * @description 起始时间，与 endTime 配合使用，当未传入 cost 时自动计算耗时
   * @group basic
   */
  @property({
    attribute: false,
  })
  startTime: string | number;

  /**
   * @required false
   * @description 结束时间，与 startTime 配合使用，当未传入 cost 时自动计算耗时
   * @group basic
   */
  @property({
    attribute: false,
  })
  endTime: string | number;

  /**
   * @required false
   * @description 时间单位文本的自定义样式，设置后将使用自定义渲染逻辑而非默认的 costTime 函数
   * @group ui
   */
  @property({
    attribute: false,
  })
  unitStyle: React.CSSProperties;

  /**
   * @required false
   * @description [已废弃]数据源
   * @deprecated
   * @group other
   */
  @property({
    attribute: false,
  })
  dataSource: any;

  /**
   * @required false
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段
   * @deprecated
   * @group other
   */
  @property({ attribute: false }) fields: {
    cost?: string;
    startTime?: string;
    endTime?: string;
  };
}

customElements.define("presentational-bricks.cost-time", CostTimeElement);
