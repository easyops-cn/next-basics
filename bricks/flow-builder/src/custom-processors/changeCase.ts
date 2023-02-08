import { getRuntime } from "@next-core/brick-kit";
import * as changeCase from "change-case";

export function changeCaseUtils(type: string, ...args: any[]): string {
  return changeCase[type](...args);
}

getRuntime().registerCustomProcessor(
  "flowBuilder.changeCaseUtils",
  changeCaseUtils
);
