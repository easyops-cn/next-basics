import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkflowDataField, WorkflowFieldDropdown } from "./WorkflowDataField";

describe("WorkflowStepDataItem", () => {
  it("should work", () => {
    const dataList = [
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
    ];
    const mockOnChange = jest.fn();
    render(
      <WorkflowDataField
        dataList={dataList}
        value="start.ctime"
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.keyDown(selectElement);

    expect(document.body.querySelectorAll(".titleWrapper").length).toEqual(2);

    fireEvent.click(screen.getByText("数量"));

    expect(mockOnChange).toHaveBeenCalledWith("test.count");
  });

  describe("WorkflowFieldDropdown", () => {
    it("should work", () => {
      const dataList = [
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
      ];

      const mockOnchange = jest.fn();
      const { container } = render(
        <WorkflowFieldDropdown dataList={dataList} onChange={mockOnchange} />
      );

      fireEvent.click(screen.getByText("开始"));

      expect(container.querySelectorAll(".active").length).toEqual(1);

      fireEvent.click(screen.getByText("开始"));

      expect(container.querySelectorAll(".active").length).toEqual(0);

      const inputElement = screen.getByRole("textbox");

      fireEvent.change(inputElement, { target: { value: "ip" } });

      expect(screen.getByText("ip")).toBeInTheDocument();
    });
  });
});
