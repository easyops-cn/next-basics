import React from "react";
import { NavTip } from "@next-core/brick-types";
import { AppBarTips } from "../app-bar/AppBarTips/AppBarTips";
import { JsonStorage } from "@next-core/brick-utils";
import moment from "moment";

export function AppBarWrapper({
  isFixed = true,
  displayCenter = false,
}): React.ReactElement {
  const [tipList, setTipList] = React.useState<NavTip[]>([]);
  const [appbarHeight, setAppbarHeight] = React.useState<string>(
    `var(--app-bar-height)`
  );

  const storage = new JsonStorage(localStorage);

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = e.detail ?? [];
    // 可关闭的tip，用户关闭后过一天才会重新显示
    const res = list.filter((item) => {
      const isTipClosing =
        item.closable &&
        storage.getItem(item.tipKey) &&
        moment().unix() <= storage.getItem(item.tipKey);
      return !isTipClosing;
    });
    setTipList(res);
  }) as EventListener;

  const handleCloseTips = (targetKey: string): void => {
    const list = tipList.filter((item) => item.tipKey !== targetKey);
    setTipList(list);
    window.dispatchEvent(new CustomEvent("app.bar.tips", { detail: list }));
  };

  React.useEffect(() => {
    setAppbarHeight(`calc(var(--app-bar-height) + ${tipList.length * 32}px)`);
  }, [tipList]);

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

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
