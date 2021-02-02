import React, { useState } from "react";
import { UpOutlined } from "@ant-design/icons";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import classNames from "classnames";
import style from "./style.module.css";

interface FoldBrickProps {
  useBrick: UseBrickConf;
  foldName: string;
  foldStyle?: Record<string, string>;
  defaultShow?: boolean;
}

export function FoldBrick(props: FoldBrickProps): React.ReactElement {
  const [show, handleShow] = useState(props.defaultShow || false);
  const handleFold = (): void => {
    handleShow(!show);
  };
  return (
    <div>
      <div
        style={props.foldStyle}
        onClick={handleFold}
        className={style.foldContainer}
      >
        <span>{props.foldName}</span>
        <UpOutlined
          rotate={show ? 0 : 180}
          style={{ marginLeft: "15px", lineHeight: "0px" }}
        />
      </div>
      <div
        className={classNames({
          [style.foldActive]: show,
          [style.foldInactive]: !show,
        })}
      >
        <BrickAsComponent useBrick={props.useBrick}></BrickAsComponent>
      </div>
    </div>
  );
}
