import React from "react";

export function ToolboxPane({
  children,
}: React.PropsWithChildren<never>): React.ReactElement {
  return <div className="toolboxPane">{children}</div>;
}
