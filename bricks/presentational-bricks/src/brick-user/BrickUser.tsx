import React from "react";
import classNames from "classnames";
import { Tooltip } from "antd";
import { useAvatar } from "@next-libs/hooks";

import cssStyle from "./style.module.css";

interface BrickUserProps {
  userNameOrId: string;
  shape?: "circle" | "square";
  size?: "large" | "small" | "default" | number;
  iconUrl?: string;
  hideAvatar?: boolean;
  hideUsername?: boolean;
  showNicknameOrUsername?: boolean;
  displayShowKey?: boolean;
  iconMargin?: string | number;
  customTooltip?: string;
}

export function BrickUser(props: BrickUserProps): React.ReactElement {
  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [userName, setUserName] = React.useState(props.userNameOrId);
  const [nickName, setNickName] = React.useState("");
  const [showKey, setShowKey] = React.useState<string>();
  const {
    Avatar,
    user: userInfo,
    updateConfig,
  } = useAvatar(props.userNameOrId, { style: { flexShrink: 0 } });

  React.useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.name);
      setNickName(userInfo.nickname);
      if ((userInfo as any)["#showKey"]?.length) {
        const [name, showKey] = (userInfo as any)["#showKey"] as [
          string,
          string | undefined
        ];
        setShowKey(showKey ? `${name}(${showKey})` : `${name}`);
      }
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

  React.useEffect(() => {
    const { shape, size, iconMargin } = props;
    const conf = {
      shape,
      size,
      style: {
        flexShrink: 0,
        backgroundColor: avatarSrc ? undefined : "rgb(0, 113, 235)",
        margin: iconMargin,
      },
      src: avatarSrc,
    };
    updateConfig(conf);
  }, [props.shape, props.size, props.iconMargin, avatarSrc]);

  if (!props.userNameOrId) return null;

  const name = props.showNicknameOrUsername
    ? nickName
      ? nickName
      : userName
    : userName;

  const tooltip = props.customTooltip
    ? props.customTooltip
        .replace("#{name}", name)
        .replace("#{showKey}", showKey)
    : props?.displayShowKey
    ? showKey
    : name;

  return (
    <Tooltip title={tooltip} placement="topLeft">
      <div className={cssStyle.user}>
        {!props.hideAvatar && Avatar}
        {!props.hideUsername && (
          <span className={cssStyle.username} data-testid="username">
            {props?.displayShowKey ? showKey : name}
          </span>
        )}
      </div>
    </Tooltip>
  );
}
