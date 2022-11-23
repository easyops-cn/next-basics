import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  UpdatingElement,
} from "@next-core/brick-kit";
import { SubMenuFilter, SubMenuFilterItem } from "./SubMenuFilter";
import { UseBrickConf } from "@next-core/brick-types";

/**
 * @id basic-bricks.sub-menu-filter
 * @name basic-bricks.sub-menu-filter
 * @editor shared-editors.general-menu--editor
 * @editorProps {"showSearch": true}
 * @docKind brick
 * @description 搜索能力二级菜单
 * @author Alex
 * @slots
 * @history
 * 1.58.0:新增构件 `basic-bricks.sub-menu-filter`
 * @memo
 * ### Interface

 * ```typescript
*export declare type MenuIcon = AntdIcon | FaIcon | EasyopsIcon;

*export interface AntdIcon {
*  lib: "antd";
*  type: string;
*  theme?: ThemeType;
*}
*export interface FaIcon {
*  lib: "fa";
*  icon: IconName;
*  prefix?: IconPrefix;
*}
*export interface EasyopsIcon {
*  lib: "easyops";
*  icon: string;
*  category?: string;
*}

*export interface SubMenuFilterSimpleItem {
*  title: string;
*  key: string;
*  type?: "item";
*  icon: MenuIcon;
*  to?: LocationDescriptor
*}

*export interface SubMenuFilterGroup {
*  type: "group" | "subMenu";
*  title: string;
*  items: SubMenuFilterSimpleItem[];
*  key?: string;
*}

*export type SubMenuFilterItem = SubMenuFilterSimpleItem | SubMenuFilterGroup;

*export interface SubMenuFilterProps {
*  defaultSelectedKeys: string[];
*  defaultOpenKeys: string[];
*  selectable: boolean;
*  multiple: boolean;
*  suffixBrick?: { useBrick: UseBrickConf };
*  menuItems: SubMenuFilterItem[];
*  placeholder?: string;
*  unsearchable: boolean;
*  onSelect: (menuItem: SubMenuFilterItem[]) => void;
*  onSearch: (query: string) => void;
*}
*```

 * @noInheritDoc
 */
export class SubMenuFilterElement extends UpdatingElement {
  /**
   * @required -
   * @default -
   * @description 菜单项
   * @group basic
   */
  @property({
    attribute: false,
  })
  menuItems: SubMenuFilterItem[];

  /**
   * @kind {useBrick:UseBrickConf}
   * @required false
   * @default -
   * @description 列表项 extra 位置（右边），相关文档[UseBrickConf](/next-docs/docs/api-reference/brick-types.usebrickconf)
   * @group other
   */
  @property({
    attribute: false,
  })
  suffixBrick: { useBrick: UseBrickConf };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示搜索框
   * @group basic
   */
  @property({
    type: Boolean,
  })
  unsearchable: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 搜索框 placeholder
   * @group basic
   */
  @property()
  placeholder: string;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 初始选中的菜单项 key 数组
   * @group basic
   */
  @property({
    attribute: false,
  })
  defaultSelectedKeys: string[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 初始展开的 SubMenu 菜单项 key 数组
   * @group basic
   */
  @property({
    attribute: false,
  })
  defaultOpenKeys: string[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否允许选中
   * @group basic
   */
  @property({
    type: Boolean,
  })
  selectable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否多选
   * @group basic
   */
  @property({
    type: Boolean,
  })
  multiple: boolean;

  /**
   * @kind number
   * @required false
   * @default 24
   * @description 菜单缩进宽度
   * @group ui
   */
  @property({
    attribute: false,
  })
  inlineIndent = 24;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否采用透明背景样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  transparentBackground = false;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 手风琴模式
   * @group basic
   */
  @property({
    attribute: false,
  })
  accordion = false;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description suffixBrick是否hover才显示
   * @group basic
   */
  @property({
    attribute: false,
  })
  suffixBrickTriggerByHover = false;

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
   * @detail SubMenuFilterItem[]
   * @description -
   */
  @event({ type: "menu.select" }) menuSelect: EventEmitter<SubMenuFilterItem[]>;
  /**
   * @detail string
   * @description 搜索 query
   */
  @event({ type: "menu.search" }) menuSearch: EventEmitter<string>;
  /**
   * @detail SubMenuFilterItem[]
   * @description -
   */
  @event({ type: "menu.click" }) menuClick: EventEmitter<SubMenuFilterItem>;

  handleSelect = (menuItem: SubMenuFilterItem[]) => {
    this.menuSelect.emit(menuItem);
  };

  handleClick = (menuItem: SubMenuFilterItem): void => {
    this.menuClick.emit(menuItem);
  };

  handleSearch = (q: string) => {
    this.menuSearch.emit(q);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <SubMenuFilter
            multiple={this.multiple}
            onSelect={this.handleSelect}
            onClick={this.handleClick}
            onSearch={this.handleSearch}
            selectable={this.selectable}
            unsearchable={this.unsearchable}
            placeholder={this.placeholder}
            suffixBrick={this.suffixBrick}
            menuItems={this.menuItems}
            inlineIndent={this.inlineIndent}
            transparentBackground={this.transparentBackground}
            accordion={this.accordion}
            defaultOpenKeys={this.defaultOpenKeys}
            defaultSelectedKeys={this.defaultSelectedKeys}
            suffixBrickTriggerByHover={this.suffixBrickTriggerByHover}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.sub-menu-filter", SubMenuFilterElement);
