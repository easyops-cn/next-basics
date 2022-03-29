import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { useRecentApps, getRuntime, getHistory } from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./AppBarBreadcrumb.module.css";
import classnames from "classnames";

export interface BasicBreadcrumbProps {
  breadcrumb?: BreadcrumbItemConf[];
  className?: string;
  separator?: string;
  noCurrentApp?: boolean;
  showCurrentAppIcon?: boolean;
}

export function AppBarBreadcrumb(
  props: BasicBreadcrumbProps
): React.ReactElement {
  const { currentApp, previousWorkspace } = useRecentApps();
  const { items: breadcrumbItems } = currentApp?.breadcrumb || {};

  const handleGoBackPreviousWorkspace = (): void => {
    getRuntime().popWorkspaceStack();
    getHistory().push(previousWorkspace.url);
  };

  return (
    <div className={classnames(styles.breadcrumbContainer, props.className)}>
      {previousWorkspace && (
        <a
          role="button"
          className={styles.workspaceButton}
          onClick={handleGoBackPreviousWorkspace}
        >
          <GeneralIcon icon={{ lib: "fa", icon: "reply" }} />
          <span style={{ marginLeft: 7 }}>
            {previousWorkspace.appLocaleName}
          </span>
        </a>
      )}
      <Breadcrumb separator={props.separator || ">"}>
        {breadcrumbItems &&
          breadcrumbItems.map((item: BreadcrumbItemConf, index: number) => {
            return (
              <Breadcrumb.Item key={index}>
                {index === 0 && <HomeOutlined />}
                {item.to ? <Link to={item.to}>{item.text}</Link> : item.text}
              </Breadcrumb.Item>
            );
          })}
        {currentApp && !props.noCurrentApp ? (
          <Breadcrumb.Item>
            {!breadcrumbItems?.length &&
              (props.showCurrentAppIcon ? (
                <GeneralIcon icon={currentApp.menuIcon} />
              ) : (
                <HomeOutlined />
              ))}
            <span>
              {props.breadcrumb &&
              props.breadcrumb.length > 0 &&
              currentApp.homepage &&
              !currentApp.internal ? (
                <Link to={currentApp.homepage}>{currentApp.localeName}</Link>
              ) : (
                currentApp.localeName
              )}
            </span>
          </Breadcrumb.Item>
        ) : null}
        {props.breadcrumb &&
          props.breadcrumb.map((item, index) => (
            <Breadcrumb.Item key={String(index)}>
              {item.to ? <Link to={item.to}>{item.text}</Link> : item.text}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </div>
  );
}
