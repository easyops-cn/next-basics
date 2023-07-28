import { Story } from "@next-core/brick-types";
import {
  generalCarouselAutoplaySvg,
  generalCarouselNormalSvg,
  generalCarouselSvg,
} from "../images";
export const GeneralCarouselStory: Story = {
  storyId: "presentational-bricks.general-carousel",
  category: "container-display",
  type: "brick",
  author: "jo",
  text: {
    en: "General Carousel",
    zh: "通用轮播构件",
  },
  description: {
    en: "General Carousel",
    zh: "通用的轮播图",
  },
  icon: {
    imgSrc: generalCarouselSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-carousel[normal]",
      title: {
        en: "",
        zh: "基础的轮播图",
      },
      thumbnail: generalCarouselNormalSvg,
      bricks: [
        {
          brick: "basic-bricks.general-card",
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.general-carousel",
                  properties: {
                    carouselStyle: {
                      width: "500px",
                    },
                    autoplay: false,
                    components: [
                      {
                        brick: "presentational-bricks.markdown-display",
                        properties: {
                          dataSource: "![](http://placekitten.com/g/400/200)",
                        },
                      },
                      {
                        brick: "presentational-bricks.markdown-display",
                        properties: {
                          dataSource: "文字内容1",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.general-carousel[autoplay]",
      title: {
        zh: "定时轮播图",
        en: "",
      },
      thumbnail: generalCarouselAutoplaySvg,
      bricks: [
        {
          brick: "basic-bricks.general-card",
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.general-carousel",
                  properties: {
                    autoplay: true,
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    carouselStyle: {
                      width: "500px",
                    },
                    components: [
                      {
                        brick: "div",
                        properties: {
                          textContent: "文字内容1",
                        },
                      },
                      {
                        brick: "div",
                        properties: {
                          textContent: "文字内容2",
                        },
                      },
                      {
                        brick: "div",
                        properties: {
                          textContent: "文字内容3",
                        },
                      },
                      {
                        brick: "div",
                        properties: {
                          textContent: "文字内容4",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.general-carousel",
              properties: {
                autoplay: true,
                slidesToShow: 2,
                carouselStyle: {
                  width: "500px",
                },
                responsive: [
                  {
                    breakpoint: 1800,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ],
                components: [
                  {
                    brick: "div",
                    properties: {
                      textContent: "响应式布局示例",
                    },
                  },
                  {
                    brick: "div",
                    properties: {
                      textContent: "宽度太小会变成一列",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.general-carousel",
              properties: {
                carouselStyle: {
                  width: "500px",
                },
                autoplay: false,
                dataSource: [
                  {
                    text: "文字内容1",
                  },
                  {
                    text: "文字内容2",
                  },
                  {
                    text: "文字内容3",
                  },
                ],
                useBrick: [
                  {
                    brick: "code-bricks.code-display",
                    transform: {
                      value: "@{text}",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  previewColumns: 2,
};
