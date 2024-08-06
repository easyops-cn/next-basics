import React from "react";
import * as originAppDocumentLink from "../app-bar/AppDocumentLink/AppDocumentLink";

export function AppDocumentLink(props: {
  iconStyle: React.CSSProperties;
  isInNavbar?: boolean;
  showHover?: boolean;
}): React.ReactElement {
  return (
    <originAppDocumentLink.AppDocumentLink
      iconStyle={props.iconStyle}
      isInNavbar={props.isInNavbar}
      showHover={props.showHover}
    />
  );
}
