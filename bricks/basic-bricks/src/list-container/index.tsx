import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { ListContainer } from "./ListContainer";

/**
 * @id basic-bricks.list-container
 * @name basic-bricks.list-container
 * @docKind brick
 * @description 可以指定子项使用特定构件的列表容器，相当于是动态的构件列表
 * @author steve
 * @slots
 * @history
 * 1.20.0:新增构件
 * 1.41.0:支持 `containerStyle` 配置
 * @memo
 * @noInheritDoc
 */
export class ListContainerElement extends UpdatingElement {
  /**
   * @kind [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)
   * @required true
   * @default `[]`
   * @description 使用的子构件配置
   */
  @property({
    attribute: false,
  })
  useBrick: UseBrickConf;

  /**
   * @kind `any[]`
   * @required true
   * @default `[]`
   * @description 数据列表
   */
  @property({
    attribute: false,
  })
  data: any[] = [];

  /**
   * @kind string | number
   * @default `"var(--card-content-gap)"`
   * @description 间距
   */
  @property({
    attribute: false,
  })
  gap: string | number;

  /**
   * @kind Record<string, any>
   * @default -
   * @description 自定义容器的样式，容器本身默认是 grid 布局，如果`containerStyle`不为空则覆盖掉容器本身的样式配置
   */
  @property({
    attribute: false,
  })
  containerStyle: React.CSSProperties;

  /**
   * @kind Record<string, any>
   * @default -
   * @description 容器本身默认是 grid 布局，可以设置额外的样式。
   */
  @property({
    attribute: false,
  })
  extraContainerStyle: React.CSSProperties;

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
          <ListContainer
            data={this.data}
            useBrick={this.useBrick}
            gap={this.gap}
            containerStyle={this.containerStyle}
            extraContainerStyle={this.extraContainerStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.list-container", ListContainerElement);
