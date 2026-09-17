import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralVideo } from "./GeneralVideo";


export interface GeneralVideoElementProps {
  source?: string;
  preview?: boolean;
  videoTitle?: string;
  height?: number;
}

/**
 * @id presentational-bricks.general-video
 * @name presentational-bricks.general-video
 * @docKind brick
 * @description 播放视频或预览视频
 * @description.en Play or preview a video
 * @author alren
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class GeneralVideoElement extends UpdatingElement implements GeneralVideoElementProps {
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
   * @description.en The link address of the video
   */
  @property()
  source: string;

  /**
   * @kind bool
   * @required true
   * @default -
   * @description 预览模式还是播放模式
   * @description.en Preview mode or play mode
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
   * @description.en The title in preview mode (preview=true); if not set, the file name is obtained from the video link address, and if set to an empty string, the title is not displayed
   */
  @property()
  videoTitle: string;

  /**
   * @kind number
   * @required true
   * @default -
   * @description 播放器高度
   * @description.en Height of the player
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
