import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Avatar, Tooltip } from "antd";
import { UserInfo } from "@next-core/brick-types";
import { GroupProps } from "antd/lib/avatar";
import { getAvatar } from "@next-libs/hooks";

import { UserAdminApi_searchAllUsersInfo } from "@next-sdk/user-service-sdk";

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
  const [userList, setUserList] = useState<UserInfoWithShowKey[]>([]);
  const [maxCount, setMaxCount] = useState<number>(0);
  const groupRef = useRef(null);

  const getUserList = async (userNameOrIds: string[]) => {
    const resultList = (
      await UserAdminApi_searchAllUsersInfo({
        query: {
          $or: [
            {
              name: {
                $in: userNameOrIds,
              },
            },
            {
              instanceId: {
                $in: userNameOrIds,
              },
            },
          ],
        },
        fields: {
          name: true,
          nickname: true,
          user_icon: true,
          "#showKey": true,
        },
      })
    ).list as UserInfoWithShowKey[];
    setUserList(resultList);
  };

  useEffect(() => {
    userNameOrIds.length && getUserList(userNameOrIds);
  }, [userNameOrIds]);

  useEffect(() => {
    const paddingRight =
      Number(
        groupRef?.current?.parentElement?.parentElement?.style?.paddingRight?.slice(
          0,
          -2
        )
      ) || 0;
    const paddingLeft =
      Number(
        groupRef?.current?.parentElement?.parentElement?.style?.paddingLeft?.slice(
          0,
          -2
        )
      ) || 0;
    const count =
      Math.floor(
        groupRef?.current?.parentElement?.parentElement?.clientWidth -
          paddingRight -
          paddingLeft / 26
      ) - 1;
    setMaxCount(count > 1 ? count : 1);
  }, []);

  return (
    <div ref={groupRef}>
      <Avatar.Group
        {...configProps}
        maxCount={configProps.maxCount || maxCount}
        maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {userList?.map((user) => {
          const [name, showKey] = user["#showKey"];
          const userName = name || user.nickname || user.instanceId;
          const userTooltip =
            displayShowKey && showKey ? `${userName}(${showKey})` : userName;
          return (
            <Tooltip
              title={userTooltip}
              placement="topLeft"
              key={user.instanceId}
            >
              {getAvatar(user)}
            </Tooltip>
          );
        })}
      </Avatar.Group>
    </div>
  );
}
