import React from "react";
import { NavTip } from "@next-core/brick-types";
import { AppBarTips } from "../app-bar/AppBarTips/AppBarTips";

export function AppBarWrapper({
  isFixed = true,
  displayCenter = false,
}): React.ReactElement {
  const [tipList, setTipList] = React.useState<NavTip[]>([]);
  const [appbarHeight, setAppbarHeight] = React.useState<string>(
    `var(--app-bar-height)`
  );

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = e.detail ?? [];
    setTipList(list);
    setAppbarHeight(`calc(var(--app-bar-height) + ${list.length * 38}px)`);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
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
        {tipList.map((item: NavTip, index: number) => {
          return <AppBarTips key={index} text={item.text} info={item.info} />;
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
