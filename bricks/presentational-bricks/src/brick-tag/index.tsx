import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickTag, TagTypeProps, TagListType } from "./BrickTag";
import { Card, TooltipProps } from "antd";
import { Color } from "../interfaces/brick-tag";
import { get, map } from "lodash";

/**
 * @id presentational-bricks.brick-tag
 * @name presentational-bricks.brick-tag
 * @editor shared-editors.general-tag--editor
 * @docKind brick
 * @description 进行标记和分类的小标签，同时支持基本标签和可选中标签
 * @author lynette
 * @slots
 * @history
 * 1.167.1:新增属性 `disabledTooltip`；在 TagListType 中新增 `color`,`disabled`,`disabledTooltip` 字段，支持对特定标签设置特殊颜色、禁用、禁用文案。
 * 1.97.0:属性`default`支持数组，新增事件`checked.update.v2`
 * 1.65.0:新增属性`shape`，支持大圆角
 * 1.60.0:新增 `color` 属性代替 `configProps.color` 的使用方式
 * @memo
 * ```typescript
 * export interface TagListType {
 *   key: string;
 *   label: string;
 *   tooltip?: string;
 *   icon?: string | MenuIcon;
 *   color?: string | Color;
 *   disabled?: boolean;
 *   disabledTooltip?: string;
 * }
 * ```
 * @noInheritDoc
 */
export class BrickTagElement extends UpdatingElement {
  /**
   * @detail string[]
   * @description 选中的 tag 的 key
   */
  @event({ type: "checked.update", cancelable: true })
  checkedUpdate: EventEmitter<string[]>;

  /**
   * @detail {label: string;key:string}[]
   * @description 选中的 tag
   */
  @event({ type: "checked.update.v2", cancelable: true })
  checkedUpdateV2: EventEmitter<{ label: string; key: string }[]>;

  /**
   * @detail { current: Record<string, any>; tagList: Record<string, any>[] }
   * @description 当前关闭的tag和剩余的tagList
   */
  @event({ type: "tag.close" }) tagClose: EventEmitter<{
    current: Record<string, any>;
    tagList: Record<string, any>[];
  }>;

  /**
   * @detail {label: string;key:string}
   * @description 当前点击的tag
   */
  @event({ type: "tag.click" }) tagClick: EventEmitter<{
    label: string;
    key: string;
  }>;

  /**
   * @kind TagListType[] 或者 string[]
   * @required false
   * @default -
   * @description 标签列表，当已知的时候可直接在 storyboard 中声明
   */
  @property({
    attribute: false,
  })
  tagList: TagListType;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否在标签内显示小圆点
   */
  @property({
    type: Boolean,
  })
  showTagCircle: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示卡片
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind any
   * @required false
   * @default -
   * @description 数据源，通过 useResolves 从后台接口获取
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind Color
   * @required false
   * @default -
   * @description 标签的颜色配置，当 `componentType=Tag` 且 `closable!=true` 时才有效，除了提供内置八种主题色，也支持直接赋色值（如 `#f5f5f5`）使用
   */
  @property()
  color: string | Color;

  /**
   * @kind "Tag"/"CheckableTag"
   * @required false
   * @default "Tag"
   * @description 组件类型，对应 ant-design 中的基本标签和可选中标签
   */
  @property({
    attribute: false,
  })
  componentType: TagTypeProps;

