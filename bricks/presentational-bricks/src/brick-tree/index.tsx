import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickTree, BrickTreeProps } from "./BrickTree";
import { TreeProps, AntTreeNodeProps, DataNode } from "antd/lib/tree";
import { checkedFilterProps } from "../interfaces/brick-tree";
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
   * @detail {selectedKeys: string[]; info: {event: string; selected: boolean; node: EventDataNode[]; nativeEvent: MouseEvent;}}
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
   * @detail {checkedKeys: string[]| {checked: string[]; halfChecked: string[]}; info: {event: string; checked: boolean; checkedNodes: DataNode[]; nativeEvent: MouseEvent;}}
   * @description 勾选事件
   */
  @event({ type: "tree.checkV2", cancelable: true }) treeCheckV2: EventEmitter<{
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] };
    info: {
      event: "check";
      checked: boolean;
      checkedNodes: DataNode[];
      nativeEvent: MouseEvent;
    };
  }>;

  /**
   * @detail string[]| {checked: string[]; halfChecked: string[]}
   * @description 搜索事件
   */
  @event({ type: "tree.search", cancelable: true })
  treeSearch: EventEmitter<string>;

  /**
   * @detail React.Key[]
   * @description 展开事件
   */
  @event({ type: "tree.expand", cancelable: true }) treeExpand: EventEmitter<
    React.Key[]
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
   * @description 搜索字符
   */
  @property({ type: String }) searchQ: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 搜索的功能是否需要过滤
   */
  @property({ type: Boolean }) isFilter: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否目录树
   */
  @property({ type: Boolean }) isDirectory: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否也根据key值搜索，启用后匹配项会整体高亮
   */
  @property({ attribute: false }) alsoSearchByKey: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否根据ui规范控制title中的样式,仅在树的title中含‘全部’和‘默认’时使用
   */
  @property({ type: Boolean }) showSpecificationTitleStyle: boolean;

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
   * @kind checkedFilterProps
   * @required false
   * @default -
   * @description `tree.check`事件和全选计数中是否过滤掉某些节点，其中 `filed` 表示数据源中的字段路径， `value` 表示与其字段比较的值， `operator` 表示两者比较的方法。仅在设置 `configProps.checkable` 为 `true` 时生效
   */
  @property({
    attribute: false,
  })
  checkedFilterConfig: checkedFilterProps;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 父子节点选中状态是否不关联
   */
  @property({
    type: Boolean,
  })
  checkedNotRelevant: boolean;

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

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 最右自定义项事件是否冒泡
   * @group advanced
   */
  @property({ type: Boolean }) suffixStopEvent: boolean;

  /**
   * @kind {useBrick:[UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)}
   * @required false
   * @default -
   * @description 搜索框右边的自定义项，当`searchable`为true时生效
   */
  @property({
    attribute: false,
  })
  afterSearchBrick: { useBrick: UseBrickConf };

  /**
   * @kind { useBrick: [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) }
   * @required false
   * @default -
   * @description 树上方的构件
   */
  @property({
    attribute: false,
  })
  beforeTreeBrick: { useBrick: UseBrickConf };

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 默认展开所有树节点
   * @group advanced
   */
  @property({ type: Boolean }) defaultExpandAll: boolean;

  /**
   * @kind boolean
   * @required false
   * @default `true`
   * @description 是否可取消选择
   * @group advanced
   */
  @property({ attribute: false }) deselectable = true;

  /**
   * @kind {useBrick:UseBrickConf}
   * @default -
   * @description 自定义节点icon
   * @group basic
   */
  @property({ attribute: false })
  iconUseBrick?: BrickTreeProps["iconUseBrick"];

  /**
   * @kind
   * @default -
   * @description 是否展示已选择数量
   * @group basic
   */
  @property({ attribute: false })
  hideSelectedNum?: boolean;

  /**
   * @kind
   * @default -
   * @description 隐藏背景颜色
   * @group basic
   */
  @property({ attribute: false })
  hideBackground?: boolean;

  /**
   * @kind
   * @default -
   * @description 仅高亮搜索结果而不过滤其他节点
   * @group basic
   */
  @property({ attribute: false })
  onlyHighlightBySearch?: boolean = false;

  /**
   * @kind boolean
   * @default false
   * @description 是否开启虚拟滚动
   * @group advanced
   */
  @property({ type: Boolean })
  virtualScroll?: boolean;

  /**
   * @kind number
   * @default -
   * @description 虚拟滚动时的高度（像素）
   * @group advanced
   */
  @property({ type: Number })
  height?: number;

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

  private _handleCheckV2 = (
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] },
    info: {
      event: "check";
      checked: boolean;
      checkedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    this.treeCheckV2.emit({ checkedKeys, info });
  };

  private _handleSearch = (value: string) => {
    this.treeSearch.emit(value);
  };

  private _handleExpand = (expandedKeys: React.Key[]) => {
    this.treeExpand.emit(expandedKeys);
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
            searchQ={this.searchQ}
            placeholder={this.placeholder}
            searchParent={this.searchParent}
            checkAllEnabled={this.checkAllEnabled}
            onSelect={this._handleSelect}
            onExpand={this._handleExpand}
            onCheck={this._handleCheck}
            onCheckV2={this._handleCheckV2}
            onSearch={this._handleSearch}
            checkedFilterConfig={this.checkedFilterConfig}
            checkedNotRelevant={this.checkedNotRelevant}
            suffixBrick={this.suffixBrick}
            suffixStopEvent={this.suffixStopEvent}
            afterSearchBrick={this.afterSearchBrick}
            beforeTreeBrick={this.beforeTreeBrick}
            showSpecificationTitleStyle={this.showSpecificationTitleStyle}
            defaultExpandAll={this.defaultExpandAll}
            deselectable={this.deselectable}
            alsoSearchByKey={this.alsoSearchByKey}
            isFilter={this.isFilter}
            iconUseBrick={this.iconUseBrick}
            isDirectory={this.isDirectory}
            hideSelectedNum={this.hideSelectedNum}
            hideBackground={this.hideBackground}
            onlyHighlightBySearch={this.onlyHighlightBySearch}
            virtual={this.virtualScroll}
            height={this.height}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-tree", BrickTreeElement);
