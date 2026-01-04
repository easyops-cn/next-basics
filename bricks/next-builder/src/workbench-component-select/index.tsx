import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import {
  ComponentSelectRef,
  WorkbenchComponentSelect,
} from "./WorkbenchComponentSelect";
import { BrickOptionItem } from "../builder-container/interfaces";
import { Story } from "@next-core/brick-types";

export interface WorkbenchComponentSelectProps {
  brickList?: BrickOptionItem[];
  storyList?: Story[];
  isShowSuggest?: boolean;
  currentBrick?: string;
  onActionClick?: (event: CustomEvent) => void;
  onOnDrag?: (event: CustomEvent) => void;
  onFeedbackClick?: (event: CustomEvent) => void;
  onInstructionsClick?: (event: CustomEvent) => void;
}

export interface WorkbenchComponentSelectElementProps {
  brickList?: BrickOptionItem[];
  storyList?: Story[];
  isShowSuggest?: boolean;
  currentBrick?: string;
  onActionClick?: (event: CustomEvent<{ type: string; data: any }>) => void;
  onOnDrag?: (event: CustomEvent<{ isDrag: boolean }>) => void;
  onFeedbackClick?: (event: CustomEvent<{ type: string }>) => void;
  onInstructionsClick?: (event: CustomEvent<{ type: string }>) => void;
}

/**
 * @id next-builder.workbench-component-select
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-component-select`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchComponentSelectElement extends UpdatingElement implements WorkbenchComponentSelectProps {
  private _selectRef = createRef<ComponentSelectRef>();

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

  @property({
    type: String,
  })
  currentBrick: string;

  @event({ type: "action.click" })
  actionClickEmit: EventEmitter<{ type: string; data: any }>;

  private _handlerActionClick = (type: string, data: any): void => {
    this.actionClickEmit.emit({ type, data });
  };

  @event({ type: "on.drag" })
  onDragEmit: EventEmitter<{ isDrag: boolean }>;

  @method()
  getSnippetByBrick(id: string): BrickOptionItem[] {
    return this._selectRef.current.getSnippetByBrick(id);
  }

  private _handleOnDrag = (isDrag: boolean): void => {
    this.onDragEmit.emit({
      isDrag,
    });
  };

  @event({ type: "feedback.click" })
  feedClickEmit: EventEmitter<{ type: string }>;

  private _handleFeedbackClick = (type: string): void => {
    this.feedClickEmit.emit({ type });
  };

  @event({ type: "instructions.click" })
  InstructionsEmit: EventEmitter<{ type: string }>;

  private _handleInstructionsClick = (type: string): void => {
    this.InstructionsEmit.emit({ type });
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
            ref={this._selectRef}
            brickList={this.brickList}
            storyList={this.storyList}
            currentBrick={this.currentBrick}
            isShowSuggest={this.isShowSuggest ?? true}
            onActionClick={this._handlerActionClick}
            onDrag={this._handleOnDrag}
            onFeedbackClick={this._handleFeedbackClick}
            onInstructionsClick={this._handleInstructionsClick}
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
