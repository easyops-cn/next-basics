import { BrickEventHandler } from "@next-core/brick-types";

export enum HandlerType {
  BuiltinAction = "builtinAction",
  UseProvider = "useProvider",
  ExectuteMethod = "exectuteMethod",
  SetPorps = "setPorps",
  Unkown = "unkown",
}

export interface EventsInfo {
  type: string;
  description?: string;
}

export interface ProcessEvent {
  name?: string;
  events?: BrickEventHandler[];
}
