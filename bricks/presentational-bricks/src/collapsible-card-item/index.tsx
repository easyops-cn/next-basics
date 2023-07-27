import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
} from "@next-core/brick-kit";
import { CollapsibleCardItem } from "./CollapsibleCardItem";
import { MenuIcon } from "@next-core/brick-types";
import style from "./index.shadow.css";
import { get, pick, forEach, set, find, isEqual } from "lodash";

/**
 * @id presentational-bricks.collapsible-card-item
 * @name presentational-bricks.collapsible-card-item
 * @docKind brick
 * @description 长条形可折叠卡片，里面可以放表单／description等构件
 * @author lynette
 * @slots
 * content:卡片展开的内容
 * header:header 自定义构件，需要同时把 customHeader 设置成 true
 * operate:操作区的构件
 * @history
 * 1.179.0: 新增`hoverable`,`cardStyle`属性
 * @memo
 * @noInheritDoc
 */
export class CollapsibleCardItemElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片 title
   */
  @property()
  cardTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片描述信息
   */
  @property()
  cardDesc: string;

  /**
   * @required false
   * @default true
   * @description 是否展示hover效果
   */
  @property({ attribute: false })
  hoverable?: boolean = true;

  /**
   * @required false
   * @default -
   * @description 卡片样式
   */
  @property({ attribute: false })
  cardStyle?: CSSProperties;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 卡片 icon
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
   */
  @property({
    attribute: false,
  })
  contentStyle: Record<string, any>;
  @property({
    attribute: false,
  })
  subscriptConfig: any;
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
   */
  @method()
  open(): void {
    this.isActive = true;
  }

  /**
   * @description 折叠卡片
   */
  @method()
  close(): void {
    this.isActive = false;
  }

  /**
   * @description 切换展开折叠卡片
   */
  @method()
  toggle(): void {
    this.isActive = !this.isActive;
  }
}

customElements.define(
  "presentational-bricks.collapsible-card-item",
  CollapsibleCardItemElement
);
