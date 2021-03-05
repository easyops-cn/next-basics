import { BrickEventHandler } from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export type EventStreamNode = EventDownstreamNode | EventUpstreamNode;

export type EventDownstreamNode =
  | EventDownstreamNodeOfRoot
  | EventDownstreamNodeOfEvent
  | EventDownstreamNodeOfLifeCycle
  | EventDownstreamNodeOfCallback;

export interface EventDownstreamNodeBase {
  children: EventDownstreamNode[];
  height?: number;
}

export enum EventDownstreamType {
  ROOT = "root",
  EVENT = "event",
  LIFE_CYCLE = "life-cycle",
  CALLBACK = "callback",
}

export interface EventDownstreamNodeBaseWithHandlers
  extends EventDownstreamNodeBase {
  eventType: string;
  handlers: BrickEventHandler[];
}

export interface EventDownstreamNodeOfRoot extends EventDownstreamNodeBase {
  type: EventDownstreamType.ROOT;
  node: BuilderRuntimeNode;
}

export interface EventDownstreamNodeOfEvent
  extends EventDownstreamNodeBaseWithHandlers {
  type: EventDownstreamType.EVENT;
}

export interface EventDownstreamNodeOfLifeCycle
  extends EventDownstreamNodeBaseWithHandlers {
  type: EventDownstreamType.LIFE_CYCLE;
  channel?: string;
}

export interface EventDownstreamNodeOfCallback
  extends EventDownstreamNodeBaseWithHandlers {
  type: EventDownstreamType.CALLBACK;
  parentHandlerIndex: number;
}

export type EventUpstreamNode =
  | EventUpstreamNodeOfRoot
  | EventUpstreamNodeOfEvent
  | EventUpstreamNodeOfLifeCycle
  | EventUpstreamNodeOfCallback
  | EventUpstreamNodeOfSource;

export interface EventUpstreamNodeBase {
  children: EventUpstreamNode[];
  height?: number;
}

export interface EventUpstreamNodeBaseWithHandler
  extends EventUpstreamNodeBase {
  eventType: string;
  handler: BrickEventHandler;
}

export enum EventUpstreamType {
  UPSTREAM_ROOT = "upstream-root",
  UPSTREAM_EVENT = "upstream-event",
  UPSTREAM_LIFE_CYCLE = "upstream-life-cycle",
  UPSTREAM_CALLBACK = "upstream-callback",
  UPSTREAM_SOURCE = "upstream-source",
}

export interface EventUpstreamNodeOfRoot extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_ROOT;
  node: BuilderRuntimeNode;
}

export interface EventUpstreamNodeOfEvent
  extends EventUpstreamNodeBaseWithHandler {
  type: EventUpstreamType.UPSTREAM_EVENT;
}

export interface EventUpstreamNodeOfLifeCycle
  extends EventUpstreamNodeBaseWithHandler {
  type: EventUpstreamType.UPSTREAM_LIFE_CYCLE;
  channel?: string;
}

export interface EventUpstreamNodeOfCallback
  extends EventUpstreamNodeBaseWithHandler {
  type: EventUpstreamType.UPSTREAM_CALLBACK;
}

export interface EventUpstreamNodeOfSource extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_SOURCE;
  node: BuilderRuntimeNode;
}
