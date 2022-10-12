import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./SideBar.module.css";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";
import * as SideBarComponent from "./SidebarMenu";
import { SidebarSubMenu, NavTip } from "@next-core/brick-types";
import { ReactComponent as FixedSvg } from "../images/fixed.svg";
import { ReactComponent as ToFixedSvg } from "../images/toFixed.svg";
import classNames from "classnames";
import { Tooltip } from "antd";
import { JsonStorage } from "@next-libs/storage";
import { SideBarElement } from "./index";
import ResizeObserver from "rc-resize-observer";
import { debounce } from "lodash";

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
  const contentContainerRef = useRef<HTMLDivElement>();
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [expandedState, setExpandedState] = useState<ExpandedState>(
    props.expandedState ||
      storage.getItem(SIDE_BAR_EXPAND_STATE) ||
      ExpandedState.Collapsed
  );
  const [showFirstUsedTooltip, setShowFirstUsedTooltip] = useState<boolean>(
    !storage.getItem(SIDE_BAR_HAS_BEEN_USED)
  );
  const [tipList, setTipList] = useState<NavTip[]>([]);

  const [showContentShadow, setShowContentShadow] = useState<boolean>(true);
  const [sidebarContentHeight, setSidebarContentHeight] = useState<number>(0);
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

  useEffect(() => {
    const currentDom = contentContainerRef.current;
    const handleScroll = (e: any) => {
      if (
        e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <=
        0
      ) {
        setShowContentShadow(false);
      } else {
        setShowContentShadow(true);
      }
    };
    currentDom?.addEventListener("scroll", handleScroll);
    return () => {
      currentDom?.removeEventListener("scroll", handleScroll);
    };
  }, [contentContainerRef]);

  useEffect(() => {
    const currentDom = contentContainerRef.current;
    if (currentDom.scrollHeight <= currentDom.clientHeight) {
      setShowContentShadow(false);
    } else {
      setShowContentShadow(true);
    }
  }, [contentContainerRef, sidebarContentHeight]);

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = e.detail ?? [];
    const top = `calc(var(--app-bar-height) + ${list.length * 38}px)`;

    wrapperDOM.style.top = top;
    setTipList(list);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  const sidebarHeight = useMemo(() => {
    return `calc(100vh - var(--app-bar-height) + 1px - ${
      tipList.length * 38
    }px)`;
  }, [tipList]);

  return (
    <div
      className={classNames(styles.sideBarContainer, {
        [styles.hovered]: expandedState === ExpandedState.Hovered,
        [styles.expanded]: expandedState === ExpandedState.Expanded,
      })}
      style={{
        height: sidebarHeight,
      }}
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
      <ResizeObserver
        onResize={debounce(({ height }) => {
          setSidebarContentHeight(height);
        }, 100)}
      >
        <div
          ref={contentContainerRef}
          className={classNames(styles.sidebarContentContainer, {
            [styles.hiddenSidebarContentContainerShadow]: !showContentShadow,
          })}
        >
          <SideBarComponent.SidebarMenu
            menuItems={menu?.menuItems || []}
            collapsed={expandedState === ExpandedState.Collapsed}
          />
        </div>
      </ResizeObserver>
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
                ? "linear-gradient(45deg, #1A7AFF 0%, #6BB3FF 100%)"
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
