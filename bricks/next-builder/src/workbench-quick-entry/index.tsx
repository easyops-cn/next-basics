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
  WorkbenchQuickEntry,
  listItem,
  historyProps,
} from "./WorkbenchQuickEntry";

/**
 * @id next-builder.workbench-quick-entry
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-quick-entry`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchQuickEntryElement extends UpdatingElement {
  @property({ type: String })
  entryTitle: string;

  @property({ attribute: false })
  entryList: Array<listItem>;

  @property({ attribute: false })
  history: historyProps;

  @property({ type: Boolean })
  showMoreButton: boolean;

  @property({ type: String })
  moreButtonText: string;

  @property({ type: Boolean })
  showThumbnails: boolean;

  @property({ type: Number })
  thumbnailWidth: number;

  @property({ type: Number })
  thumbnailHeight: number;

  @event({ type: "more.button.click" })
  private _moreButtonClick: EventEmitter;

  private _handleMoreButtonClick = (): void => {
    this._moreButtonClick.emit();
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
          <WorkbenchQuickEntry
            entryTitle={this.entryTitle}
            entryList={this.entryList}
            history={this.history}
            showMoreButton={this.showMoreButton}
            moreButtonText={this.moreButtonText}
            showThumbnails={this.showThumbnails}
            thumbnailWidth={this.thumbnailWidth}
            thumbnailHeight={this.thumbnailHeight}
            onMoreButtonClick={this._handleMoreButtonClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-quick-entry",
  WorkbenchQuickEntryElement
);
