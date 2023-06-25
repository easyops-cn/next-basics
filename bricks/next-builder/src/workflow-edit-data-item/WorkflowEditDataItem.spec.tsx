import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkflowEditDataItem } from "./WorkflowEditDataItem";

describe("WorkflowEditDataItem", () => {
  it("should work", () => {
    const dataList = [
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
    ];
    const fieldList = [
      {
        name: "名称",
        id: "name",
        type: "string",
        required: true,
      },
      {
        name: "年龄",
        id: "age",
        type: "number",
        required: true,
      },
      {
        name: "日期",
        id: "date",
        type: "date",
        required: false,
        timeFormat: "YYYY/MM/DD",
      },
      {
        name: "时间",
        id: "datetime",
        type: "datetime",
        required: false,
      },
    ];

    const value = [
      {
        fieldKey: "name",
        valueInfo: {
          type: "const",
          value: "hahaha",
        },
      },
      {
        fieldKey: "age",
        valueInfo: {
          type: "expr",
          value: "start1.stepData.name",
        },
      },
    ];

    const mockChange = jest.fn();

    const { container } = render(
      <WorkflowEditDataItem
        name="stepFields"
        label="编辑字段"
        fieldList={fieldList}
        dataList={dataList}
        value={value}
        onChange={mockChange}
      />
    );
    screen.debug();

    expect(screen.getByText("编辑字段")).toBeInTheDocument();

    expect(
      screen.getAllByText("CURRENT_FIELD", { selector: "[title]" }).length
    ).toEqual(2);

    fireEvent.click(screen.getByTestId("add-field-button"));

    expect(
      screen.getAllByText("CURRENT_FIELD", { selector: "[title]" }).length
    ).toEqual(3);

    fireEvent.click(screen.getAllByLabelText("swap")[2]);

    expect(mockChange).toHaveBeenLastCalledWith([
      { fieldKey: "name", valueInfo: { type: "const", value: "hahaha" } },
      {
        fieldKey: "age",
        valueInfo: { type: "expr", value: "start1.stepData.name" },
      },
      { valueInfo: { type: "expr", value: undefined } },
    ]);

    fireEvent.click(screen.getAllByLabelText("swap")[2]);

    expect(mockChange).toHaveBeenLastCalledWith([
      { fieldKey: "name", valueInfo: { type: "const", value: "hahaha" } },
      {
        fieldKey: "age",
        valueInfo: { type: "expr", value: "start1.stepData.name" },
      },
      { valueInfo: { type: "const", value: undefined } },
    ]);

    fireEvent.click(container.querySelectorAll(".removeIcon")[2]);

    expect(mockChange).toHaveBeenLastCalledWith([
      { fieldKey: "name", valueInfo: { type: "const", value: "hahaha" } },
      {
        fieldKey: "age",
        valueInfo: { type: "expr", value: "start1.stepData.name" },
      },
    ]);
  });
});
