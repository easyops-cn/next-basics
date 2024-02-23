import { Story } from "@next-core/brick-types";
import { tableTransferNormalSvg, tableTransferSvg } from "../images";

export const TableTransferStory: Story = {
  storyId: "presentational-bricks.table-transfer",
  category: "container-display",
  type: "brick",
  author: "ann",
  text: {
    en: "Table Transfer",
    zh: "表格穿梭框",
  },
  description: {
    en: "a versatile component designed for displaying and managing data with a dual-list selection interface, equipped with search functionality and drag-and-drop sorting capabilities. It serves as an efficient tool for users to transfer items between two columns, making it ideal for scenarios such as filter configurations or data mapping",
    zh: "具备搜索功能和拖拽排序能力，它能够高效地帮助用户在两个列表之间转移项目，适用于如筛选配置或数据映射等多种场景",
  },
  icon: {
    imgSrc: tableTransferSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.table-transfer[normal]",
      title: {
        en: "",
        zh: "基础表格穿梭选择框（支持拖拽排序)",
      },
      thumbnail: tableTransferNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.table-transfer",
          properties: {
            maxSelected: 3,
            showSearch: true,
            dragSortable: true,
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
            columns: [
              {
                title: "title-left",
                key: "title",
                dataIndex: "title",
              },
              {
                title: "uselessKey1",
                key: "uselessKey1",
                dataIndex: "uselessKey1",
              },
            ],
            targetKeys: [
              "host.network.bytes_out",
              "host.disk.total",
              "host.network.bytes_in",
            ],
          },
          events: {
            "table.transfer.change": {
              action: "console.log",
            },
            "sort.change": {
              action: "console.log",
            },
          },
        },
      ],
    },
  ],
};
