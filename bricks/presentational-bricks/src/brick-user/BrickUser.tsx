import React from "react";
import classNames from "classnames";
import { Avatar, Tooltip } from "antd";
import { useUserInfoByNameOrInstanceId } from "@next-libs/hooks";

import cssStyle from "./style.module.css";

interface BrickUserProps {
  userNameOrId: string;
  shape?: "circle" | "square";
  size?: "large" | "small" | "default" | number;
  iconUrl?: string;
  hideAvatar?: boolean;
  hideUsername?: boolean;
  showNicknameOrUsername?: boolean;
  iconMargin?: string | number;
}

export function BrickUser(props: BrickUserProps): React.ReactElement {
  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [userName, setUserName] = React.useState(props.userNameOrId);
  const [nickName, setNickName] = React.useState("");

  const userInfo = useUserInfoByNameOrInstanceId(props.userNameOrId);

  React.useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.name);
      setNickName(userInfo.nickname);
    } else {
      setUserName(props.userNameOrId);
    }
  }, [props.userNameOrId, userInfo]);

  React.useEffect(() => {
    if (props.iconUrl) {
      setAvatarSrc(props.iconUrl);
    } else {
      setAvatarSrc(userInfo?.user_icon);
    }
  }, [props.iconUrl, userInfo]);

  if (!props.userNameOrId) return null;

  const name = props.showNicknameOrUsername
    ? nickName
      ? nickName
      : userName
    : userName;

  return (
    <Tooltip title={name} placement="topLeft">
      <span className={cssStyle.user}>
        {!props.hideAvatar && (
          <span>
            <Avatar
              src={avatarSrc}
              shape={props.shape}
              size={props.size}
              style={{
                backgroundColor: avatarSrc ? undefined : "rgb(0, 113, 235)",
                margin: props.iconMargin,
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
            {name}
          </span>
        )}
      </span>
    </Tooltip>
  );
}
