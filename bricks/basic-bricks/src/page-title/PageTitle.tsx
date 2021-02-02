import React from "react";
import { getRuntime } from "@next-core/brick-kit";

interface PageTitleProps {
  pageTitle: string;
  dashboardMode?: boolean;
}

export function PageTitle({
  pageTitle,
  dashboardMode,
}: PageTitleProps): React.ReactElement {
  React.useEffect(() => {
    const { appBar } = getRuntime();
    appBar.setPageTitle(pageTitle);
  }, [pageTitle]);

  return (
    <>
      {dashboardMode && <span className="page-title-before"></span>}
      <span
        className="page-title-content"
        style={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...(dashboardMode
            ? {
                fontSize: 38,
                height: "100%",
              }
            : {
                fontSize: 18,
                lineHeight: "32px",
              }),
        }}
      >
        {pageTitle}
      </span>
      {dashboardMode && <span className="page-title-after"></span>}
    </>
  );
}
