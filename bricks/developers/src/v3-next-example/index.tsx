import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  event,
  property,
  EventEmitter,
} from "@next-core/brick-kit";
import { V3NextExample } from "../components/v3/V3NextExample/V3NextExample";

export class V3NextExampleElement extends UpdatingElement {
  @property()
  type: string;

  @property()
  code: string;

  @property()
  altCode: string;

  @property({ type: Boolean })
  gap?: boolean;

  @event({ type: "on.blur" })
  onBlurEvent: EventEmitter<{ code: string; mode: string }>;

  private handleBlur = (code: string, mode: string): void => {
    this.onBlurEvent.emit({ code, mode });
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
          <V3NextExample
            code={this.code}
            type={this.type}
            altCode={this.altCode}
            gap={this.gap}
            onBlur={this.handleBlur}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("developers.v3-next-example", V3NextExampleElement);
