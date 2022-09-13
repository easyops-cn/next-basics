import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { BreadcrumbItemConf, SidebarMenu } from "@next-core/brick-types";
import { useRecentApps } from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./AppBarBreadcrumb.module.css";
import classnames from "classnames";

export interface BasicBreadcrumbProps {
  breadcrumb?: BreadcrumbItemConf[];
  className?: string;
  separator?: string;
  noCurrentApp?: boolean;
  showCurrentAppIcon?: boolean;
  menu?: Partial<SidebarMenu>;
}

export function AppBarBreadcrumb(
  props: BasicBreadcrumbProps
): React.ReactElement {
  const { currentApp } = useRecentApps();
  const {
    items: breadcrumbItems,
    noCurrentApp: breadcrumbNoCurrentApp,
    useCurrentMenuTitle,
  } = currentApp?.breadcrumb || {};
  const noCurrentApp = props.noCurrentApp ?? breadcrumbNoCurrentApp;

  return (
    <div className={classnames(styles.breadcrumbContainer, props.className)}>
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
        {currentApp && !noCurrentApp ? (
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
        {useCurrentMenuTitle && props.menu ? (
          <Breadcrumb.Item>
            <GeneralIcon icon={props.menu.icon} />
            <span>
              <Link to={props.menu.link}>{props.menu.title}</Link>
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
