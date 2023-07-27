import React from "react";
import * as originAppDocumentLink from "../app-bar/AppDocumentLink/AppDocumentLink";

export function AppDocumentLink(props: {
  iconStyle: React.CSSProperties;
}): React.ReactElement {
  return <originAppDocumentLink.AppDocumentLink iconStyle={props.iconStyle} />;
}
