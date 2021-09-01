import React from "react";
import classNames from "classnames";
import { PageTitle } from "../page-title/PageTitle";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { BtnExitDashboardMode } from "./BtnExitDashboardMode";
import { getRuntime } from "@next-core/brick-kit";

interface MicroAppProps {
  bannerPageTitle?: string;
  bannerStyle?: React.CSSProperties;
  pageTitle?: string;
  noGap?: boolean;
  dashboardMode?: boolean;
}

export function MicroApp(props: MicroAppProps): React.ReactElement {
  const { dashboard_mode_logo_url } = getRuntime().getBrandSettings();
  return (
    <>
      <div className="banner-container" style={props.bannerStyle}>
        <div className="banner-header-container">
          <div className="banner-page-title">
            {props.bannerPageTitle ? (
              <PageTitle pageTitle={props.bannerPageTitle} />
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
      <div className="micro-app-container">
        <div className="header-container">
          <div className="page-title">
            {props.pageTitle ? (
              <PageTitle
                pageTitle={props.pageTitle}
                dashboardMode={props.dashboardMode}
              />
            ) : (
              <slot id="titleBarSlot" name="titleBar" />
            )}
          </div>
          <div className="toolbar">
            <slot id="toolbarSlot" name="toolbar" />
          </div>
          {props.dashboardMode && (
            <>
              <div className="logo-in-dashboard-mode">
                {dashboard_mode_logo_url ? (
                  <img src={dashboard_mode_logo_url} style={{ height: 32 }} />
                ) : (
                  <Logo />
                )}
              </div>
              <BtnExitDashboardMode />
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
                "no-gap": props.noGap,
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
