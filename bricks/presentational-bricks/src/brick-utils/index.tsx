import { handleHttpError, UpdatingElement, method } from "@next-core/brick-kit";
import { message as m } from "antd";
import { MessageApi } from "antd/lib/message";
import { copyToClipboard } from "@next-libs/clipboard";
import i18next from "i18next";
import { K, NS_PRESENTATIONAL_BRICKS } from "../i18n/constants";

/**
 * @id presentational-bricks.brick-utils
 * @name presentational-bricks.brick-utils
 * @docKind brick
 * @description 在构件提供一些常用的工具函数可以直接方便使用
 * @author jo
 * @slots
 * @history
 * 1.74.0:新增方法 `copy`, `copyTargetProperty`
 * @memo
 * @noInheritDoc
 */
export class BrickUtilsElement extends UpdatingElement {
  handleHttpError(event: CustomEvent): void {
    // eslint-disable-next-line no-console
    console.warn(
      "Deprecated, please use action `handleHttpError` provided by next-core instead"
    );
    handleHttpError(event.detail);
  }

  message(method: keyof MessageApi, text: string): void {
    // eslint-disable-next-line no-console
    console.warn(
      "Deprecated, please use action `message.success/error/info/warn` provided by next-core instead"
    );
    m[method](text as any);
  }

  /**
   * @params string
   * @description 复制到系统粘贴
   */
  @method()
  copy(text: string): void {
    const success = copyToClipboard(text);
    if (success) {
      m.success(i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.COPIED}`));
    } else {
      m.error(i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.COPY_FAILED}`));
    }
  }

  /**
   * @params (target: string, property: string)
   * @description 找到目标 DOM, 复制其属性
   */
  @method()
  copyTargetProperty(target: string, property: string): void {
    const dom = document.querySelector(target) as any;
    let text;
    if (dom) {
      text = dom[property];
    }
    if (text) {
      this.copy(text);
    } else {
      m.warn(i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.NO_TEXT_TO_COPY}`));
    }
  }

  // istanbul ignore next
  protected _render(): void {
    // do nothing
  }
}

customElements.define("presentational-bricks.brick-utils", BrickUtilsElement);
