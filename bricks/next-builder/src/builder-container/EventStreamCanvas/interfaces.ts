import {
  BrickEventHandler,
  BrickEventHandlerCallback,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

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
  handlers: BrickEventHandler[];
}

export enum EventHandlerType {
  BUILTIN_ACTION = "builtin-action",
  USE_PROVIDER = "use-provider",
  BRICK_METHOD = "brick-method",
  BRICK_PROPERTIES = "brick-properties",
}

export interface EventDownstreamSubnodeOfEventHandler {
  type: EventHandlerType;
  action?: string;
  useProvider?: string;
  target?: string;
  method?: string;
}
