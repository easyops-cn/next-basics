import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { DropMenu } from "./DropMenu";

/**
 * @id frame-bricks.drop-menu
 * @author julielai
 * @history
 * 1.x.0: 新增构件 `frame-bricks.drop-menu`
 * @docKind brick
 * @noInheritDoc
 */
export class DropMenuElement extends UpdatingElement {
  /**
   * @required true
   * @description 菜单数据源
   * @group basic
   */
  @property({
    attribute: false,
  })
  menuData: any[];

  /**
   * @required false
   * @description 一级目录样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  categoryStyle: React.CSSProperties;

  /**
   * @required false
   * @description 二级目录样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  subCategoryStyle: React.CSSProperties;

  /**
   * @required false
   * @description 具体菜单样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  instanceMenuStyle: React.CSSProperties;

  /**
   * @required true
   * @description 菜单标题
   * @group basic
   */
  @property({
    attribute: false,
  })
  menuTitle: string;

  /**
   * @required false
   * @description 搜索框输入提示语
   * @group basic
   */
  @property({
    attribute: false,
  })
  placeholder: string;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "inline-block";
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
          <DropMenu
            menuData={this.menuData}
            categoryStyle={this.categoryStyle}
            subCategoryStyle={this.subCategoryStyle}
            instanceMenuStyle={this.instanceMenuStyle}
            title={this.menuTitle}
            placeholder={this.placeholder}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.drop-menu", DropMenuElement);
