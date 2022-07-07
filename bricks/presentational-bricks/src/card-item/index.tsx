import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  getHistory,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CardItem } from "./CardItem";
import { MenuIcon } from "@next-core/brick-types";
import { get, pick, forEach, set, find, isEqual, isArray } from "lodash";
import { parseTemplate } from "@next-libs/cmdb-utils";
import style from "./index.shadow.less";
import { CardProps } from "antd/lib/card";

export type Color =
  | "green"
  | "red"
  | "blue"
  | "orange"
  | "cyan"
  | "purple"
  | "geekblue"
  | "gray";

export enum CardLayoutType {
  ICON_AS_BACKGROUND = "icon-as-background",
  ICON_SMALL_ALIGN_LEFT = "icon-small-align-left",
  ICON_ALIGN_RIGHT = "icon-align-right",
  ICON_ALIGN_LEFT = "icon-align-left",
  ICON_ALIGN_MIDDLE = "icon-align-middle",
  BLOCK_ICON_ALIGN_LEFT = "block-icon-align-left",
}

export interface DescriptionItem {
  label: string;
  field?: string;
  value?: string;
}

/**
 * @id presentational-bricks.card-item
 * @name presentational-bricks.card-item
 * @docKind brick
 * @description 通用卡片项
 * @author lynette
 * @slots
 * afterTitle: 标题后面的slot，通常搭配"presentational-bricks.brick-value-mapping"使用
 * operate:操作区 slot，通常搭配"basic-bricks.general-button"使用。
 * topRightOperate:右上角操作区 slot，通常搭配"basic-bricks.general-custom-buttons"使用。卡片类型 cardLayoutType 为 "icon-as-background" | "icon-small-align-left" | "icon-align-left" | "icon-align-middle" | "block-icon-align-left"时可用。
 * bottomRightOperate:右下角操作区 slot，通常搭配"basic-bricks.general-custom-buttons"使用。卡片类型 cardLayoutType 为 "icon-small-align-left" | "icon-align-right" | "icon-align-left" 时可用。
 * @history
 * 1.171.0: `cardLayoutType` 增加 "block-icon-align-left" 类型，新增属性 `showImg`,`imgSrc`,`tagConfig.color`,`tagConfig.triangle`
 * 1.160.0: `cardLayoutType` 增加 "icon-align-middle" 类型
 * 1.160.0: 新增属性`disabled`,`fields.disabled`
 * 1.150.0: 新增属性`alwaysShowDescription`
 * 1.135.0: 新增属性`showOperationAreaWhenHovering`
 * 1.94.0: 新增属性`href`
 * @memo
 * @noInheritDoc
 */
export class CardItemElement extends UpdatingElement {
  /**
   * @detail
   * @description 点击的 card-item 触发的事件，tips:点击卡片会先判断事件监听器能否传播到 class="listContainer cardListContainer"元素，是则触发自身的\_handleClick 方法触发事件，否则不会触发事件。
   */
  @event({ type: "presentational-bricks.card-item.click", cancelable: true })
  cardItemClick: EventEmitter<any>;

  private _mountPoint: HTMLElement;

  @property({
    type: Boolean,
  })
  private hasOperateSlot: boolean;

  @property({
    type: Boolean,
  })
  private hasBottomRightOperateSlot: boolean;

  /**
   * @required false
   * @default false
   * @description 解决只有operateSlot时宽度不能占满
   * @group ui
   */
  @property({
    type: Boolean,
  })
  private onlyOperateSlot: boolean;

  /**
   * @required false
   * @default "icon-as-background"
   * @description 卡片布局类型，具体样式看 Demo
   * @group basic
   */
  @property()
  cardLayoutType: CardLayoutType;

  /**
   * @required false
   * @description 卡片 title
   * @group basic
   */
  @property()
  cardTitle: string;

  /**
   * @required false
   * @description 卡片 副标题
   * @group basic
   */
  @property()
  cardSubtitle: string;

  /**
   * @required false
   * @description 描述信息
   * @group basic
   */
  @property({
    attribute: false,
  })
  descriptionList: string[] | string | DescriptionItem[];

  /**
   * @required false
   * @default 3
   * @description 描述信息的最大行数，默认为 3 行，当信息比较少的时候可以设成 3 行以下。UI 规范建议 3 或者 3 以下。
   * @group ui
   */
  @property({
    type: Number,
  })
  descMaxLine: number; // 默认为3，建议配置成3或者以下

