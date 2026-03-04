import type { GeneralTransform } from "@next-core/brick-types";

export interface ScriptBrickProps {
  data?: any;
  fun?: string;
  multiple?: boolean;
  target?: string;
  transform?: GeneralTransform;
}

export interface ScriptBrickEvents {
  "script.execute": CustomEvent<void>;
  "data.true": CustomEvent<void>;
  "data.false": CustomEvent<void>;
}

export interface ScriptBrickEventsMap {
  onScriptExecute: "script.execute";
  onDataTrue: "data.true";
  onDataFalse: "data.false";
}

export declare class ScriptBrickElement extends HTMLElement {
  data: any | undefined;
  fun: string | undefined;
  multiple: boolean | undefined;
  target: string | undefined;
  transform: GeneralTransform | undefined;
}
