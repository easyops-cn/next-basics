/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import classNames from "classnames";
import {
  EventStreamNode,
  EventDownstreamType,
  EventUpstreamType,
  EventUpstreamNodeOfCallback,
  EventUpstreamNode,
  EventDownstreamNode,
  EventUpstreamNodeOfSource,
} from "./interfaces";
import { styleConfig } from "./styleConfig";
import { isEventDownstreamNode } from "./assertions";
import { EventStreamHandler } from "./EventStreamHandler";

import styles from "./EventStreamNodeComponent.module.css";

export interface EventStreamNodeComponentProps<T = EventStreamNode> {
  eventNode: T;
  targetMap?: Map<string, string>;
  setEventStreamNodeId?: React.Dispatch<React.SetStateAction<string>>;
}

export function EventStreamNodeComponent({
  eventNode,
  targetMap,
  setEventStreamNodeId,
}: EventStreamNodeComponentProps): React.ReactElement {
  return isEventDownstreamNode(eventNode) ? (
    <EventDownstreamNodeComponent
      eventNode={eventNode}
      targetMap={targetMap}
      setEventStreamNodeId={setEventStreamNodeId}
    />
  ) : (
    <EventUpstreamNodeComponent
      eventNode={eventNode}
      targetMap={targetMap}
      setEventStreamNodeId={setEventStreamNodeId}
    />
  );
}

export function EventDownstreamNodeComponent({
  eventNode,
  targetMap,
  setEventStreamNodeId,
}: EventStreamNodeComponentProps<EventDownstreamNode>): React.ReactElement {
  return (
    <div
      className={classNames(styles.eventNode, {
        [styles.rootNode]: eventNode.type === EventDownstreamType.ROOT,
      })}
      style={{
        ...styleConfig.node,
        left: -styleConfig.node.width / 2,
        top: -eventNode.height / 2,
        height: eventNode.height,
      }}
    >
      <div
        className={styles.title}
        style={{
          ...styleConfig.title,
          marginBottom:
            eventNode.type === EventDownstreamType.ROOT
              ? undefined
              : styleConfig.titleMarginBottom,
        }}
      >
        {eventNode.type === EventDownstreamType.ROOT
          ? `${eventNode.node.alias}`
          : eventNode.type === EventDownstreamType.EVENT
          ? eventNode.eventType
          : `[callback] ${eventNode.callbackType}`}
      </div>
      <ul className={styles.items}>
        {eventNode.type !== EventDownstreamType.ROOT &&
          eventNode.handlers.map((handler, index) => (
            <EventStreamHandler
              key={index}
              eventNode={eventNode}
              handler={handler}
              isLast={index === eventNode.handlers.length - 1}
              targetMap={targetMap}
              setEventStreamNodeId={setEventStreamNodeId}
            />
          ))}
      </ul>
    </div>
  );
}

export function EventUpstreamNodeComponent({
  eventNode,
  targetMap,
  setEventStreamNodeId,
}: EventStreamNodeComponentProps<EventUpstreamNode>): React.ReactElement {
  const isUpstreamSource = eventNode.type === EventUpstreamType.UPSTREAM_SOURCE;

  const handleClick = React.useCallback(() => {
    if (isUpstreamSource) {
      setEventStreamNodeId((eventNode as EventUpstreamNodeOfSource).node.id);
    }
  }, [eventNode, setEventStreamNodeId, isUpstreamSource]);

  return (
    <div
      className={classNames(styles.eventNode, {
        [styles.upstreamSource]: isUpstreamSource,
      })}
      style={{
        ...styleConfig.node,
        left: -styleConfig.node.width / 2,
        top: -eventNode.height / 2,
        height: eventNode.height,
      }}
      onClick={handleClick}
    >
      <div
        className={styles.title}
        style={{
          ...styleConfig.title,
          marginBottom:
            eventNode.type === EventUpstreamType.UPSTREAM_SOURCE
              ? undefined
              : styleConfig.titleMarginBottom,
        }}
      >
        {eventNode.type === EventUpstreamType.UPSTREAM_SOURCE
          ? eventNode.node.alias
          : eventNode.type === EventUpstreamType.UPSTREAM_EVENT
          ? eventNode.eventType
          : `[callback] ${
              (eventNode as EventUpstreamNodeOfCallback).callbackType
            }`}
      </div>
      {eventNode.type !== EventUpstreamType.UPSTREAM_SOURCE && (
        <ul className={styles.items}>
          <EventStreamHandler
            eventNode={eventNode}
            handler={(eventNode as EventUpstreamNodeOfCallback).handler}
            isLast
            targetMap={targetMap}
            setEventStreamNodeId={setEventStreamNodeId}
          />
        </ul>
      )}
    </div>
  );
}
