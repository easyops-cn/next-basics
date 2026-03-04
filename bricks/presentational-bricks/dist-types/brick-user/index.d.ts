export interface BrickUserProps {
  username?: string;
  userNameOrId?: string;
  iconUrl?: string;
  hideAvatar?: boolean;
  hideUsername?: boolean;
  size?: "large" | "small" | "default";
  shape?: "circle" | "square";
  showNickname?: boolean;
  showNicknameOrUsername?: boolean;
  displayShowKey?: boolean;
  iconMargin?: number | string;
  customTooltip?: string;
}

export declare class BrickUserElement extends HTMLElement {
  username: string | undefined;
  userNameOrId: string | undefined;
  iconUrl: string | undefined;
  hideAvatar: boolean | undefined;
  hideUsername: boolean | undefined;
  size: "large" | "small" | "default" | undefined;
  shape: "circle" | "square" | undefined;
  showNickname: boolean | undefined;
  showNicknameOrUsername: boolean | undefined;
  displayShowKey: boolean | undefined;
  iconMargin: number | string | undefined;
  customTooltip: string | undefined;
}
