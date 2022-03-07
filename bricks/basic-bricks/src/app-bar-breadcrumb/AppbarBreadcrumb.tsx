import React, { useEffect } from "react";
import { getRuntime } from "@next-core/brick-kit";
import styles from "./AppbarBreadcrumb.module.css";
import * as originAppbarBreadcrumb from "../app-bar/AppBarBreadcrumb/AppBarBreadcrumb";

export function AppbarBreadcrumb(
  props: originAppbarBreadcrumb.BasicBreadcrumbProps
): React.ReactElement {
  const containerData = getRuntime().getNavConfig();
  const [breadcrumb, setBreadCrumb] = React.useState(props.breadcrumb ?? []);

  useEffect(() => {
    if (props.breadcrumb.length === 0) {
      if (containerData) {
        setBreadCrumb(containerData.breadcrumb ?? []);
      }
    }
  }, []);

  return (
    <originAppbarBreadcrumb.AppBarBreadcrumb
      className={styles.appbarBreadcrumb}
      {...{
        ...props,
        breadcrumb,
        separator: "/",
      }}
    />
  );
}
