import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickTree } from "./BrickTree";
import { TreeProps, AntTreeNodeProps, DataNode } from "antd/lib/tree";
import { MenuIcon } from "@next-core/brick-types";
import { EventDataNode } from "rc-tree/lib/interface";
import { UseBrickConf } from "@next-core/brick-types";

export type TreeIcon =
  | MenuIcon
  | React.ComponentType<React.SVGAttributes<SVGElement>>;

export type BrickTreeNodeProps = Omit<AntTreeNodeProps, "children"> & {
  title?: string;
  icon?: TreeIcon;
  key?: React.Key;
  children?: BrickTreeNodeProps[];
};

/**
 * @id presentational-bricks.brick-tree
 * @name presentational-bricks.brick-tree
 * @docKind brick
 * @description 常用于展示应用业务树、模型树等，可以完整展现其中层级关系，并具有展开收起选择等交互功能
 * @author jo
 * @slots
 * @history
 * 1.145.0:新增事件 `tree.selectV2`
 * @memo
 * @noInheritDoc
 */
export class BrickTreeElement extends UpdatingElement {
  /**
   * @detail string[]
   * @description 选择事件
   */
  @event({ type: "tree.select", cancelable: true }) treeSelect: EventEmitter<
    string[]
  >;

  /**
   * @detail string[]
   * @description 选择事件，输出`selectedKeys`及`当前选中节点信息`
   */
  @event({ type: "tree.selectV2", cancelable: true })
  treeSelectV2: EventEmitter<{
    selectedKeys: string[];
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    };
  }>;

  /**
   * @detail string[]| {checked: string[]; halfChecked: string[]}
   * @description 勾选事件
   */
  @event({ type: "tree.check", cancelable: true }) treeCheck: EventEmitter<
    string[] | { checked: string[]; halfChecked: string[] }
  >;

  /**
   * @kind BrickTreeNodeProps[]
   * @required true
   * @default -
   * @description 树列表项，具体项见下表
   */
  @property({ attribute: false }) dataSource: BrickTreeNodeProps[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 选择项
   */
  @property({ attribute: false }) selectedKeys: string[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 选中项
   */
  @property({ attribute: false }) checkedKeys: string[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 展开项
   */
  @property({ attribute: false }) expandedKeys: string[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 搜索功能
   */
  @property({ type: Boolean }) searchable: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 搜索框 placeholder
   */
  @property({ type: String }) placeholder: string;

  /**
   * @kind object
   * @required false
   * @default -
   * @description ant-design 的 tree 的相关配置项（除 selectedKeys、checkedKeys 和 expandedKeys）,具体查阅：[https://ant.design/components/tree-cn/#Tree-props](https://ant.design/components/tree-cn/#Tree-props)
   * @group advanced
   */
  @property({ attribute: false }) configProps: TreeProps;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否搜索父节点
   * @group advanced
   */
  @property({ type: Boolean }) searchParent: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 全选功能，只有当 `configProps.checkable` 为 `true` 时生效
   * @group advanced
   */
  @property({ type: Boolean }) checkAllEnabled: boolean;

  /**
   * @kind {useBrick:[UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)}
   * @required false
   * @default -
   * @description 树的最右边自定义项
   */
  @property({
    attribute: false,
  })
  suffixBrick: { useBrick: UseBrickConf };

  connectedCallback(): void {
    this.style.display = "flex";
    this.style.flexDirection = "column";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _handleSelect = (
    selectedKeys: string[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    this.treeSelect.emit(selectedKeys);
    this.treeSelectV2.emit({ selectedKeys, info });
  };

  private _handleCheck = (
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] }
  ) => {
    this.treeCheck.emit(checkedKeys);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickTree
            dataSource={this.dataSource}
            selectedKeys={this.selectedKeys}
            checkedKeys={this.checkedKeys}
            expandedKeys={this.expandedKeys}
            configProps={this.configProps}
            searchable={this.searchable}
            placeholder={this.placeholder}
            searchParent={this.searchParent}
            checkAllEnabled={this.checkAllEnabled}
            onSelect={this._handleSelect}
            onCheck={this._handleCheck}
            suffixBrick={this.suffixBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-tree", BrickTreeElement);
