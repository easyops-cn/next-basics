import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkflowConditionItem } from "./WorkflowConditionItem";

describe("WorkflowConditionItem", () => {
  it("should work", () => {
    const mockChange = jest.fn();
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
    const props = {
      value: {
        operator: "$and",
        groups: [
          {
            operator: "$and",
            conditions: [
              {
                fieldKey: "name",
                comparator: "$eq",
                valueInfo: {
                  type: "const",
                },
              },
            ],
          },
        ],
      },
      comparatorMap: {
        str: defaultOptions,
        date: defaultOptions,
        datetime: defaultOptions,
        int: defaultOptions,
      },
      logicTypeList: [
        { name: "且", id: "$and" },
        { name: "或", id: "$or" },
      ],
      dataList: [
        {
          label: "更新记录1",
          value: "createUpdate1",
          options: [
            {
              label: "名称",
              value: "createUpdate1.stepData.name",
            },
            {
              label: "文本",
              value: "createUpdate1.stepData.text",
            },
            {
              label: "描述",
              value: "createUpdate1.stepData.description",
            },
          ],
        },
        {
          label: "开始",
          value: "start1",
          options: [
            {
              label: "名称",
              value: "start1.stepData.name",
            },
            {
              label: "数量",
              value: "start1.stepData.count",
            },
            {
              label: "测试值",
              value: "start1.stepData.test",
            },
          ],
        },
      ],
      fieldList: [
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
      onChange: mockChange,
    };

    render(<WorkflowConditionItem {...props} />);

    expect(screen.getByText("名称")).toBeInTheDocument();
  });
});
