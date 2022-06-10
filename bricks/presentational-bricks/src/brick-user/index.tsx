import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickUser } from "./BrickUser";

/**
 * @id presentational-bricks.brick-user
 * @name presentational-bricks.brick-user
 * @docKind brick
 * @description 展示用户头像加用户名
 * @author ice
 * @slots
 * @history
 * 1.62.0:新属性 `userNameOrId`
 * 1.47.0:新属性 `size`, `shape`
 * 1.152.0:新属性 `shwNickname`
 * @memo
 * @noInheritDoc
 */
export class BrickUserElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @deprecated
   * @description [已废弃]用户名 (废弃属性，请使用 `userNameOrId`)
   */
  @property()
  username: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 用户名或用户 instanceId
   */
  @property({ attribute: false })
  userNameOrId: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 用户头像 url
   */
  @property()
  iconUrl: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏头像
   */
  @property({ type: Boolean })
  hideAvatar: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏用户名
   */
  @property({ type: Boolean })
  hideUsername: boolean;

  /**
   * @kind "large" | "small" | "default"
   * @required false
   * @default "default"
   * @description 设置头像的大小
   */
  @property({ attribute: false })
  size: "large" | "small" | "default" = "default";

  /**
   * @kind "circle" | "square"
   * @required false
   * @default "circle"
   * @description 指定头像的形状
   */
  @property()
  shape: "circle" | "square";

  /**
   * @kind "boolean"
   * @required false
   * @default false
   * @deprecated
   * @description [已废弃,最新用法以showNicknameOrUsername为准]是否展示昵称,当用户不含昵称昵称时不展示
   */
  @property({ type: Boolean })
  showNickname: boolean;
  /**
   * @kind "boolean"
   * @required false
   * @default false
   * @description 当有昵称时显示昵称，无昵称时显示用户名
   */
  @property({ type: Boolean })
  showNicknameOrUsername: boolean;

  /**
   * @kind "number" | "string"
   * @required false
   * @default 0
   * @description icon间距
   */
  @property({ attribute: false })
  iconMargin: number | string;

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickUser
            userNameOrId={this.userNameOrId ?? this.username}
            size={this.size}
            shape={this.shape}
            iconUrl={this.iconUrl}
            hideAvatar={this.hideAvatar}
            hideUsername={this.hideUsername}
            showNicknameOrUsername={
              this.showNicknameOrUsername ?? this.showNickname
            }
            iconMargin={this.iconMargin}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-user", BrickUserElement);
