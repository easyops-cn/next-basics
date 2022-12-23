import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  event,
  EventEmitter,
  property,
} from "@next-core/brick-kit";
import { BusinessRule, DataSource } from "./BusinessRule";

/**
 * @id form-builder.business-rule
 * @author frankshi
 * @history
 * 1.x.0: 新增构件 `form-builder.business-rule`
 * @docKind brick
 * @noInheritDoc
 */
export class BusinessRuleElement extends UpdatingElement {
  @property({ attribute: false })
  dataSource: DataSource[];

  @property({ attribute: false })
  eventDataSource: unknown;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  @event({ type: "form-builder.business-rule.edit" })
  editEvent: EventEmitter;
  businessEdit = (value: any): void => {
    this.editEvent.emit(value);
  };

  @event({ type: "form-builder.business-rule.delete" })
  deleteEvent: EventEmitter;
  businessDelete = (value: any): void => {
    this.deleteEvent.emit(value);
  };

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BusinessRule
            dataSource={this.dataSource}
            eventDataSource={this.eventDataSource}
            handleEdit={this.businessEdit}
            handleDelete={this.businessDelete}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("form-builder.business-rule", BusinessRuleElement);
