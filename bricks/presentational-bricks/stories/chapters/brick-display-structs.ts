import { Story } from "@next-core/brick-types";
import { brickDisplayStructsSvg } from "../images";

export const BrickDisplayStructsStory: Story = {
  storyId: "presentational-bricks.brick-display-structs",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "Text Conversion - Automatically Convert Structures or Arrays",
    zh: "文本转换-自动转换结构体或数组",
  },
  icon: { imgSrc: brickDisplayStructsSvg },
  description: {
    en: "stringify to display struct data or one field of it",
    zh: "可将结构体（数组）数据以字符串的形式展示，或只展示其中的一个字段",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-display-structs",
      properties: {
        value: [
          { name: "irelia", email: "irelia@ionia.island" },
          { name: "akali", email: "akali@ionia.island" },
        ],
        displayType: {
          field: "name",
          separator: "; ",
        },
      },
    },
    {
      brick: "presentational-bricks.brick-display-structs",
      properties: {
        value: [
          { name: "irelia", email: "irelia@ionia.island" },
          { name: "akali", email: "akali@ionia.island" },
        ],
        displayType: {
          field: "",
          separator: "; ",
        },
      },
    },
    {
      brick: "presentational-bricks.brick-display-structs",
      properties: {
        value: ["windows", "macOS", "centos"],
        displayType: {
          field: "",
          separator: "; ",
        },
      },
    },
    {
      brick: "presentational-bricks.brick-display-structs",
      properties: {
        value: [
          { name: "irelia", email: "irelia@ionia.island" },
          { name: "akali", email: "akali@ionia.island" },
        ],
        displayType: "stringify",
      },
    },
  ],
  previewColumns: 2,
};
