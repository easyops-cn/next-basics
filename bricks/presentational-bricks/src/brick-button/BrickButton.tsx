import React from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

interface BrickButtonProps {
  text: string;
  configProps?: ButtonProps & { icon?: string };
  onClick?: (event: React.MouseEvent) => void;
}

export function BrickButton(props: BrickButtonProps): React.ReactElement {
  const icon = props.configProps?.icon;
  return (
    <Button
      onClick={props.onClick}
      {...props.configProps}
      icon={icon && <LegacyIcon type={icon} />}
    >
      {props.text}
    </Button>
  );
}
