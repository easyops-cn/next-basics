import React from "react";
import ReactDOM from "react-dom";
import { isNil, get, isEmpty } from "lodash";
import { Color } from "../interfaces/brick-tag";
import { LinkProps } from "@next-libs/basic-components";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickValueMapping } from "./BrickValueMapping";
import { MenuIcon } from "@next-core/brick-types";

export interface MappingValue {
  /** 展示文本 */
  text?: string;
  /** 标签颜色 */
  color?: Color;
  /**
   * [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon)
   */
  icon?: MenuIcon;
  /** 图标大小 */
  iconSize?: number;
}

/**
 * @id presentational-bricks.brick-value-mapping
 * @name presentational-bricks.brick-value-mapping
 * @editor shared-editors.general-tag--editor
 * @docKind brick
 * @description 适用于将基本类型的数值转换成有意义的文本进行展示
 * @author ice
 * @slots
 * @history
 * 1.89.11:使用 `dataSource` 代替之前 `data`
 * 1.83.0:新增 `triggerClickEvent`, `link`, `data` 属性
 * 1.65.0:新增属性`shape`，支持大圆角
 * 1.52.0:新增特性，支持正则匹配
 * 1.48.0:新增特性，映射成 icon
 * @memo
 * ## 注意
 * > 如果需要区间的条件规则映射，比如大于、小于等，请使用[条件展示](developers/brick-book/brick/presentational-bricks.brick-conditional-display)
 *
 * ## LinkProps
 * ```typescript
 * interface LinkProps {
 *   to?: string;
 *   href?: string;
 *   innerRef?: string;
 *   replace?: boolean;
 *   target?: string;
 * }
 * ```
 * ## 映射规则说明
 *
 * 映射支持正则匹配，匹配规则如下：
 *
 * 1. 首先以 `value` 为 key 来获取映射，若成功匹配则使用该规则来展示；若不成功，则走下一步
 * 2. 将 `映射规则` 中的 key 作为正则，来匹配 `value`, 使用成功匹配的第一个规则
 *
 * 例如
 *
 * ```typescript
 * // 以下将展示 `hi`
 * const mapping = { hello: { text: "hi" }, ".*": { text: "anything else" } };
 * const value = "hello";
 *
 * // 以下将展示 `anything else`
 * const mapping = {
 *   www: { text: "world wide web" },
 *   ".*": { text: "anything else" },
 * };
 * const value = "hello";
 * ```
 * @noInheritDoc
 */
export class BrickValueMappingElement extends UpdatingElement {
  /**
   * @description 点击事件
   */
  @event({ type: "brick-value-mapping.click" })
  valueMappingClick: EventEmitter<{ data: any; value: string | number }>;

  /**
   * @description 原始值
   * @group basic
   */
  @property() value?: string | number;

  /**
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @deprecated
   * @group other
   */
  @property({ attribute: false }) fields?: {
    value: string;
  };
  /**
   * @description 映射规则
   * @group basic
   */
  @property({ attribute: false }) mapping: Record<
    string | number,
    MappingValue
  >;
  /**
   * @description 显示文字旁边的小圈圈，按照平台规范通常表示状态的标签可设置为 true
   * @group basic
   */
  @property({
    type: Boolean,
  })
  showTagCircle?: boolean;

  /**
   * @description 替代 `data` 属性，click 事件时传出的数据
   * @group basic
   */
  @property({ attribute: false }) dataSource?: Record<string, any>;

  /**
   * @default false
   * @description 是否触发点击事件
   * @group other
   */
  @property({ type: Boolean })
  triggerClickEvent?: boolean;

  /**
   * @description 配置跳转链接，在 `triggerClickEvent` 为 false 生效
   * @group other
   */
  @property({ attribute: false })
  link?: LinkProps;

  /**
   * @description [已废弃]可用于接收 useBrick 传递过来的数据
   * @deprecated
   * @group other
   */
  @property({ attribute: false })
  data?: any;

  connectedCallback(): void {
    this.style.display = this.style.display || "block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  handleClick = () => {
    // istanbul ignore if
    if (!isEmpty(this.data)) {
      // eslint-disable-next-line no-console
      console.warn(
        "`data` of `<presentational-bricks.brick-value-mapping>` are deprecated, use `dataSource` instead."
      );
    }
    this.valueMappingClick.emit({
      data: !isEmpty(this.dataSource) ? this.dataSource : this.data,
      value: this.value,
    });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const mutableProps = {
        value: this.value,
      };
      // istanbul ignore else
      if (isNil(this.value) && this.dataSource && this.fields) {
        mutableProps.value = get(this.dataSource, this.fields.value);
      }
      ReactDOM.render(
        <BrickWrapper>
          <BrickValueMapping
            value={mutableProps.value}
            mapping={this.mapping}
            showTagCircle={this.showTagCircle}
            shape="default"
            triggerClickEvent={this.triggerClickEvent}
            link={this.link}
            handleClick={this.handleClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-value-mapping",
  BrickValueMappingElement
);
