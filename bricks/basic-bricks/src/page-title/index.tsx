import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { PageTitle } from "./PageTitle";

/**
 * @id basic-bricks.page-title
 * @name basic-bricks.page-title
 * @docKind brick
 * @description 页面标题，在`basic-bricks.micro-view`的titleBar插槽中使用，如果只是普通字符串的可用pageTitle属性代替，如果是动态的话则用这个构件
 * @author steve
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class PageTitleElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 页面标题
   * @group basic
   */
  @property()
  pageTitle: string;

  /**
   * @kind boolean
   * @default false
   * @description 是否以 dashboard 模式显示
   * @group basic
   */
  @property({
    type: Boolean,
  })
  dashboardMode?: boolean;

  connectedCallback(): void {
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
          <PageTitle
            pageTitle={this.pageTitle}
            dashboardMode={this.dashboardMode}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  setPageTitle(value: string): void {
    this.pageTitle = value;
  }
}

customElements.define("basic-bricks.page-title", PageTitleElement);
