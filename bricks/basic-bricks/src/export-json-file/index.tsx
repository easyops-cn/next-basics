import React from "react";
import ReactDOM from "react-dom";
import { isObject } from "lodash";

import {
  property,
  BrickWrapper,
  UpdatingElement,
  handleHttpError,
  event,
  method,
  EventEmitter,
} from "@next-core/brick-kit";

/**
 * @id basic-bricks.export-json-file
 * @name basic-bricks.export-json-file
 * @docKind brick
 * @description 把数据导出为 JSON 文件
 * @author cyril
 * @slots
 * @history
 * 1.69.2:新增构件 `basic-bricks.export-json-file`
 * @memo
 * @noInheritDoc
 */
export class ExportJsonFileElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 导出的文件名
   * @group basic
   */
  @property()
  fileName: string;

  /**
   * @kind object | string
   * @required -
   * @default -
   * @description 	导出的文件数据
   * @group basic
   */
  @property({ attribute: false })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "none";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  /**
   * @params [{ detail: { fileName: string; data: object | string; } }]
   * @description 导出数据
   */
  @method()
  export(event: CustomEvent): void {
    const fileName = event.detail?.fileName ?? this.fileName;
    const data = event.detail?.data ?? this.data;

    if (this.isConnected) {
      const dataString = isObject(data) ? JSON.stringify(data) : data;

      try {
        const link = document.createElement("a");
        const blob = new Blob([dataString], {
          type: "text/plain",
        });
        link.download = fileName || "undefined";
        link.href = URL.createObjectURL(blob);
        link.click();
        this.success.emit();
      } catch (e) {
        handleHttpError(e);
        this.failed.emit();
      }
    }
  }
  /**
   * @description 导出文件成功
   */
  @event({ type: "json-file.export.success" }) success: EventEmitter;
  /**
   * @description 导出文件失败
   */
  @event({ type: "json-file.export.failed" }) failed: EventEmitter;
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

customElements.define("basic-bricks.export-json-file", ExportJsonFileElement);
