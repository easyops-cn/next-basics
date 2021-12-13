import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { ProviderGroupMenu } from "./ProviderGroupMenu";

/**
 * @id developers.provider-group-menu
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `developers.provider-group-menu`
 * @docKind brick
 * @noInheritDoc
 */
export class ProviderGroupMenuElement extends UpdatingElement {
  /**
   * @kind string[]
   * @required true
   * @default -
   * @description 分类列表
   */
  @property({
    attribute: false,
  })
  itemList: string[];

  /**
   * @kind object
   * @required false
   * @default -
   * @description 容器样式
   */
  @property({
    attribute: false,
  })
  containerStyle: React.CSSProperties;

  /**
   * @detail -
   * @description 折叠/展开触发的事件
   */
  @event({ type: "menu.fold" })
  menuFoldEvent: EventEmitter<boolean>;

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

  private _handleFold = (fold: boolean): void => {
    this.menuFoldEvent.emit(fold);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ProviderGroupMenu
            containerStyle={this.containerStyle}
            itemList={this.itemList}
            onFold={this._handleFold}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "developers.provider-group-menu",
  ProviderGroupMenuElement
);
