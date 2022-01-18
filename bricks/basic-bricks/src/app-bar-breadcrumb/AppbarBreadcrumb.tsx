import React from "react";
import * as originAppbarBreadcrumb from "../app-bar/AppBarBreadcrumb/AppBarBreadcrumb";

export function AppbarBreadcrumb(
  props: originAppbarBreadcrumb.BasicBreadcrumbProps
): React.ReactElement {
  return <originAppbarBreadcrumb.AppBarBreadcrumb {...props} />;
}
