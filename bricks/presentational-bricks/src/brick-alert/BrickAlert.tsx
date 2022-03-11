import React, { CSSProperties, useCallback } from "react";
import classnames from "classnames";
import { useCurrentTheme } from "@next-core/brick-kit";
import Icon, {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
  ExclamationCircleFilled,
  InfoCircleFilled,
  InfoCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import cssStyle from "./style.module.css";
import { AlertType } from "./index";
import { ReactComponent as BigInfoCircleOutlined } from "../images/info-circle-o.svg";
import { ReactComponent as BigErrorCircleOutlined } from "../images/error-circle-o.svg";
import { ReactComponent as BigSuccessCircleOutlined } from "../images/success-circle-o.svg";
import { ReactComponent as BigWarningCircleOutlined } from "../images/warning-circle-o.svg";

import { ReactComponent as BigInfoCircleOutlinedDark } from "../images/info-circle-dark.svg";
import { ReactComponent as BigErrorCircleOutlinedDark } from "../images/error-circle-dark.svg";
import { ReactComponent as BigSuccessCircleOutlinedDark } from "../images/success-circle-dark.svg";
import { ReactComponent as BigWarningCircleOutlinedDark } from "../images/warning-circle-dark.svg";

interface BrickAlertProps {
  message: string;
  type: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  description?: string;
  enableDescSlot?: boolean;
  closeOnce?: boolean;
  onClose?: () => void;
  noBorderRadio?: boolean;
  enableMessageSlot?: boolean;
  enableActionSlot?: boolean;
  iconSize?: "big" | "small" | "default";
  messageStyle?: CSSProperties;
  foldDesc?: boolean;
}

export function BrickAlert(props: BrickAlertProps): React.ReactElement {
  const [show, setShow] = React.useState<boolean>(false);
  const theme = useCurrentTheme();
  const onClose = () => {
    props.onClose?.();
  };
  // istanbul ignore next
  const message = props.enableMessageSlot ? (
    <>
      {props.foldDesc ? (
        <>
          <span style={{ ...props.messageStyle }}>
            <slot name="message"></slot>
          </span>
          <span
            onClick={() => {
              setShow(!show);
            }}
            style={{
              marginLeft: "5px",
              color: "var(--bg-color-button-link)",
              cursor: "pointer",
            }}
          >
            <span style={{ ...props.messageStyle }}>故障排查</span>
            <UpOutlined
              rotate={show ? 0 : 180}
              style={{ marginLeft: "4px", lineHeight: "0px", fontSize: "12px" }}
            />
          </span>
        </>
      ) : (
        <div>
          <slot name="message"></slot>
        </div>
      )}
    </>
  ) : (
    <span style={{ ...props.messageStyle }}>{props.message}</span>
  );
  const action = props.enableActionSlot ? (
    <div>
      <slot name="action"></slot>
    </div>
  ) : null;

  let desc = props.enableDescSlot ? (
    <div>
      <slot name="description"></slot>
    </div>
  ) : (
    props.description
  );
  if (props.foldDesc) {
    desc = <div style={{ display: show ? "block" : "none" }}>{desc}</div>;
  }

  const text =
    props.closeOnce && props.closable ? (
      <span style={{ color: "var(--text-color-link)" }}>
        不再提示 <CloseOutlined style={{ color: "var(--text-color-link)" }} />
      </span>
    ) : (
      ""
    );
  // istanbul ignore next

  const getThemeIcon = useCallback(
    (
      lightIcon: React.ReactElement,
      darkIcon: React.ReactElement
    ): React.ReactElement => {
      return theme == "dark-v2" ? darkIcon : lightIcon;
    },
    [theme]
  );
  const customIcon = () => {
    let icon: React.ReactNode;
    let iconRender: any;
    if (props.iconSize === "big") {
      switch (props.type) {
        case "info":
          iconRender = getThemeIcon(
            <BigInfoCircleOutlined />,
            <BigInfoCircleOutlinedDark />
          );
          break;
        case "success":
          iconRender = getThemeIcon(
            <BigSuccessCircleOutlined />,
            <BigSuccessCircleOutlinedDark />
          );
          break;
        case "warning":
          iconRender = getThemeIcon(
            <BigWarningCircleOutlined />,
            <BigWarningCircleOutlinedDark />
          );
          break;
        case "error":
          iconRender = getThemeIcon(
            <BigErrorCircleOutlined />,
            <BigErrorCircleOutlinedDark />
          );
          break;
      }
      icon = <Icon component={() => iconRender} />;
    }
    if (props.iconSize === "small") {
      const iconStyle: CSSProperties = { position: "relative", top: "5px" };
      const componentStyrle: CSSProperties = { fontSize: "14px" };
      switch (props.type) {
        case "info":
          iconRender = <InfoCircleFilled style={componentStyrle} />;
          break;
        case "success":
          iconRender = <CheckCircleFilled style={componentStyrle} />;
          break;
        case "warning":
          iconRender = <ExclamationCircleFilled style={componentStyrle} />;
          break;
        case "error":
          iconRender = <CloseCircleFilled style={componentStyrle} />;
          break;
      }
      icon = <Icon style={iconStyle} component={() => iconRender} />;
    }
    return icon;
  };
  return (
    <Alert
      className={classnames(
        {
          [cssStyle.closeOnce]: props.closeOnce && props.closable,
        },
        props.noBorderRadio ? cssStyle.noBorderRadio : null
      )}
      type={props.type}
      message={message}
      showIcon={props.showIcon}
      closable={props.closable}
      onClose={onClose}
      description={desc}
      closeText={text}
      action={action}
      {...(customIcon() ? { icon: customIcon() } : {})}
    />
  );
}
