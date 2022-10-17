import {
  event,
  EventEmitter,
  method,
  UpdatingElement,
} from "@next-core/brick-kit";

/**
 * @id basic-bricks.event-agent
 * @author steve
 * @history
 * 1.171.0: 新增构件 `basic-bricks.event-agent`
 * @docKind brick
 * @noInheritDoc
 */
export class EventAgentElement extends UpdatingElement {
  /**
   * @detail `unknown`
   * @description 事件被触发。
   */
  @event({ type: "event.trigger" })
  private _eventTrigger: EventEmitter;

  /**
   * @description 触发一次事件，传递的参数为事件详情。
   */
  @method()
  trigger(detail: unknown): void {
    this._eventTrigger.emit(detail);
  }

  connectedCallback(): void {
    this.style.display = "none";
  }

  // istanbul ignore next
  protected _render(): void {
    // Do nothing.
  }
}

customElements.define("basic-bricks.event-agent", EventAgentElement);
