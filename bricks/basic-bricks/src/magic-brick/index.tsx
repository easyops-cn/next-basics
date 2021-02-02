import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MagicBrick } from "./MagicBrick";

/**
 * @id basic-bricks.magic-brick
 * @name basic-bricks.magic-brick
 * @docKind brick
 * @description 指定数据渲染类型，直接调用对应的展示构件渲染
 * @author lynette
 * @slots
 * @history
 * 1.25.0:新增构件 `basic-bricks.magic-brick`
 * @memo
 * @noInheritDoc
 */
export class MagicBrickElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 数据渲染类型，对[构件配置表](magic-brick)中的 selector 字段
   */
  @property()
  showType: string;

  /**
   * @kind any
   * @required true
   * @default -
   * @description 数据源，通常情况该构件在一些容器构件中使用，数据源来自于容器构件例如 brick-table 的 rowData
   */
  @property({
    attribute: false,
  })
  data: any;

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
      ReactDOM.render(
        <BrickWrapper>
          <MagicBrick showType={this.showType} data={this.data} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.magic-brick", MagicBrickElement);
