import {
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
  transformElementProperties,
} from "@next-core/brick-kit";
import { GeneralTransform } from "@next-core/brick-types";

/**
 * @id basic-bricks.script-brick
 * @name basic-bricks.script-brick
 * @docKind brick
 * @description 可自定义函数来转换数据，并将处理后的数据给到其他构件
 * @author alren
 * @slots
 * @history
 * 1.x36.0:新增方法 `sendNotify` 和事件 `data.true` 和 `data.false`
 * @memo
 >`sendNotify`使用场景
>
> 在编排的时候，如果想要动态根据某个条件来决定是否做某个事情，可以：
>
> 1. 在事件或`useResolve`中通过`properties`给`script-brick`的`data`设定标记位，注意不能用`execute`，因为`execute`不改变内部的 data 变量
> 2. 在`script-brick`根据所需绑定的`data.true`的事件或`data.false`事件
> 3. 执行`sendNotify`，则会根据`data`发送`data.true`或`data.false`事件，从而执行不同的绑定行为
 * @noInheritDoc
 */
export class ScriptBrickElement extends UpdatingElement {
  /**
   * @kind any
   * @required false
   * @default -
   * @description 可通过 useResolve 来更新 data 字段并执行，具体见第 2 个示例
   */
  @property({
    attribute: false,
  })
  data: any;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 自定义函数，入参为`data`，注意要`return`，如`return {'a': data.split('.')};"`
   */
  @property()
  fun: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 目标构件是否为多个，target 有值时生效
   */
  @property({
    type: Boolean,
  })
  multiple: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 目标构件，格式为`css selector`，如果不在这边填，也可以通过事件来给其他构件赋值
   */
  @property()
  target: string;

  /**
   * @kind `GeneralTransform`
   * @required false
   * @default -
   * @description 属性数据转换配置，请参考[Transform 数据转换](http://docs.developers.easyops.cn/docs/brick-next/transform)，当 target 有值时，可直接在此处做数据的转换，注意，如果`target`有值，`transform`也要填
   */
  @property({
    attribute: false,
  })
  transform: GeneralTransform;
  /**
   *
   * @param data
   * @description 透传给自定义函数的入参`data`，并发送`script.execute`事件，注意该函数不改变内部的 data 变量
   */
  async execute(data?: any): Promise<void> {
    let targetElements: any[] = [];
    if (this.target) {
      if (this.multiple) {
        targetElements = Array.from(document.querySelectorAll(this.target));
      } else {
        const found = document.querySelector(this.target);
        if (found !== null) {
          targetElements.push(found);
        }
      }
    }

    const AsyncFunction = Object.getPrototypeOf(async function () {
      /* do nothing */
    }).constructor;

    const fun = new AsyncFunction("data", this.fun).bind(this);

    const newData = await fun(data);

    for (const element of targetElements) {
      transformElementProperties(element, newData, this.transform);
    }
    // 也可以通过事件来传递
    this.scriptExecute.emit(newData);
  }
  /**
   * @description 根据内部 data 的值决定发送`data.true`或`data.false`事件
   */
  sendNotify(): void {
    if (this.data) {
      this.dataTrue.emit(this.data);
    } else {
      this.dataFalse.emit(this.data);
    }
  }
  /**
   * @detail any
   * @description 自定义函数`fun`返回的值
   */
  @event({ type: "script.execute" }) scriptExecute: EventEmitter;
  /**
   * @detail any
   * @description 自定义函数`fun`返回的值
   */
  @event({ type: "data.true" }) dataTrue: EventEmitter;
  /**
   * @detail any
   * @description 自定义函数`fun`返回的值
   */
  @event({ type: "data.false" }) dataFalse: EventEmitter;
  connectedCallback(): void {
    this._render();
  }

  protected _render(): void {
    if (this.isConnected && this.data) {
      this.execute(this.data);
    }
  }
}

customElements.define("basic-bricks.script-brick", ScriptBrickElement);
