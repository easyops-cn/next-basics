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
import { JsonStorage } from "@next-core/brick-utils";
import moment from "moment";

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
  const storage = new JsonStorage(localStorage);

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
    // 可关闭的tip，用户关闭后过一天才会重新显示
    const list = (e.detail ?? []).filter((item) => {
      const isTipClosing =
        item.closable &&
        storage.getItem(item.tipKey) &&
        moment().unix() <= storage.getItem(item.tipKey);
      return !isTipClosing;
    });
    setTipList(list);
  }) as EventListener;

  const handleCloseTips = (targetKey: string) => {
    const list = tipList.filter((item) => item.tipKey !== targetKey);
    setTipList(list);
    window.dispatchEvent(new CustomEvent("app.bar.tips", { detail: list }));
  };

  React.useEffect(() => {
    let marginTop = "";
    const mainElement = document.getElementById("main-mount-point");
    const iframeMainElement = document.getElementById(
      "legacy-iframe-mount-point"
    );
    if (tipList.length) {
      marginTop = `calc(var(--app-bar-height) + ${tipList.length * 32}px)`;
    }
    mainElement && (mainElement.style.marginTop = marginTop);
    iframeMainElement && (iframeMainElement.style.marginTop = marginTop);
  }, [tipList]);

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  return (
    <div className={styles.appBar} id="app-bar">
      {tipList.map((item: NavTip) => {
        return (
          <AppBarTips
            key={item.tipKey}
            tipKey={item.tipKey}
            text={item.text}
            info={item.info}
            isCenter={item.isCenter}
            backgroundColor={item.backgroundColor}
            closable={item.closable}
            onClose={handleCloseTips}
          />
        );
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
