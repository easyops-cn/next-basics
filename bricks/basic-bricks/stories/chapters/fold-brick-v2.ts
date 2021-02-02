import { Story } from "@next-core/brick-types";

export const foldBrickV2Story: Story = {
  storyId: "basic-bricks.fold-brick-v2",
  category: "description",
  type: "brick",
  author: "momo",
  text: {
    en: "fold brick",
    zh: "折叠容器V2",
  },
  description: {
    en: "",
    zh: "折叠容器，只折叠单个内容，支持slot",
  },
  icon: {
    lib: "fa",
    icon: "chevron-down",
  },
  conf: [
    {
      description: {
        title: "基本",
        message: "",
      },
      brick: "basic-bricks.fold-brick-v2",
      properties: {
        foldName: "查看",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "123",
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "type为primary",
        message: "",
      },
      brick: "basic-bricks.fold-brick-v2",
      properties: {
        foldName: "查看",
        type: "primary",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "123",
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "isShowFoldIcon为false",
        message: "",
      },
      brick: "basic-bricks.fold-brick-v2",
      properties: {
        foldName: "查看",
        isShowFoldIcon: false,
        type: "primary",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "123",
              },
            },
          ],
        },
      },
    },
  ],
  previewColumns: 2,
};
