import React from "react";
import { Popover, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import style from "./GeneralTooltip.module.css";
import { TooltipConfig } from ".";

export interface GeneralTooltipProps {
  icon: MenuIcon;
  iconContainerStyle?: React.CSSProperties;
  content: string | string[];
  title?: string;
  type: "tooltip" | "popover";
  text?: string;
  tooltipConfig?: TooltipConfig;
}

export function GeneralTooltip(props: GeneralTooltipProps): React.ReactElement {
  const {
    icon,
    iconContainerStyle,
    content,
    type,
    title,
    text,
    tooltipConfig,
  } = props;
  const { placement, arrowPointAtCenter } = tooltipConfig || {};
  let tipsElem;
  if (Array.isArray(content)) {
    tipsElem = (
      <ul className={style.descContainer}>
        {content.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    );
  } else {
    tipsElem = content;
  }
  const iconNode = (
    <span className={style.iconContainer} style={iconContainerStyle}>
      {<GeneralIcon icon={icon} />}
    </span>
  );
  const getOffset = (position: string) => {
    let offset: number[];
    switch (position) {
      case "top":
        offset = [0, 1];
        break;
      case "topRight":
        offset = [20, 1];
        break;
      case "topLeft":
        offset = [-20, 1];
        break;
      case "bottom":
        offset = [0, -1];
        break;
      case "bottomRight":
        offset = [20, 1];
        break;
      case "bottomLeft":
        offset = [-20, 1];
        break;
      case "left":
        offset = [-1, 0];
        break;
      case "leftTop":
        offset = [-1, -12];
        break;
      case "leftBottom":
        offset = [-1, 12];
        break;
      case "right":
        offset = [1, 0];
        break;
      case "rightTop":
        offset = [1, -12];
        break;
      case "rightBottom":
        offset = [1, 12];
        break;
    }
    return offset;
  };
  const toolTipNode =
    type === "popover" ? (
      <Popover
        align={{
          offset: placement ? getOffset(placement) : [0, 1],
        }}
        placement={placement}
        arrowPointAtCenter={arrowPointAtCenter}
        content={tipsElem}
        title={title}
      >
        {iconNode}
      </Popover>
    ) : (
      <Tooltip
        align={{
          offset: placement ? getOffset(placement) : [0, 1],
        }}
        placement={placement}
        arrowPointAtCenter={arrowPointAtCenter}
        title={tipsElem}
      >
        {iconNode}
      </Tooltip>
    );

  return text ? (
    <>
      <span className={style.text}>{text}</span>
      {toolTipNode}
    </>
  ) : (
    toolTipNode
  );
}
