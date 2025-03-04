import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Avatar, Tooltip } from "antd";
import { UserInfo } from "@next-core/brick-types";
import { GroupProps } from "antd/lib/avatar";
import { useAvatar } from "@next-libs/hooks";

type UserInfoWithShowKey = UserInfo & { "#showKey": string[] };

function getUserShowKey(user: UserInfo, displayShowKey: boolean): string {
  const showKeyData = (user as UserInfoWithShowKey)["#showKey"] ?? [];
  const [name, showKey] = showKeyData;
  const userName = name || user.nickname || user.instanceId;
  return displayShowKey && showKey ? `${userName}(${showKey})` : userName;
}

function BasicUser({
  userNameOrId = "",
  displayShowKey,
  type,
}: {
  userNameOrId: string;
  displayShowKey: boolean;
  type: UserGroupType;
}) {
  const { Avatar, user } = useAvatar(userNameOrId);

  const [userTooltip, setUserTooltip] = useState<string>("");

  useEffect(() => {
    if (user) {
      const showKey = getUserShowKey(user, displayShowKey);
      setUserTooltip(showKey);
    }
  }, [user, displayShowKey]);
  if (!user) {
    return null;
  }
  if (type === "text") {
    return <span data-testid="user-text">{userTooltip}</span>;
  }
  return (
    <Tooltip title={userTooltip} placement="topLeft" key={user.instanceId}>
      {Avatar}
    </Tooltip>
  );
}

// Avatar mode and text mode
export type UserGroupType = "avatar" | "text";

interface BrickUserGroupProps {
  userNameOrIds: any;
  configProps?: GroupProps;
  displayShowKey?: boolean;
  type?: UserGroupType;
  separator?: string;
}

export function BrickUserGroup({
  userNameOrIds = [],
  configProps = {},
  displayShowKey,
  type = "avatar",
  separator = ";",
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

  const userAvatarGroup = useMemo(
    () => (
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
        {userNameOrIds.map((userNameOrId: string, index: number) => (
          <BasicUser
            key={`${userNameOrId}-${index}`}
            userNameOrId={userNameOrId}
            displayShowKey={displayShowKey}
            type={"avatar"}
          />
        ))}
      </Avatar.Group>
    ),
    [userNameOrIds, displayShowKey, configProps, maxCount]
  );

  const userTextGroup = useMemo(
    () => (
      <>
        {userNameOrIds.map((userNameOrId: string, index: number) => (
          <React.Fragment key={`${userNameOrId}-${index}`}>
            <BasicUser
              userNameOrId={userNameOrId}
              displayShowKey={displayShowKey}
              type={"text"}
            />
            {index < userNameOrIds.length - 1 && (
              <span data-testid="user-text-separator">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </>
    ),
    [userNameOrIds, displayShowKey, separator]
  );

  return (
    <div ref={groupRef} data-testid="user-text-group">
      {type === "avatar" ? userAvatarGroup : userTextGroup}
    </div>
  );
}
