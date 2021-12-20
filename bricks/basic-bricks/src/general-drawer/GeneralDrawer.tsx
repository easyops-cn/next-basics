import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Spin } from "antd";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { GeneralIcon } from "@next-libs/basic-components";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";
import { DrawerProps } from "antd/lib/drawer";
import { ICustomSwitchConfig } from "./index";
interface GeneralDrawerProps {
  visible: boolean;
  title?: string;
  width?: number;
  getContainer?: HTMLElement;
  closable?: boolean;
  bodyStyle?: Record<string, any>;
  drawerStyle?: Record<string, any>;
  hasFooter?: boolean;
  loading?: boolean;
  mask?: boolean;
  headerStyle?: Record<string, any>;
  configProps?: DrawerProps;
  isFloat?: boolean;
  hasOuterSwitch?: boolean;
  useBigOuterSwitch?: boolean;
  customSwitchConfig?: ICustomSwitchConfig;
}

export function GeneralDrawer(props: GeneralDrawerProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const title = (
    <div className="header">
      {props.title ? (
        <span>{props.title}</span>
      ) : (
        <div className="flexContainer">
          <slot id="headerLeft" name="headerLeft"></slot>
        </div>
      )}
      <div className="flexContainer">
        <slot id="headerRight" name="headerRight"></slot>
      </div>
    </div>
  );
  const [maxContentHeight, setMaxContentHeight] = React.useState<number>();

  React.useEffect(() => {
    if (props.hasFooter) {
      const normalHeaderHeight = 64;
      const drawerContentPadding = 24;
      const manualFix = 4;
      let height =
        window.innerHeight -
        normalHeaderHeight -
        drawerContentPadding -
        manualFix;
      const normalFooterHeight = 64;
      height -= normalFooterHeight;
      setMaxContentHeight(height);
    }
  }, [props.hasFooter]);
  const classNameList = [];
  if (props.isFloat) {
    classNameList.push("floatDrawer");
  }
  if (
    props.hasOuterSwitch &&
    (!props.configProps ||
      !props.configProps.placement ||
      props.configProps.placement === "right")
  ) {
    classNameList.push("switch");
  }

  const getOuterSwitchNode = () => {
    if (!props.useBigOuterSwitch) {
      const outerIcon = props.visible
        ? { lib: "antd", icon: "right", theme: "outlined" }
        : { lib: "antd", icon: "left", theme: "outlined" };
      return <GeneralIcon icon={outerIcon} />;
    } else {
      if (!props.customSwitchConfig) return;
      const outerIcon = props.visible
        ? props.customSwitchConfig.openIcon
        : props.customSwitchConfig.closeIcon;
      const outerText = props.visible
        ? props.customSwitchConfig.openText
        : props.customSwitchConfig.closeText;
      return outerIcon ? (
        <GeneralIcon icon={outerIcon} />
      ) : (
        <span className="outerText">{outerText?.slice(0, 4)}</span>
      );
    }
  };

  return (
    <>
      <Drawer
        {...props.configProps}
        title={title}
        width={props.width}
        visible={props.visible}
        getContainer={props.getContainer}
        closable={props.closable}
        bodyStyle={props.bodyStyle}
        drawerStyle={props.drawerStyle}
        mask={props.mask}
        headerStyle={props.headerStyle}
        forceRender={!!props.hasOuterSwitch}
        className={classNameList.join(" ")}
      >
        {props.hasOuterSwitch && (
          <div
            className={
              props.useBigOuterSwitch
                ? "outerBtn bigOuterBtn"
                : "outerBtn defaultOuterBtn"
            }
            style={{
              top: props.useBigOuterSwitch
                ? props.customSwitchConfig?.top
                : null,
            }}
          >
            {getOuterSwitchNode()}
          </div>
        )}
        <Spin spinning={props.loading} tip="Loading...">
          <div className="content" style={{ maxHeight: maxContentHeight }}>
            <slot id="content" name="content"></slot>
          </div>
        </Spin>
        {props.hasFooter && (
          <div className="footer">
            <div className="footer-inner">
              <slot id="footer" name="footer"></slot>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
