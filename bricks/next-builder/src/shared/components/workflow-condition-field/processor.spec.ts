import { processFieldGroup, filterFieldOptions } from "./processor";

describe("processor", () => {
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
      [
        {
          id: "name",
          name: "名称",
          originType: "str",
          required: true,
          type: "string",
        },
        {
          id: "age",
          name: "年龄",
          originType: "int",
          required: true,
          type: "number",
        },
        {
          id: "date",
          name: "日期",
          originType: "date",
          required: false,
          timeFormat: "YYYY/MM/DD",
          type: "date",
        },
        {
          id: "datetime",
          name: "时间",
          originType: "datetime",
          required: false,
          type: "datetime",
        },
      ],
    ],
    [
      [
        {
          name: "名称",
          id: "name",
          type: "string",
          originType: "str",
          required: true,
          groupId: "start",
          groupLabel: "开始",
        },
        {
          name: "年龄",
          id: "age",
          type: "number",
          originType: "int",
          required: true,
          groupId: "start",
          groupLabel: "开始",
        },
        {
          name: "日期",
          id: "date",
          type: "date",
          originType: "date",
          required: false,
          timeFormat: "YYYY/MM/DD",
          groupId: "step1",
          groupLabel: "步骤1",
        },
        {
          name: "时间",
          id: "datetime",
          type: "datetime",
          originType: "datetime",
          required: false,
          groupId: "step1",
          groupLabel: "步骤1",
        },
      ],
      [
        {
          children: [
            {
              groupId: "start",
              groupLabel: "开始",
              id: "name",
              name: "名称",
              originType: "str",
              required: true,
              type: "string",
            },
            {
              groupId: "start",
              groupLabel: "开始",
              id: "age",
              name: "年龄",
              originType: "int",
              required: true,
              type: "number",
            },
          ],
          groupId: "start",
          groupLabel: "开始",
        },
        {
          children: [
            {
              groupId: "step1",
              groupLabel: "步骤1",
              id: "date",
              name: "日期",
              originType: "date",
              required: false,
              timeFormat: "YYYY/MM/DD",
              type: "date",
            },
            {
              groupId: "step1",
              groupLabel: "步骤1",
              id: "datetime",
              name: "时间",
              originType: "datetime",
              required: false,
              type: "datetime",
            },
          ],
          groupId: "step1",
          groupLabel: "步骤1",
        },
      ],
    ],
  ])("%# should work", (fieldList, result) => {
    expect(processFieldGroup(fieldList)).toEqual(result);
  });

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
      undefined,
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
    ],
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
      [
        {
          id: "name",
          name: "名称",
          originType: "str",
          required: true,
          type: "string",
        },
      ],
    ],
    [
      [
        {
          name: "名称",
          id: "name",
          type: "string",
          originType: "str",
          required: true,
          groupId: "start",
          groupLabel: "开始",
        },
        {
          name: "年龄",
          id: "age",
          type: "number",
          originType: "int",
          required: true,
          groupId: "start",
          groupLabel: "开始",
        },
        {
          name: "日期",
          id: "date",
          type: "date",
          originType: "date",
          required: false,
          timeFormat: "YYYY/MM/DD",
          groupId: "step1",
          groupLabel: "步骤1",
        },
        {
          name: "时间",
          id: "datetime",
          type: "datetime",
          originType: "datetime",
          required: false,
          groupId: "step1",
          groupLabel: "步骤1",
        },
      ],
      "开始",
      [
        {
          groupId: "start",
          groupLabel: "开始",
          id: "name",
          name: "名称",
          originType: "str",
          required: true,
          type: "string",
        },
        {
          groupId: "start",
          groupLabel: "开始",
          id: "age",
          name: "年龄",
          originType: "int",
          required: true,
          type: "number",
        },
      ],
    ],
  ])("%# should work", (fieldList, q, result) => {
    expect(filterFieldOptions(fieldList, q)).toEqual(result);
  });
});
