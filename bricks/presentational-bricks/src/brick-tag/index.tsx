// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { BrickTag } from "./BrickTag";
import { Card, TooltipProps } from "antd";
import { Color, TagTypeProps, TagListType } from "../interfaces/brick-tag";
import { get, map } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";

export interface BrickTagElementProps {
  label?: string;
  tagList?: TagListType[] | string[];
  showTagCircle?: boolean;
  color?: string | Color;
  dataSource?: Record<string, any>;
  closable?: boolean;
  confirmBeforeClose?: boolean;
  componentType?: TagTypeProps;
  default?: string | string[];
  configProps?: Record<string, any>;
  disabledTooltip?: string;
  tooltipProps?: TooltipProps;
  fields?: {
    label: string;
    key: string;
    icon?: string;
    tagList?: string;
  }
  textEllipsis?: boolean;
  tagStyle?: React.CSSProperties;
  tagCheckedStyle?: React.CSSProperties;
  tagHoverStyle?: React.CSSProperties;
  afterBrick?: {
    useBrick: UseBrickConf;
  }
}

interface PendingClose {
  requestId: string;
  current: TagListType;
}

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
 * @noInheritDoc
 */
export class BrickTagElement extends UpdatingElement implements BrickTagElementProps {
  /**
   * @description 选中的 tag 的 key
   */
  @event({ type: "checked.update", cancelable: true })
  checkedUpdate: EventEmitter<string[]>;

  /**
   * @description 选中的 tag
   */
  @event({ type: "checked.update.v2", cancelable: true })
  checkedUpdateV2: EventEmitter<{ label: string; key: string }[]>;

  /**
   * @description 当前关闭的 tag 和剩余的tagList
   */
  @event({ type: "tag.close" }) tagClose: EventEmitter<{
    current: Record<string, any>;
    tagList: Record<string, any>[];
  }>;

  /**
   * @description 请求关闭的 tag 和关闭后的 tagList，可用于外部二次确认
   */
  @event({ type: "tag.close.confirm" }) tagCloseConfirm: EventEmitter<{
    current: Record<string, any>;
    tagList: Record<string, any>[];
    requestId: string;
  }>;

  /**
   * @detail TagListType
   * @description 当前点击的tag
   */
  @event({ type: "tag.click" }) tagClick: EventEmitter<TagListType>;

  /**
   * @description 标签前的 label
   * @group basic
   */
  @property()
  label?: string;

  /**
   * @description 标签列表
   * @group basic
   */
  @property({
    attribute: false,
  })
  tagList?: TagListType[] | string[];

  /**
   * @default false
   * @description 是否在标签内显示小圆点
   * @group basic
   */
  @property({
    type: Boolean,
  })
  showTagCircle?: boolean;

  /**
   * @description 是否显示卡片
   * @group basic
   */
  @property({
    attribute: false,
  })
  showCard? = true;

  /**
   * @description 标签的颜色配置，当 `componentType=Tag` 且 `closable!=true` 时才有效，除了提供内置八种主题色，也支持直接赋色值（如 `#f5f5f5`）使用
   * @group basic
   */
  @property()
  color?: string | Color;

  /**
   * @description 是否能多选，多选场景下右上角会有小圆点提示
   * @group basic
   */
  @property({
    attribute: false,
  })
  multipleCheck? = true;

  /**
   * @description 数据源，通过 useResolves 从后台接口获取
   * @deprecated
   * @group advanced
   */
  @property({
    attribute: false,
  })
  dataSource?: Record<string, any>;

  /**
   * @default false
   * @description 标签是否可以关闭
   * @group basic
   */
  @property({
    type: Boolean,
  })
  closable?: boolean;

  /**
   * @default false
   * @description 关闭标签前是否需要外部二次确认。开启后点击关闭会先触发 `tag.close.confirm`，确认后调用 `confirmClose` 才会真正关闭。
   * @group basic
   */
  @property({
    type: Boolean,
  })
  confirmBeforeClose?: boolean;

  /**
   * @default "Tag"
   * @description 组件类型，对应 ant-design 中的基本标签和可选中标签
   * @group advanced
   */
  @property({
    attribute: false,
  })
  componentType?: TagTypeProps;

  /**
   * @description componentType 为`CheckableTag`的时候默认选中的标签 key
   * @group advanced
   */
  @property({
    attribute: false,
  })
  default?: string | string[];

  /**
   * @description 标签是否可以取消单选，在 `componentType` 为 `CheckableTag` 且 `multipleCheck` 为 `false` 时生效。
   * @group advanced
   */
  @property({
    attribute: false,
  })
  cancelable? = true;

  /**
   * @description ant-design 相关配置项, [具体查阅](https://ant.design/components/tag-cn/#Tag) ，只有在 componentType=Tag 时才有效
   * @group advanced
   */
  @property({
    attribute: false,
  })
  configProps?: Record<string, any>;

  /**
   * @description 禁用标签的 tooltip
   * @group basic
   */
  @property()
  disabledTooltip?: string;

  /**
   * @description 标签的 tooltip 相关配置项, [具体查阅](https://ant.design/components/tooltip-cn/#API)
   * @group advanced
   */
  @property({
    attribute: false,
  })
  tooltipProps?: TooltipProps;

  /**
   * @description 这里可以规定从 dataSource 中的哪个字段取标签渲染的数据，例如 dataSource 返回的数据为 [{key:"1"},{key:"2"}]，则可写成 {label: "key", key: "key"}
   * @deprecated
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields?: {
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
   * @default false
   * @description 文字是否超出省略
   * @group ui
   */
  @property({
    type: Boolean,
  })
  textEllipsis?: boolean;

