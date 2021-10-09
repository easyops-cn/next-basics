import React from "react";
import styles from "./NavBar.module.css";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";

export function NavBar(): React.ReactElement {
  const { t } = useTranslation(NS_FRAME_BRICKS);

  return <div className={styles.navBarContainer}>nav-bar works!</div>;
}
