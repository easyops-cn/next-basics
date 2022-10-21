import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { SubMenu } from "./SubMenu";
import { SidebarMenu, UseBrickConf } from "@next-core/brick-types";

/**
 * @id basic-bricks.sub-menu
 * @name basic-bricks.sub-menu
 * @editor shared-editors.general-menu--editor
 * @docKind brick
 * @description 二级菜单
 * @author lynette
 * @slots
 * @history
 * @memo
 * > Tips: 通用子菜单构件，相关配置项同 Storyboard.routes.menu.sidebarMenu，暂时不支持 icon
 * @noInheritDoc
 */
export class SubMenuElement extends UpdatingElement {
  /**
   * @kind [SidebarMenu](http://developers.162.d.easyops.local/micro-app/storyboard-routes-menu-sidebarmenu.html)
   * @required true
   * @default -
   * @description 数据源
   */
  @property({ attribute: false }) dataSource: SidebarMenu;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 菜单顶部操作按钮
   */
  @property({
    attribute: false,
  })
  topOperationConf: { useBrick: UseBrickConf };

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
      ReactDOM.render(
        <BrickWrapper>
          <SubMenu
            dataSource={this.dataSource}
            topOperationConf={this.topOperationConf}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.sub-menu", SubMenuElement);
