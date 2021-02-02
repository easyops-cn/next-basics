import React from "react";
import classNames from "classnames";
import { useCurrentApp } from "@next-core/brick-kit";
import { SidebarSubMenu } from "@next-core/brick-types";
import { AppMenu, AppMenuProps } from "../AppMenu/AppMenu";
import { LogoBar } from "../LogoBar/LogoBar";
import { CollapseBar } from "../CollapseBar/CollapseBar";
import { AppSubMenu } from "../AppSubMenu/AppSubMenu";
import styles from "./MenuBar.module.css";

export type MenuBarProps = AppMenuProps & {
  subMenu: SidebarSubMenu;
};

export function MenuBar(props: MenuBarProps): React.ReactElement {
  const app = useCurrentApp();

  React.useEffect(() => {
    document.body.classList.toggle("menu-bar-collapsed", !!props.collapsed);
  }, [props.collapsed]);

  return (
    <div>
      <div
        className={classNames(styles.menuBar, {
          [styles.developing]: app?.status === "developing",
        })}
      >
        <LogoBar />
        <AppMenu {...props} />
        <CollapseBar collapsed={props.collapsed} />
      </div>
      {props.subMenu && <AppSubMenu subMenu={props.subMenu} />}
    </div>
  );
}
