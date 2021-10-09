import React from "react";
import styles from "./SideBar.module.css";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";

export function SideBar(): React.ReactElement {
  const { t } = useTranslation(NS_FRAME_BRICKS);

  return <div className={styles.sideBarContainer}>side-bar works!</div>;
}
