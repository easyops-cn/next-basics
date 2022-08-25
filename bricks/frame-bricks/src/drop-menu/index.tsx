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
   * @default -
   * @description 菜单数据源
   */
  @property({
    attribute: false,
  })
  menuData: any[];

  /**
   * @required false
   * @default -
   * @description 一级目录字体大小
   */
  @property({
    attribute: false,
  })
  categoryFontSize: string;

  /**
   * @required false
   * @default -
   * @description 二级目录字体大小
   */
  @property({
    attribute: false,
  })
  subCategoryFontSize: string;

  /**
   * @required false
   * @default -
   * @description 具体菜单字体大小
   */
  @property({
    attribute: false,
  })
  instanceMenuFontSize: string;

  /**
   * @required true
   * @default -
   * @description 菜单标题
   */
  @property({
    attribute: false,
  })
  menuTitle: string;

  /**
   * @required false
   * @default -
   * @description 搜索框输入提示语
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
            categoryFontSize={this.categoryFontSize}
            subCategoryFontSize={this.subCategoryFontSize}
            instanceMenuFontSize={this.instanceMenuFontSize}
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
