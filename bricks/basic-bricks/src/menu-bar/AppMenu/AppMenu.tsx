import React from "react";
import classNames from "classnames";
import { SidebarMenu } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import { GeneralIcon, Sidebar } from "@next-libs/basic-components";
import { MenuTooltip } from "./MenuTooltip/MenuTooltip";
import styles from "./AppMenu.module.css";

export interface AppMenuProps {
  menu: SidebarMenu;
  collapsed?: boolean;
}

export function AppMenu(props: AppMenuProps): React.ReactElement {
  const { menu, collapsed } = props;

  if (!menu) {
    return (
      <div
        className={classNames(styles.appMenu, {
          [styles.collapsed]: collapsed,
        })}
      />
    );
  }

  return (
    <div
      className={classNames(styles.appMenu, {
        [styles.collapsed]: collapsed,
      })}
    >
      <div className={styles.menuGroup}>
        {menu?.title && (
          <MenuTooltip collapsed={collapsed} title={menu.title}>
            {menu.link ? (
              <Link to={menu.link} className={styles.menuTitleLink}>
                <i className={styles.menuTitleIcon}>
                  <GeneralIcon icon={menu.icon} />
                </i>
                <span className={styles.menuTitleText}>{menu.title}</span>
              </Link>
            ) : (
              <a className={styles.menuTitleLink} role="button">
                <i className={styles.menuTitleIcon}>
                  <GeneralIcon icon={menu.icon} />
                </i>
                <span className={styles.menuTitleText}>{menu.title}</span>
              </a>
            )}
          </MenuTooltip>
        )}
        <div
          className={classNames(styles.menuContainer, {
            [styles.empty]: !(
              Array.isArray(menu.menuItems) && menu.menuItems.length > 0
            ),
          })}
        >
          <Sidebar
            menuItems={menu.menuItems || []}
            inlineIndent={30}
            collapsed={collapsed}
          ></Sidebar>
        </div>
      </div>
    </div>
  );
}
