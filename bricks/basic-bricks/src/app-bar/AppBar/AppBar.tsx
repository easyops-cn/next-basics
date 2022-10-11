import React from "react";
import { Divider } from "antd";
import { BreadcrumbItemConf, NavTip } from "@next-core/brick-types";
import { getAuth, getRuntime } from "@next-core/brick-kit";
import { CustomerApi_getExpiration } from "@next-sdk/air-admin-service-sdk";
import { LaunchpadButton } from "../LaunchpadButton/LaunchpadButton";
import { AppBarBreadcrumb } from "../AppBarBreadcrumb/AppBarBreadcrumb";
import { AppDocumentLink } from "../AppDocumentLink/AppDocumentLink";
import { AppSetting } from "../AppSetting/AppSetting";
import { processLiscenseExpires } from "../License-notification/LicenseNotification";
import { AppBarTips } from "../AppBarTips/AppBarTips";
import styles from "./AppBar.module.css";

interface AppBarProps {
  pageTitle: string;
  breadcrumb?: BreadcrumbItemConf[];
  documentId?: string;
  noCurrentApp?: boolean;
}

export function AppBar({
  pageTitle,
  breadcrumb,
  documentId,
  noCurrentApp,
}: AppBarProps): React.ReactElement {
  const [tipList, setTipList] = React.useState<NavTip[]>([]);

  const hideLaunchpadButton = React.useMemo(
    () => getRuntime().getFeatureFlags()["hide-launchpad-button"],
    []
  );

  const licenseInfoEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["license-expires-detection"],
    []
  );

  React.useEffect(() => {
    const baseTitle = getRuntime().getBrandSettings().base_title;
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;
  }, [pageTitle]);

  const username = getAuth().username;

  React.useEffect(() => {
    (async () => {
      if (licenseInfoEnabled && username) {
        try {
          const { expires, updating } = await CustomerApi_getExpiration();
          // org 为延期中的不提示
          !updating && processLiscenseExpires(expires);
        } catch (error) {
          // eslint-disable-next-line no-empty
        }
      }
    })();
  }, [username]);

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = e.detail ?? [];
    const marginTop = `calc(var(--app-bar-height) + ${list.length * 38}px)`;
    const mainElement = document.getElementById("main-mount-point");
    const iframeMainElement = document.getElementById("main-mount-point");
    mainElement && (mainElement.style.marginTop = marginTop);
    iframeMainElement && (iframeMainElement.style.marginTop = marginTop);
    setTipList(list);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  return (
    <div className={styles.appBar} id="app-bar">
      {tipList.map((item: NavTip, index: number) => {
        return <AppBarTips key={index} text={item.text} info={item.info} />;
      })}
      <div className={styles.appBarContent}>
        <div className={styles.titleContainer}>
          {!hideLaunchpadButton && (
            <>
              <LaunchpadButton />
              <Divider
                type="vertical"
                style={{ height: 24, margin: "0 16px", top: 0 }}
              />
            </>
          )}

          <AppBarBreadcrumb
            breadcrumb={breadcrumb}
            noCurrentApp={noCurrentApp}
          />
        </div>
        <div className={styles.actionsContainer}>
          <AppDocumentLink documentId={documentId} />
          <AppSetting />
        </div>
      </div>
    </div>
  );
}
