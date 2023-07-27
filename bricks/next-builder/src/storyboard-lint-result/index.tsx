import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { StoryboardLintResult } from "./StoryboardLintResult";
import { StoryboardError } from "../data-providers/chunks/doLintStoryboard";

/**
 * @id next-builder.storyboard-lint-result
 * @author steve
 * @history
 * 1.205.0: 新增构件 `next-builder.storyboard-lint-result`
 * @docKind brick
 * @noInheritDoc
 */
export class StoryboardLintResultElement extends UpdatingElement {
  @property()
  projectId: string;

  @property()
  appId: string;

  @property({ attribute: false })
  errors: StoryboardError[];

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
          <StoryboardLintResult
            errors={this.errors}
            projectId={this.projectId}
            appId={this.appId}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.storyboard-lint-result",
  StoryboardLintResultElement
);
