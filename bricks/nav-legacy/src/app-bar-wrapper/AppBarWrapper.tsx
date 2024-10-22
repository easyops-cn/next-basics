import React from "react";
import { NavTip } from "@next-core/brick-types";
import { JsonStorage } from "@next-core/brick-utils";
import { getAuth, getRuntime, useCurrentApp } from "@next-core/brick-kit";
import moment from "moment";
import { AppBarTips } from "../app-bar/AppBarTips/AppBarTips";

const storage = new JsonStorage(localStorage);

export function AppBarWrapper({
  isFixed = true,
  displayCenter = false,
  extraAppBarContentStyle = {},
}): React.ReactElement {
  const [tipList, setTipList] = React.useState<NavTip[]>([]);
  const [appbarHeight, setAppbarHeight] = React.useState<string>(
    `var(--app-bar-height)`
  );
  const currentApp = useCurrentApp();

  const isV3 = React.useMemo(() => {
    const runtime = getRuntime();
    return runtime.getFeatureFlags()["migrate-to-brick-next-v3"];
  }, []);

  const handleShowTips = React.useCallback<EventListener>((e): void => {
    const list = (e as CustomEvent<NavTip[]>).detail ?? [];
    // 可关闭的tip，用户关闭后过一天才会重新显示
    setTipList((previous) =>
      previous
        .filter((prev) => !list.some((item) => item.tipKey === prev.tipKey))
        .concat(
          list.filter((item) => {
            return !(
              item.closable &&
              storage.getItem(item.tipKey) &&
              moment().unix() <= storage.getItem(item.tipKey)
            );
          })
        )
    );
  }, []);

  const handleCloseTips = (targetKey: string): void => {
    const list = tipList.filter((item) => item.tipKey !== targetKey);
    setTipList(list);
    window.dispatchEvent(new CustomEvent("app.bar.tips", { detail: list }));
  };

  React.useEffect(() => {
    const newHeight = tipList.length
      ? `calc(var(--app-bar-height) + ${tipList.length * 32}px)`
      : "var(--app-bar-height)";
    setAppbarHeight(newHeight);
    document.documentElement.style.setProperty(
      "--app-bar-height-with-tips",
      newHeight
    );
  }, [tipList]);

  React.useEffect(() => {
    if (isV3) {
      const auth = getAuth();
      const validDaysLeft: number = auth.license?.validDaysLeft;
      if (validDaysLeft && validDaysLeft <= 15 && auth.isAdmin) {
        handleShowTips(
          new CustomEvent<NavTip[]>("app.bar.tips", {
            detail: [
              {
                text: `离 License 过期还有 ${validDaysLeft} 天`,
                tipKey: `license:${auth.org}`,
                closable: true,
                isCenter: true,
                backgroundColor: "var(--color-info-bg)",
              },
            ],
          })
        );
      }
      return;
    }
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, [isV3, handleShowTips]);

  React.useEffect(() => {
    if (isV3) {
      const auth = getAuth();
      const handelRouteRender = (e: Event): void => {
        const renderTime = (e as CustomEvent<{ renderTime: number }>).detail
          .renderTime;
        const { loadTime, loadInfoPage } = getRuntime().getMiscSettings();
        if (currentApp.isBuildPush && loadTime > 0 && renderTime > loadTime) {
          const getSecond = (time: number): number =>
            Math.floor(time * 100) / 100;
          handleShowTips(
            new CustomEvent<NavTip[]>("app.bar.tips", {
              detail: [
                {
                  text: `您的页面存在性能问题, 当前页面渲染时间 ${getSecond(
                    renderTime / 1000
                  )} 秒, 规定阈值为: ${getSecond(
                    (loadTime as number) / 1000
                  )} 秒, 您已超过。请您针对该页面进行性能优化!`,
                  closable: false,
                  isCenter: true,
                  tipKey: `render:${auth.org}`,
                  backgroundColor: "var(--color-warning-bg)",
                  ...(loadInfoPage
                    ? {
                        info: {
                          label: "建议解决思路",
                          url: loadInfoPage as string,
                        },
                      }
                    : {}),
                },
              ],
            })
          );
        }
      };
      window.addEventListener("route.render", handelRouteRender);
      return () => {
        window.removeEventListener("route.render", handelRouteRender);
      };
    }
  }, [isV3, handleShowTips, currentApp]);

  React.useEffect(() => {
    const mainElement = document.getElementById("main-mount-point");
    const iframeMainElement = document.getElementById(
      "legacy-iframe-mount-point"
    );
    mainElement && (mainElement.style.marginTop = "");
    iframeMainElement && (iframeMainElement.style.marginTop = "");
  }, []);

  return (
    <div
      className="app-bar-container"
      style={{
        height: appbarHeight,
      }}
    >
      <div
        className="app-bar"
        style={{
          position: isFixed ? "fixed" : "absolute",
        }}
      >
        {tipList.map((item: NavTip) => {
          return (
            <AppBarTips
              key={item.tipKey}
              tipKey={item.tipKey}
              text={item.text}
              info={item.info}
              isCenter={item.isCenter}
              backgroundColor={item.backgroundColor}
              closable={item.closable}
              onClose={handleCloseTips}
            />
          );
        })}
        <div
          className="app-bar-content"
          style={{
            justifyContent: displayCenter ? "space-around" : "space-between",
            ...extraAppBarContentStyle,
          }}
        >
          <div className="leftContainer">
            <slot name="leftContainer"></slot>
          </div>
          <div className="rightContainer">
            <slot name="rightContainer"></slot>
          </div>
        </div>
      </div>
    </div>
  );
}
