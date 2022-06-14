import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickDescriptions } from "./BrickDescriptions";
import { UseBrickConf } from "@next-core/brick-types";
import { Card } from "antd";
import { get, map } from "lodash";
import { DescriptionsProps } from "antd/lib/descriptions";
import { DescriptionsItemProps } from "antd/lib/descriptions/Item";
import styles from "./BrickDescriptions.module.css";

export interface BrickDescriptionsItemProps
  extends Partial<DescriptionsItemProps> {
  /**
   * 内容
   */
  text: string;
  id?: string;
  /**
   * 所属分组
   */
  group?: string;
  /**
   * 该 item 的 text 取自 dataSource 的哪个字段
   */
  field?: string;
  /**
   * 支持为某项自定义展示构件  [#UseBrickConf](#usebrickconf)
   */
  useBrick?: UseBrickConf;
  /**
   * [已废弃]自定义该 item 的展示构件
   */
  component?: {
    brick?: string;
    properties?: any;
  };
}

export type LayoutType = "horizontal" | "vertical";
export type SizeType = "default" | "middle" | "small";

/**
 * @id presentational-bricks.brick-descriptions
 * @name presentational-bricks.brick-descriptions
 * @docKind brick
 * @description 常用于概要信息的描述，2~3列
 * @author lynette
 * @slots
 * @history
 * 1.59.0:新增属性：`descriptionTitle`、`column`、`size`、`bordered`、`layout`
 * @memo
 * ### UseBrickConf
 *
 * | property      | type           | required | default | description                                        |
 * | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
 * | brick         | string         | true       | -       | 构件名称                                           |
 * | properties    | object         | -        | -       | 构件属性                                           |
 * | events        | BrickEventsMap | -        | -       | 事件                                               |
 * | transform     | string\|object | -        | -       | 属性数据转换                                       |
 * | transformFrom | string         | -        | -       | 属性数据转换来自数据源的哪个字段，不填则为整个数据 |
 * @noInheritDoc
 */
export class BrickDescriptionsElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 描述列表的标题，显示在最顶部
   */
  @property()
  descriptionTitle: string;

  /**
   * @kind BrickDescriptionsItemProps[]
   * @required true
   * @default -
   * @description 描述列表项，扩展自 ant-design DescriptionItem 相关配置项，额外扩展项如下，其他项查阅：[DescriptionItem](https://ant.design/components/descriptions-cn/#DescriptionItem)
   */
  @property({
    attribute: false,
  })
  itemList: BrickDescriptionsItemProps[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示卡片
   * @group ui
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind number|object
   * @required false
   * @default 3
   * @description 一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
   * @group ui
   */
  @property({
    attribute: false,
  })
  column: number;

  /**
   * @kind LayoutType
   * @required false
   * @default horizontal
   * @description 描述布局
   * @group ui
   */
  @property({
    attribute: false,
  })
  layout: LayoutType;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示边框
   * @group ui
   */
  @property({
    type: Boolean,
  })
  bordered: boolean;

  /**
   * @kind SizeType
   * @required false
   * @default -
   * @description 设置列表的大小。可以设置为 middle 、small, 或不填（只有设置 bordered={true} 生效）
   * @group ui
   */
  @property({
    attribute: false,
  })
  size: SizeType;

  /**
   * @kind DescriptionsProps
   * @required false
   * @default -
   * @description ant-design 相关配置项,具体查阅：[Descriptions](https://ant.design/components/descriptions-cn/#Descriptions)
   */
  @property({
    attribute: false,
  })
  configProps: DescriptionsProps;

  /**
   * @kind string[] | string
   * @required false
   * @default -
   * @description 设置需要隐藏的描述列表项。请先在 itemList 中定义列表项所属 group
   */
  @property({
    attribute: false,
  })
  hideGroups: string[] | string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @deprecated
   * @description [已废弃]数据来源，通常来源于后台
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

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

  // istanbul ignore next
  protected _getBrickDescriptionsNode(): React.ReactElement {
    const mutableProps = {
      itemList: this.itemList,
    };
    if (this.dataSource) {
      // eslint-disable-next-line no-console
      console.warn(
        "`dataSource` and `fields` of `<presentational-bricks.brick-descriptions>` are deprecated, use `transform` instead."
      );
      mutableProps.itemList = map(mutableProps.itemList, (item) => {
        return {
          ...item,
          ...(item.field ? { text: get(this.dataSource, item.field) } : {}),
        };
      });
    }
    return (
      <BrickDescriptions
        itemList={mutableProps.itemList}
        configProps={this.configProps}
        dataSource={this.dataSource}
        descriptionTitle={this.descriptionTitle}
        column={this.column}
        size={this.size}
        bordered={this.bordered}
        layout={this.layout}
        hideGroups={this.hideGroups}
      />
    );
  }

  protected _render(): void {
    if (this.isConnected) {
      // istanbul ignore next
      ReactDOM.render(
        <BrickWrapper>
          {this.showCard ? (
            <Card bordered={false} className={styles.descriptionCardWrapper}>
              {this._getBrickDescriptionsNode()}
            </Card>
          ) : (
            this._getBrickDescriptionsNode()
          )}
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-descriptions",
  BrickDescriptionsElement
);
