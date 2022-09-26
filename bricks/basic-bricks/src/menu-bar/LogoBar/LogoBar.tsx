import React from "react";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../../images/logo-3.1.svg";
import { getRuntime } from "@next-core/brick-kit";
import classnames from "classnames";

export function LogoBar(): React.ReactElement {
  const brand = getRuntime().getBrandSettings();
  const currentApp = getRuntime().getCurrentApp();
  const flag = getRuntime().getFeatureFlags();
  const isUseUI8 =
    currentApp?.layoutType === "business" && flag["support-ui-8.0-base-layout"];
  const logo: React.ReactElement = brand.menu_bar_logo_url ? (
    <img
      src={brand.menu_bar_logo_url}
      style={{
        height: isUseUI8 ? 24 : 32,
        verticalAlign: "top",
        paddingRight: isUseUI8 ? 12 : 0,
      }}
    />
  ) : isUseUI8 ? (
    <GeneralIcon
      icon={{
        category: "blueprint",
        color: "var(--color-brand)",
        icon: "easyops",
        lib: "easyops",
      }}
      style={{
        fontSize: 24,
        paddingRight: 12,
        marginTop: 2,
        cursor: "pointer",
      }}
    />
  ) : (
    <Logo height={32} style={{ verticalAlign: "top" }} />
  );
  return (
    <div
      className={classnames(styles.logoBar, {
        [styles.ui8]: isUseUI8,
        [styles.ui5]: !isUseUI8,
      })}
    >
      {brand.menu_bar_logo_no_link === "true" ? (
        <span className={styles.logoLink}>{logo}</span>
      ) : (
        <Link to="/" className={styles.logoLink}>
          {logo}
        </Link>
      )}
    </div>
  );
}
