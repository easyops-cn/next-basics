import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { Badge } from "@next-libs/basic-components";
import { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import styles from "./GeneralBadge.module.css";

/**
 * @id presentational-bricks.general-badge
 * @author Jimmy
 * @history
 * 1.0.0: 新增构件 `presentational-bricks.general-badge`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralBadgeElement extends UpdatingElement {
  /**
   * @kind string | { useBrick: UseBrickConf, dataSource?: any }
   * @required false
   * @default -
   * @description 文字内容，可以使用自定义构件来做复杂的展示。不设置时单独使用徽标。
   */
  @property({
    attribute: false,
  })
  content: string | { useBrick: UseBrickConf; dataSource?: any };

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 在内容中使用Icon
   */
  @property({
    attribute: false,
  })
  contentIcon: MenuIcon;

  /**
   * @required false
   * @default false
   * @description 数据源，content 的数据默认来自都来自于此，也可以在content中单独设置数据源。
   */
  @property({
    attribute: false,
  })
  dataSource: any;

  /**
   * @kind Color
   * @required false
   * @default red
   * @description 徽标的颜色
   */
  @property({
    attribute: false,
  })
  color = "red";

  /**
   * @required false
   * @default -
   * @description 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
   */
  @property({
    attribute: false,
  })
  count = 0;

  /**
   * @required false
   * @default 99
   * @description 展示封顶的数字值
   */
  @property({
    attribute: false,
  })
  overflowCount = 99;

  /**
   * @required false
   * @default false
   * @description 不展示数字，只有一个小圆点.
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  dot: boolean;

  /**
   * @kind [number, number]
   * @required false
   * @default -
   * @description 设置状态点的位置偏移，格式为 [x, y]
   * @group advanced
   */
  @property({
    attribute: false,
  })
  offset: [number, number];

  /**
   * @required false
   * @default false
   * @description 当数值为 0 时，是否展示徽标
   */
  @property({
    type: Boolean,
  })
  showZero: boolean;

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <div className={styles.generalBadge}>
            <Badge
              dataSource={this.dataSource}
              content={this.content}
              count={this.count}
              overflowCount={this.overflowCount}
              color={this.color}
              dot={this.dot}
              offset={this.offset}
              showZero={this.showZero}
              contentIcon={this.contentIcon}
            />
          </div>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-badge",
  GeneralBadgeElement
);
