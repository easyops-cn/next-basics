import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useCurrentApp } from "@next-core/brick-kit";
import { NavTip, SidebarSubMenu } from "@next-core/brick-types";
import { AppMenu, AppMenuProps } from "../AppMenu/AppMenu";
import { LogoBar } from "../LogoBar/LogoBar";
import { CollapseBar } from "../CollapseBar/CollapseBar";
import { AppSubMenu } from "../AppSubMenu/AppSubMenu";
import styles from "./MenuBar.module.css";
import { JsonStorage } from "@next-libs/storage";
import moment from "moment";

export type MenuBarProps = AppMenuProps & {
  subMenu: SidebarSubMenu;
};

export function MenuBar(props: MenuBarProps): React.ReactElement {
  const app = useCurrentApp();
  const [tipList, setTipList] = useState<NavTip[]>([]);
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const subMenuRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    document.body.classList.toggle("menu-bar-collapsed", !!props.collapsed);
  }, [props.collapsed]);

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = (e.detail ?? []).filter((item) => {
      const isTipClosing =
        item.closable &&
        storage.getItem(item.tipKey) &&
        moment().unix() <= storage.getItem(item.tipKey);
      return !isTipClosing;
    });
    setTipList(list);
  }) as EventListener;

  React.useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  useEffect(() => {
    const subMenu = subMenuRef.current;
    const sidebarHeight = `calc(100vh - var(--app-bar-height) + 1px - ${
      tipList.length * 32
    }px)`;
    const top = `calc(var(--app-bar-height) + ${tipList.length * 32}px)`;
    subMenu && (subMenu.style.height = sidebarHeight);
    subMenu && (subMenu.style.top = top);
  }, [tipList, subMenuRef]);

  return (
    <div>
      <div
        className={classNames(styles.menuBar, {
          [styles.developing]: app?.status === "developing",
        })}
        data-testid="main-menu-bar"
      >
        <LogoBar />
        <AppMenu {...props} />
        <CollapseBar collapsed={props.collapsed} />
      </div>
      {props.subMenu && (
        <AppSubMenu subMenu={props.subMenu} subMenuRef={subMenuRef} />
      )}
    </div>
  );
}
