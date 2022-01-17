import React from "react";
import { useApplyPageTitle } from "@next-core/brick-kit";

interface PageTitleProps {
  pageTitle: string;
  pageTitleScale?: number;
  dashboardMode?: boolean;
}

export function PageTitle({
  pageTitle,
  pageTitleScale,
  dashboardMode,
}: PageTitleProps): React.ReactElement {
  useApplyPageTitle(pageTitle);

  const scale = (dashboardMode && pageTitleScale) || 1;
  const decoratorStyle =
    scale === 1
      ? null
      : {
          backgroundSize: `${518 * scale}px ${45 * scale}px`,
        };

  return (
    <>
      {dashboardMode && (
        <span className="page-title-before" style={decoratorStyle}></span>
      )}
      <span
        className="page-title-content"
        style={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...(dashboardMode
            ? {
                fontSize: 38 * scale,
                height: "100%",
                ...(scale === 1
                  ? null
                  : {
                      backgroundSize: `100% ${45 * scale}px`,
                    }),
              }
            : {
                fontSize: 18,
                lineHeight: "32px",
              }),
        }}
      >
        {pageTitle}
      </span>
      {dashboardMode && (
        <span className="page-title-after" style={decoratorStyle}></span>
      )}
    </>
  );
}
