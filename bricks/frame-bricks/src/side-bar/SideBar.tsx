import React, { useState, useEffect } from "react";
import styles from "./SideBar.module.css";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";
import * as SideBarComponent from "./SidebarMenu";
import { SidebarMenu, SidebarSubMenu } from "@next-core/brick-types";
import { ReactComponent as FixedSvg } from "../images/fixed.svg";
import { ReactComponent as ToFixedSvg } from "../images/toFixed.svg";
import classNames from "classnames";
import { Tooltip } from "antd";
import { getRuntime } from "@next-core/brick-kit";
import { JsonStorage } from "@next-libs/storage";

interface SideBarProps {
  menu?: SidebarSubMenu;
  isCustom?: boolean;
  expandedState?: ExpandedState;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSideBarFixed?: (isFiexed: boolean) => void;
}

export enum ExpandedState {
  Collapsed = "collapsed",
  Hovered = "hovered",
  Expanded = "expanded",
}

export const SIDE_BAR_HAS_BEEN_USED = "side-bar-has-been-used";

export function SideBar(props: SideBarProps): React.ReactElement {
  const {
    menu,
    isCustom = false,
    onMouseEnter,
    onMouseLeave,
    onSideBarFixed,
  } = props;
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [expandedState, setExpandedState] = useState<ExpandedState>(
    props.expandedState || ExpandedState.Collapsed
  );
  const [showFirstUsedTooltip, setShowFirstUsedTooltip] = useState<boolean>(
    !storage.getItem(SIDE_BAR_HAS_BEEN_USED)
  );
  const [menus, setMenus] = useState<SidebarMenu>(menu);

  const { t } = useTranslation(NS_FRAME_BRICKS);

  const getMenu = async (): Promise<void> => {
    if (isCustom) return;
    const appMenu = getRuntime().getCurrentRoute().menu;

    if (appMenu && "menuId" in appMenu) {
      const menu = await getRuntime().fetchMenu(appMenu.menuId);
      setMenus(menu);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const handleFixedIconClick = (): void => {
    setShowFirstUsedTooltip(false);
    storage.setItem(SIDE_BAR_HAS_BEEN_USED, true);

    const currentState =
      expandedState === ExpandedState.Expanded
        ? ExpandedState.Collapsed
        : ExpandedState.Expanded;

    setExpandedState(currentState);

    onSideBarFixed?.(currentState === ExpandedState.Expanded);
  };

  const handleMouseEnter = (): void => {
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Hovered
    );
    onMouseEnter?.();
  };

  const handleMouseLeave = (): void => {
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Collapsed
    );
    expandedState !== ExpandedState.Expanded && onMouseLeave?.();
  };

  return menus ? (
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
        <div className={styles.menuTitleText} title={menus.title}>
          {menus.title}
        </div>
      </div>
      <SideBarComponent.SidebarMenu
        menuItems={menus?.menuItems || []}
        collapsed={expandedState === ExpandedState.Collapsed}
      />
      <div className={styles.sideBarFooter}>
        <Tooltip
          title={
            expandedState === ExpandedState.Expanded
              ? showFirstUsedTooltip
                ? t(K.CLICK_TO_FIX_NAVIGATION, {
                    action: t(K.UNPIN_NAVIGATION),
                  })
                : t(K.UNPIN_NAVIGATION)
              : showFirstUsedTooltip
              ? t(K.CLICK_TO_FIX_NAVIGATION, { action: t(K.FIXED_NAVIGATION) })
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
      </div>
    </div>
  ) : null;
}
