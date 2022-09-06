import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { WorkbenchComponentSelect } from "./WorkbenchComponentSelect";
import { BrickOptionItem } from "../builder-container/interfaces";
import { Story } from "@next-core/brick-types";

/**
 * @id next-builder.workbench-component-select
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-component-select`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchComponentSelectElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  brickList: BrickOptionItem[];

  @property({
    attribute: false,
  })
  storyList: Story[];

  @property({ attribute: false })
  isShowSuggest: boolean;

  @event({ type: "action.click" })
  actionClickEmit: EventEmitter<{ type: string; data: any }>;

  private _handlerActionClick = (type: string, data: any): void => {
    this.actionClickEmit.emit({ type, data });
  };

  @event({ type: "on.drag" })
  onDragEmit: EventEmitter<{ isDrag: boolean }>;

  private _handleOnDrag = (isDrag: boolean): void => {
    this.onDragEmit.emit({
      isDrag,
    });
  };

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <WorkbenchComponentSelect
            brickList={this.brickList}
            storyList={this.storyList}
            isShowSuggest={this.isShowSuggest ?? true}
            onActionClick={this._handlerActionClick}
            onDrag={this._handleOnDrag}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-component-select",
  WorkbenchComponentSelectElement
);
