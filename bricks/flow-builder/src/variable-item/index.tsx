import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { VariableItem } from "./VariableItem";
import { UseBrickConf } from "@next-core/brick-types";

/**
 * @id flow-builder.variable-item
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `flow-builder.variable-item`
 * @docKind brick
 * @noInheritDoc
 */
export class VariableItemElement extends UpdatingElement {
  @property() propName: string;

  @property({
    attribute: false,
  })
  labelBrick: {
    useBrick: UseBrickConf;
  };

  @property({
    attribute: false,
  })
  propValue: any;

  @property({
    type: Boolean,
  })
  standalone: boolean;

  @property({
    type: Boolean,
  })
  expand: boolean;

  @property({
    attribute: false,
  })
  ellipsis = true;

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
          <VariableItem
            propName={this.propName}
            propValue={this.propValue}
            labelBrick={this.labelBrick}
            standalone={this.standalone}
            expand={this.expand}
            ellipsis={this.ellipsis}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.variable-item", VariableItemElement);
