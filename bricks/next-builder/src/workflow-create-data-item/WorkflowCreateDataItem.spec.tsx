import React from "react";
import { fireEvent, render, screen, prettyDOM } from "@testing-library/react";
import * as customValidator from "../shared/components/value-type-field/custom-validator";
import "@testing-library/jest-dom";
import {
  WorkflowCreateDataItem,
  LegacyWorkflowCreateDataItem,
} from "./WorkflowCreateDataItem";
import { WorkFLowValueType } from "../interface";

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
        name: "数量",
        id: "count",
        type: "number",
        required: false,
      },
    ];

    const { container } = render(
      <WorkflowCreateDataItem
        dataList={dataList}
        fieldList={fieldList}
        label="字段配置"
        name="field"
      />
    );

    expect(container.querySelectorAll(".ant-form-item").length).toEqual(3);
  });

  describe("LegacyWorkflowCreateDataItem", () => {
    it("should work", async () => {
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

      const fieldList = [
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
          name: "数量",
          id: "count",
          type: "number",
          originType: "int",
          required: false,
        },
      ];

      const value = {
        name: {
          type: WorkFLowValueType.CONST,
          value: "test",
        },
        count: {
          type: WorkFLowValueType.EXPR,
          value: "test.count",
        },
      };

      const mockOnChange = jest.fn();
      const { container } = render(
        <LegacyWorkflowCreateDataItem
          dataList={dataList}
          fieldList={fieldList}
          value={value}
          onChange={mockOnChange}
        />
      );

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "new value" },
      });

      expect(mockOnChange.mock.calls[0][0]).toEqual({
        age: {
          type: "const",
          value: undefined,
        },
        count: { type: "expr", value: "test.count" },
        name: { type: "const", value: "new value" },
      });

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "" },
      });

      expect(mockOnChange.mock.calls[1][0]).toEqual({
        age: {
          type: "const",
          value: undefined,
        },
        count: { type: "expr", value: "test.count" },
        name: { type: "const", value: "" },
      });

      fireEvent.click(screen.getAllByLabelText("swap")[0]);

      expect(mockOnChange.mock.calls[2][0]).toEqual({
        age: {
          type: "const",
          value: undefined,
        },
        count: { type: "expr", value: "test.count" },
        name: { type: "expr", value: undefined },
      });

      fireEvent.click(screen.getAllByLabelText("swap")[2]);

      expect(mockOnChange.mock.calls[3][0]).toEqual({
        age: {
          type: "const",
          value: undefined,
        },
        count: { type: "const", value: undefined },
        name: { type: "expr", value: undefined },
      });
    });

    it("should work with custom validator", async () => {
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

      const fieldList = [
        {
          name: "名称",
          id: "name",
          type: "string",
          originType: "str",
          required: true,
          regex: "^[a-z]+$",
        },
        {
          name: "年龄",
          id: "age",
          type: "number",
          originType: "int",
          required: true,
        },
      ];

      const value = {
        name: {
          type: WorkFLowValueType.CONST,
          value: "test",
        },
        count: {
          type: WorkFLowValueType.EXPR,
          value: "test.count",
        },
      };

      const mockOnChange = jest.fn();

      const spyOnRegexValidator = jest.spyOn(
        customValidator,
        "regexpValidator"
      );

      render(
        <LegacyWorkflowCreateDataItem
          dataList={dataList}
          fieldList={fieldList}
          value={value}
          onChange={mockOnChange}
        />
      );

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "~~~" },
      });

      await (global as any).flushPromises();

      expect(spyOnRegexValidator).toHaveBeenCalled();
    });
  });
});