  /**
   * @kind string|string[]
   * @required false
   * @default -
   * @description componentType 为`CheckableTag`的时候默认选中的标签 key
   */
  @property({
    attribute: false,
  })
  default: string | string[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否能多选，多选场景下右上角会有小圆点提示
   */
  @property({
    attribute: false,
  })
  multipleCheck = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 标签是否可以取消单选，在 `componentType` 为 `CheckableTag` 且 `multipleCheck` 为 `false` 时生效。
   */
  @property({
    attribute: false,
  })
  cancelable = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 标签是否可以关闭
   */
  @property({
    type: Boolean,
  })
  closable: boolean;

  /**
   * @kind object
   * @required false
   * @default -
   * @description ant-design 相关配置项, [具体查阅](https://ant.design/components/tag-cn/#Tag) ，只有在 componentType=Tag 时才有效
   * @group advanced
   */
  @property({
    attribute: false,
  })
  configProps: Record<string, any>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 禁用标签的 tooltip
   * @group advanced
   */
  @property()
  disabledTooltip: string;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 标签的 tooltip 相关配置项, [具体查阅](https://ant.design/components/tooltip-cn/#API)
   * @group advanced
   */
  @property({
    attribute: false,
  })
  tooltipProps: TooltipProps;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 标签前的 label
   * @group advanced
   */
  @property()
  label: string;

  /**
   * @kind { label: string; key: string; icon?: string; tagList?: string; }
   * @required false
   * @default { label: "label", key: "key", icon: "icon"}
   * @description 这里可以规定从 dataSource 中的哪个字段取标签渲染的数据，例如 dataSource 返回的数据为 [{key:"1"},{key:"2"}]，则可写成 {label: "key", key: "key"}
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: {
    label: string;
    key: string;
    icon?: string;
    tagList?: string;
  } = {
    label: "label",
    key: "key",
    icon: "icon",
  };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 文字是否超出省略
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  textEllipsis: boolean;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 标签的自定义样式
   * @group advanced
   */
  @property({
    attribute: false,
  })
  tagStyle: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 标签选中的自定义样式
   * @group advanced
   */
  @property({
    attribute: false,
  })
  tagCheckedStyle: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 标签 Hover 的自定义样式
   * @group advanced
   */
  @property({
    attribute: false,
  })
  tagHoverStyle: Record<string, any>;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _getBrickTagNode(): React.ReactElement {
    const mutableProps = {
      tagList: this.tagList,
    };
    if (this.dataSource) {
      // eslint-disable-next-line no-console
      console.warn(
        "`dataSource` and `fields` of `<presentational-bricks.brick-tag>` are deprecated, use `transform` instead."
      );
      mutableProps.tagList = this.fields.tagList
        ? get(this.dataSource, this.fields.tagList)
        : this.dataSource;
    }
    this._initData(mutableProps);
    return (
      <BrickTag
        componentType={this.componentType}
        shape="default"
        tagList={mutableProps.tagList}
        configProps={this.configProps}
        textEllipsis={this.textEllipsis}
        tagStyle={this.tagStyle}
        handleOnChange={this._handleOnChange}
        handleOnClose={this._handleOnClose}
        handleOnClick={this._handleOnClick}
        tagCheckedStyle={this.tagCheckedStyle}
        tagHoverStyle={this.tagHoverStyle}
        multipleCheck={this.multipleCheck}
        label={this.label}
        defaultCheckedTag={this.default}
        showTagCircle={this.showTagCircle}
        color={this.color}
        closable={this.closable}
        disabledTooltip={this.disabledTooltip}
        cancelable={this.cancelable}
        tooltipProps={this.tooltipProps}
      />
    );
  }

  private _initData(mutableProps: {
    tagList: Record<string, any>[] | string[];
  }): void {
    mutableProps.tagList = map(mutableProps.tagList, (item) => {
      if (typeof item === "string") {
        return {
          label: item,
          key: item,
        };
      } else {
        return {
          ...(item as Record<string, any>),
          label: get(item, this.fields.label),
          key: get(item, this.fields.key),
          icon: get(item, this.fields.icon),
        };
      }
    });
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          {this.showCard ? (
            <Card>{this._getBrickTagNode()}</Card>
          ) : (
            this._getBrickTagNode()
          )}
        </BrickWrapper>,
        this
      );
    }
  }

  private _handleOnClose = (current, tagList: TagListType): void => {
    this.tagClose.emit({ current, tagList });
  };

  private _handleOnChange = (items: TagListType): void => {
    const checkedKeys = map(items, "key");
    const defaultAction = this.checkedUpdate.emit(checkedKeys);
    const defaultActionV2 = this.checkedUpdateV2.emit(items);

    if (defaultAction && defaultActionV2) {
      this.default = checkedKeys;
    }
  };

  private _handleOnClick = (tag: { label: string; key: string }): void => {
    this.tagClick.emit(tag);
  };
}

customElements.define("presentational-bricks.brick-tag", BrickTagElement);
