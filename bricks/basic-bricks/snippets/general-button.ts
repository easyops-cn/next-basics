/// <reference types="../../../declarations/global" />
import { SnippetDefinition } from "@next-core/brick-types";
import generalButtonDefaultSvg from "./thumbnails/general-button.default.svg";
import generalButtonPrimarySvg from "./thumbnails/general-button.primary.svg";

const snippets: SnippetDefinition[] = [
  {
    id: "basic-bricks.general-button[default]",
    category: "other",
    text: {
      zh: "默认按钮",
      en: "Default button",
    },
    thumbnail: generalButtonDefaultSvg,
    bricks: [
      {
        brick: "basic-bricks.general-button",
        properties: {
          buttonType: "default",
        },
      },
    ],
  },
  {
    id: "basic-bricks.general-button[primary]",
    category: "other",
    text: {
      zh: "主按钮",
      en: "Primary button",
    },
    thumbnail: generalButtonPrimarySvg,
    bricks: [
      {
        brick: "basic-bricks.general-button",
        properties: {
          buttonType: "primary",
        },
      },
    ],
  },
];

export default snippets;
