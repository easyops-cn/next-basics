/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { EventDownstreamGraphComponent } from "./EventStreamGraphComponent";

export interface EventStreamCanvasProps {
  nodeUid: number;
}

export function EventStreamCanvas({
  nodeUid,
}: EventStreamCanvasProps): React.ReactElement {
  const node = useBuilderNode({ nodeUid });
  if (!node) {
    return null;
  }
  return <EventDownstreamGraphComponent node={node} />;
}
