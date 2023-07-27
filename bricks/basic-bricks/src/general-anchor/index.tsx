import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralAnchor } from "./GeneralAnchor";
import { AnchorLinkProps, AnchorProps } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
export interface AnchorListType extends AnchorLinkProps {
  /* 其他参数请参考 https://ant.design/components/anchor-cn/#Link-Props */
  title: string;
  href: string;
  target?: string;
  children?: AnchorListType[];
}

/**
 * @id basic-bricks.general-anchor
 * @author astrid
 * @history
 * 1.138.0: 新增构件 `basic-bricks.general-anchor`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralAnchorElement extends UpdatingElement {
  /**
   * @kind `AnchorListType[]`
   * @required true
   * @default -
   * @description 锚点链接的list,会根据list的结构渲染出对应的锚点排布
   * @group basic
   */
  @property({
    attribute: false,
  })
  anchorList: AnchorListType[];

  /**
   * @kind `AnchorProps`
   * @required false
   * @default -
   * @description 锚点的具体参数，这里offsetTop设置了默认为`56`，其他参数可参考[antd](https://ant.design/docs/react/use-in-typescript-cn#Anchor-Props)
   * @group basic
   */
  @property({
    attribute: false,
  })
  configProps: AnchorProps;

  /**
   * @kind `"default" | "radio"`
   * @required false
   * @default default
   * @description 锚点的类型 ， `radio` 的类型不支持 `anchorList`属性有`children`，否则会样式有问题
   * @group basic
   */
  @property({
    attribute: false,
  })
  type: "default" | "radio";
  /**
   * @kind `{ useBrick: UseBrickConf }`
   * @required false
   * @default  -
   * @description 右上角有操作区
   * @group basic
   */
  @property({ attribute: false })
  extraBrick: { useBrick: UseBrickConf };

  /**
   * @default false
   * @required false
   * @description 禁用默认跳转事件
   * @group basic
   */
  @property({ type: Boolean })
  disabledJump: boolean;
  /**
   * @default
   * @required false
   * @description 页面初始化时希望额外向上滚动的距离，例如在target有较大padding但是希望内容显示在上方时可设置。
   * @group ui
   */
  @property({ attribute: false })
  initOffset: number;
  /**
   * @detail { title: string; href: string }
   * @description 锚点点击事件
   */
  @event({ type: "anchor.click" })
  anchorClick: EventEmitter<Record<string, any>>;
  private _handleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    item: AnchorListType
  ): void => {
    event.stopPropagation();
    if (this.disabledJump) {
      event.preventDefault();
    }
    this.anchorClick.emit(item);
  };

  /**
   * @detail { currentActiveLink: string }
   * @description 锚点改变事件
   */
  @event({ type: "anchor.change" })
  anchorChange: EventEmitter<Record<string, any>>;
  private _handleChange = (currentActiveLink: string): void => {
    this.anchorChange.emit({ currentActiveLink });
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
          <GeneralAnchor
            anchorList={this.anchorList}
            configProps={this.configProps}
            type={this.type || "default"}
            extraBrick={this.extraBrick}
            handleClick={this._handleClick}
            handleChange={this._handleChange}
            initOffset={this.initOffset}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-anchor", GeneralAnchorElement);
