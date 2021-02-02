import React from "react";
import { UpOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import classNames from "classnames";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

interface AdvanceSettingProps extends FormItemWrapperProps {
  foldName: string;
  foldStyle?: Record<string, string>;
  show: boolean;
  dividerOrientation?: "left" | "right";
  dividerDashed?: boolean;
  showFoldIcon: boolean;
  showDivider: boolean;
}

export function AdvanceSetting(props: AdvanceSettingProps): React.ReactElement {
  const fold = (
    <div style={props.foldStyle} id="foldBrickButton" className="foldContainer">
      <span>{props.foldName}</span>
      {props.showFoldIcon && (
        <UpOutlined
          rotate={props.show ? 0 : 180}
          style={{ marginLeft: "15px", lineHeight: "0px" }}
        />
      )}
    </div>
  );

  return (
    <div>
      <FormItemWrapper {...props}>
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
      </FormItemWrapper>
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
