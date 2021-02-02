import React from "react";
import ReactDOM from "react-dom";
import { Card } from "antd";

import { UpdatingElement, property } from "@next-core/brick-kit";
import { BrickBook } from "./BrickBook/BrickBook";
import { Story, StoryDoc } from "@next-core/brick-types";

export class BrickBookElement extends UpdatingElement {
  @property()
  storyId: string;

  @property({
    type: Boolean,
  })
  notToSetPageTitle: boolean;

  @property()
  storyType: "brick" | "template";

  @property({
    attribute: false,
  })
  showCard = true;

  @property({
    attribute: false,
  })
  titleLinkEnabled = false;

  @property()
  titleLinkTarget: string;

  @property({ attribute: false })
  renderDocLink = true;

  @property({ attribute: false })
  brickDoc: StoryDoc | null;

  @property({ attribute: false })
  stories: Story[];

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.style.overflow = "hidden";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  attributeChangedCallback(): void {
    this._render();
  }

  protected _render(): void {
    const storyType = this.storyType as "template" | "brick";
    const storyId = this.storyId;
    if (this.isConnected && storyId && storyType) {
      if (this.showCard) {
        ReactDOM.render(
          <Card bordered={false}>
            <BrickBook
              storyId={storyId}
              stories={this.stories}
              brickDoc={this.brickDoc}
              storyType={storyType}
              renderDocLink={this.renderDocLink}
              titleLinkEnabled={this.titleLinkEnabled}
              titleLinkTarget={this.titleLinkTarget}
              notToSetPageTitle={this.notToSetPageTitle}
            />
          </Card>,
          this
        );
      } else {
        ReactDOM.render(
          <BrickBook
            storyId={storyId}
            stories={this.stories}
            storyType={storyType}
            brickDoc={this.brickDoc}
            renderDocLink={this.renderDocLink}
            titleLinkEnabled={this.titleLinkEnabled}
            titleLinkTarget={this.titleLinkTarget}
            notToSetPageTitle={this.notToSetPageTitle}
          />,
          this
        );
      }
    }
  }

  updateProperties(story: Story): void {
    this.storyType = story.type;
    this.storyId = story.storyId;
  }
}

customElements.define("developers.brick-book", BrickBookElement);
