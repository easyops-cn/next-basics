import { getDefaultComparator } from "./processor";
describe("processor", () => {
  const defaultOptions = [
    {
      name: "等于",
      id: "$eq",
    },
    {
      name: "不等于",
      id: "$ne",
    },
    {
      name: "包含",
      id: "$like",
    },
    {
      name: "不包含",
      id: "$nlike",
    },
  ];

  it.each([
    [
      [
        {
          name: "名称",
          id: "name",
          type: "string",
          originType: "str",
          required: true,
        },
        {
          name: "年龄",
          id: "age",
          type: "number",
          originType: "int",
          required: true,
        },
        {
          name: "日期",
          id: "date",
          type: "date",
          originType: "date",
          required: false,
          timeFormat: "YYYY/MM/DD",
        },
        {
          name: "时间",
          id: "datetime",
          type: "datetime",
          originType: "datetime",
          required: false,
        },
      ],
      "name",
      {
        str: defaultOptions,
        date: defaultOptions,
        datetime: defaultOptions,
        int: defaultOptions,
      },
      "$eq",
    ],
    [
      [],
      "name",
      {
        str: defaultOptions,
      },
      undefined,
    ],
  ])("%# should work", (fieldList, id, comparatorMap, result) => {
    expect(getDefaultComparator(fieldList, id, comparatorMap)).toEqual(result);
  });
});
