import {
  UpdatingElement,
  property,
  method,
  transformElementProperties,
} from "@next-core/brick-kit";
import { isObject } from "@next-core/brick-utils";
import { GeneralTransform } from "@next-core/brick-types";

/**
 * @id basic-bricks.transform-agent
 * @name basic-bricks.transform-agent
 * @docKind brick
 * @description 一个代理构件支持将一些构件的属性转换并赋值给其它构件
 * @author steve
 * @slots
 * @history
 * 1.21.0:新增构件 `basic-bricks.transform-agent`
 * @memo
 */
export class TransformAgentElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 目标构件的 css selector
   */
  @property()
  target: string;
  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description	目标构件是否为多个
   */
  @property({
    type: Boolean,
  })
  multiple: boolean;
  /**
   * @kind object
   * @required true
   * @default -
   * @description 数据来源的构件的字典，key 为数据的字段名，value 为来源构件的 css selector
   */
  @property({
    attribute: false,
  })
  source: Record<string, string>;
  /**
   * @kind GeneralTransform
   * @required true
   * @default -
   * @description 	属性数据转换配置，请参考[Transform 数据转换](http://docs.developers.easyops.cn/docs/brick-next/transform)
   */
  @property({
    attribute: false,
  })
  transform: GeneralTransform;

  protected _render(): void {
    // Do nothing
  }
  /**
   * @description 执行转换
   */
  @method()
  execute(): void {
    let targetElements: any[] = [];
    if (this.multiple) {
      targetElements = Array.from(document.querySelectorAll(this.target));
    } else {
      const found = document.querySelector(this.target);
      if (found !== null) {
        targetElements.push(found);
      }
    }

    if (targetElements.length === 0) {
      // eslint-disable-next-line no-console
      console.error("target not found:", this.target);
      return;
    }

    const sourceElements: Record<string, any> = {};
    if (isObject(this.source)) {
      for (const [name, selector] of Object.entries(this.source)) {
        const found = document.querySelector(selector);
        if (found !== null) {
          sourceElements[name] = found;
        } else {
          // eslint-disable-next-line no-console
          console.error("source not found:", selector);
        }
      }
    }

    for (const element of targetElements) {
      transformElementProperties(element, sourceElements, this.transform);
    }
  }
}

customElements.define("basic-bricks.transform-agent", TransformAgentElement);
