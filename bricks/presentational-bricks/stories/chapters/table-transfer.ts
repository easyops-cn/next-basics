import { Story } from "@next-core/brick-types";

export const TableTransferStory: Story = {
  storyId: "presentational-bricks.table-transfer",
  category: "layout",
  type: "brick",
  author: "ann",
  text: {
    en: "Table Transfer",
    zh: "表格穿梭框",
  },
  description: {
    en: "table in transfer(support sort by dragging)",
    zh: "表格穿梭选择框（支持拖拽排序）",
  },
  icon: {
    lib: "fa",
    icon: "draw-polygon",
  },
  conf: {
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
};
