import React from "react";
import ReactDOM from "react-dom";
import { Card } from "antd";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import { BrickQuickEntries } from "./BrickQuickEntries";

export interface LinkProps {
  icon: MenuIcon;
  target: string;
  text: string;
}

/**
 * @id presentational-bricks.brick-quick-entries
 * @name presentational-bricks.brick-quick-entries
 * @docKind brick
 * @description 展示多个快捷入口
 * @author cyril
 * @slots
 * @history
 * 1.145.4:删除 `mode` 属性
 * 1.142.0:新增 `mode` 属性
 * 1.122.0:新增 `useBrick` 和 `containerStyle` 属性
 * 1.87.0:新增 `showCard` 属性
 * 1.84.0:新增 `useBricks` 属性
 * @memo
 *
 * ```typescript
 * declare type MenuIcon = AntdIcon | FaIcon | EasyopsIcon;
 *
 * interface AntdIcon {
 *   lib: "antd";
 *   type: string;
 *   theme?: ThemeType;
 * }
 *
 * interface FaIcon {
 *   lib: "fa";
 *   icon: IconName;
 *   prefix?: IconPrefix;
 * }
 *
 * interface EasyopsIcon {
 *   lib: "easyops";
 *   icon: string;
 *   category?: string;
 * }
 * ```
 *
 * @noInheritDoc
 */
export class BrickQuickEntriesElement extends UpdatingElement {
  /**
   * @kind number
   * @required false
   * @default 1
   * @description 列数
   */
  @property({
    attribute: false,
  })
  column = 1;

  /**
   * @kind number
   * @required false
   * @default 1
   * @description 行数
   */
  @property({
    attribute: false,
  })
  row = 1;

  /**
   * @kind LinkProps[]
   * @required false
   * @default []
   * @description 快捷入口设置
   */
  @property({
    attribute: false,
  })
  links: LinkProps[] = [];

  /**
   * @kind [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)
   * @required false
   * @default -
   * @description 使用的子构件配置
   */
  @property({ attribute: false })
  useBrick: UseBrickConf;

  /**
   * @kind any[]
   * @required false
   * @default -
   * @description 传递给子构件的数据，应与 `useBrick` 一一对应
   */
  @property({ attribute: false })
  data: any[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示卡片
   */
  @property({
    type: Boolean,
    attribute: false,
  })
  showCard = true;

  /**
   * @required false
   * @default -
   * @description 子项的容器的样式
   * @group advanced
   */
  @property({ attribute: false })
  containerStyle: React.CSSProperties;

  /**
   * @required false
   * @default "default"
   * @description （已废弃）值为 `multiCardGeneral`或 `multiCardNoLine`时为多卡片模式，`multiCardGeneral` 含分隔线，`multiCardNoLine` 无分隔线，样例见构件统计卡片 `general-charts.statistic-card`
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false })
  mode: "multiCardGeneral" | "multiCardNoLine" | "default" = "default";

  /**
   * @kind [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)
   * @required false
   * @default -
   * @description 使用的子构件配置（已废弃，请使用 useBrick 替代）
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false, __deprecated_and_for_compatibility_only: true })
  useBricks: UseBrickConf;

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const quickEntries = (
        <BrickQuickEntries
          row={this.row}
          column={this.column}
          links={this.links}
          useBricks={this.useBrick || this.useBricks}
          data={this.data}
          containerStyle={this.containerStyle}
          mode={this.mode}
        />
      );

      const elem = this.showCard ? (
        <Card
          bodyStyle={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: this.mode === "multiCardGeneral" ? "0" : "20px",
          }}
          style={{ height: "100%" }}
          hoverable={false}
          bordered={false}
        >
          {quickEntries}
        </Card>
      ) : (
        quickEntries
      );

      ReactDOM.render(<BrickWrapper>{elem}</BrickWrapper>, this);
    }
  }
}

customElements.define(
  "presentational-bricks.brick-quick-entries",
  BrickQuickEntriesElement
);
