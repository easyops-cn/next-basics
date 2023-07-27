import React from "react";
import { Card } from "antd";
import { ColorGroup, ColorGroupProps } from "./ColorGroup";
import { Alert } from "antd";
import style from "./BrickColors.module.css";

export interface BrickColorsProps {
  list: ColorGroupProps[];
}

export function BrickColors(props: BrickColorsProps): React.ReactElement {
  const { list = [] } = props;
  return (
    <Card>
      <Alert
        message="复制后的变量可直接在 css 属性中使用"
        type="info"
        showIcon
      />
      <div className={style.colorContainer}>
        {list.map(item => (
          <ColorGroup key={item.title} title={item.title} group={item.group} />
        ))}
      </div>
    </Card>
  );
}
