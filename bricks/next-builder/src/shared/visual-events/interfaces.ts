import { BrickEventHandler } from "@next-core/brick-types";

export enum HandlerType {
  BuiltinAction = "builtinAction",
  UseProvider = "useProvider",
  CustomBrick = "customBrick",
  Unknown = "unknown",
}

export enum CustomBrickEventType {
  ExecuteMethod = "executeMethod",
  SetProps = "setProps",
}

export interface BuiltinAction {
  label: string;
  value: string;
}

export interface ActionOptions {
  label: string;
  options: BuiltinAction[];
}

export interface EventsInfo {
  type: string;
  description?: string;
}

export interface ProcessEvent {
  name?: string;
  events?: BrickEventHandler[];
}

export interface EventConfig {
  name?: string;
  events?: BrickEventHandler[];
}

export interface EventsDoc {
  type: string;
  description?: string;
}

export interface EventFormField {
  handlerType: HandlerType;
  if?: string;
  action?: string;
  brickEventType?: CustomBrickEventType;
  providerType?: "provider" | "flow";
  provider?: string;
  flow?: string;
  pollEnabled?: boolean;
  poll?: string;
  callback?: string;
  selectorType?: "target" | "targetRef";
  brickSelector?: string;
  method?: string;
  args?: string;
  properties?: string;
  useProviderMethod?: "resolve" | "saveAs";
  transform?: string;
  transformFrom?: string;
  transformMapArray?: "auto" | boolean;
  onReject?: string;
}

export enum LifeCycle {
  UseResolves = "useResolves",
  OnBeforePageLoad = "onBeforePageLoad",
  OnPageLoad = "onPageLoad",
  OnAnchorLoad = "onAnchorLoad",
  OnAnchorUnload = "onAnchorUnload",
  OnMessage = "onMessage",
  OnBeforePageLeave = "onBeforePageLeave",
  OnPageLeave = "onPageLeave",
}
