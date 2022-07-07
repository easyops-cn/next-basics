import React from "react";
import ReactDOM from "react-dom";
import { isObject, get } from "lodash";
import { ConditionType } from "@next-libs/cmdb-utils";

import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";

import {
  BrickConditionalDisplay,
  DisplayType,
} from "./BrickConditionalDisplay";

export interface RuleProps {
  condition: ConditionType;
  style?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
  label?: string;
}
export type DataType = string | number | Record<string, any>;

export enum ConditionOperator {
  eq = "$eq",
  ne = "$ne",
  gt = "$gt",
  gte = "$gte",
  lt = "$lt",
  lte = "$lte",
}

export enum LogicalOperator {
  and = "$and",
  or = "$or",
}

// export type ConditionType =
//   | boolean
//   | number
//   | string
//   | Record<string | ConditionOperator, any>
//   | LogicalCondition;

export interface LogicalCondition
  extends Record<string | LogicalOperator, ConditionType[]> {}

/**
 * @id presentational-bricks.brick-conditional-display
 * @name presentational-bricks.brick-conditional-display
 * @docKind brick
 * @description 按不同条件渲染，比如告警数为0是绿色，大于1时显示黄色
 * @author cyril
 * @slots
 * @history
 * @memo
 * 这个构件的配置相对复杂，适用于区间的条件规则，比如大于、小于等，如果是一些明确的值映射，请使用[基本数值映射](developers/brick-book/brick/presentational-bricks.brick-value-mapping)
 * ```typescript
 * enum ConditionOperator {
 *   eq = "$eq",
 *   ne = "$ne",
 *   gt = "$gt",
 *   gte = "$gte",
 *   lt = "$lt",
 *   lte = "$lte",
 * }
 *
 * enum LogicalOperator {
 *   and = "$and",
 *   or = "$or",
 * }
 *
 * type ConditionType =
 *   | boolean
 *   | number
 *   | string
 *   | Record<string | ConditionOperator, any>
 *   | LogicalCondition;
 *
 * interface LogicalCondition
 *   extends Record<string | LogicalOperator, ConditionType[]> {}
 * ```
 *
 * @noInheritDoc
 */
export class BrickConditionalDisplayElement extends UpdatingElement {
  /**
   * @required false
   * @description 展示规则, 具体请查看[Mongodb条件操作符](https://www.mongodb.com/docs/manual/reference/operator/query/)
   * @group basic
   */
  @property({
    attribute: false,
  })
  rules: RuleProps[] = [];

  /**
   * @required false
   * @description [已废弃]显示的字段值，支持通过 path 指定
   * @deprecated
   * @group other
   */
  @property({
    attribute: false,
  })
  fields: { value: string };

  /**
   * @required true
   * @description 数据
   * @group basic
   */
  @property({
    attribute: false,
  })
  dataSource: DataType;

  /**
   * @kind "default" | "label"
   * @required false
   * @default "label"
   * @description 展示类型，label 表示通过标签的风格展示相关内容，default 表示默认的风格展示(display: block)
   * @group basic
   */
  @property({
    attribute: false,
  })
  type: DisplayType = "label";

  connectedCallback(): void {
    this.style.display = this.style.display || "block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const value =
        isObject(this.dataSource) && this.fields
          ? get(this.dataSource, this.fields.value)
          : this.dataSource;
      ReactDOM.render(
        <BrickWrapper>
          <BrickConditionalDisplay
            data={this.dataSource}
            value={value}
            rules={this.rules}
            type={this.type}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-conditional-display",
  BrickConditionalDisplayElement
);
