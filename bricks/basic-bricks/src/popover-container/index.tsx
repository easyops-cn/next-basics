import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { PopoverContainer } from "./PopoverContainer";
import { UseBrickConf, MenuIcon } from "@next-core/brick-types";
import { TooltipPlacement } from "antd/lib/tooltip";
import { ActionType } from "rc-trigger/lib/interface";

/**
 * @id basic-bricks.popover-container
 * @name basic-bricks.popover-container
 * @docKind brick
 * @description 可以配置显示构件和弹出框构件，常用于快速编辑和详情展示
 * @author lynette
 * @slots
 * @history
 * 1.39.0:新增属性 `triggerByIcon`,`showIcon`
 * 1.33.0:新增构件 `basic-bricks.popover-container`
 * @memo
 * ### CustomBrick

* | property | type         | required | default | description              |
* | -------- | ------------ | -------- | ------- | ------------------------ |
* | useBrick | UseBrickConf | ✔️       | -       | 自定义构件               |
* | data     | any          | -        | -       | 数据，优先级高于整体数据 |

### UseBrickConf

* | property      | type           | required | default | description                                        |
* | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
* | brick         | string         | ✔️       | -       | 构件名称                                           |
* | properties    | object         | -        | -       | 构件属性                                           |
* | events        | BrickEventsMap | -        | -       | 事件                                               |
* | transform     | string\|object | -        | -       | 属性数据转换                                       |
* | transformFrom | string         | -        | -       | 属性数据转换来自数据源的哪个字段，不填则为整个数据 |
 * @noInheritDoc
 */
export class PopoverContainerElement extends UpdatingElement {
  // 整体数据，可以配置整体数据，也可以单独配置数据
  /**
   * @kind any
   * @required false
   * @default false
   * @description 整体数据，如果展示构件和弹出框构件数据都来自于同一个 provider，可以直接配置 data，如果来源不一样，可以分别配置 CustomBrick.data
   */
  @property({
    attribute: false,
  })
  data: any;

  /**
   * @kind CustomBrick
   * @required true
   * @default -
   * @description 展示构件
   */
  @property({
    attribute: false,
  })
  displayBrick: {
    useBrick: UseBrickConf;
    data?: any;
  };

  /**
   * @kind hover\|click
   * @required false
   * @default click
   * @description 触发行为
   */
  @property({
    attribute: false,
  })
  triggerByIcon = true;

  /**
   * @kind "always"\|"hover"\|"never"
   * @required false
   * @default hover
   * @description 在什么时候显示 Icon
   */
  @property({
    attribute: false,
  })
  showIcon: "always" | "never" | "hover" = "hover";

  /**
   * @kind CustomBrick
   * @required true
   * @default -
   * @description 弹出框构件
   */
  @property({
    attribute: false,
  })
  popoverBrick: {
    useBrick: UseBrickConf;
    data?: any;
  };

  /**
   * @kind {useBrick:UseBrickConf;data?:any}
   * @required false
   * @default false
   * @description 弹出框是否可见
   */
  @property({
    type: Boolean,
  })
  visible: boolean;

  /**
   * @kind MenuIcon
   * @required false
   * @default { lib: "fa", icon: "pencil-alt", prefix: "fas" }
   * @description 触发弹出框的 icon [MenuIcon]((http://docs.developers.easyops.cn/docs/brick-next/icon))
   */
  @property({
    attribute: false,
  })
  popoverIcon: MenuIcon;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示 popover 的默认背景
   */
  @property({
    attribute: false,
  })
  showPopoverBg = true;

  /**
   * @kind top\|left\|right\|bottom\|topLeft\|topRight\|bottomLeft\|bottomRight\|leftTop\|leftBottom\|rightTop\|rightBottom
   * @required false
   * @default bottom
   * @description 气泡框位置。注意设置该属性的时候可能需要调整`popoverContentStyle`。
   */
  @property({
    attribute: false,
  })
  placement: TooltipPlacement;

  @property({
    attribute: false,
  })
  trigger: ActionType | ActionType[];

  /**
   * @kind Record<string,any>
   * @required false
   * @default {width:200px}
   * @description popover 内容区域的样式，默认给了 200 的宽度。由于我们的弹出框拥有自定义构件的能力，在第一次点击之前，popover 是不知道所渲染构件的宽高，可能发生错位的问题。可以通过设置宽高来解决问题。注意，根据不同的`placement`需要按需调整宽度/高度。[详见](https://github.com/ant-design/ant-design/issues/3545)
   */
  @property({
    attribute: false,
  })
  popoverContentStyle: Record<string, any>;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否高亮，由[general-graph](developers/brick-book/brick/graph.general-graph)构件设置。
   */
  @property({
    attribute: false,
  })
  highlighted: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否被关联，由[general-graph](developers/brick-book/brick/graph.general-graph)构件设置。
   */
  @property({
    attribute: false,
  })
  related: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否弱化，由[general-graph](developers/brick-book/brick/graph.general-graph)构件设置。
   */
  @property({
    attribute: false,
  })
  faded: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否透传拓扑视图的高亮相关属性给子展示构件。由于该构件常用于[general-graph](developers/brick-book/brick/graph.general-graph)构件，故特别增设该属性。开启之后将会透传highlighted(高亮节点)/related(关联节点)/faded(淡化节点)三个属性给子展示构件，以实现高亮功能。
   */
  @property({
    type: Boolean,
  })
  transferGraphAttrs: boolean;

  connectedCallback(): void {
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
   * @detail {visible:boolean}
   * @description 弹出框`是否可见`变化触发的事件
   */
  @event({ type: "visible.change" }) visibleChange: EventEmitter;
  private _handleVisibleChange = (visible: boolean): void => {
    this.visible = visible;
    this.visibleChange.emit({ visible });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <PopoverContainer
            displayBrick={this.displayBrick}
            popoverBrick={this.popoverBrick}
            visible={this.visible}
            onVisibleChange={this._handleVisibleChange}
            data={this.data}
            popoverIcon={this.popoverIcon}
            placement={this.placement}
            showPopoverBg={this.showPopoverBg}
            popoverContentStyle={this.popoverContentStyle}
            trigger={this.trigger}
            triggerByIcon={this.triggerByIcon}
            showIcon={this.showIcon}
            highlighted={this.highlighted}
            related={this.related}
            faded={this.faded}
            transferGraphAttrs={this.transferGraphAttrs}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.popover-container",
  PopoverContainerElement
);
