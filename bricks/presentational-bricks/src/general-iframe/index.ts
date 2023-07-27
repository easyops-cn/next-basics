import {
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";

const defaultStyle = {
  border: "0",
  margin: "0",
  width: "100%",
  minHeight: "calc(100vh - 56px)",
  verticalAlign: "top",
};

/**
 * @id presentational-bricks.general-iframe
 * @name 普通 iframe
 * @docKind brick
 * @description 可嵌入外部网站通用构件
 * @author jo
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class GeneralIframeElement extends UpdatingElement {
  /**
   * @detail any
   * @description iframe 加载完成时触发
   */
  @event({ type: "general-iframe.loaded" })
  generalIframeLoaded: EventEmitter<any>;

  /**
   * @detail any
   * @description iframe 接收到消息触发事件
   */
  @event({ type: "iframe.message" })
  iframeMessage: EventEmitter<unknown>;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 被嵌入网站的 url
   */
  @property()
  src: string;

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description iframe 相关样式
   */
  @property({
    attribute: false,
  })
  iframeStyle = {};

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否开启消息监听，开启后会收到消息会触发 iframe.message 事件
   */
  @property({
    type: Boolean,
  })
  enableMessageSubscribe: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 只对特定源接收信息，防止收到无相关的消息，不配置的话默认取的是 iframe.src 作为值
   */
  @property()
  messageOrigin: string;

  private iframe: HTMLIFrameElement;

  private onMessage = (event: MessageEvent): void => {
    // istanbul ignore else
    if (
      (this.messageOrigin && this.messageOrigin === event.origin) ||
      (!this.messageOrigin && event.origin === new URL(this.iframe.src).origin)
    ) {
      this.iframeMessage.emit(event.data);
    }
  };

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();

    if (this.enableMessageSubscribe) {
      window.addEventListener("message", this.onMessage);
    }
  }

  disconnectedCallback(): void {
    window.removeEventListener("message", this.onMessage);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected && this.src) {
      if (!this.iframe) {
        this.iframe = document.createElement("iframe");
        this.appendChild(this.iframe);

        this.iframe.addEventListener("load", () => {
          this.generalIframeLoaded.emit();
        });
      }

      Object.assign(this.iframe.style, defaultStyle, this.iframeStyle);
      this.iframe.src = this.src;
    }
  }
}

customElements.define(
  "presentational-bricks.general-iframe",
  GeneralIframeElement
);
