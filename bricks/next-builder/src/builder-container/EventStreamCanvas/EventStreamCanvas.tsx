/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import React from "react";
import { buildBrickEventDownstreamTree } from "./buildBrickEventDownstreamTree";
import { EventDownstreamNode, EventDownstreamType } from "./interfaces";

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

  const eventRoot: EventDownstreamNode = {
    type: EventDownstreamType.ROOT,
    node,
    children: [],
  };

  buildBrickEventDownstreamTree(eventRoot, node.$$parsedEvents);

  return <EventStreamTreeNodeComponent eventNode={eventRoot} />;
}

interface EventStreamTreeNodeComponentProps {
  eventNode: EventDownstreamNode;
}

function EventStreamTreeNodeComponent({
  eventNode,
}: EventStreamTreeNodeComponentProps): React.ReactElement {
  return (
    <div>
      <div>
        {eventNode.type === EventDownstreamType.ROOT
          ? `Brick: ${eventNode.node.alias}`
          : eventNode.type === EventDownstreamType.EVENT
          ? `Event Type: ${eventNode.eventType}`
          : `Callback: ${eventNode.callbackType}`}
      </div>
      <ul>
        {eventNode.children.map((childEventNode, index) => (
          <EventStreamTreeNodeComponent
            key={index}
            eventNode={childEventNode}
          />
        ))}
      </ul>
    </div>
  );
}
