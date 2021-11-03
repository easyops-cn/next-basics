import React, { ReactComponentElement } from "react";
import { Link } from "@next-libs/basic-components";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../../images/logo-3.1.svg";
import { getRuntime } from "@next-core/brick-kit";

export function LogoBar(): React.ReactElement {
  const brand = getRuntime().getBrandSettings();
  const logo: React.ReactElement = brand.menu_bar_logo_url ? (
    <img
      src={brand.menu_bar_logo_url}
      style={{ height: 32, verticalAlign: "top" }}
    />
  ) : (
    <Logo height={32} style={{ verticalAlign: "top" }} />
  );
  return (
    <div className={styles.logoBar}>
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
