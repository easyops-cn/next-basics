import React from "react";
import classNames from "classnames";
import {
  getRuntime,
  useCurrentApp,
  useLocation,
  RelatedApp,
} from "@next-core/brick-kit";
import { SidebarMenu, MatchResult } from "@next-core/brick-types";
import { matchPath } from "@next-core/brick-utils";
import { Link } from "@next-libs/basic-components";
import { GeneralIcon, Sidebar } from "@next-libs/basic-components";
import { OtherAppMenu } from "./OtherAppMenu/OtherAppMenu";
import { MenuTooltip } from "./MenuTooltip/MenuTooltip";
import styles from "./AppMenu.module.css";

export interface AppMenuProps {
  menu: SidebarMenu;
  collapsed?: boolean;
}

export function getRelatedAppsByPath(
  relatedApps: RelatedApp[],
  pathname: string
): {
  matchResult: MatchResult;
  prependApps: RelatedApp[];
  appendApps: RelatedApp[];
} {
  let matchResult: MatchResult;
  let prependApps: RelatedApp[] = [];
  let appendApps: RelatedApp[] = [];

  const matchedAppIndex = relatedApps.findIndex((app) => {
    const path = app.subPath.replace(/\$\{(\w+)\}/g, ":$1");
    matchResult = matchPath(pathname, {
      path,
    });
    return matchResult;
  });

  if (matchedAppIndex !== -1) {
    prependApps = relatedApps.slice(0, matchedAppIndex);
    appendApps = relatedApps.slice(matchedAppIndex + 1);
  }
  return { matchResult, prependApps, appendApps };
}

export function AppMenu(props: AppMenuProps): React.ReactElement {
  const location = useLocation();
  const app = useCurrentApp();
  const [prependApps, setPrependApps] = React.useState<RelatedApp[]>([]);
  const [appendApps, setAppendApps] = React.useState<RelatedApp[]>([]);
  const [matchResult, setMatchResult] = React.useState<MatchResult>();

  const { menu, collapsed } = props;
  const showRelatedApps = menu?.showRelatedApps;
  const [menus, setMenus] = React.useState<SidebarMenu>(menu);

  const getMenu = async (): Promise<void> => {
    if (menu) return;
    const appMenu = getRuntime().getCurrentRoute().menu;

    if (appMenu && "menuId" in appMenu) {
      const menu = await getRuntime().fetchMenu(appMenu?.menuId);
      setMenus(menu);
    }
  };

  React.useEffect(() => {
    getMenu();
  }, []);

  React.useEffect(() => {
    (async () => {
      // `location.pathname` will be changed before app and menu changed.
      // If the current location is not matching `app.homepage`,
      // ignore the related apps refreshing.
      if (
        !app ||
        !matchPath(location.pathname, {
          path: app.homepage,
        })
      ) {
        return;
      }
      const relatedApps = await getRuntime().getRelatedAppsAsync(app.id);
      const tmp = getRelatedAppsByPath(
        showRelatedApps ? relatedApps : [],
        location.pathname
      );
      setPrependApps(tmp.prependApps);
      setAppendApps(tmp.appendApps);
      setMatchResult(tmp.matchResult);
    })();
  }, [app, location.pathname, showRelatedApps]);

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
      {prependApps.map((app) => (
        <OtherAppMenu
          app={app}
          matchResult={matchResult}
          collapsed={collapsed}
          key={app.microAppId}
        />
      ))}
      <div className={styles.menuGroup}>
        {menus?.title && (
          <MenuTooltip collapsed={collapsed} title={menus.title}>
            {menus.link ? (
              <Link to={menus.link} className={styles.menuTitleLink}>
                <i className={styles.menuTitleIcon}>
                  <GeneralIcon icon={menus.icon} />
                </i>
                <span className={styles.menuTitleText}>{menus.title}</span>
              </Link>
            ) : (
              <a className={styles.menuTitleLink} role="button">
                <i className={styles.menuTitleIcon}>
                  <GeneralIcon icon={menus.icon} />
                </i>
                <span className={styles.menuTitleText}>{menus.title}</span>
              </a>
            )}
          </MenuTooltip>
        )}
        <div
          className={classNames(styles.menuContainer, {
            [styles.empty]: !(
              Array.isArray(menus.menuItems) && menus.menuItems.length > 0
            ),
          })}
        >
          <Sidebar
            menuItems={menus.menuItems || []}
            inlineIndent={30}
            collapsed={collapsed}
          ></Sidebar>
        </div>
      </div>
      {appendApps.map((app) => (
        <OtherAppMenu
          app={app}
          matchResult={matchResult}
          collapsed={collapsed}
          key={app.microAppId}
        />
      ))}
    </div>
  );
}
