import React from "react";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { EventStreamGraphComponent } from "./EventStreamGraphComponent";

export interface EventStreamCanvasProps {
  nodeId: string;
}

// This component makes sure `node` is always available for graph.
export function EventStreamCanvas({
  nodeId,
}: EventStreamCanvasProps): React.ReactElement {
  const { nodes } = useBuilderData();
  const node = React.useMemo(() => nodes.find((n) => n.id === nodeId), [
    nodeId,
    nodes,
  ]);
  if (!node) {
    return null;
  }
  return <EventStreamGraphComponent node={node} />;
}
