import React from "react";

export interface WorkbenchSidebarProps {
  titleLabel?: string;
}

export function WorkbenchSidebar({
  titleLabel,
}: WorkbenchSidebarProps): React.ReactElement {
  return (
    <div className="sidebar">
      <div className="title-container">
        <div className="title-label">{titleLabel}</div>
      </div>
      <div className="pane-container">
        <slot name="panes" />
      </div>
    </div>
  );
}
