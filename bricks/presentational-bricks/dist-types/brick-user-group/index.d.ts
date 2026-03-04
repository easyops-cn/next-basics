import type { GroupProps } from "antd/lib/avatar";

export type UserGroupType = "avatar" | "text";

export interface BrickUserGroupProps {
  type?: UserGroupType;
  separator?: string;
  userNameOrIds?: string[];
  displayShowKey?: boolean;
  configProps?: GroupProps;
}

export declare class BrickUserGroupElement extends HTMLElement {
  type: UserGroupType | undefined;
  separator: string | undefined;
  userNameOrIds: string[] | undefined;
  displayShowKey: boolean | undefined;
  configProps: GroupProps | undefined;
}