  /**
   * @description 标签的自定义样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  tagStyle?: React.CSSProperties;

  /**
   * @description 标签选中的自定义样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  tagCheckedStyle?: React.CSSProperties;

  /**
   * @description 标签 Hover 的自定义样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  tagHoverStyle?: React.CSSProperties;

  /**
   * @description 最后一个tag后面使用子构件，具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @group advanced
   */
  @property({
    attribute: false,
  })
  afterBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };

  private _closedKeys = new Set<string>();

  private _pendingCloseMap = new Map<string, PendingClose>();

  private _latestPendingCloseRequestId?: string;

  private _sourceTagList?: unknown;

  private _normalizedTagList: TagListType[] = [];

  private _normalizedTagListSignature?: string;

  private _closeRequestId = 0;

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
    let sourceTagList: unknown = this.tagList;
    if (this.dataSource) {
      // eslint-disable-next-line no-console
      console.warn(
        "`dataSource` and `fields` of `<presentational-bricks.brick-tag>` are deprecated, use `transform` instead."
      );
      sourceTagList = this.fields.tagList
        ? get(this.dataSource, this.fields.tagList)
        : this.dataSource;
      mutableProps.tagList = sourceTagList as Record<string, any>[];
    }
    this._initData(mutableProps);
    this._syncInternalCloseState(
      sourceTagList,
      mutableProps.tagList as TagListType[]
    );
    this._normalizedTagList = mutableProps.tagList as TagListType[];
    const tagList = this._getVisibleTagList();
    return (
      <BrickTag
        componentType={this.componentType}
        shape="default"
        tagList={tagList}
        configProps={this.configProps}
        textEllipsis={this.textEllipsis}
        tagStyle={this.tagStyle}
        handleOnChange={this._handleOnChange}
        handleOnClose={this._handleOnClose}
        handleOnCloseConfirm={this._handleOnCloseConfirm}
        handleOnClick={this._handleOnClick}
        tagCheckedStyle={this.tagCheckedStyle}
        tagHoverStyle={this.tagHoverStyle}
        multipleCheck={this.multipleCheck}
        label={this.label}
        defaultCheckedTag={this.default}
        showTagCircle={this.showTagCircle}
        color={this.color}
        closable={this.closable}
        confirmBeforeClose={this.confirmBeforeClose}
        disabledTooltip={this.disabledTooltip}
        cancelable={this.cancelable}
        tooltipProps={this.tooltipProps}
        afterBrick={this.afterBrick}
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

  private _handleOnClose = (current, tagList: TagListType[]): void => {
    this._commitClose(current, tagList);
  };

  private _handleOnCloseConfirm = (
    current: TagListType,
    tagList: TagListType[]
  ): void => {
    const requestId = String(++this._closeRequestId);
    this._pendingCloseMap.set(requestId, {
      requestId,
      current,
    });
    this._latestPendingCloseRequestId = requestId;
    this.tagCloseConfirm.emit({ current, tagList, requestId });
  };

  private _handleOnChange = (items: TagListType[]): void => {
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

  private _syncInternalCloseState(
    sourceTagList: unknown,
    tagList: TagListType[]
  ): void {
    const signature = JSON.stringify(map(tagList, "key"));
    if (
      sourceTagList !== this._sourceTagList ||
      signature !== this._normalizedTagListSignature
    ) {
      this._sourceTagList = sourceTagList;
      this._normalizedTagListSignature = signature;
      this._closedKeys.clear();
      this._pendingCloseMap.clear();
      this._latestPendingCloseRequestId = undefined;
    }
  }

  private _getVisibleTagList(): TagListType[] {
    return this._normalizedTagList.filter(
      (item) => !this._closedKeys.has(item.key)
    );
  }

  private _commitClose(current: TagListType): void {
    this._closedKeys.add(current.key);
    const tagList = this._getVisibleTagList();
    for (const [requestId, pendingClose] of this._pendingCloseMap) {
      if (pendingClose.current.key === current.key) {
        this._pendingCloseMap.delete(requestId);
      }
    }
    this._refreshLatestPendingCloseRequestId();
    this.tagClose.emit({ current, tagList });
    this._render();
  }

  /**
   * @params requestId
   * @description 确认关闭当前等待二次确认的标签。不传 requestId 时确认最近一次请求。
   */
  @method()
  confirmClose(requestId?: string): void {
    const pendingClose = this._getPendingClose(requestId);
    if (!pendingClose) {
      return;
    }
    this._pendingCloseMap.delete(pendingClose.requestId);
    this._commitClose(pendingClose.current);
  }

  /**
   * @params requestId
   * @description 取消关闭当前等待二次确认的标签。不传 requestId 时取消最近一次请求。
   */
  @method()
  cancelClose(requestId?: string): void {
    const pendingClose = this._getPendingClose(requestId);
    if (!pendingClose) {
      return;
    }
    this._pendingCloseMap.delete(pendingClose.requestId);
    if (pendingClose.requestId === this._latestPendingCloseRequestId) {
      this._refreshLatestPendingCloseRequestId();
    }
  }

  private _getPendingClose(requestId?: string): PendingClose | undefined {
    const resolvedRequestId = requestId || this._latestPendingCloseRequestId;
    return resolvedRequestId
      ? this._pendingCloseMap.get(resolvedRequestId)
      : undefined;
  }

  private _refreshLatestPendingCloseRequestId(): void {
    this._latestPendingCloseRequestId = Array.from(
      this._pendingCloseMap.keys()
    ).pop();
  }
}

customElements.define("presentational-bricks.brick-tag", BrickTagElement);
