import React from "react";
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ValueTypeField } from "./ValueTypeField";

describe("ValueTypeItem", () => {
  it("should work with string type", () => {
    const field = {
      id: "name",
      name: "名称",
      type: "string",
    };
    render(<ValueTypeField field={field} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should work with number type", () => {
    const field = {
      id: "age",
      name: "年龄",
      type: "number",
    };
    render(<ValueTypeField field={field} />);

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("should work with boolean type", () => {
    const field = {
      id: "isMultiple",
      name: "isMultiple",
      type: "boolean",
    };
    render(<ValueTypeField field={field} />);

    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("should work with object type", () => {
    const field = {
      id: "data",
      name: "data",
      type: "object",
    };
    render(<ValueTypeField field={field} />);

    expect(screen.getByText("code editor")).toBeInTheDocument();
  });

  it("should work with date type", () => {
    const field = {
      id: "date",
      name: "日期",
      type: "date",
    };

    const mockChange = jest.fn();
    render(
      <ValueTypeField field={field} value="2023-06-20" onChange={mockChange} />
    );

    fireEvent.keyDown(screen.getByRole("textbox"));

    fireEvent.click(screen.getByText("21"));

    expect(mockChange.mock.calls[0][0]).toEqual("2023-06-21");

    expect(screen.getByLabelText("calendar")).toBeInTheDocument();
  });

  it("should work with datetime type", () => {
    const field = {
      id: "datetime",
      name: "时间",
      type: "datetime",
    };
    render(<ValueTypeField field={field} />);

    fireEvent.keyDown(screen.getByRole("textbox"));
    expect(
      document.body.querySelector(".ant-picker-time-panel")
    ).toBeInTheDocument();
  });

  it("should work with string[] type", () => {
    const field = {
      id: "tags",
      name: "标签",
      type: "string[]",
    };
    render(<ValueTypeField field={field} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
