import React from "react";
import { NavTip } from "@next-core/brick-types";
import { AppBarTips } from "../app-bar/AppBarTips/AppBarTips";

export function AppBarWrapper({
  isFixed = true,
  displayCenter = false,
}): React.ReactElement {
  const [tipList, setTipList] = React.useState<NavTip[]>([]);

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = e.detail ?? [];
    const marginTop = `${list.length * 38}px`;
    const isUseHomepageBaseModule =
      document.getElementsByTagName("base-layout.tpl-homepage-base-module")
        .length > 0 ||
      document.getElementsByTagName("base-layout.tpl-homepage-base-module-cmdb")
        .length > 0;
    if (isUseHomepageBaseModule) {
      const navElement = document.getElementsByTagName(
        "base-layout.tpl-navigation-bar-widget"
      );
      navElement.length &&
        ((navElement[0] as HTMLElement).style.marginTop = marginTop);
    } else {
      const view = document.getElementsByTagName(
        "base-layout.tpl-micro-view-with-breadcrumb"
      )?.[0];
      view && ((view as HTMLElement).style.marginTop = marginTop);
    }
    setTipList(list);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  return (
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
  );
}
