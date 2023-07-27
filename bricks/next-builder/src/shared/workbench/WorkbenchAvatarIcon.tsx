import React from "react";
import { useAvatar } from "@next-libs/hooks";
import { AvatarIcon } from "./interfaces";

export interface WorkbenchAvatarIconProps {
  icon: AvatarIcon;
}

export function WorkbenchAvatarIcon({
  icon,
}: WorkbenchAvatarIconProps): React.ReactElement {
  const { Avatar } = useAvatar(icon.nameOrInstanceId, { size: 14 });

  return Avatar;
}
