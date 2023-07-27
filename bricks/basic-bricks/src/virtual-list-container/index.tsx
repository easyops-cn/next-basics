import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { VirtualListContainer2 } from "./VirtualListContainer";
export interface itemData {
  list: Record<string, any>[];
  page_size?: number | string;
  page?: number | string;
}
export interface VirtualListContainerProps {
  data: Record<string, any>[];
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  oHeight: string;
  onScrollData?: any;
  total?: number;
}

export class VirtualListContainerElement extends UpdatingElement {
  /**
   * @kind ItemData
   * @required true
   * @default -
   * @description 列表数据
   * @group basic
   */
  @property({ attribute: false })
  data: VirtualListContainerProps["data"];
  /**
   * @kind {useBrick:UseBrickConf}
   * @required true
   * @default -
   * @description 列表项标题位置，相关类型[UseBrickConf](/next-docs/docs/api-reference/brick-types.usebrickconf)
   * @group basic
   */
  @property({ attribute: false })
  titleBrick: VirtualListContainerProps["titleBrick"];
  /**
   * @kind {useBrick:UseBrickConf}
   * @required false
   * @default -
   * @description 列表项 extra 位置（右边），相关类型[UseBrickConf](/next-docs/docs/api-reference/brick-types.usebrickconf)
   * @group basic
   */
  @property({ attribute: false })
  suffixBrick: VirtualListContainerProps["suffixBrick"];

  @property({ attribute: false })
  total: number;

  @property({ attribute: false })
  oHeight: string;

  ref: React.RefObject<any>;

  constructor() {
    super();
    this.ref = React.createRef();
  }

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

  /* istanbul ignore next */
  showVirtualList = (): void => {
    if (this.ref.current) {
      this.ref.current.refreshDomHeight();
    }
  };

  @event({ type: "basic-bricks.scroll" }) scrollEvent: EventEmitter<any>;
  private _onScrollData = () => {
    this.scrollEvent.emit();
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <VirtualListContainer2
            ref={this.ref}
            data={this.data}
            titleBrick={this.titleBrick}
            suffixBrick={this.suffixBrick}
            oHeight={this.oHeight}
            onScrollData={this._onScrollData}
            total={this.total}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.virtual-list-container",
  VirtualListContainerElement
);
