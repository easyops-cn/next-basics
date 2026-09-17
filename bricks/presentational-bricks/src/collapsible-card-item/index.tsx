// @ts-nocheck
import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CollapsibleCardItem } from "./CollapsibleCardItem";
import { MenuIcon } from "@next-core/brick-types";
import style from "./index.shadow.css";
import { get, pick, forEach, set, find, isEqual } from "lodash";


export interface CollapsibleCardItemElementProps {
  cardTitle?: string;
  cardDesc?: string;
  hoverable?: boolean;
  cardStyle?: CSSProperties;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  dataSource?: Record<string, any>;
  fields?: {
    cardTitle?: string;
    cardDesc?: string;
    icon?: string;
  }
  isActive?: boolean;
  disableClickHeaderToOpen?: boolean;
  customHeader?: boolean;
  disableClickHeaderToClose?: boolean;
  contentStyle?: Record<string, any>;
  subscriptConfig?: any;
  operatingAreaStyle?: React.CSSProperties;
}

/**
 * @id presentational-bricks.collapsible-card-item
 * @name presentational-bricks.collapsible-card-item
 * @docKind brick
 * @description 长条形可折叠卡片，里面可以放表单／description等构件
 * @description.en Long strip collapsible card, which can contain bricks such as forms and descriptions
 * @author lynette
 * @slots
 * content:卡片展开的内容
 * header:header 自定义构件，需要同时把 customHeader 设置成 true
 * operate:操作区的构件
 * @slots.en
 * content:Content of the expanded card
 * header:Custom header brick, `customHeader` must be set to true at the same time
 * operate:Brick in the operating area
 * @history
 * 1.179.0: 新增`hoverable`,`cardStyle`属性
 * @memo
 * @noInheritDoc
 */
export class CollapsibleCardItemElement extends UpdatingElement implements CollapsibleCardItemElementProps {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片 title
   * @description.en Card title
   */
  @property()
  cardTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片描述信息
   * @description.en Card description
   */
  @property()
  cardDesc: string;

  /**
   * @required false
   * @default true
   * @description 是否展示hover效果
   * @description.en Whether to show the hover effect
   */
  @property({ attribute: false })
  hoverable?: boolean = true;

  /**
   * @required false
   * @default -
   * @description 卡片样式
   * @description.en Card style
   */
  @property({ attribute: false })
  cardStyle?: CSSProperties;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 卡片 icon
   * @description.en Card icon
   */
  @property({
    attribute: false,
  })
  icon: MenuIcon;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 卡片右下角的 icon 的样式，例如需要调整 opacity、right、bottom 的时候可以使用
   * @description.en Style of the icon in the lower right corner of the card, used when adjusting opacity, right, bottom, etc.
   */
  @property({
    attribute: false,
  })
  iconStyle: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required true
   * @default -
   * @description 卡片信息数据源
   * @description.en Data source of the card information
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind { cardTitle?: string;icon?:string; }
   * @required true
   * @default -
   * @description 字段映射, 跟 dataSource 一起使用来获得运行时 cardTitle、icon
   * @description.en Field mapping, used together with dataSource to get cardTitle and icon at runtime
   */
  @property({
    attribute: false,
  })
  fields: {
    cardTitle?: string;
    cardDesc?: string;
    icon?: string;
  };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 卡片是否默认展开
   * @description.en Whether the card is expanded by default
   */
  @property({
    type: Boolean,
  })
  isActive: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁止点击卡片头部展开（有些场景不希望用户点击头部展开，而希望定制点击按钮展开时，可设置为 true）
   * @description.en Whether to disable expanding by clicking the card header (set to true in scenarios where you do not want users to expand by clicking the header but by clicking a custom button)
   */
  @property({
    type: Boolean,
  })
  disableClickHeaderToOpen: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否自定义头部
   * @description.en Whether to customize the header
   */
  @property({
    type: Boolean,
  })
  customHeader: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁止点击卡片头部折叠（有些场景不希望用户点击头部折叠，而希望定制点击按钮折叠时，可设置为 true）
   * @description.en Whether to disable collapsing by clicking the card header (set to true in scenarios where you do not want users to collapse by clicking the header but by clicking a custom button)
   */
  @property({
    type: Boolean,
  })
  disableClickHeaderToClose: boolean;

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 内容区样式，目前内容区有默认 padding:32px 72px。当里面的构件自己带有边距的时候需要自行调整到理想样式效果。
   * @description.en Style of the content area. Currently the content area has a default padding of 32px 72px. When the bricks inside have their own margins, you need to adjust them to the ideal style yourself.
   */
  @property({
    attribute: false,
  })
  contentStyle: Record<string, any>;
  @property({
    attribute: false,
  })
  subscriptConfig: any;

