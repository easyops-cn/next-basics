import React from "react";
import { SidebarSubMenu } from "@next-core/brick-types";
import { Sidebar } from "@next-libs/basic-components";
import styles from "./AppSubMenu.module.css";

interface AppSubMenuProps {
  subMenu: SidebarSubMenu;
}

export function AppSubMenu({ subMenu }: AppSubMenuProps): React.ReactElement {
  React.useEffect(() => {
    document.body.classList.add("has-sub-menu");
    return () => {
      document.body.classList.remove("has-sub-menu");
    };
  }, []);

  return (
    <div className={styles.appSubMenu} data-testid="sub-menu-bar">
      <div className={styles.appSubMenuTitle}>{subMenu.title}</div>
      <Sidebar menuItems={subMenu.menuItems} inlineIndent={20} theme="light" />
    </div>
  );
}
