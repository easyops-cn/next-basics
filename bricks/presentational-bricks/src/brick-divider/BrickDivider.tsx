import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Divider } from "antd";
import styles from "./BrickDivider.module.css";

interface BrickDividerProps {
  type?: "horizontal" | "vertical" | "radiation";
  dashed?: boolean;
  dividerStyle?: React.CSSProperties;
  dividerTitle?: string;
  orientation?: "center" | "left" | "right";
  plain?: boolean;
  proportion?: number[];
}

export function BrickDivider(props: BrickDividerProps): React.ReactElement {
  const renderProportion = (): React.ReactNode => {
    return (
      <span className={styles.ProportionText}>
        <strong>{props.proportion[0]}</strong>
        {props.proportion[1] && `/${props.proportion[1]}`}
      </span>
    );
  };

  return props.type !== "radiation" ? (
    <Divider
      type={props.type}
      dashed={props.dashed}
      style={props.dividerStyle}
      orientation={props.orientation}
      plain={props.plain}
    >
      {props.dividerTitle}
    </Divider>
  ) : (
    <div className={styles.DividerRadiation}>
      <div className={styles.DividerRadiationText}>
        <span className={styles.DividerRadiationTitle}>
          {props.dividerTitle}
        </span>
        {props.proportion && renderProportion()}
      </div>
    </div>
  );
}
