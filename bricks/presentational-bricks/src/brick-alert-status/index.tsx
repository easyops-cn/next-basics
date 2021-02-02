import React from "react";
import ReactDOM from "react-dom";
import { isNil, get } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickAlertStatus } from "./BrickAlertStatus";

/**
 * @id presentational-bricks.brick-alert-status
 * @name presentational-bricks.brick-alert-status
 * @docKind brick
 * @description 将告警状态转换成文字表述
 * @author ice
 * @slots
 * @history
 * 1.74.0:新属性 `isRecover`
 * @memo
 * @noInheritDoc
 */
export class BrickAlertStatusElement extends UpdatingElement {
  /**
   * @kind enum[0, 1, 2, 3]
   * @required false
   * @default -
   * @description 告警状态
   */
  @property({ type: Number })
  status: number;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 告警恢复类型
   */
  @property()
  recoverType: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否已恢复告警
   */
  @property({ type: Boolean })
  isRecover: boolean;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   */
  @property({ attribute: false })
  dataSource: any;

  /**
   * @kind { status: string, recoverType: string, isRecover: string }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 status 和 recoverType
   */
  @property({ attribute: false })
  fields: { status: string; recoverType: string; isRecover: string };

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
      let status = this.status;
      let recoverType = this.recoverType;
      let isRecover = this.isRecover;

      if (isNil(status) && this.dataSource && this.fields) {
        status = get(this.dataSource, this.fields.status);
        recoverType = get(this.dataSource, this.fields.recoverType);
        isRecover = get(this.dataSource, this.fields.isRecover);
      }

      ReactDOM.render(
        <BrickWrapper>
          <BrickAlertStatus
            status={status}
            recoverType={recoverType}
            isRecover={isRecover}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-alert-status",
  BrickAlertStatusElement
);
