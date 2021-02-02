import React from "react";
import classNames from "classnames";
import { Avatar, Tooltip } from "antd";
import { getRuntime } from "@next-core/brick-kit";
import { UserInfo } from "@next-core/brick-types";

import cssStyle from "./style.module.css";

const USERMAP = new Map<string, UserInfo>();

interface BrickUserProps {
  userNameOrId: string;
  shape?: "circle" | "square";
  size?: "large" | "small" | "default" | number;
  iconUrl?: string;
  hideAvatar?: boolean;
  hideUsername?: boolean;
  showNickname?: boolean;
}

export function BrickUser(props: BrickUserProps): React.ReactElement {
  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [userName, setUserName] = React.useState(props.userNameOrId);
  const [nickName, setNickName] = React.useState("");

  React.useEffect(() => {
    (async () => {
      let user: UserInfo;
      let icon: string;
      if (USERMAP.size === 0) {
        const userMap = await getRuntime().getAllUserMapAsync();
        for (const [name, user] of userMap) {
          USERMAP.set(name, user);
          USERMAP.set(user.instanceId, user);
        }
      }
      if (USERMAP.has(props.userNameOrId)) {
        user = USERMAP.get(props.userNameOrId);

        setUserName(user?.name);
        setNickName(user?.nickname);
      } else {
        // 在用户列表中找不到时显示用户传进来的值
        setUserName(props.userNameOrId);
      }
      if (props.iconUrl) {
        icon = props.iconUrl;
      } else {
        icon = user?.user_icon;
      }
      setAvatarSrc(icon);
    })();
  }, [props.userNameOrId, props.iconUrl]);

  if (!props.userNameOrId) return null;
  return (
    <Tooltip title={userName} placement="topLeft">
      <span className={cssStyle.user}>
        {!props.hideAvatar && (
          <span>
            <Avatar
              src={avatarSrc}
              shape={props.shape}
              size={props.size}
              style={{
                backgroundColor: avatarSrc ? undefined : "rgb(0, 113, 235)",
              }}
            >
              {userName?.slice(0, 2)}
            </Avatar>
          </span>
        )}
        {!props.hideUsername && (
          <span
            className={classNames({
              [cssStyle.usernameAdjust]: !props.hideAvatar,
            })}
          >
            {userName}
            {props.showNickname ? (nickName ? `(${nickName})` : "") : ""}
          </span>
        )}
      </span>
    </Tooltip>
  );
}
