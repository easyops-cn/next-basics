import { Story } from "@next-core/brick-types";
import { generalTransferSvg } from "../images";
import { generalTransferNormalSvg } from "../images";
export const GeneralTransferStory: Story = {
  storyId: "presentational-bricks.general-transfer",
  category: "container-display",
  type: "brick",
  author: "ice",
  text: {
    en: "General Transfer",
    zh: "穿梭框",
  },
  description: {
    en: "suitable for scenarios that require transferring and selecting data items between two containers. This component offers a variety of configurable properties, such as data source, styles, selection items, disabled state, maximum selection count, and search box display, to cater to different needs",
    zh: "适用于需要在两个容器之间转移和选择数据项的场景。该构件提供了丰富的配置属性，如数据源、样式、选择项、禁用状态、最大选择数、搜索框显示等，以满足不同需求",
  },
  icon: {
    imgSrc: generalTransferSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-transfer[normal]",
      title: {
        en: "",
        zh: "基础双栏穿梭选择框",
      },
      thumbnail: generalTransferNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.general-transfer",
          properties: {
            maxSelected: 3,
            showSearch: true,
            listStyle: {
              width: 300,
              height: 300,
            },
            dataSource: [
              {
                key: "host.cpu_util.user",
                title: "cpu user",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
              {
                key: "host.cpu_util.system",
                title: "cpu system",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
              {
                key: "host.cpu_util.iowait",
                title: "io wait",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
              {
                key: "host.disk.total",
                title: "disk total",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
              {
                key: "host.network.bytes_in",
                title: "bytes in",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
              {
                key: "host.network.bytes_out",
                title: "bytes out",
                uselessKey1: "useless key 1",
                uselessKey2: "useless key 2",
              },
            ],
          },
          events: {
            "general.transfer.change": {
              action: "console.log",
            },
          },
        },
      ],
    },
  ],
};
