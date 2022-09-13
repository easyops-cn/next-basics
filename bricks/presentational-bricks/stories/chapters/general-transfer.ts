import { Story } from "@next-core/brick-types";
import { generalTransferSvg } from "../images";
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
    en: "select items in left panel to right panel",
    zh: "双栏穿梭选择框",
  },
  icon: {
    imgSrc: generalTransferSvg,
  },
  conf: {
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
};
