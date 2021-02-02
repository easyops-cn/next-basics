import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralCard, OperationButton } from "./GeneralCard";
import style from "./index.shadow.less";
import { CardProps } from "antd/lib/card";
import { isEmpty } from "lodash";

/**
 * @id basic-bricks.general-card
 * @name basic-bricks.general-card
 * @docKind brick
 * @description 常见于为多个构件提供统一的卡片容器，比如将搜索框与表格放在一起
 * @author lynette
 * @slots
 * content:内容插槽
 * extra:右上角操作区插槽，使用时请设置 hasExtraSlot 为 true
 * titleSuffix:标题后缀的插槽
 * footer:底部插槽，当底部滚动到窗口外时，默认固定在窗口底部，适用场景参考 http://192.168.100.162/next/resource-events/alert-config/inhibition-rule/create，其他情况，请设置`isFixedFooter`为false；
 * @history
 * 1.42.0:新增属性 `fillVertical`
 * @memo
 * ```typescript
 *  export interface OperationButton {
 *     // to listen for
 *     id: string;
 *     eventName: string;
 *     configProps: ButtonProps;
 *     text?: string;
 *    needData?: boolean;
 *   }
 *   ```
 * @noInheritDoc
 */
export class GeneralCardElement extends UpdatingElement {
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否右上角有操作区 slot
   */
  @property({
    type: Boolean,
  })
  hasExtraSlot: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片标题
   */
  @property()
  cardTitle: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 设置该属性后，设置卡片高度为 100%，卡片高度会自动撑满父容器
   */
  @property({
    type: Boolean,
  })
  fillVertical: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 设置该属性后，卡片内容区的元素自动垂直居中
   */
  @property({
    type: Boolean,
  })
  verticalCenter: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description footer滚动到窗口外时，是否需要将footer固定在窗口底部
   */
  @property({
    attribute: false,
  })
  isFixedFooter = true;

  private _mountPoint: HTMLElement;
  private _shadowRoot: ShadowRoot;
  private _operationBtns: OperationButton[] = [];
  private idEventNameMap: Map<string, string> = new Map();
  private eventDetailMap: Map<string, any> = new Map();
  private hasFooter: boolean;
  private _getFooterSlot(): HTMLSlotElement {
    return this.shadowRoot.querySelector("#footerSlot") as HTMLSlotElement;
  }
  private _checkFooterSlot = (): void => {
    const footerSlot = this._getFooterSlot();
    if (footerSlot) {
      this.hasFooter = footerSlot.assignedNodes().length > 0;
    }
  };
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this._shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");

    this._shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    if (this.fillVertical) {
      this._mountPoint.style.height = "100%";
    }
    this.listenOnClick();
    this._render();
  }

  listenOnClick() {
    this.addEventListener("click", (e) => {
      const paths = e.composedPath() as HTMLElement[];
      for (const path of paths) {
        if (path.nodeName.toLowerCase() === "#document-fragment") {
          break;
        }
        if (
          path.nodeName.toLowerCase() === "button" &&
          this.idEventNameMap.has(path.id)
        ) {
          this.emitEvent(this.idEventNameMap.get(path.id));
          break;
        }
      }
    });
  }

  dealCustomEvent(event: CustomEvent) {
    this.eventDetailMap.set(event.type, event.detail);
    for (const button of this._operationBtns) {
      if (button.eventName === event.type && button.needData) {
        button.configProps.disabled = isEmpty(event.detail);
      }
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  protected _render(): void {
    if (this.isConnected) {
      for (const button of this.operationButtons) {
        this.idEventNameMap.set(button.id, button.eventName);
        if (button.needData) {
          button.configProps.disabled = true;
        }
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCard
            configProps={this.configProps}
            operationButtons={this.operationButtons}
            hasExtraSlot={this.hasExtraSlot}
            cardTitle={this.cardTitle}
            fillVertical={this.fillVertical}
            verticalCenter={this.verticalCenter}
            isFixedFooter={this.isFixedFooter}
          />
        </BrickWrapper>,
        this._mountPoint,
        () => {
          const footerSlot = this._getFooterSlot();
          if (footerSlot) {
            this._checkFooterSlot();
            footerSlot.addEventListener("slotchange", this._checkFooterSlot);
          }
        }
      );
    }
  }

  emitEvent(eventName: string) {
    const detail = this.eventDetailMap.get(eventName) || {};
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * @kind map
   * @required false
   * @default -
   * @description 完全透传给 antd 的 Card 属性，详见：[https://ant.design/components/card-cn/#Card](https://ant.design/components/card-cn/#Card)
   */
  @property({ attribute: false }) configProps: CardProps;

  /**
   * @kind OperationButton[]
   * @required false
   * @default -
   * @description 右上角的操作按钮列表，可自定义指定该按钮的名字，并配置该按钮点击后发出的事件，在 storyboard 去监听该事件传给目标
   */
  @property({ attribute: false }) operationButtons: OperationButton[] = [];
}

customElements.define("basic-bricks.general-card", GeneralCardElement);
