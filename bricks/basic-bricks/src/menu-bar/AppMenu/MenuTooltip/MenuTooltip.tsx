import React from "react";
import { Tooltip } from "antd";
import { TooltipProps } from "antd/lib/tooltip";

interface MenuTooltipProps {
  title: string;
  collapsed: boolean;
}

export function MenuTooltip(
  props: React.PropsWithChildren<MenuTooltipProps>
): React.ReactElement {
  const tooltipProps: TooltipProps = {
    title: props.title
  };

  if (!props.collapsed) {
    tooltipProps.title = null;
    tooltipProps.visible = false;
  }

  return (
    <Tooltip
      {...tooltipProps}
      placement="right"
      overlayClassName="ant-menu-inline-collapsed-tooltip"
    >
      {props.children}
    </Tooltip>
  );
}