  /**
   * @required false
   * @description 描述信息为数组的时候，默认显示每个`<li>`前面的小圈圈，不需要的时候可以隐藏
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideDescCircle: boolean;

  /**
   * @required false
   * @description 卡片跳转 url，支持模版变量
   * @group basic
   */
  @property()
  urlTemplate: string;

  /**
   * @required false
   * @description 卡片跳转 url， url 优先于 urlTemplate 执行
   * @group basic
   */
  @property()
  url: string;

  /**
   * @required false
   * @description 卡片跳转 href，优先于 url 执行
   * @group basic
   */
  @property()
  href: string;

  /**
   * @required false
   * @description 卡片跳转 target，例如可以设置成 _blank
   * @group basic
   */
  @property()
  target: string;

  /**
   * @required true
   * @description 卡片信息数据源
   * @group basic
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @required false
   * @description 字段映射, 跟 dataSource 一起使用来获得运行时 cardTitle、cardSubtitle、descriptionList、icon、iconColor、iconStyle、iconSize、iconOffsetX、iconOffsetY、iconOpacity、disabled
   * @group other
   */
  @property({
    attribute: false,
  })
  fields: {
    cardTitle?: string;
    cardSubtitle?: string;
    descriptionList?: string;
    icon?: string;
    iconColor?: string;
    iconStyle?: string;
    iconSize?: string;
    iconOffsetX?: string;
    iconOffsetY?: string;
    iconOpacity?: string;
    disabled?: string;
  };

  /**
   * @required false
   * @description 卡片右下角的 icon, [详细配置](https://github.com/easyops-cn/next-core/blob/34a0808712ecaa925d0860d281ab23cf3bec7317/packages/brick-types/src/menu.ts#L104), 也可参照示例中的写法
   * @group basic
   */
  @property({
    attribute: false,
  })
  icon: MenuIcon;

  /**
   * @kind Record<string, any>
   * @required false
   * @description 卡片右下角的 icon 的样式，例如需要调整 opacity、right、bottom 的时候可以使用
   * @group ui
   */
  @property({
    attribute: false,
  })
  iconStyle: Record<string, any>;

  /**
   * @required false
   * @description 卡片类型为 "icon-small-align-left" | "icon-align-right" | "icon-align-left" 的时候可以设置 icon 的颜色
   * @group ui
   */
  @property({
    attribute: false,
  })
  iconColor: Color = "gray";

  /**
   * @kind string | number
   * @required false
   * @default 100px
   * @description 卡片类型为 "icon-as-background" 的时候可以设置 icon 的大小
   * @group ui
   */
  @property()
  iconSize: string | number;

  /**
   * @kind string | number
   * @required false
   * @default 0
   * @description 卡片类型为 "icon-as-background" 的时候可以设置 icon 的 X 轴偏移量，向左为正数向右为负数
   * @group basic
   */
  @property()
  iconOffsetX: string | number;

  /**
   * @kind string | number
   * @required false
   * @default 0
   * @description 卡片类型为 "icon-as-background" 的时候可以设置 icon 的 Y 轴偏移量，向上为正数向下为负数
   * @group basic
   */
  @property()
  iconOffsetY: string | number;

  /**
   * @kind number
   * @required false
   * @default 0.45
   * @description 卡片类型为 "icon-as-background" 的时候可以设置 icon 的透明度
   * @group ui
   */
  @property({
    type: Number,
  })
  iconOpacity: number;

  /**
   * @required false
   * @description 右上角 tag 标签
   * @group other
   */
  @property({
    attribute: false,
  })
  tagConfig: {
    text: string;
    field?: string;
    value?: any;
    isNotEqual?: boolean; //增加下逻辑
    hideOperate?: boolean;
    color?: Color;
    triangle?: boolean;
  };

  /**
   * @required false
   * @description 完全透传给 antd 的 Card 属性，详见：[antd卡片属性](https://ant.design/components/card-cn/#Card)
   * @group other
   */
  @property({ attribute: false }) configProps: CardProps;

  /**
   * @required false
   * @default true
   * @description 卡片项是否显示外边框
   * @group ui
   */
  @property({
    attribute: false,
  })
  bordered = true;

  /**
   * @required false
   * @default false
   * @description 是否鼠标悬浮显示操作区
   * @group basic
   */
  @property({
    type: Boolean,
  })
  showOperationAreaWhenHovering: boolean;

  /**
   * @required false
   * @default false
   * @description 是否总是总是展示描述区域
   * @group basic
   */
  @property({
    type: Boolean,
  })
  alwaysShowDescription: boolean;

  /**
   * @required false
   * @default false
   * @description 指定描述区的显示形式，若descriptionList为数组时，应当指定为 `list`,若descriptionList为字符串时，应当指定为 `section`,单独使用卡片时无需设置该属性
   * @group basic
   */
  @property()
  descriptionDataType: "list" | "section";

