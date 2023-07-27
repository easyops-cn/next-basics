import { getFilterDataList, findFieldLabelOfData } from "./processor";

describe("processor", () => {
  describe("getFilterDataList", () => {
    it.each([
      [
        [
          {
            label: "test",
            value: "test",
            options: [
              {
                label: "名称",
                value: "test.name",
              },
              {
                label: "数量",
                value: "test.count",
              },
            ],
          },
          {
            label: "开始",
            value: "start",
            options: [
              {
                label: "ip",
                value: "start.ip",
              },
              {
                label: "创建时间",
                value: "start.ctime",
              },
            ],
          },
        ],
        "",
        [
          {
            label: "test",
            options: [
              { label: "名称", value: "test.name" },
              { label: "数量", value: "test.count" },
            ],
            value: "test",
          },
          {
            label: "开始",
            options: [
              { label: "ip", value: "start.ip" },
              { label: "创建时间", value: "start.ctime" },
            ],
            value: "start",
          },
        ],
      ],
      [
        [
          {
            label: "test",
            value: "test",
            options: [
              {
                label: "名称",
                value: "test.name",
              },
              {
                label: "数量",
                value: "test.count",
              },
            ],
          },
          {
            label: "开始",
            value: "start",
            options: [
              {
                label: "ip",
                value: "start.ip",
              },
              {
                label: "创建时间",
                value: "start.ctime",
              },
            ],
          },
        ],
        "ip",
        [
          {
            label: "开始",
            options: [{ label: "ip", value: "start.ip" }],
            value: "start",
          },
        ],
      ],
      [
        [
          {
            label: "test",
            value: "test",
          },
        ],
        "ip",
        [],
      ],
    ])("should work", (dataList, q, result) => {
      expect(getFilterDataList(dataList, q)).toEqual(result);
    });
  });

  describe("findFieldLabelOfData", () => {
    it.each([
      [
        [
          {
            label: "test",
            value: "test",
            options: [
              {
                label: "名称",
                value: "test.name",
              },
              {
                label: "数量",
                value: "test.count",
              },
            ],
          },
          {
            label: "开始",
            value: "start",
            options: [
              {
                label: "ip",
                value: "start.ip",
              },
              {
                label: "创建时间",
                value: "start.ctime",
              },
            ],
          },
        ],
        "start.ip",
        ["开始", "ip"],
      ],
      [
        [
          {
            label: "test",
            value: "test",
            options: [
              {
                label: "名称",
                value: "test.name",
              },
              {
                label: "数量",
                value: "test.count",
              },
            ],
          },
          {
            label: "开始",
            value: "start",
            options: [
              {
                label: "ip",
                value: "start.ip",
              },
              {
                label: "创建时间",
                value: "start.ctime",
              },
            ],
          },
        ],
        undefined,
        [undefined, undefined],
      ],
    ])("should work", (dataList, fieldValue, result) => {
      expect(findFieldLabelOfData(dataList, fieldValue)).toEqual(result);
    });
  });
});
