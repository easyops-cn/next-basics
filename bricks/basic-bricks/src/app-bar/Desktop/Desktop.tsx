import React from "react";
import { DesktopData } from "@next-core/brick-types";
import { DesktopCell } from "../DesktopCell/DesktopCell";
import { useLaunchpadSettingsContext } from "../LaunchpadSettingsContext";
import styles from "./Desktop.module.css";

interface DesktopProps {
  desktop: DesktopData;
  desktopCount: number;
  arrowWidthPercent: number;
  activeIndex: number;
}

export function Desktop(props: DesktopProps): React.ReactElement {
  const { columns, rows } = useLaunchpadSettingsContext();

  return (
    <div
      className={styles.desktop}
      style={{
        padding: `0 ${props.arrowWidthPercent / props.desktopCount}%`,
        gridTemplateColumns: `repeat(${columns},1fr)`,
        gridTemplateRows: `repeat(${rows},1fr)`
      }}
    >
      {props.desktop.items.map((item, index) => (
        <DesktopCell
          key={index}
          item={item}
          active={index === props.activeIndex}
        />
      ))}
    </div>
  );
}
