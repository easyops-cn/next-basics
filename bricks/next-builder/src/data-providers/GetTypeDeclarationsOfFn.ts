import { StoryboardFunction } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import { escapeRegExp } from "lodash";

export interface ExtraLib {
  content: string;
  filePath: string;
  model?: boolean;
}

export function GetTypeDeclarationsOfFn(
  name: string,
  functions: StoryboardFunction[]
): ExtraLib[] {
  const libs: ExtraLib[] = [];
  const exports: string[] = [];
  for (const fn of functions) {
    if (fn.name === name) {
      continue;
    }
    libs.push({
      filePath: `storyboard/functions/${fn.name}.${
        fn.typescript ? "ts" : "js"
      }`,
      content: fn.source.replace(
        new RegExp(`\\bfunction\\s+${escapeRegExp(fn.name)}\\b\\s*\\(`),
        "export $&"
      ),
      model: true,
    });
    exports.push(`export * from "./functions/${fn.name}";`);
  }
  libs.push(
    {
      filePath: "storyboard/FN-exports.ts",
      content: exports.join("\n"),
    },
    {
      filePath: "storyboard/FN.d.ts",
      content: 'declare const FN: typeof import("./FN-exports");',
    }
  );
  return libs;
}

customElements.define(
  "next-builder.provider-get-type-declarations-of-fn",
  createProviderClass(GetTypeDeclarationsOfFn)
);
