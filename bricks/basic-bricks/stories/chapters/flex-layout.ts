import { Story } from "@next-core/brick-types";

export const flexLayoutStory: Story = {
  storyId: "basic-bricks.flex-layout",
  category: "layout",
  type: "brick",
  author: "kehua",
  text: {
    en: "Flex Layout",
    zh: "flex布局",
  },
  description: {
    en: "A Flex layout container",
    zh: "基于Flex的布局容器",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: [
    {
      brick: "basic-bricks.flex-layout",
      description: {
        title: "基本使用",
        message: "",
      },
      properties: {
        justifyContent: "space-between",
        alignItems: "center",
        style: {
          border: "1px solid black",
          background: "pink",
          height: "200px",
          width: "200px",
        },
      },
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "『第一个div』",
                style: { background: "yellow" },
              },
            },
            {
              brick: "div",
              properties: {
                textContent: "『第二个div』",
                style: { background: "orange" },
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.flex-layout",
      description: {
        title: "设置列间隙columnGap",
        message: "",
      },
      properties: {
        columnGap: "20px",
        style: {
          background: "AliceBlue",
          width: "247px",
          border: "1px solid black",
        },
      },
      slots: {
        "": {
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  background: "yellow",
                },
                textContent: "NO.1",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "orange",
                },
                textContent: "NO.2",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "DeepSkyBlue",
                },
                textContent: "NO.3",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "Aquamarine",
                },
                textContent: "NO.4",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "Chartreuse",
                },
                textContent: "NO.5",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      brick: "basic-bricks.flex-layout",
      description: {
        title: "设置行间隙rowGap",
        message: "",
      },
      properties: {
        rowGap: "10px",
        columnGap: "20px",
        flexWrap: "wrap",
        style: {
          background: "AliceBlue",
          width: "88px",
          border: "1px solid black",
        },
      },
      slots: {
        "": {
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  background: "yellow",
                },
                textContent: "NO.1",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "orange",
                },
                textContent: "NO.2",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "DeepSkyBlue",
                },
                textContent: "NO.3",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "Aquamarine",
                },
                textContent: "NO.4",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "Chartreuse",
                },
                textContent: "NO.5",
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  background: "YellowGreen",
                },
                textContent: "NO.6",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
};
