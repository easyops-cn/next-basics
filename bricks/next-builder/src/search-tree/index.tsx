import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { SearchTree } from "./SearchTree";
import { StoryboardAssemblyResult } from "../shared/storyboard/interfaces";

/**
 * @id next-builder.search-tree
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `next-builder.search-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class SearchTreeElement extends UpdatingElement {
  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  /**
   * @kind string
   * @required true
   * @default -
   * @description 指定的应用 homepage
   */
  @property()
  homepage: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 指定的应用 appId
   */
  @property()
  appId: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 指定的应用 projectId
   */
  @property()
  projectId: string;

  /**
   * @default -
   * @required true
   * @description 搜索树数据
   */
  @property({ attribute: false })
  dataSource: StoryboardAssemblyResult;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 树高度, 设置高度可以控制Tree开启虚拟渲染模式, 不会因为storyBoard同时展开全部节点, DOM过多导致的页面卡顿
   */
  @property({ type: Number })
  height: number;

  /**
   * @detail unknow
   * @description 点击节点数据
   */
  @event({ type: "node.click" }) clickEvent: EventEmitter;
  private _handleTitleClick = (node: any): void => {
    this.clickEvent.emit(node);
  };

  /**
   * @default true
   * @required false
   * @description 支持 key 搜索
   */
  @property({
    type: Boolean,
    attribute: false,
  })
  supportKey = true;

  /**
   * @default true
   * @required false
   * @description 支持 忽略大小写 搜索
   */
  @property({
    type: Boolean,
    attribute: false,
  })
  supportIngoreCase = true;

  /**
   * @default true
   * @required false
   * @description 支持 模糊 搜索
   */
  @property({
    type: Boolean,
    attribute: false,
  })
  supportFuzzy = true;

  /**
   * @detail unknow
   * @description 点击节点数据
   */
  @event({ type: "node.focus" }) focusEvent: EventEmitter;
  private _handleTitleFocus = (node: any): void => {
    this.focusEvent.emit(node);
  };

  /**
   * @detail unknow
   * @description 点击节点数据
   */
  @event({ type: "node.blur" }) blurEvent: EventEmitter;
  private _handleTitleBlur = (node: any): void => {
    this.blurEvent.emit(node);
  };

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <SearchTree
            homepage={this.homepage}
            appId={this.appId}
            projectId={this.projectId}
            treeData={this.dataSource}
            height={this.height}
            searchConfig={{
              supportKey: this.supportKey,
              supportIngoreCase: this.supportIngoreCase,
              supportFuzzy: this.supportFuzzy,
            }}
            titleClick={this._handleTitleClick}
            titleFocus={this._handleTitleFocus}
            titleBlur={this._handleTitleBlur}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.search-tree", SearchTreeElement);
