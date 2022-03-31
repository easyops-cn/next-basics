import React, { useState, useEffect } from "react";
import styles from "./SideBar.module.css";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";
import * as SideBarComponent from "./SidebarMenu";
import { SidebarSubMenu } from "@next-core/brick-types";
import { ReactComponent as FixedSvg } from "../images/fixed.svg";
import { ReactComponent as ToFixedSvg } from "../images/toFixed.svg";
import classNames from "classnames";
import { Tooltip } from "antd";
import { JsonStorage } from "@next-libs/storage";
import { SideBarElement } from "./index";

interface SideBarProps {
  menu?: SidebarSubMenu;
  wrapperDOM?: SideBarElement;
  expandedState?: ExpandedState;
  hiddenFixedIcon?: boolean;
  onSideBarFixed?: (isFiexed: boolean) => void;
}

export enum ExpandedState {
  Collapsed = "collapsed",
  Hovered = "hovered",
  Expanded = "expanded",
}

export const SIDE_BAR_HAS_BEEN_USED = "side-bar-has-been-used";
export const SIDE_BAR_EXPAND_STATE = "side-bar-expand-state";

export function SideBar(props: SideBarProps): React.ReactElement {
  const {
    menu = {} as SidebarSubMenu,
    onSideBarFixed,
    hiddenFixedIcon,
    wrapperDOM,
  } = props;
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [expandedState, setExpandedState] = useState<ExpandedState>(
    props.expandedState ||
      storage.getItem(SIDE_BAR_EXPAND_STATE) ||
      ExpandedState.Collapsed
  );
  const [showFirstUsedTooltip, setShowFirstUsedTooltip] = useState<boolean>(
    !storage.getItem(SIDE_BAR_HAS_BEEN_USED)
  );

  const { t } = useTranslation(NS_FRAME_BRICKS);

  const handleFixedIconClick = (): void => {
    setShowFirstUsedTooltip(false);
    storage.setItem(SIDE_BAR_HAS_BEEN_USED, true);

    const currentState =
      expandedState === ExpandedState.Expanded
        ? ExpandedState.Collapsed
        : ExpandedState.Expanded;

    setExpandedState(currentState);

    if (wrapperDOM) {
      if (currentState === ExpandedState.Expanded) {
        wrapperDOM.style.width = "var(--side-bar-width)";
      } else {
        wrapperDOM.style.width = "var(--side-bar-collapsed-width)";
      }
    }

    storage.setItem(SIDE_BAR_EXPAND_STATE, currentState);
    onSideBarFixed?.(currentState === ExpandedState.Expanded);
  };

  const handleMouseEnter = (): void => {
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Hovered
    );
  };

  const handleMouseLeave = (): void => {
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Collapsed
    );
  };

  useEffect(() => {
    if (wrapperDOM) {
      if (expandedState === ExpandedState.Expanded) {
        wrapperDOM.style.width = "var(--side-bar-width)";
      } else {
        wrapperDOM.style.width = "var(--side-bar-collapsed-width)";
      }
    }
  }, [wrapperDOM, expandedState]);

  return (
    <div
      className={classNames(styles.sideBarContainer, {
        [styles.hovered]: expandedState === ExpandedState.Hovered,
        [styles.expanded]: expandedState === ExpandedState.Expanded,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="side-bar"
    >
      <div className={styles.menuTitle}>
        <i className={styles.menuTitlePoint} />
        <div className={styles.menuTitleText} title={menu.title}>
          {menu.title}
        </div>
      </div>
      <SideBarComponent.SidebarMenu
        menuItems={menu?.menuItems || []}
        collapsed={expandedState === ExpandedState.Collapsed}
      />
      <div className={styles.sideBarFooter}>
        {!hiddenFixedIcon && (
          <Tooltip
            title={
              expandedState === ExpandedState.Expanded
                ? showFirstUsedTooltip
                  ? t(K.CLICK_TO_FIX_NAVIGATION, {
                      action: t(K.UNPIN_NAVIGATION),
                    })
                  : t(K.UNPIN_NAVIGATION)
                : showFirstUsedTooltip
                ? t(K.CLICK_TO_FIX_NAVIGATION, {
                    action: t(K.FIXED_NAVIGATION),
                  })
                : t(K.FIXED_NAVIGATION)
            }
            color={
              showFirstUsedTooltip
                ? "linear-gradient(270deg, #8B6AF3 0%, #0042FF 100%)"
                : "rgba(0, 0, 0, 0.65)"
            }
          >
            <i className={styles.fixedIcon} onClick={handleFixedIconClick}>
              {expandedState === ExpandedState.Expanded ? (
                <FixedSvg width={20} height={20} />
              ) : (
                <ToFixedSvg width={20} height={20} />
              )}
            </i>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
