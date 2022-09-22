import React, { useCallback, useEffect, useState } from "react";
import { getRuntime, getHistory } from "@next-core/brick-kit";
import { ReactComponent as LaunchpadSvg } from "../../images/launchpad.svg";
import styles from "./LaunchpadButton.module.css";
import { LaunchpadPortal } from "../LaunchpadPortal/LaunchpadPortal";
import hotkeys from "hotkeys-js";
import { launchpadService } from "../LaunchpadService";

export function LaunchpadButton(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const openLaunchpad = (): void => {
    setVisible(true);
  };

  const handleLaunchpadClose = (): void => {
    setVisible(false);
  };
  const handleLaunchpadWillClose = useCallback((): void => {
    getRuntime().toggleLaunchpadEffect(false);
  }, []);

  useEffect(() => {
    launchpadService.init();
  }, []);

  useEffect(() => {
    const unlisten = getHistory().listen(() => {
      // 当切换页面时，关闭 Launchpad。
      handleLaunchpadWillClose();
      setVisible(false);
    });
    return unlisten;
  }, [handleLaunchpadWillClose]);

  useEffect(() => {
    hotkeys.filter = function () {
      return true;
    };

    hotkeys("alt+l", (event) => {
      event.preventDefault();
      setVisible((preVisble) => {
        const curVisble = !preVisble;
        if (!curVisble) handleLaunchpadWillClose();
        return curVisble;
      });
    });

    return () => {
      hotkeys.unbind("alt+l");
    };
  }, [handleLaunchpadWillClose]);

  useEffect(() => {
    // 当打开/关闭 Launchpad 时，切换背景模糊，切换悬浮展开模式；
    getRuntime().toggleLaunchpadEffect(visible);
  }, [visible]);

  return (
    <>
      <a role="button" className={styles.launchpadLink} onClick={openLaunchpad}>
        <LaunchpadSvg className={styles.launchpadIcon} width={16} height={16} />
      </a>
      <LaunchpadPortal
        visible={visible}
        onWillClose={handleLaunchpadWillClose}
        onClose={handleLaunchpadClose}
      />
    </>
  );
}
