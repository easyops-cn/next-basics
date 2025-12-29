import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { TreeTransfer } from "./TreeTransfer";
import { DataNode } from "rc-tree-select/lib/interface";


export interface TreeTransferElementProps {
  dataSource?: any[];
  selectedKeys?: string[] ;
  listStyle?: React.CSSProperties;
  showSearch?: boolean;
  titles?: string[];
  shownumItem?: boolean;
  replaceFields?: { key: string, title: string};
}

/**
 * @id presentational-bricks.tree-transfer
 * @author weili
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.tree-transfer`
 * @docKind brick
 * @noInheritDoc
 */
export class TreeTransferElement extends UpdatingElement implements TreeTransferElementProps {
  /**
   * @kind any[]
   * @required true
   * @default -
   * @description 数据源，其中的数据将会被渲染到左边一栏中
   */
  @property({ attribute: false })
  dataSource: any[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 显示在右侧框数据的 key 集合
   */
  @property({ attribute: false })
  selectedKeys: string[] = [];

  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 整个穿梭框的自定义样式，常用来设置宽高
   */
  @property({ attribute: false })
  listStyle: React.CSSProperties;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示搜索框
   */
  @property({ type: Boolean })
  showSearch: boolean;

  /**
   * @kind [string, string]
   * @required false
   * @default -
   * @description 标题集合，顺序从左至右
   * @group advanced
   */
  @property({ attribute: false })
  titles: string[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否展示所选项
   * @group advanced
   */
  @property({ attribute: false })
  shownumItem: boolean;

  /**
   * @kind { key: string, title: string }
   * @required false
   * @default -
   * @description dataSource中数值，key为值，title为展示文本，默认为{key:"key",title:"title"}
   * @group advanced
   */
  @property({ attribute: false })
  replaceFields: { key: string; title: string } = {
    key: "key",
    title: "title",
  };

  /**
   * @detail string[]
   * @description 右侧框数据的 key 集合
   */
  @event({ type: "general.transfer.change" })
  generalTransferChange: EventEmitter<Array<DataNode["key"]>>;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 默认展开所有树节点
   */
  @property({ attribute: false })
  defaultExpandAll = true;

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

  handleChange = (targetKeys: Array<DataNode["key"]>): void => {
    this.generalTransferChange.emit(targetKeys);
  };

  protected _render(): void {
    if (this.isConnected && this.dataSource) {
      ReactDOM.render(
        <BrickWrapper>
          <TreeTransfer
            selectedKeys={this.selectedKeys}
            dataSource={this.dataSource}
            listStyle={this.listStyle}
            showSearch={this.showSearch}
            titles={this.titles}
            shownumItem={this.shownumItem}
            replaceFields={this.replaceFields}
            handleChange={this.handleChange}
            defaultExpandAll={this.defaultExpandAll}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.tree-transfer",
  TreeTransferElement
);
