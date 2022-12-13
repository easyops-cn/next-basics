import { Story } from "@next-core/brick-types";
import { microViewSvg } from "../images";
import { microViewBasicSvg } from "../images";
import { microViewWithBannerSvg } from "../images";
export const microViewStory: Story = {
  storyId: "basic-bricks.micro-view",
  category: "container-layout",
  type: "brick",
  author: "steve",
  text: {
    en: "Micro View",
    zh: "通用页面视图容器",
  },
  description: {
    en: "Support slots: `titleBar`, `toolbar`, `content`, `subMenu`, `banner`, `bannerTitleBar`, `bannerToolbar` (Also be used directly through the snippet of easy-view)",
    zh: "提供了 titleBar、toolbar、content、subMenu、banner、bannerTitleBar、bannerToolbar 插槽(也可通过 easy-view 的 snippet 直接使用)",
  },
  icon: {
    imgSrc: microViewSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.micro-view",
          properties: {
            pageTitle: "Hello World",
          },
          slots: {
            toolbar: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "Create New One",
                  },
                },
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "Edit Existed One",
                  },
                },
              ],
            },
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "hello",
                    style: {
                      border: "3px solid orange",
                      height: "60px",
                      background: "#fff",
                    },
                  },
                },
                {
                  brick: "div",
                  properties: {
                    textContent: "world",
                    style: {
                      border: "3px solid orange",
                      height: "100px",
                      background: "#fff",
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.micro-view[basic]",
      title: {
        en: "Basic Micro View",
        zh: "基础通用页面视图容器",
      },
      thumbnail: microViewBasicSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "使用 banner",
          },
          brick: "basic-bricks.micro-view",
          properties: {
            bannerPageTitle: "Hello World",
            bannerStyle: {
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E\")",
              backgroundSize: "auto",
            },
          },
          slots: {
            bannerToolbar: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "Create New One",
                  },
                },
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "Edit Existed One",
                  },
                },
              ],
            },
            banner: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "hello",
                    style: {
                      border: "3px solid orange",
                      height: "60px",
                      background: "#fff",
                    },
                  },
                },
                {
                  brick: "div",
                  properties: {
                    textContent: "world",
                    style: {
                      border: "3px solid orange",
                      height: "100px",
                      background: "#fff",
                    },
                  },
                },
                {
                  brick: "presentational-bricks.brick-divider",
                  properties: {
                    dividerStyle: {
                      margin: "12px 0",
                    },
                  },
                },
                {
                  brick: "container-brick.tabs-container",
                  properties: {
                    showCard: false,
                    tabList: [
                      {
                        text: "Tab 1",
                        key: "tab1",
                      },
                      {
                        text: "Tab 2",
                        key: "tab2",
                      },
                      {
                        text: "Tab 3",
                        key: "tab3",
                      },
                    ],
                    style: {
                      marginBottom: "calc(var(--page-card-gap) * -1 - 1px)",
                    },
                  },
                },
              ],
            },
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  properties: {
                    textContent: "content",
                    style: {
                      border: "3px solid orange",
                      height: "60px",
                      background: "#fff",
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.micro-view[with-banner]",
      title: {
        en: "Micro View with Banner Slot",
        zh: "带Banner插槽的通用页面视图容器",
      },
      thumbnail: microViewWithBannerSvg,
    },
  ],
};