  /**
   * @required false
   * @default true
   * @description 卡片项是否hover浮起
   * @group ui
   */
  @property({
    attribute: false,
  })
  hoverable = true;

  /**
   * @required false
   * @default false
   * @description 禁用卡片，禁用的卡片不可点击跳转。操作区配置了 slot 的卡片，请按需配置子构件的属性，例如将按钮设置成 disabled 等。
   * @group basic
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @required false
   * @default false
   * @description 反转背景色，背景色为icon传入的颜色，icon为白色。
   * @group ui
   */
  @property({
    type: Boolean,
  })
  reverseBgColor: boolean;

  /**
   * @required false
   * @description 图片图标的src
   * @group basic
   */
  @property({ attribute: false })
  imgSrc: string;

  /**
   * @required false
   * @default false
   * @description 是否显示图片，默认显示图标，设置显示图片后，可配置 `imgSrc` 属性
   * @group basic
   */
  @property({ type: Boolean })
  showImg: boolean;

  /**
   * @required false
   * @description 图标是img时，可以设置 img 的大小，不设置时会铺满
   * @group basic
   */
  @property({
    type: Number,
  })
  imgSize: number;

  /**
   * @default  "circle"
   * @required false
   * @description 设置icon背景形状，仅在设置`bg`为true时有效
   * @group basic
   */
  @property({ attribute: false }) shape: "circle" | "square" | "round-square";

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  // istanbul ignore next
  private _handleClick(): void {
    const data = this.dataSource;
    this.cardItemClick.emit(data);
  }

