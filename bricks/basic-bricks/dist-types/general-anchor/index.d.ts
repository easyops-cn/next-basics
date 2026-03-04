import type { AnchorProps } from "antd";
import type { UseBrickConf } from "@next-core/brick-types";

export interface AnchorListType extends AnchorLinkProps {
  /* 其他参数请参考 https://ant.design/components/anchor-cn/#Link-Props */
  title: string;
  href: string;
  target?: string;
  children?: AnchorListType[];
}

export interface GeneralAnchorProps {
  anchorList?: AnchorListType[];
  configProps?: AnchorProps;
  type?: "default" | "radio";
  extraBrick?: { useBrick: UseBrickConf };
  disabledJump?: boolean;
  initOffset?: number;
}

export interface GeneralAnchorEvents {
  "anchor.click": CustomEvent<Record<string, any>>;
  "anchor.change": CustomEvent<Record<string, any>>;
}

export interface GeneralAnchorEventsMap {
  onAnchorClick: "anchor.click";
  onAnchorChange: "anchor.change";
}

export declare class GeneralAnchorElement extends HTMLElement {
  anchorList: AnchorListType[] | undefined;
  configProps: AnchorProps | undefined;
  type: "default" | "radio" | undefined;
  extraBrick: { useBrick: UseBrickConf } | undefined;
  disabledJump: boolean | undefined;
  initOffset: number | undefined;
}
