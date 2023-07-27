import React from "react";
import { AppSetting } from "../app-bar/AppSetting/AppSetting";

export function AppBarSetting(props: {
  usernameStyle: React.CSSProperties;
  dropdownIconStyle: React.CSSProperties;
}): React.ReactElement {
  return (
    <AppSetting
      usernameStyle={props.usernameStyle}
      dropdownIconStyle={props.dropdownIconStyle}
    />
  );
}
