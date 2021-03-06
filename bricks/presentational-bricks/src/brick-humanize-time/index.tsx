import React from "react";
import ReactDOM from "react-dom";
import { isNil, get } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { HumanizeTimeFormat } from "@next-libs/datetime";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { BrickHumanizeTime } from "./BrickHumanizeTime";

export interface LinkInfo {
  detailUrlTemplate: string;
  target?: string;
}

/**
 * @id presentational-bricks.brick-humanize-time
 * @name presentational-bricks.brick-humanize-time
 * @docKind brick
 * @description 如：3天前、过去2小时等。也可显示消耗时间，如1小时2分钟，也可显示为链接
 * @author ice
 * @slots
 * @history
 * 1.65.0:新属性 `inputFormat` 和 `outputFormat`
 * @memo
 * @noInheritDoc
 */
export class BrickHumanizeTimeElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 字符串的时间格式，如 "YYYY-MM-DD"
   */
  @property()
  inputFormat: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 展示时间格式，如 "YYYY-MM-DD"，当设置该属性时，属性 `formatter` 无效
   */
  @property()
  outputFormat: string;

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
      let value = this.value;
      // istanbul ignore else
      if (isNil(this.value) && this.dataSource && this.fields) {
        // eslint-disable-next-line no-console
        console.warn(
          "`dataSource` and `fields` of `<presentational-bricks.brick-humanize-time>` are deprecated, use `transform` instead."
        );
        value = get(this.dataSource, this.fields.value);
      }
      let link: { url: string; target?: string };
      // istanbul ignore next
      if (this.link && this.dataSource) {
        // eslint-disable-next-line no-console
        console.warn(
          "`dataSource` and `fields` of `<presentational-bricks.brick-humanize-time>` are deprecated, use `transform` instead."
        );
        const url = parseTemplate(this.link.detailUrlTemplate, this.dataSource);
        const target = this.link.target;
        link = { url, target };
      }
      ReactDOM.render(
        <BrickWrapper>
          <BrickHumanizeTime
            value={value}
            formatter={this.formatter}
            isMicrosecond={this.isMicrosecond}
            isCostTime={this.isCostTime}
            link={link}
            inputFormat={this.inputFormat}
            outputFormat={this.outputFormat}
          />
        </BrickWrapper>,
        this
      );
    }
  }

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
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段的值
   */
  @property({
    attribute: false,
  })
  fields: { value: string };

  /**
   * @kind number | string
   * @required false
   * @default -
   * @description 时间截，或字符串，当为字符串时，应提供时间格式 `inputFormat`
   */
  @property({
    attribute: false,
  })
  value: number | string;

  /**
   * @kind full|default|relative|future|accurate|auto
   * @required false
   * @default -
   * @description 枚举值：full, default, relative, future, accurate, auto
   */
  @property({
    attribute: false,
  })
  formatter: HumanizeTimeFormat;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description value 值的单位是否为毫秒
   */
  @property({
    type: Boolean,
  })
  isMicrosecond: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示为耗费时间，例如：'1 个月 20 天'
   */
  @property({
    type: Boolean,
  })
  isCostTime: boolean;

  /**
   * @kind LinkInfo
   * @required false
   * @default -
   * @description 跳转链接，默认为空
   */
  @property({
    attribute: false,
  })
  link: LinkInfo;
}

customElements.define(
  "presentational-bricks.brick-humanize-time",
  BrickHumanizeTimeElement
);
