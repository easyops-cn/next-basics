import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { Card } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
import { AdvanceListContainer } from "./AdvanceListContainer";
export interface itemData {
  list: Record<string, any>[];
  page_size?: number | string;
  page?: number | string;
}
export interface AdvanceListContainerProps {
  data: {
    list: Record<string, any>[];
    page_size?: number | string;
    page?: number | string;
  };
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  itemClick?: () => void;
  selectable?: boolean;
  defaultActiveIndex?: number;
}
/**
 * @id basic-bricks.advanced-list-container
 * @name basic-bricks.advanced-list-container
 * @docKind brick
 * @description 可以指定子项使用特定构件的列表容器，相当于是动态的构件列表
 * @author momo
 * @slots
 * @history
 * 1.55.0:新增构件 `basic-bricks.advanced-list-container`
 * @memo
 * ### interface
 * ```typescript
 * interface ItemData {
 *   list: Record<string, any>[];
 *   page_size?: number | string;
 *   page?: number | string }
 * }
 *
 * interface AdvanceListContainerProps {
 *   data: {
 *     list: Record<string, any>[];
 *     page_size?: number | string;
 *     page?: number | string;
 *   };
 *   titleBrick: { useBrick: UseBrickConf };
 *   suffixBrick?: { useBrick: UseBrickConf };
 *   itemClick?: () => void;
 *   selectable?: boolean;
 *   defaultActiveIndex?: number;
 * }
 * ```
 * @noInheritDoc
 */
export class AdvancedListContainerElement extends UpdatingElement {
  /**
   * @kind ItemData
   * @required true
   * @default -
   * @description 列表数据
   */
  @property({ attribute: false })
  data: AdvanceListContainerProps["data"];
  /**
   * @kind {useBrick:[UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)}
   * @required true
   * @default -
   * @description 列表项标题位置
   */
  @property({ attribute: false })
  titleBrick: AdvanceListContainerProps["titleBrick"];
  /**
   * @kind {useBrick:[UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)}
   * @required false
   * @default -
   * @description 列表项 extra 位置（右边）
   */
  @property({ attribute: false })
  suffixBrick: AdvanceListContainerProps["suffixBrick"];
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示 card
   */
  @property({ attribute: false })
  showCard: boolean;
  /**
   * @kind number
   * @required false
   * @default -
   * @description 默认选中项
   */
  @property({ attribute: false })
  defaultActiveIndex: number;

  @property({ attribute: false })
  selectable = true;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  /**
   * @detail `{item: any, index: number}`
   * @description 当前项的所有数据以及当前项的索引
   */
  @event({ type: "item.click" }) clickEvent: EventEmitter<{
    item: any;
    index: number;
  }>;
  private _handleItemClick = (data: { item: any; index: number }): void => {
    this.clickEvent.emit(data);
  };
  renderAdvanceListContainer(): React.ReactElement {
    return (
      <AdvanceListContainer
        selectable={this.selectable}
        defaultActiveIndex={this.defaultActiveIndex}
        data={this.data}
        titleBrick={this.titleBrick}
        suffixBrick={this.suffixBrick}
        itemClick={this._handleItemClick}
      />
    );
  }
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          {this.showCard ? (
            <Card bordered={false}>{this.renderAdvanceListContainer()}</Card>
          ) : (
            this.renderAdvanceListContainer()
          )}
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.advanced-list-container",
  AdvancedListContainerElement
);
// `basic-bricks.advance-list-container` is deprecated cause its misunderstanding name.
// Use `basic-bricks.advanced-list-container` instead.
class AdvanceListContainerElement extends AdvancedListContainerElement {}
customElements.define(
  "basic-bricks.advance-list-container",
  AdvanceListContainerElement
);
