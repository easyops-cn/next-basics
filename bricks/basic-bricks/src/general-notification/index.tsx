import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  property,
  UpdatingElement,
  event,
  EventEmitter,
  method,
  BrickAsComponent,
} from "@next-core/brick-kit";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { NotificationApi } from "antd/es/notification";
import type { UseBrickConf } from "@next-core/brick-types";

/**
 * @id basic-bricks.general-notification
 * @name basic-bricks.general-notification
 * @docKind brick
 * @description 普通的 notification
 * @author Alex
 * @slots
 * @history
 * 1.62.0:新增构件 `basic-bricks.general-notification`
 * @memo
 * @noInheritDoc
 */
interface DescriptionBrickprops {
  useBrick: UseBrickConf;
}
export class GeneralNotificationElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 通知提醒标题，必选
   * @group basic
   */
  @property()
  message: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 通知提醒内容，必选
   * @group basic
   */
  @property()
  description: string;

  /**
   * @kind DescriptionBrickprops
   * @required false
   * @default -
   * @description 自定义通知提醒内容
   * @group basic
   */
  @property({ attribute: false })
  descriptionBrick: DescriptionBrickprops;

  /**
   * @kind string
   * @required false
   * @default -
   * @description icon，具体查阅：[react icon](https://3x.ant.design/components/icon-cn/)
   * @group basic
   */
  @property()
  icon: string;

  /**
   * @kind `topLeft` `topRight` `bottomLeft` `bottomRight`
   * @required false
   * @default topRight
   * @description 弹出位置，可选
   * @group ui
   */
  @property()
  placement: NotificationPlacement;

  /**
   * @kind number
   * @required false
   * @default 4.5
   * @description 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
   * @group basic
   */
  @property({ type: Number })
  duration: number;

  /**
   * @required false
   * @default -
   * @description icon css 样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  iconStyle: CSSProperties;

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

  handleClose = () => {
    this.closeEvent.emit({});
  };

  handleClick = () => {
    this.clickEvent.emit({});
  };
  /**
   * @detail -
   * @description 点击通知时触发的回调函数
   */
  @event({ type: "general.notification.click" }) clickEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail -
   * @description 点击默认关闭按钮时触发的回调函数
   */
  @event({ type: "general.notification.close" }) closeEvent: EventEmitter<
    Record<string, any>
  >;
  renderIcon = () => {
    return this.icon && <LegacyIcon type={this.icon} style={this.iconStyle} />;
  };
  renderDescription = () => {
    return this.descriptionBrick ? (
      <BrickAsComponent {...this.descriptionBrick} />
    ) : (
      this.description
    );
  };
  /**
   *
   * @params `success` | `error` | `info` | `warning` | `warn` | `open`
   * @description  显示通知栏，默认为`open`
   */
  @method()
  open(mtd: keyof Omit<NotificationApi, "config" | "close" | "destroy">) {
    typeof mtd !== "string" && (mtd = "open");
    notification[mtd]({
      message: this.message,
      description: this.renderDescription(),
      duration: this.duration,
      icon: this.renderIcon(),
      placement: this.placement || "topRight",
      onClose: this.handleClose,
      onClick: this.handleClick,
    });
  }

  protected _render(): void {
    // Nothing to do.
  }
}

customElements.define(
  "basic-bricks.general-notification",
  GeneralNotificationElement
);
