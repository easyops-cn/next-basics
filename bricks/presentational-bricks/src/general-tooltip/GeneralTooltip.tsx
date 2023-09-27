import React from "react";
import { Popover, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { UseBrickConf, MenuIcon } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import style from "./GeneralTooltip.module.css";
import { TooltipConfig } from ".";
import classnames from "classnames";

export interface GeneralTooltipProps {
  icon?: MenuIcon;
  iconContainerStyle?: React.CSSProperties;
  content: string | string[];
  title?: string;
  type: "tooltip" | "popover";
  text?: string;
  tooltipConfig?: TooltipConfig;
  triggerByIcon?: boolean;
  displayBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  textEllipsis?: boolean;
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
    triggerByIcon,
    displayBrick,
    textEllipsis,
  } = props;
  let element: React.ReactElement;
  const { placement, arrowPointAtCenter, overlayStyle } = tooltipConfig || {};

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
    <span
      className={style.iconContainer}
      style={iconContainerStyle}
      data-testid="trigger-container"
    >
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

  const popoverProps = {
    align: {
      offset: placement ? getOffset(placement) : [0, 1],
    },
    placement,
    arrowPointAtCenter,
    overlayStyle,
    title,
    content: tipsElem,
  };
  const tooltipProps = {
    align: {
      offset: placement ? getOffset(placement) : [0, 1],
    },
    placement,
    arrowPointAtCenter,
    overlayStyle,
    title: tipsElem,
  };

  const renderElement = (Component: any, componentProps: any) =>
    displayBrick?.useBrick ? (
      <Component {...componentProps}>
        <div className="contentContainer">
          <div
            onMouseOver={(e) => {
              e.currentTarget?.parentNode?.dispatchEvent(
                new MouseEvent("mouseover", {
                  bubbles: true,
                })
              );
            }}
          >
            <BrickAsComponent
              data={displayBrick.data}
              useBrick={displayBrick.useBrick}
            />
          </div>
        </div>
      </Component>
    ) : (
      <>
        {triggerByIcon && text && <span className={style.text}>{text}</span>}
        <Component {...componentProps}>
          {!triggerByIcon && text && (
            <span
              className={classnames(style.text, {
                [style.textEllipsis]: textEllipsis,
              })}
            >
              {text}
            </span>
          )}
          {iconNode}
        </Component>
      </>
    );

  switch (type) {
    case "popover":
      element = renderElement(Popover, popoverProps);
      break;
    default:
      element = renderElement(Tooltip, tooltipProps);
  }

  return element;
}
