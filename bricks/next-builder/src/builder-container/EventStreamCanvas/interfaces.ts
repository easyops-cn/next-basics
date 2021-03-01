import {
  BrickEventHandler,
  BrickEventHandlerCallback,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export type EventStreamNode = EventDownstreamNode | EventUpstreamNode;

export type EventDownstreamNode =
  | EventDownstreamNodeOfRoot
  | EventDownstreamNodeOfEvent
  | EventDownstreamNodeOfCallback;

export interface EventDownstreamNodeBase {
  children: (EventDownstreamNodeOfEvent | EventDownstreamNodeOfCallback)[];
  height?: number;
}

export enum EventDownstreamType {
  ROOT = "root",
  EVENT = "event",
  CALLBACK = "callback",
}

export interface EventDownstreamNodeOfRoot extends EventDownstreamNodeBase {
  type: EventDownstreamType.ROOT;
  node: BuilderRuntimeNode;
}

export interface EventDownstreamNodeOfEvent extends EventDownstreamNodeBase {
  type: EventDownstreamType.EVENT;
  eventType: string;
  handlers: BrickEventHandler[];
}

export interface EventDownstreamNodeOfCallback extends EventDownstreamNodeBase {
  type: EventDownstreamType.CALLBACK;
  callbackType: keyof BrickEventHandlerCallback;
  parentHandlerIndex: number;
  handlers: BrickEventHandler[];
}

export type EventUpstreamNode =
  | EventUpstreamNodeOfRoot
  | EventUpstreamNodeOfEvent
  | EventUpstreamNodeOfCallback
  | EventUpstreamNodeOfSource;

export interface EventUpstreamNodeBase {
  children: EventUpstreamNode[];
  height?: number;
}

export enum EventUpstreamType {
  UPSTREAM_ROOT = "upstream-root",
  UPSTREAM_EVENT = "upstream-event",
  UPSTREAM_CALLBACK = "upstream-callback",
  UPSTREAM_SOURCE = "upstream-source",
}

export interface EventUpstreamNodeOfRoot extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_ROOT;
  node: BuilderRuntimeNode;
}

export interface EventUpstreamNodeOfEvent extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_EVENT;
  eventType: string;
  handler: BrickEventHandler;
}

export interface EventUpstreamNodeOfCallback extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_CALLBACK;
  callbackType: string;
  handler: BrickEventHandler;
}

export interface EventUpstreamNodeOfSource extends EventUpstreamNodeBase {
  type: EventUpstreamType.UPSTREAM_SOURCE;
  node: BuilderRuntimeNode;
}
