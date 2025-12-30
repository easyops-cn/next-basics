import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { VariableList } from "./VariableList";

export interface VariableListElementProps {
  value: any[] | Record<string, any>;
  uninitializedVariables: string[];
  expand: boolean;
  ellipsis: boolean;
}

/**
 * @id flow-builder.variable-list
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `flow-builder.variable-list`
 * @docKind brick
 * @noInheritDoc
 */
export class VariableListElement extends UpdatingElement implements VariableListElementProps {
  @property({
    attribute: false,
  })
  value: any[] | Record<string, any>;

  @property({
    attribute: false,
  })
  uninitializedVariables: string[];

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
          <VariableList
            value={this.value}
            expand={this.expand}
            ellipsis={this.ellipsis}
            uninitializedVariables={this.uninitializedVariables}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.variable-list", VariableListElement);
