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
import moment from "moment";
import { GeneralIcon } from "@next-libs/basic-components";
import { debounceByAnimationFrame } from "@next-core/brick-utils";
import {
  getCssPropertyValue,
  useRecentApps,
  getRuntime,
} from "@next-core/brick-kit";

interface SideBarProps {
  menu?: SidebarSubMenu;
  wrapperDOM?: SideBarElement;
  expandedState?: ExpandedState;
  hiddenFixedIcon?: boolean;
  onSideBarFixed?: (isFiexed: boolean) => void;
  onSideBarResize?: (value: string) => void;
}

export enum ExpandedState {
  Collapsed = "collapsed",
  Hovered = "hovered",
  Expanded = "expanded",
}

export const SIDE_BAR_HAS_BEEN_USED = "side-bar-has-been-used";
export const SIDE_BAR_EXPAND_STATE = "side-bar-expand-state";
const DEPRECATED_RESIZE_WIDTH = "resize-width";
export const SIDE_BAR_RESIZE_WIDTH = "side-bar-resize-width";
const sideBarWidth =
  parseInt(getCssPropertyValue("--side-bar-width"), 10) || 208;
const sideBarCollapsedWidth =
  parseInt(getCssPropertyValue("--side-bar-collapsed-width"), 10) || 60;

export function SideBar(props: SideBarProps): React.ReactElement {
  const {
    menu = {} as SidebarSubMenu,
    onSideBarFixed,
    onSideBarResize,
    hiddenFixedIcon,
    wrapperDOM,
  } = props;
  const contentContainerRef = useRef<HTMLDivElement>();
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [resizeWidth, setResizeWidth] = useState<number>(() => {
    // Use parseInt to compatible non-number types
    let width = parseInt(
      storage.getItem(SIDE_BAR_RESIZE_WIDTH) ||
        storage.getItem(DEPRECATED_RESIZE_WIDTH),
      10
    );
    if (width < sideBarWidth || Number.isNaN(width)) {
      width = sideBarWidth;
    }
    storage.removeItem(DEPRECATED_RESIZE_WIDTH);
    return width;
  });
  const [dragging, setDragging] = useState<boolean>();
  const [sideBarWidthTransitioning, setSideBarWidthTransitioning] =
    useState<boolean>();
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
  // istanbul ignore next
  const handleFixedIconClick = (): void => {
    setShowFirstUsedTooltip(false);
    storage.setItem(SIDE_BAR_HAS_BEEN_USED, true);

    const currentState =
      expandedState === ExpandedState.Expanded
        ? ExpandedState.Collapsed
        : ExpandedState.Expanded;

    setExpandedState(currentState);
    storage.setItem(SIDE_BAR_EXPAND_STATE, currentState);
    onSideBarFixed?.(currentState === ExpandedState.Expanded);
  };

  const handleMouseEnter = (): void => {
    expandedState !== ExpandedState.Expanded &&
      setSideBarWidthTransitioning(true);
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Hovered
    );
  };

  const handleMouseLeave = (): void => {
    expandedState !== ExpandedState.Expanded &&
      setSideBarWidthTransitioning(true);
    setExpandedState(
      expandedState === ExpandedState.Expanded
        ? expandedState
        : ExpandedState.Collapsed
    );
  };

  const { currentApp } = useRecentApps();

  const showUserDefinedIcon = React.useMemo(
    () => getRuntime()?.getFeatureFlags()["sidebar-show-user-defined-icon"],
    []
  );

  useEffect(() => {
    storage.setItem(SIDE_BAR_RESIZE_WIDTH, resizeWidth);
  }, [resizeWidth]);

  useEffect(() => {
    switch (expandedState) {
      case ExpandedState.Expanded: {
        wrapperDOM && (wrapperDOM.style.width = resizeWidth + "px");
        break;
      }
      case ExpandedState.Hovered:
      case ExpandedState.Collapsed:
      default: {
        wrapperDOM &&
          (wrapperDOM.style.width = "var(--side-bar-collapsed-width)");
      }
    }
  }, [wrapperDOM, expandedState, resizeWidth]);
  // istanbul ignore next
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

  const handleResizeDown = (e: any) => {
    setDragging(true);

    // Prevent text selection when dragging
    if (e.cancelable) {
      e.preventDefault();
    }

    const drag = debounceByAnimationFrame((e: any) => {
      const width = e.clientX >= sideBarWidth ? e.clientX : sideBarWidth;

      setResizeWidth(width);
      onSideBarResize?.(`${width}px`);
    });
    const dragEnd = (e: any) => {
      setDragging(false);
      e.preventDefault();

      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", dragEnd);
    };

    window.addEventListener("mousemove", drag, { passive: true });
    window.addEventListener("mouseup", dragEnd);
  };

  useEffect(() => {
    const currentDom = contentContainerRef.current;
    if (currentDom.scrollHeight <= currentDom.clientHeight) {
      setShowContentShadow(false);
    } else {
      setShowContentShadow(true);
    }
  }, [contentContainerRef, sidebarContentHeight]);
  // istanbul ignore next
  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = (e.detail ?? []).filter((item) => {
      const isTipClosing =
        item.closable &&
        storage.getItem(item.tipKey) &&
        moment().unix() <= storage.getItem(item.tipKey);
      return !isTipClosing;
    });
    setTipList(list);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  return (
    <div
      className={classNames(styles.sideBarContainer, {
        [styles.hovered]: expandedState === ExpandedState.Hovered,
        [styles.expanded]: expandedState === ExpandedState.Expanded,
        [styles.dragging]: !!dragging,
      })}
      style={{
        height: `calc(100vh - var(--app-bar-height-with-tips, ${
          tipList.length
            ? `calc(var(--app-bar-height) + ${tipList.length * 32}px)`
            : "var(--app-bar-height)"
        }))`,
        width:
          expandedState === ExpandedState.Collapsed
            ? "var(--side-bar-collapsed-width)"
            : resizeWidth,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "width") {
          setSideBarWidthTransitioning(false);
        }
      }}
      data-testid="side-bar"
    >
      <div className={styles.menuTitle}>
        <i
          className={classNames(
            { [styles.menuTitlePoint]: !menu?.icon && !currentApp?.menuIcon },
            styles.newMenuItemIcon
          )}
        >
          <GeneralIcon
            icon={showUserDefinedIcon ? menu?.icon : currentApp?.menuIcon}
            size={20}
          />
        </i>
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
            sideBarWidthTransitioning={sideBarWidthTransitioning}
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
      {expandedState === ExpandedState.Expanded && (
        <div
          className={classNames(styles.resizeLine, {
            [styles.minWidth]: resizeWidth === sideBarWidth,
          })}
          onMouseDown={handleResizeDown}
        >
          <div className={styles.mask} />
        </div>
      )}
    </div>
  );
}
