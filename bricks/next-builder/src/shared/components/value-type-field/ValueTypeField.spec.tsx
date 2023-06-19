import React from "react";
import { render, screen } from "@testing-library/react";
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
});
