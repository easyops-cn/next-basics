import React, { useMemo } from "react";
import classNames from "classnames";
import { PageTitle } from "../page-title/PageTitle";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { BtnExitDashboardMode } from "./BtnExitDashboardMode";
import { getRuntime } from "@next-core/brick-kit";
import { getNewUIStatus } from "../utils";
interface MicroAppProps {
  pageTitle?: string;
  pageTitleScale?: number;
  bannerPageTitle?: string;
  bannerStyle?: React.CSSProperties;
  noGap?: boolean;
  dashboardMode?: boolean;
  hideLogo?: boolean;
  hideExitBtn?: boolean;
}

export function MicroApp({
  pageTitle,
  pageTitleScale,
  bannerPageTitle,
  bannerStyle,
  noGap,
  dashboardMode,
  hideLogo,
  hideExitBtn,
}: MicroAppProps): React.ReactElement {
  const { dashboard_mode_logo_url } = getRuntime().getBrandSettings();
  const isShowNewUiMode = getNewUIStatus(true);
  const scale = (dashboardMode && pageTitleScale) || 1;
  const pageTitleStyle: React.CSSProperties =
    scale === 1
      ? null
      : {
          height: 76 * scale,
        };

  return (
    <>
      <div className="banner-container" style={bannerStyle}>
        <div className="banner-header-container">
          <div className="banner-page-title">
            {bannerPageTitle ? (
              <PageTitle pageTitle={bannerPageTitle} />
            ) : (
              <slot id="bannerTitleBarSlot" name="bannerTitleBar" />
            )}
          </div>
          <div className="banner-toolbar">
            <slot id="bannerToolbarSlot" name="bannerToolbar" />
          </div>
        </div>
        <slot id="bannerSlot" name="banner" />
      </div>
      <div
        className={classNames("micro-app-container", {
          "micro-view-container": isShowNewUiMode,
        })}
      >
        <div className="header-container">
          <div className="page-title" style={pageTitleStyle}>
            {pageTitle ? (
              <PageTitle
                pageTitle={pageTitle}
                pageTitleScale={scale}
                dashboardMode={dashboardMode}
              />
            ) : (
              <slot id="titleBarSlot" name="titleBar" />
            )}
          </div>
          <div className="toolbar">
            <slot id="toolbarSlot" name="toolbar" />
          </div>
          {dashboardMode && (
            <>
              {!hideLogo && (
                <div className="logo-in-dashboard-mode">
                  {dashboard_mode_logo_url ? (
                    <img src={dashboard_mode_logo_url} style={{ height: 32 }} />
                  ) : (
                    <Logo />
                  )}
                </div>
              )}
              {!hideExitBtn && <BtnExitDashboardMode />}
            </>
          )}
        </div>
        <div className="main-container">
          <div className="sub-menu-container">
            <slot id="subMenuSlot" name="subMenu" />
          </div>
          <div className="content-container">
            <div
              className={classNames("content-grid", {
                "no-gap": noGap,
              })}
            >
              <slot id="contentSlot" name="content" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
