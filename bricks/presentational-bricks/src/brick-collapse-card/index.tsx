import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickCollapseCard } from "./BrickCollapseCard";
import { descriptionsItemProps } from "../interfaces/brick-collapse-card";
import { get, find } from "lodash";
import style from "./index.shadow.less";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id presentational-bricks.brick-collapse-card
 * @name presentational-bricks.brick-collapse-card
 * @docKind brick
 * @description 详情折叠，有需要再展开，避免一开始太喧宾夺主，如工具详情
 * @author lynette
 * @slots
 * content:卡片展开的内容
 * header:header 自定义构件，需要同时把 hasHeaderSlot 设置成 true
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickCollapseCardElement extends UpdatingElement {
  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]卡片标题，请使用cardTitle
   */
  @property({ __deprecated_and_for_compatibility_only: true })
  title: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 卡片标题
   */
  @property()
  cardTitle: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind { dataSource?: string; title: string; }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段的值
   */
  @property({
    attribute: false,
  })
  fields: { dataSource?: string; title: string };

  /**
   * @kind string
   * @required false
   * @default 收起
   * @description 卡片展开的时候右上角的文案
   */
  @property({
    attribute: false,
  })
  expandActiveText = "收起";

  /**
   * @kind string
   * @required false
   * @default 展开
   * @description 卡片收起的时候右上角的文案
   */
  @property({
    attribute: false,
  })
  expandInactiveText = "展开";

  /**
   * @kind MenuIcon
   * @required false
   * @default up
   * @description 卡片展开的时候右上角的 icon，支持 ant-design 的 icon
   */
  @property({
    attribute: false,
  })
  expandActiveIcon = "up";

  /**
   * @kind MenuIcon
   * @required false
   * @default down
   * @description 卡片收起的时候右上角的 icon，支持 ant-design 的 icon
   */
  @property({
    attribute: false,
  })
  expandInactiveIcon = "down";

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 卡片默认收起／展开
   */
  @property({
    type: Boolean,
  })
  isActive: boolean;

  /**
   * @kind any
   * @required false
   * @default -
   * @description 容器自定义样式
   */
  @property({
    attribute: false,
  })
  containerStyle: any;

  /**
   * @kind any
   * @required false
   * @default -
   * @description header 自定义样式
   */
  @property({
    attribute: false,
  })
  headerStyle: any;

  /**
   * @kind any
   * @required false
   * @default -
   * @description 内容自定义样式
   */
  @property({
    attribute: false,
  })
  contentStyle: any;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description header 是否为自定义的 slot
   */
  @property({
    type: Boolean,
  })
  hasHeaderSlot: boolean;

  /**
   * @kind MenuIcon
   * @required false
   * @default {lib: "easyops", category: "default", icon: "collapse-card-default"}
   * @description 卡片标题图标，仅在`titleWithIconAndDesc`为true时有效
   */
  @property({
    attribute: false,
  })
  titleIcon: MenuIcon | string = {
    lib: "easyops",
    category: "default",
    icon: "collapse-card-default",
  };

  /**
   * @kind `descriptionsItemProps[]`
   * @required false
   * @default -
   * @description 标题描述信息，仅在`titleWithIconAndDesc`为true时有效
   */
  @property({
    attribute: false,
  })
  descriptionList: descriptionsItemProps[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否可以设置标题图标和描述信息
   */
  @property({
    type: Boolean,
  })
  titleWithIconAndDesc: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 设置该属性后，卡片内容区的元素自动垂直居中
   */
  @property({
    type: Boolean,
  })
  verticalCenter: boolean;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }

  togglePanel(e: Event): void {
    const foundHeader = find(e.composedPath(), {
      className: "ant-collapse-extra",
    }) as HTMLElement;
    if (foundHeader) {
      this.isActive = !this.isActive;
      this._render();
      this.isActive && window.dispatchEvent(new Event("resize"));
    }
  }

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.addEventListener("click", (e) => {
      this.togglePanel(e);
    });
    this._render();
    const header = this._shadowRoot.querySelector(
      ".ant-collapse-header"
    ) as HTMLElement;
    header && Object.assign(header.style, this.headerStyle);
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected getBrickCollapseCardNode() {
    const mutableProps = {
      title: this.cardTitle ?? this.title,
      dataSource: this.dataSource,
    };
    if (!this.cardTitle) {
      if (this.dataSource && this.fields) {
        if (this.fields.title) {
          mutableProps.title = get(this.dataSource, this.fields.title);
        }
        if (this.fields.dataSource) {
          mutableProps.dataSource = get(
            this.dataSource,
            this.fields.dataSource
          );
        }
      }
    }
    return (
      <BrickCollapseCard
        title={mutableProps.title}
        expandActiveText={this.expandActiveText}
        expandInactiveText={this.expandInactiveText}
        expandActiveIcon={this.expandActiveIcon}
        expandInactiveIcon={this.expandInactiveIcon}
        isActive={this.isActive}
        containerStyle={this.containerStyle}
        headerStyle={this.headerStyle}
        contentStyle={this.contentStyle}
        dataSource={mutableProps.dataSource}
        hasHeaderSlot={this.hasHeaderSlot}
        titleIcon={this.titleIcon}
        descriptionList={this.descriptionList}
        titleWithIconAndDesc={this.titleWithIconAndDesc}
        verticalCenter={this.verticalCenter}
      />
    );
  }

  protected _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>{this.getBrickCollapseCardNode()}</BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-collapse-card",
  BrickCollapseCardElement
);
