import React from "react";
import { Divider } from "antd";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { getAuth, getRuntime } from "@next-core/brick-kit";
import { CustomerApi_getExpiration } from "@next-sdk/air-admin-service-sdk";
import { LaunchpadButton } from "../LaunchpadButton/LaunchpadButton";
import { AppBarBreadcrumb } from "../AppBarBreadcrumb/AppBarBreadcrumb";
import { AppDocumentLink } from "../AppDocumentLink/AppDocumentLink";
import { AppSetting } from "../AppSetting/AppSetting";
import { processLiscenseExpires } from "../License-notification/LicenseNotification";
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

  return (
    <div className={styles.appBar} id="app-bar">
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

        <AppBarBreadcrumb breadcrumb={breadcrumb} noCurrentApp={noCurrentApp} />
      </div>
      <div className={styles.actionsContainer}>
        <AppDocumentLink documentId={documentId} />
        <AppSetting />
      </div>
    </div>
  );
}
