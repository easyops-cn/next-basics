import React from "react";
import classNames from "classnames";
import { UpOutlined } from "@ant-design/icons";
import { Divider } from "antd";

interface FoldBrickV2Props {
  foldName: string;
  foldStyle?: Record<string, string>;
  show: boolean;
  showDivider?: boolean;
  dividerOrientation?: "left" | "right";
  dividerDashed?: boolean;
  isShowFoldIcon?: boolean;
  type?: "normal" | "primary";
}

export function FoldBrickV2(props: FoldBrickV2Props): React.ReactElement {
  const fold = (
    <div
      style={props.foldStyle}
      id="foldBrickButton"
      className={classNames("foldContainer", {
        foldPrimaryActive: props.type === "primary",
      })}
    >
      <span>{props.foldName}</span>
      <>
        {props.isShowFoldIcon ? (
          <UpOutlined
            rotate={props.show ? 0 : 180}
            style={{ marginLeft: "2px", lineHeight: "0px" }}
          />
        ) : (
          ""
        )}
      </>
    </div>
  );

  return (
    <div>
      {props.showDivider ? (
        <Divider
          dashed={props.dividerDashed}
          orientation={props.dividerOrientation}
        >
          {fold}
        </Divider>
      ) : (
        fold
      )}
      <div
        className={classNames({
          foldActive: props.show,
          foldInactive: !props.show,
        })}
      >
        <slot name="content"></slot>
      </div>
    </div>
  );
}
