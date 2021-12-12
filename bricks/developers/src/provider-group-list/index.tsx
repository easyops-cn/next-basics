import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  NamespaceItem,
  ProviderGroupList,
  GroupItem,
} from "./ProviderGroupList";

/**
 * @id developers.provider-group-list
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `developers.provider-group-list`
 * @docKind brick
 * @noInheritDoc
 */

export class ProviderGroupListElement extends UpdatingElement {
  /**
   * @kind GroupItem
   * @required true
   * @default -
   * @description 分组列表
   */
  @property({
    attribute: false,
  })
  dataSource: NamespaceItem[];

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

  @event({ type: "group.click" }) groupClickEvent: EventEmitter<{
    namespace: string;
    group: GroupItem;
  }>;

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

  private _handlerClick = (namespace: string, group: GroupItem): void => {
    this.groupClickEvent.emit({ namespace, group });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ProviderGroupList
            dataSource={this.dataSource}
            containerStyle={this.containerStyle}
            onClick={this._handlerClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "developers.provider-group-list",
  ProviderGroupListElement
);
