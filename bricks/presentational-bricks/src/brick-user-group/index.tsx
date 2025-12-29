import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickUserGroup, UserGroupType } from "./BrickUserGroup";
import { GroupProps } from "antd/lib/avatar";


export interface BrickUserGroupElementProps {
  type?: UserGroupType ;
  userNameOrIds?: string[];
  displayShowKey?: boolean;
  configProps?: GroupProps;
}

/**
 * @id presentational-bricks.brick-user-group
 * @author dophjing
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.brick-user-group`
 * @docKind brick
 * @noInheritDoc
 */
export class BrickUserGroupElement extends UpdatingElement implements BrickUserGroupElementProps {
  /**
   * @kind "string"
   * @required false
   * @default "group"
   * @description 用户组类型, 代表头像模式还是文本模式
   * @group basic
   */
  @property({ attribute: false })
  type: UserGroupType = "avatar";

  /**
   * @kind string
   * @required false
   * @default ";"
   * @description 用户组分隔符，默认是分号；仅在 type 为 text 时有效
   * @group basic
   */
  @property({ attribute: false })
  separator = ";";

  /**
   * @kind string[]
   * @required true
   * @default -
   * @description 用户名或用户 instanceId数组
   * @group basic
   */
  @property({ attribute: false })
  userNameOrIds: string[];

  /**
   * @kind "boolean"
   * @required false
   * @default false
   * @description 是否显示 `showKey` ，如果有则显示`alan(hero)` or `alan`
   */
  @property({ type: Boolean })
  displayShowKey: boolean;

  /**
   * @kind GroupProps
   * @required false
   * @default -
   * @description https://ant.design/components/avatar-cn#avatargroup-450
   * @group basic
   */
  @property({ attribute: false })
  configProps: GroupProps;

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
          <BrickUserGroup
            userNameOrIds={this.userNameOrIds}
            configProps={this.configProps}
            displayShowKey={this.displayShowKey}
            type={this.type}
            separator={this.separator}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-user-group",
  BrickUserGroupElement
);
