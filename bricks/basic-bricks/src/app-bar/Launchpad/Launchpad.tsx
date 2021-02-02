import React from "react";
import { CSSTransition } from "react-transition-group";
import { getRuntime, handleHttpError } from "@next-core/brick-kit";
import { MicroApp } from "@next-core/brick-types";
import { SearchBar } from "../SearchBar/SearchBar";
import { DesktopSlider } from "../DesktopSlider/DesktopSlider";
import { DesktopDirContext, DirWithCoordinates } from "../DesktopDirContext";
import { LaunchpadSettingsContext } from "../LaunchpadSettingsContext";
import { DesktopDirContent } from "../DesktopDirContent/DesktopDirContent";
import styles from "./Launchpad.module.css";

export interface LaunchpadProps {
  onWillClose?: () => void;
}

export function Launchpad(props: LaunchpadProps): React.ReactElement {
  const runtime = getRuntime();

  const desktops = runtime.getDesktops();
  const settings = runtime.getLaunchpadSettings();

  const getFilterMicroApps = (): MicroApp[] =>
    // 过滤掉状态为开发中的小产品
    runtime
      .getMicroApps()
      // 兼容较老版本接口未返回 `status` 的情况。
      .filter(
        (item) =>
          !item.status ||
          item.status === "enabled" ||
          item.status === "developing"
      );

  const [q, setQ] = React.useState("");
  const [microApps, setMicroApps] = React.useState(getFilterMicroApps());
  const [desktopDir, setDesktopDir] = React.useState<DirWithCoordinates>();

  React.useEffect((): (() => void) => {
    let timer: NodeJS.Timeout;
    const pollingRunningAppStatus = async (): Promise<void> => {
      try {
        await runtime.reloadMicroApps({
          ignoreLoadingBar: true,
        });
        const reloadApps = getFilterMicroApps();
        const installingApp = reloadApps.filter(
          (app: MicroApp) => app.installStatus === "running"
        );
        if (installingApp.length) {
          timer = setTimeout(pollingRunningAppStatus, 1000);
        } else {
          setMicroApps(getFilterMicroApps());
        }
      } catch (error) {
        props.onWillClose();
        handleHttpError(error);
      }
    };
    pollingRunningAppStatus();
    return (): void => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const onKeydown = (event: KeyboardEvent): void => {
      const key =
        event.key ||
        /* istanbul ignore next: compatibility */ event.keyCode ||
        /* istanbul ignore next: compatibility */ event.which;
      if (key === "Escape" || key === 27) {
        props.onWillClose();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [props.onWillClose]);

  const handleChange = (value: string): void => {
    setQ(value);
  };

  const arrowWidthPercent = 9;

  return (
    <LaunchpadSettingsContext.Provider value={settings}>
      <DesktopDirContext.Provider
        value={{
          desktopDir,
          setDesktopDir,
        }}
      >
        <div className={styles.launchpad} onClick={props.onWillClose}>
          <CSSTransition
            in={!desktopDir}
            timeout={100}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
              exitDone: styles.fadeExitDone,
            }}
          >
            <div className={styles.launchpadContainer}>
              <SearchBar onChange={handleChange} />
              <DesktopSlider
                q={q}
                microApps={microApps}
                desktops={desktops}
                arrowWidthPercent={arrowWidthPercent}
              />
            </div>
          </CSSTransition>
          {desktopDir && (
            <DesktopDirContent
              {...desktopDir}
              arrowWidthPercent={arrowWidthPercent}
            />
          )}
        </div>
      </DesktopDirContext.Provider>
    </LaunchpadSettingsContext.Provider>
  );
}
