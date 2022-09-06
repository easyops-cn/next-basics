import React from "react";
import ReactDOM from "react-dom";

import {
  property,
  BrickWrapper,
  UpdatingElement,
  method,
} from "@next-core/brick-kit";
/**
 * @id basic-bricks.general-timer
 * @name basic-bricks.general-timer
 * @docKind brick
 * @description 启动一个定时发出指定事件的定时器
 * @author cyril
 * @slots
 * @history
 * 1.67.2:新增构件 `basic-bricks.general-timer`
 * @memo
 * @noInheritDoc
 */
export class GeneralTimerElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default general-timer.timing-event
   * @description 定时抛出的事件
   * @group basic
   */
  @property()
  eventName: string;

  /**
   * @kind number
   * @required false
   * @default 60000
   * @description 定时间隔（单位：ms）
   * @group basic
   */
  @property()
  interval: number;

  /**
   * @kind any
   * @required false
   * @default -
   * @description 抛出事件的数据
   * @group basic
   */
  @property()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _intervalId: any = null;

  private defaultEventName = "general-timer.timing-event";
  private defaultInterval = 60000;

  /**
   *
   * @description 停止timer
   */
  @method() stopTimer(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  /**
   *
   * @description 重启timer
   */
  @method() reStartTimer(): void {
    this.stopTimer();
    this.startTimeout();
  }

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }

    this.startTimeout();

    this._render();
  }

  disconnectedCallback(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
    ReactDOM.unmountComponentAtNode(this);
  }

  private startTimeout(): void {
    this._intervalId = setTimeout(() => {
      if (this.dataSource) {
        this.dispatchEvent(
          new CustomEvent(this.eventName || this.defaultEventName, {
            detail: this.dataSource,
          })
        );
      } else {
        this.dispatchEvent(
          new CustomEvent(this.eventName || this.defaultEventName)
        );
      }

      this.startTimeout();
    }, this.interval || this.defaultInterval);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <></>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-timer", GeneralTimerElement);
