import { Story } from "../../../interfaces";
import docMD from "../../../docs/presentational-bricks/general-carousel-template.md";
import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "general-carousel.general-carousel",
  type: "template",
  author: "jo",
  text: {
    en: "Carousel Template",
    zh: "轮播图场景模板",
  },
  description: {
    en: "Render Carousel according to dynamic data",
    zh: "可根据动态数据的生成轮播内容",
  },
  icon: {
    lib: "fa",
    icon: "stream",
  },
  conf: [
    {
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "providers-of-cmdb.instance-api-get-detail",
              bg: true,
            },
            {
              template: "general-carousel.general-carousel",
              params: {
                instanceData: {
                  modifier: "easyops",
                  ctime: "2019-10-1",
                },
                carouselConfig: {
                  dots: false,
                  autoplay: true,
                  carouselStyle: {
                    width: "1000px",
                  },
                },
                events: {
                  "general.carousel.click": {
                    action: "console.log",
                  },
                },
                components: [
                  {
                    brick: "code-bricks.code-display",
                    resolveConfig: {
                      key: "value",
                      name: "instanceData",
                      path: "modifier",
                    },
                  },
                  {
                    brick: "code-bricks.code-display",
                    resolveConfig: {
                      key: "value",
                      name: "instanceData",
                      path: "ctime",
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
  doc: docMD,
};