  @property({
    attribute: false,
  })
  operatingAreaStyle: React.CSSProperties;

  /**
   * @detail boolean
   * @description 折叠状态改变
   * @description.en Collapse state changed
   */
  @event({ type: "collapse.change" }) collapseChange: EventEmitter<boolean>;

  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }

  togglePanel(e: Event) {
    if (!this.disableClickHeaderToOpen || !this.disableClickHeaderToClose) {
      const foundHeader = find(e.composedPath(), {
        className: "headerContainer",
      }) as HTMLElement;
      if (foundHeader) {
        if (!this.disableClickHeaderToOpen && !this.isActive) {
          this.open();
        } else if (!this.disableClickHeaderToClose && this.isActive) {
          this.close();
        }
      }
    }
  }
  setSubscription(subscriptConfig, dataSource) {
    let showSubscript = isEqual(
      get(dataSource, subscriptConfig.field),
      subscriptConfig.value
    );
    const { type } = subscriptConfig;
    const defaultConfig = {
      lib: "fa",
      icon: "star",
      prefix: "fas",
    };
    const checkedConfig = {
      lib: "fa",
      icon: "check",
      prefix: "fas",
    };
    const subscriptIconConfig =
      type === "custom" && subscriptConfig.subscriptIconConfig
        ? subscriptConfig.subscriptIconConfig
        : type === "checked"
        ? checkedConfig
        : defaultConfig;
    if (subscriptConfig.isNotEqual) {
      showSubscript = !showSubscript;
    }
    return {
      showSubscript,
      subscriptIconConfig,
    };
  }
  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.style.width = "100%";
    this.addEventListener("click", (e) => {
      const foundOperatingArea = find(e.composedPath(), {
        className: "operatingArea",
      }) as HTMLElement;
      if (foundOperatingArea) {
        e.preventDefault();
      } else {
        this.togglePanel(e);
      }
    });
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      let subscriptConfig;
      let hideOperate = false;
      const mutableProps = {
        cardTitle: this.cardTitle,
        cardDesc: this.cardDesc,
        icon: this.icon,
      };
      if (this.fields && this.dataSource) {
        this.initData(mutableProps);
      }
      if (this.dataSource && this.subscriptConfig) {
        subscriptConfig = this.setSubscription(
          this.subscriptConfig,
          this.dataSource
        );
        hideOperate =
          subscriptConfig.showSubscript && this.subscriptConfig.hideOperate;
      }
      ReactDOM.render(
        <BrickWrapper>
          <CollapsibleCardItem
            customHeader={this.customHeader}
            cardTitle={mutableProps.cardTitle}
            cardDesc={mutableProps.cardDesc}
            cardStyle={this.cardStyle}
            hoverable={this.hoverable}
            icon={mutableProps.icon}
            isActive={this.isActive}
            iconStyle={this.iconStyle}
            contentStyle={this.contentStyle}
            {...subscriptConfig}
            hideOperate={hideOperate}
            operatingAreaStyle={this.operatingAreaStyle}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }

  private initData(mutableProps: { cardTitle: string; icon: MenuIcon }): void {
    const pickFields = pick(this.fields, ["cardTitle", "cardDesc", "icon"]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
  }

  /**
   * @description 展开卡片
   * @description.en Expand the card
   */
  @method()
  open(): void {
    this.isActive = true;
    this.collapseChange.emit(true);
  }

  /**
   * @description 折叠卡片
   * @description.en Collapse the card
   */
  @method()
  close(): void {
    this.isActive = false;
    this.collapseChange.emit(false);
  }

  /**
   * @description 切换展开折叠卡片
   * @description.en Toggle the card between expanded and collapsed
   */
  @method()
  toggle(): void {
    this.isActive = !this.isActive;
    this.collapseChange.emit(this.isActive);
  }
}

customElements.define(
  "presentational-bricks.collapsible-card-item",
  CollapsibleCardItemElement
);
