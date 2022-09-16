import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AppbarBreadcrumb } from "./AppbarBreadcrumb";
import { BreadcrumbItemConf, SidebarMenu } from "@next-core/brick-types";

/**
 * @id basic-bricks.app-bar-breadcrumb
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-breadcrumb`
 * @docKind brick
 * @noInheritDoc
 */
export class AppbarBreadcrumbElement extends UpdatingElement {
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
   * @default
   * @description 面包屑配置
   */
  @property({
    attribute: false,
  })
  breadcrumb: BreadcrumbItemConf[];

  /**
   * @default -
   * @description 是否隐藏当前应用名称
   */
  @property({ attribute: false })
  noCurrentApp: boolean;

  @property({
    attribute: false,
  })
  menu: Partial<SidebarMenu>;

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <AppbarBreadcrumb
            breadcrumb={this.breadcrumb ?? []}
            noCurrentApp={this.noCurrentApp}
            menu={this.menu}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.app-bar-breadcrumb",
  AppbarBreadcrumbElement
);
