import React from "react";
import classNames from "classnames";
import { UpOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { isEmpty } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";

interface FoldBrickV2Props {
  _id: string;
  foldName: string;
  hideFoldName?: boolean;
  foldStyle?: Record<string, string>;
  show: boolean;
  showDivider?: boolean;
  dividerOrientation?: "left" | "right" | "center";
  dividerDashed?: boolean;
  isShowFoldIcon?: boolean;
  foldIcon?: any;
  type?: "normal" | "primary";
  foldIconStyle?: React.CSSProperties;
}

export function FoldBrickV2(props: FoldBrickV2Props): React.ReactElement {
  const { hideFoldName, foldIcon, foldIconStyle = {} } = props;

  const fold = (
    <div
      style={props.foldStyle}
      id={props._id}
      className={classNames("foldContainer", {
        foldPrimaryActive: props.type === "primary",
      })}
    >
      {!hideFoldName && <span>{props.foldName}</span>}
      <>
        {props.isShowFoldIcon ? (
          isEmpty(foldIcon) ? (
            <UpOutlined
              rotate={props.show ? 0 : 180}
              style={{ marginLeft: "2px", lineHeight: "0px" }}
            />
          ) : (
            <GeneralIcon
              icon={foldIcon}
              style={{
                ...foldIconStyle,
                transform: props.show ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          )
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
