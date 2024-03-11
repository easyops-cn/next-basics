import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Avatar, Tooltip } from "antd";
import { UserInfo } from "@next-core/brick-types";
import { GroupProps } from "antd/lib/avatar";
import { useAvatar } from "@next-libs/hooks";

function BasicUser({
  userNameOrId = "",
  displayShowKey,
}: {
  userNameOrId: string;
  displayShowKey: boolean;
}) {
  const { Avatar, user } = useAvatar(userNameOrId);

  const [userTooltip, setUserTooltip] = useState<string>("");

  useEffect(() => {
    if (user) {
      const [name, showKey] = (user as any)["#showKey"];
      const userName = name || user.nickname || user.instanceId;
      setUserTooltip(
        displayShowKey && showKey ? `${userName}(${showKey})` : userName
      );
    }
  }, [user, displayShowKey]);

  return user ? (
    <Tooltip title={userTooltip} placement="topLeft" key={user.instanceId}>
      {Avatar}
    </Tooltip>
  ) : null;
}
interface BrickUserGroupProps {
  userNameOrIds: any;
  configProps?: GroupProps;
  displayShowKey?: boolean;
}

type UserInfoWithShowKey = UserInfo & { "#showKey": string[] };

export function BrickUserGroup({
  userNameOrIds = [],
  configProps = {},
  displayShowKey,
}: BrickUserGroupProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [singleSize, setSingleSize] = useState<number>(0);
  const groupRef = useRef(null);

  useEffect(() => {
    const groupParentElement = groupRef?.current?.parentElement?.parentElement;
    setTimeout(() => {
      setSingleSize(
        groupRef?.current?.firstElementChild.children[0]?.clientWidth * 0.84
      );
    }, 200);

    const paddingRight =
      Number(groupParentElement?.style?.paddingRight?.slice(0, -2)) || 0;
    const paddingLeft =
      Number(groupParentElement?.style?.paddingLeft?.slice(0, -2)) || 0;
    const count =
      Math.floor(
        (groupParentElement?.clientWidth - paddingRight - paddingLeft) /
          singleSize
      ) - 1;
    setMaxCount(count > 1 ? count : 1);
  }, [singleSize]);

  return (
    <div ref={groupRef}>
      <Avatar.Group
        maxCount={configProps.maxCount || maxCount}
        maxStyle={
          configProps.maxStyle || {
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }
        }
        style={{ display: "block" }}
        {...configProps}
      >
        {userNameOrIds.map((userNameOrId: string, index: number) => {
          return (
            <BasicUser
              userNameOrId={userNameOrId}
              displayShowKey={displayShowKey}
              key={`${userNameOrId}${index}`}
            ></BasicUser>
          );
        })}
      </Avatar.Group>
    </div>
  );
}
