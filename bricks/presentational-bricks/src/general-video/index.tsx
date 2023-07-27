import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralVideo } from "./GeneralVideo";

/**
 * @id presentational-bricks.general-video
 * @name presentational-bricks.general-video
 * @docKind brick
 * @description 播放视频或预览视频
 * @author alren
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class GeneralVideoElement extends UpdatingElement {
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
   * @kind string
   * @required true
   * @default -
   * @description 视频的链接地址
   */
  @property()
  source: string;

  /**
   * @kind bool
   * @required true
   * @default -
   * @description 预览模式还是播放模式
   */
  @property({
    type: Boolean,
  })
  preview: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 预览模式（preview=true）下的标题，如果不设置则从视频链接地址获取文件名字，如果设置为空字符串则表示不显示标题
   */
  @property()
  videoTitle: string;

  /**
   * @kind number
   * @required true
   * @default -
   * @description 播放器高度
   */
  @property()
  height: number;

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralVideo
            source={this.source}
            videoTitle={this.videoTitle}
            preview={this.preview}
            height={this.height}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-video",
  GeneralVideoElement
);
