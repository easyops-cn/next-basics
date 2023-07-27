import React from "react";
import logo139w from "../images/logo-139w.png";
import logo278w from "../images/logo-278w.png";
export interface HeaderBarProps {
  logoUrl?: string;
  headerBackgroundColor?: string;
}

export function HeaderBar({
  logoUrl,
  headerBackgroundColor,
}: HeaderBarProps): React.ReactElement {
  return (
    <header
      className="headerBar"
      style={{
        backgroundColor: headerBackgroundColor,
      }}
    >
      <div className="logo">
        <img
          src={logoUrl ? logoUrl : logo278w}
          srcSet={`${logoUrl ? logoUrl : logo139w} 139w, ${
            logoUrl ? logoUrl : logo278w
          } 278w`}
          sizes="(min-resolution: 2dppx) 278px, 139px"
          alt="优维科技 UWinTech"
        />
      </div>
      <div className="content">
        <nav className="navbar">
          <slot name="navbar" />
        </nav>
        <div className="toolbar">
          <slot name="toolbar" />
        </div>
      </div>
    </header>
  );
}
