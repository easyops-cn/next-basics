import React from "react";
import moment from "moment";
import { JsonStorage } from "@next-libs/storage";
import { handleHttpError, getAuth } from "@next-core/brick-kit";
import { CustomerApi_setOrgUpdating } from "@next-sdk/air-admin-service-sdk";
import { notification, Button, message } from "antd";
import styles from "./LicenseInfo.module.css";

export const LICENSE_INFO = "license-info";
export const EXPIRING_DISMISSED_UNTIL = "licenseExpiringDismissedUntil";
export const EXPIRING_DISMISSED = "licenseExpiringDismissed";

const storage = new JsonStorage(localStorage);

export function notificationFactory(expires: number) {
  const handleClose = () => {
    storage.setItem(EXPIRING_DISMISSED, true);
    // 7 天内不在提示
    storage.setItem(EXPIRING_DISMISSED_UNTIL, moment().unix() + 7 * 86400);
    notification.close(LICENSE_INFO);
  };

  const handleDelay = async () => {
    const { org } = getAuth();
    try {
      await CustomerApi_setOrgUpdating({
        orgId: org,
      });
      message.success("已申请延期");
      notification.close(LICENSE_INFO);
    } catch (err) {
      handleHttpError(err);
    }
  };

  const renderBtn = () => {
    return (
      <>
        <Button type="primary" onClick={handleDelay} style={{ marginRight: 8 }}>
          申请延期
        </Button>
        <Button type="link" onClick={handleClose}>
          {" "}
          不再提示{" "}
        </Button>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div style={{ marginBottom: 10 }}>
        你的 org 即将在{" "}
        <span className={styles.highlight}>
          {moment.unix(expires).format("YYYY-MM-DD")}
        </span>{" "}
        过期，请联系 EasyOps 续期。{" "}
      </div>
    );
  };

  return notification.warning({
    key: LICENSE_INFO,
    message: "提示",
    duration: 5,
    description: renderContent(),
    btn: renderBtn(),
    style: {
      width: 580,
    },
  });
}

export function processLiscenseExpires(expires: number): void {
  // istanbul ignore else
  if (typeof expires === "number" && expires !== 0) {
    // 提前三十天提醒
    const notificationTime = expires - 30 * 86400;
    const now = moment().unix();

    if (now > notificationTime) {
      if (
        storage.getItem(EXPIRING_DISMISSED) &&
        now > storage.getItem(EXPIRING_DISMISSED_UNTIL)
      ) {
        storage.removeItem(EXPIRING_DISMISSED);
        storage.removeItem(EXPIRING_DISMISSED_UNTIL);
      }

      if (storage.getItem(EXPIRING_DISMISSED)) {
        return;
      }
      notificationFactory(expires);
    }
  }
}
