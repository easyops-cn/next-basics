import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CollapseInfoList } from "./CollapseInfoList";
import { UseBrickConf } from "@next-core/brick-types";
import { InfoDetail } from "./CollapseInfoList";

/**
 * @id presentational-bricks.collapse-info-list
 * @author dophjing
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.collapse-info-list`
 * @docKind brick
 * @noInheritDoc
 */
export class CollapseInfoListElement extends UpdatingElement {
  /**
   * @required true
   * @description 折叠项dataSource
   * @group basic
   */
  @property({
    attribute: false,
  })
  dataSource: InfoDetail[];

  /**
   * @detail string[]
   * @description -
   */
  @event({ type: "collapse-info-list.change" })
  collapseChange: EventEmitter<string[]>;

  handleChange = (key: string[]) => {
    this.collapseChange.emit(key);
  };

  /**
   * @required false
   * @description 折叠项titleBrick
   * @group ui
   */
  @property({
    attribute: false,
  })
  titleBrick: { useBrick: UseBrickConf };

  /**
   * @required false
   * @description 折叠项extraBrick
   * @group ui
   */
  @property({
    attribute: false,
  })
  extraBrick: { useBrick: UseBrickConf };

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
          <CollapseInfoList
            dataSource={this.dataSource}
            onChange={this.handleChange}
            titleBrick={this.titleBrick}
            extraBrick={this.extraBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.collapse-info-list",
  CollapseInfoListElement
);
