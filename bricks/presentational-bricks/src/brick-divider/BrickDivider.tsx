import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Divider } from "antd";

interface BrickDividerProps {
  type?: "horizontal" | "vertical";
  dashed?: boolean;
  dividerStyle?: any;
  dividerTitle?: string;
  orientation?: "center" | "left" | "right";
}

export function BrickDivider(props: BrickDividerProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  return (
    <Divider
      {...{ type: props.type, dashed: props.dashed, style: props.dividerStyle, orientation: props.orientation }}
    >{props.dividerTitle}</Divider>
  );
}
