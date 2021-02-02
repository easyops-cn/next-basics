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

  private iframe: HTMLIFrameElement;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
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
