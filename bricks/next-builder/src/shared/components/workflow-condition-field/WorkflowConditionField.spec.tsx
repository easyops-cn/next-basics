import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  WorkflowConditionField,
  FieldDropdownButton,
} from "./WorkflowConditionField";
import { WorkFLowValueType } from "../../../interface";

describe("WorkflowConditionField", () => {
  it("should work", () => {
    const mockChange = jest.fn();

    const mockLogicChange = jest.fn();

    const mockDelete = jest.fn();

    const props = {
      value: {
        fieldKey: "name",
        comparator: "$eq",
        valueInfo: {
          type: WorkFLowValueType.CONST,
          value: "test",
        },
      },
      field: {
        id: "name",
        name: "名称",
        type: "string",
      },
      comparatorList: [
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
      ],
      logicTypeList: [
        { name: "且", id: "$and" },
        { name: "或", id: "$or" },
      ],
      logicTypeValue: "$and",
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
      onChange: mockChange,
      onLogicTypeChange: mockLogicChange,
      onDelete: mockDelete,
    };

    render(<WorkflowConditionField {...props} />);

    fireEvent.change(screen.getByRole("textbox", { value: "test" }), {
      target: { value: "ddd" },
    });

    expect(mockChange.mock.calls[0][0]).toEqual({
      comparator: "$eq",
      fieldKey: "name",
      valueInfo: { type: "const", value: "ddd" },
    });

    fireEvent.click(screen.getByText("等于"));

    fireEvent.click(screen.getByText("不等于"));

    expect(mockChange.mock.calls[1][0]).toEqual({
      comparator: "$ne",
      fieldKey: "name",
      valueInfo: { type: "const", value: "test" },
    });
  });
});

describe("FieldDropdownButton", () => {
  it("should work", () => {
    const options = [
      {
        id: "name",
        name: "名称",
      },
      {
        id: "age",
        name: "年龄",
      },
    ];

    const mockClick = jest.fn();

    render(
      <FieldDropdownButton options={options} onClick={mockClick}>
        条件
      </FieldDropdownButton>
    );

    fireEvent.click(screen.getByText("条件"));

    expect(screen.queryAllByRole("menuitem").length).toEqual(2);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "name" },
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(1);
    expect(screen.queryAllByRole("menuitem")[0]).toHaveTextContent("名称");

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "" },
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(2);

    fireEvent.click(screen.queryAllByRole("menuitem")[0]);

    expect(mockClick.mock.calls[0][0]).toEqual("name");
  });
});
