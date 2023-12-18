import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  event,
  EventEmitter,
  property,
} from "@next-core/brick-kit";
import { PollAnnounce } from "./PollAnnounce";

export class PollAnnounceElement extends UpdatingElement {
  @property({ type: Boolean })
  pollDisabled: boolean;

  @property({ attribute: false })
  realTimeMessage: any;

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

  /**
   * @detail -
   * @description
   */
  @event({ type: "notification.open" }) openEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail -
   * @description
   */
  @event({ type: "notification.close" }) closeEvent: EventEmitter<
    Record<string, any>
  >;

  handleOpen = () => {
    this.openEvent.emit({});
  };

  handleClose = () => {
    this.closeEvent.emit({});
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <PollAnnounce
            handleClose={this.handleClose}
            handleOpen={this.handleOpen}
            pollDisabled={this.pollDisabled}
            realTimeMessage={this.realTimeMessage}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("nav-legacy.poll-announce", PollAnnounceElement);
