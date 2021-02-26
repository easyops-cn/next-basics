/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { EventDownstreamGraphComponent } from "./EventStreamGraphComponent";

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
  return <EventDownstreamGraphComponent node={node} />;
}
