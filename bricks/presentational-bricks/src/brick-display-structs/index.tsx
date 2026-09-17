import React from "react";
import ReactDOM from "react-dom";
import { get } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickDisplayStructs } from "./BrickDisplayStructs";


export interface BrickDisplayStructsElementProps {
  dataSource?: Record<string, any>;
  fields?: { value: string };
  value?: any;
  displayType?: "stringify" | FieldToDisplay;
}

export interface FieldToDisplay {
  field?: string;
  separator: string;
}

/**
 * @id presentational-bricks.brick-display-structs
 * @name presentational-bricks.brick-display-structs
 * @docKind brick
 * @description 可将结构体（数组）数据以字符串的形式展示，或只展示其中的一个字段
 * @description.en Displays struct (array) data as a string, or displays only one of its fields
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickDisplayStructsElement extends UpdatingElement implements BrickDisplayStructsElementProps {
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
      if (this.dataSource && this.fields) {
        mutableProps.value = get(this.dataSource, this.fields.value);
      }
      ReactDOM.render(
        <BrickWrapper>
          <BrickDisplayStructs
            value={mutableProps.value}
            displayType={this.displayType}
            emptyText={this.emptyText}
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
   * @description.en [Deprecated] Data source
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind { value: string }
   * @required false
   * @default -
   * @description 字[已废弃]段映射, 跟 dataSource 一起使用来获得运行时 value
   * @description.en [Deprecated] Field mapping, used together with dataSource to get the value at runtime
   */
  @property({
    attribute: false,
  })
  fields: { value: string };

  /**
   * @kind 结构体或数组
   * @required false
   * @default -
   * @description 要展示的值
   * @description.en Value to display
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @kind 'stringify' | FieldToDisplay
   * @required true
   * @default -
   * @description 展示类型, 定义类型如下
   * @description.en Display type; the type definition is as follows
   */
  @property({
    attribute: false,
  })
  displayType: "stringify" | FieldToDisplay;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 空文案
   * @description.en Empty text
   */
  @property({
    attribute: false,
  })
  emptyText = "";
}

customElements.define(
  "presentational-bricks.brick-display-structs",
  BrickDisplayStructsElement
);
