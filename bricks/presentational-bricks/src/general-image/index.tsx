import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralImage, GeneralImageProps } from "./GeneralImage";


export interface GeneralImageElementProps {
  imgSrc?: string;
  imgHeight?: string | number;
  imgStyle?: React.CSSProperties;
  imgWidth?: string | number;
  dataSource?: GeneralImageProps["dataSource"];
  placeholder?: string;
  imgAlt?: string;
  fallback?: string;
  extra?: GeneralImageProps["extra"];
  extraContainerStyle?: React.CSSProperties;
  visible?: boolean;
}

/**
 * @id presentational-bricks.general-image
 * @author Lynette
 * @history
 * 1.134.0: 新增构件 `presentational-bricks.general-image`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralImageElement extends UpdatingElement implements GeneralImageElementProps {
  /**
   * @default -
   * @required
   * @description 图片地址
   * @description.en Image URL
   */
  @property()
  imgSrc: string;

  /**
   * @default true
   * @required
   * @description 是否开启预览
   * @description.en Whether to enable preview
   */
  @property({
    attribute: false,
  })
  preview = true;

  /**
   * @default -
   * @required
   * @description 图像高度
   * @description.en Image height
   */
  @property({
    attribute: false,
  })
  imgHeight: string | number;

  /**
   * @default -
   * @required
   * @description 图像样式
   * @description.en Image style
   */
  @property({
    attribute: false,
  })
  imgStyle: React.CSSProperties;

  /**
   * @default -
   * @required
   * @description 图像宽度
   * @description.en Image width
   */
  @property({
    attribute: false,
  })
  imgWidth: string | number;

  /**
   * @kind Record<string, any>
   * @default -
   * @required -
   * @description 数据源，搭配 extra 使用时会把该数据传入到自定义构件中使用
   * @description.en Data source; when used together with extra, the data will be passed into the custom brick for use
   */
  @property({
    attribute: false,
  })
  dataSource: GeneralImageProps["dataSource"];

  /**
   * @default -
   * @required
   * @description 加载占位, 为 true 时使用默认占位
   * @description.en Loading placeholder; when it is true, the default placeholder is used
   * @group advanced
   */
  @property()
  placeholder: string;

  /**
   * @default -
   * @required
   * @description 图像描述
   * @description.en Image description
   * @group advanced
   */
  @property()
  imgAlt: string;

  /**
   * @default -
   * @required
   * @description 加载失败容错地址
   * @description.en Fallback URL when loading fails
   * @group advanced
   */
  @property()
  fallback: string;

  /**
   * @kind UseBrickConf
   * @default -
   * @required -
   * @description 支持在图片下方增加自定义构件
   * @description.en Support adding a custom brick below the image
   * @group advanced
   */
  @property({
    attribute: false,
  })
  extra: GeneralImageProps["extra"];

  /**
   * @kind Record<string, any>
   * @default -
   * @required -
   * @description 包裹自定义构件容器的样式
   * @description.en Style of the container wrapping the custom brick
   * @group advanced
   */
  @property({
    attribute: false,
  })
  extraContainerStyle: React.CSSProperties;

  /**
   * @default -
   * @required
   * @description 是否显示预览
   * @description.en Whether to display the preview
   * @group advanced
   */
  @property({ attribute: false }) visible: boolean;

  /**
   * @detail boolean
   * @description 是否显示预览改变事件
   * @description.en Event emitted when the preview visibility changes
   */
  @event({ type: "general-image.visible-change" })
  visibleChangeEventEmitter: EventEmitter;

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

  /**
   * @description 打开预览
   * @description.en Open the preview
   */
  @method() open(): void {
    this.visible = true;
  }

  /**
   * @description 关闭预览
   * @description.en Close the preview
   */
  @method() close(): void {
    this.visible = false;
  }

  private _handleVisibleChange = (visible: boolean): void => {
    this.visible = visible;
    this.visibleChangeEventEmitter.emit(visible);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralImage
            width={this.imgWidth}
            height={this.imgHeight}
            imgStyle={this.imgStyle}
            src={this.imgSrc}
            alt={this.imgAlt}
            preview={this.preview}
            placeholder={this.placeholder}
            fallback={this.fallback}
            dataSource={this.dataSource}
            extra={this.extra}
            extraContainerStyle={this.extraContainerStyle}
            visible={this.visible}
            onVisibleChange={this._handleVisibleChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-image",
  GeneralImageElement
);
