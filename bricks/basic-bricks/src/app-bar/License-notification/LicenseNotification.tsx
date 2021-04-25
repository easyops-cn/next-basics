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

export function getUnionKey(key: string) {
  const { org } = getAuth();
  return `${key}:${org}`;
}

export function notificationFactory(expires: number) {
  const handleClose = () => {
    storage.setItem(getUnionKey(EXPIRING_DISMISSED), true);
    // 7 天内不在提示
    storage.setItem(
      getUnionKey(EXPIRING_DISMISSED_UNTIL),
      moment().unix() + 7 * 86400
    );
    notification.close(LICENSE_INFO);
  };

  const handleDelay = async () => {
    const { org } = getAuth();
    try {
      await CustomerApi_setOrgUpdating({
        orgId: org,
      });
      message.success("已申请延期");
      handleClose();
    } catch (err) {
      handleHttpError(err);
    }
  };

  const renderBtn = () => {
    return (
      <Button type="link" onClick={handleClose} className={styles.closeBtn}>
        {" "}
        不再提示{" "}
      </Button>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div style={{ marginTop: 15 }}>
          你的 org 即将在{" "}
          <span className={styles.highlight}>
            {moment.unix(expires).format("YYYY-MM-DD")}
          </span>{" "}
          过期，请联系 EasyOps 续期。{" "}
        </div>
        <span>或点击</span>
        <Button type="link" onClick={handleDelay}>
          一键申请延期
        </Button>
      </>
    );
  };

  return notification.warning({
    key: LICENSE_INFO,
    message: "提示",
    duration: 0,
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
    const expiringDismissed = getUnionKey(EXPIRING_DISMISSED);
    const expiringDismissedUntil = getUnionKey(EXPIRING_DISMISSED_UNTIL);

    if (now > notificationTime) {
      if (
        storage.getItem(expiringDismissed) &&
        now > storage.getItem(expiringDismissedUntil)
      ) {
        storage.removeItem(expiringDismissed);
        storage.removeItem(expiringDismissedUntil);
      }

      if (storage.getItem(expiringDismissed)) {
        return;
      }
      notificationFactory(expires);
    }
  }
}
