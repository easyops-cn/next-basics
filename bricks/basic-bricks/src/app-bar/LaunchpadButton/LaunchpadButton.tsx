import React, { useState } from "react";
import { getRuntime, getHistory } from "@next-core/brick-kit";
import { ReactComponent as LaunchpadSvg } from "../../images/launchpad.svg";
import styles from "./LaunchpadButton.module.css";
import { LaunchpadPortal } from "../LaunchpadPortal/LaunchpadPortal";

export function LaunchpadButton(): React.ReactElement {
  const [visible, setVisible] = React.useState(false);
  const openLaunchpad = async () => {
    setVisible(true);
  };

  const runtime = React.useMemo(() => getRuntime(), []);

  const handleLaunchpadClose = (): void => {
    setVisible(false);
  };
  const handleLaunchpadWillClose = React.useCallback((): void => {
    runtime.toggleLaunchpadEffect(false);
  }, [runtime]);

  React.useEffect(() => {
    const unlisten = getHistory().listen(() => {
      // 当切换页面时，关闭 Launchpad。
      handleLaunchpadWillClose();
      setVisible(false);
    });
    return unlisten;
  }, [handleLaunchpadWillClose]);

  React.useEffect(() => {
    if (visible) {
      // 当打开 Launchpad 时，开启背景模糊，收起悬浮展开模式。
      runtime.toggleLaunchpadEffect(true);
    }
  }, [runtime, visible]);

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
