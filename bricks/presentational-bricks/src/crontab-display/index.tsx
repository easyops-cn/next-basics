import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { isNil, get } from "lodash";
import { CrontabDisplay } from "./CrontabDisplay";

/**
 * @id presentational-bricks.crontab-display
 * @name presentational-bricks.crontab-display
 * @docKind brick
 * @description 把定时器的时间人性化展示
 * @author jo
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class CrontabDisplayElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 待转化成可阅读的定时时间， 格式为以空格为分隔的五位`* * * * * (每分钟)`, 按顺序分别代表分钟，小时，天，月，星期。
   */
  @property()
  value: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据源
   */
  @property({ attribute: false })
  dataSource: Record<string, any>;

  /**
   * @kind { value: string }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段
   */
  @property({ attribute: false })
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
    // istanbul ignore else
    if (this.isConnected) {
      if (isNil(this.value) && this.dataSource && this.fields) {
        this.value = get(this.dataSource, this.fields.value);
      }

      ReactDOM.render(
        <BrickWrapper>
          <CrontabDisplay value={this.value} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.crontab-display",
  CrontabDisplayElement
);
