import React from "react";
import { Clipboard } from "@next-libs/clipboard";
import { message } from "antd";
import style from "./BrickColors.module.css";

export interface ColorCubeProps {
  color: string;
}

export interface ColorGroupProps {
  title: string;
  group: string[];
}

export function ColorCube(props: ColorCubeProps) {
  const { color } = props;

  const handleCopy = (text: string) => {
    message.success(`\`${text}\` copied`);
  };

  return (
    <div className={style.cubeContainer}>
      <Clipboard text={`var(${color})`} onCopy={handleCopy}>
        <span
          className={style.cube}
          style={{ backgroundColor: `var(${color})` }}
        />
      </Clipboard>
    </div>
  );
}

export function ColorGroup(props: ColorGroupProps): React.ReactElement {
  const { title, group = [] } = props;
  return (
    <div className={style.colorGroup}>
      <h3 className={style.title}>{title}</h3>
      {group.map((color, index) => (
        <ColorCube key={index} color={color} />
      ))}
    </div>
  );
}
