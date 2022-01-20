/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";

export function NavBar(): React.ReactElement {
  return (
    <div className="nav-bar">
      <div className="left-content">
        <div className="nav-logo">
          <slot id="logo" name="logo" />
        </div>
        <div className="nav-menu">
          <slot id="menu" name="menu" />
        </div>
      </div>
      <div className="right-content">
        <div className="nav-buttons">
          <slot id="buttons" name="buttons" />
        </div>
        <div className="nav-avator">
          <slot id="avator" name="avator" />
        </div>
      </div>
    </div>
  );
}
