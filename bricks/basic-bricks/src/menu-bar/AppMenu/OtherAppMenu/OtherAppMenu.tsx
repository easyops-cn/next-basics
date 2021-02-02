import React from "react";
import classNames from "classnames";
import { getRuntime, RelatedApp } from "@next-core/brick-kit";
import { MatchResult } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "../AppMenu.module.css";
import { MenuTooltip } from "../MenuTooltip/MenuTooltip";

export function OtherAppMenu(props: {
  app: RelatedApp;
  matchResult: MatchResult;
  collapsed: boolean;
}): React.ReactElement {
  const realApp = getRuntime()
    .getMicroApps({ excludeInstalling: true, includeInternal: true })
    .find((item) => item.id === props.app.microAppId);
  if (!realApp) {
    return null;
  }
  return (
    <div className={classNames(styles.menuGroup)}>
      <div className={styles.menuTitle}>
        <MenuTooltip collapsed={props.collapsed} title={realApp.localeName}>
          <Link
            to={replaceParams(props.app.subPath, props.matchResult)}
            className={styles.menuTitleLink}
          >
            <i className={styles.menuTitleIcon}>
              <GeneralIcon
                icon={
                  realApp.menuIcon || {
                    lib: "antd",
                    type: "question-circle",
                  }
                }
              />
            </i>
            <span className={styles.menuTitleText}>{realApp.localeName}</span>
          </Link>
        </MenuTooltip>
      </div>
    </div>
  );
}

function replaceParams(path: string, match: MatchResult): string {
  let result = path;
  if (match?.params) {
    for (const [key, value] of Object.entries(match.params)) {
      result = result.replace(`\${${key}}`, value);
    }
  }
  return result;
}