  connectedCallback(): void {
    this.style.display = "inline-block";

    this.addEventListener("click", (e) => {
      const foundOperatingArea = find(
        e.composedPath(),
        (element: HTMLElement) => {
          return (
            element.classList &&
            element.classList.value.includes("operateContainer")
          );
        }
      ) as HTMLElement;
      if (foundOperatingArea) {
        return;
      }
      const disabledField = get(this.fields, "disabled");
      const disabled =
        this.disabled ||
        (disabledField ? get(this.dataSource, disabledField) : false);
      if (disabled) {
        return;
      }
      const foundCardListContainerArea = find(
        e.composedPath(),
        (element: HTMLElement) => {
          return (
            element.classList && element.classList.value.includes("cardItem")
          );
        }
      ) as HTMLElement;
      // Todo(lynette): shadow dom中link的跳转会刷新整个页面，所以先这样处理。Issue：https://github.com/facebook/react/issues/9242
      if (foundCardListContainerArea) {
        this._handleClick();
        if (this.href) {
          const a = document.createElement("a");
          a.href = this.href;
          if (this.target && this.target !== "_self") {
            window.open(this.href, this.target);
          } else {
            a.click();
          }
        } else {
          const url =
            this.url ||
            (this.urlTemplate &&
              parseTemplate(this.urlTemplate, this.dataSource));
          if (url) {
            const history = getHistory();
            if (this.target && this.target !== "_self") {
              window.open(url, this.target);
            } else {
              history.push(url);
            }
          }
        }
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
      const mutableProps = {
        target: this.target,
        url: this.url,
        disabled: this.disabled,
        cardTitle: this.cardTitle,
        cardSubtitle: this.cardSubtitle,
        descriptionList: this.descriptionList,
        icon: this.icon,
        iconColor: this.iconColor,
        iconStyle: this.iconStyle,
        iconSize: this.iconSize,
        iconOffsetX: this.iconOffsetX,
        iconOffsetY: this.iconOffsetY,
        iconOpacity: this.iconOpacity,
        showTag: false,
        hideOperate: false,
        tagText: this.tagConfig?.text,
        tagColor: this.tagConfig?.color || "blue",
        tagTriangle: this.tagConfig?.triangle !== false,
        imgSrc: this.imgSrc,
      };
      if (this.dataSource) {
        if (this.urlTemplate) {
          mutableProps.url = parseTemplate(this.urlTemplate, this.dataSource);
        }
        if (this.fields) {
          this.initData(mutableProps as any);
        }
        if (
          isArray(this.descriptionList) &&
          (this.descriptionList as DescriptionItem[]).every(
            (item) => !!item.field
          )
        ) {
          mutableProps.descriptionList = this.getDescriptionList(
            this.descriptionList,
            this.dataSource
          );
        }
        if (this.tagConfig) {
          mutableProps.showTag = isEqual(
            get(this.dataSource, this.tagConfig.field),
            this.tagConfig.value
          );
          if (this.tagConfig.isNotEqual) {
            mutableProps.showTag = !mutableProps.showTag;
          }
          mutableProps.hideOperate =
            mutableProps.showTag && this.tagConfig.hideOperate;
        }
      } else {
        if (this.tagConfig) {
          mutableProps.showTag = true;
          mutableProps.hideOperate = this.tagConfig.hideOperate;
        }
      }
      ReactDOM.render(
        <BrickWrapper>
          <CardItem
            cardLayoutType={this.cardLayoutType}
            reverseBgColor={this.reverseBgColor}
            cardTitle={mutableProps.cardTitle}
            cardSubtitle={mutableProps.cardSubtitle}
            descriptionList={mutableProps.descriptionList as any}
            hideDescCircle={this.hideDescCircle}
            icon={mutableProps.icon}
            iconColor={mutableProps.iconColor}
            iconStyle={mutableProps.iconStyle}
            dataSource={this.dataSource}
            target={mutableProps.target}
            url={mutableProps.url}
            showTag={mutableProps.showTag}
            hideOperate={mutableProps.hideOperate}
            tagText={mutableProps.tagText}
            tagColor={mutableProps.tagColor}
            tagTriangle={mutableProps.tagTriangle}
            descMaxLine={this.descMaxLine}
            hasOperateSlot={this.hasOperateSlot}
            hasBottomRightOperateSlot={this.hasBottomRightOperateSlot}
            onlyOperateSlot={this.onlyOperateSlot}
            iconSize={mutableProps.iconSize}
            iconOffsetX={mutableProps.iconOffsetX}
            iconOffsetY={mutableProps.iconOffsetY}
            iconOpacity={mutableProps.iconOpacity}
            configProps={this.configProps}
            bordered={this.bordered}
            hoverable={this.hoverable}
            showOperationAreaWhenHovering={this.showOperationAreaWhenHovering}
            alwaysShowDescription={this.alwaysShowDescription}
            descriptionDataType={this.descriptionDataType}
            disabled={mutableProps.disabled}
            imgSrc={mutableProps.imgSrc}
            showImg={this.showImg}
            imgSize={this.imgSize}
            shape={this.shape}
          />
        </BrickWrapper>,
        this._mountPoint,
        () => {
          const operateSlot = this._getOperateSlot();
          if (operateSlot) {
            this._checkOperateSlot();
            operateSlot.addEventListener("slotchange", this._checkOperateSlot);
          }

          const bottomRightOperateSlot = this._getBottomRightOperateSlot();
          if (bottomRightOperateSlot) {
            this._checkBottomRightOperateSlot();
            bottomRightOperateSlot.addEventListener(
              "slotchange",
              this._checkBottomRightOperateSlot
            );
          }
        }
      );
    }
  }

  // istanbul ignore next
  private _getOperateSlot(): HTMLSlotElement {
    return this.shadowRoot.querySelector("#operateSlot") as HTMLSlotElement;
  }

  // istanbul ignore next
  private _checkOperateSlot = (): void => {
    const operateSlot = this._getOperateSlot();
    if (operateSlot) {
      this.hasOperateSlot = operateSlot.assignedNodes().length > 0;
    }
  };

  // istanbul ignore next
  private _getBottomRightOperateSlot(): HTMLSlotElement {
    return this.shadowRoot.querySelector(
      "#bottomRightOperateSlot"
    ) as HTMLSlotElement;
  }

  // istanbul ignore next
  private _checkBottomRightOperateSlot = (): void => {
    const bottomRightOperateSlot = this._getBottomRightOperateSlot();
    if (bottomRightOperateSlot) {
      this.hasBottomRightOperateSlot =
        bottomRightOperateSlot.assignedNodes().length > 0;
    }
  };
  getDescriptionList(descriptionList: any, dataSource: any): any[] {
    return descriptionList.map(
      (item: { field: string; label: string; value?: string }) => {
        return {
          ...item,
          value: get(dataSource, item.field) || item.value,
        };
      }
    );
  }
  initData(mutableProps: {
    url: string;
    cardTitle: string;
    descriptionList: string[] | string;
    icon: MenuIcon;
  }): void {
    const pickFields = pick(this.fields, [
      "cardTitle",
      "cardSubtitle",
      "descriptionList",
      "icon",
      "iconColor",
      "iconStyle",
      "iconSize",
      "iconOffsetX",
      "iconOffsetY",
      "iconOpacity",
      "disabled",
      "imgSrc",
    ]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
  }
}

customElements.define("presentational-bricks.card-item", CardItemElement);
