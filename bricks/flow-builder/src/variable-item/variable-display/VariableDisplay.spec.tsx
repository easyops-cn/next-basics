import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VariableDisplay } from "./VariableDisplay";

describe("VariableDisplay", () => {
  it("should work for array value when not expanded", () => {
    const { container } = render(<VariableDisplay value={[1, 2]} />);
    expect(container.textContent).toEqual(" (2) [1, 2]");
  });

  it("should work for object value when not expanded", () => {
    const { container } = render(
      <VariableDisplay value={{ quality: "good", hello: "world" }} />
    );
    expect(container.textContent).toEqual('{quality: "good", hello: "world"}');
  });

  it("should work for array value when expanded", () => {
    const { container } = render(<VariableDisplay value={[1, 2]} expanded />);

    expect(container.textContent).toEqual("Array(2)");
  });

  it("should work for object value when expanded", () => {
    const { container } = render(
      <VariableDisplay value={{ quality: "good", hello: "world" }} expanded />
    );
    expect(container.textContent).toBe("Object");
  });

  it("should work for object value in minimal mode", () => {
    const { container } = render(
      <VariableDisplay value={{ quality: "good", hello: "world" }} minimal />
    );
    expect(container.textContent).toBe("{…}");
  });

  it("should work for string value", () => {
    const { container } = render(<VariableDisplay value="good" />);
    expect(container.textContent).toBe('"good"');
  });

  it("should work for function value", () => {
    const { container, debug } = render(<VariableDisplay value={() => 0} />);
    debug();
    expect(container.querySelector("span")).toHaveClass("variableFunction");

    expect(container.textContent).toBe("ƒ");
  });

  it("should work for null value", () => {
    const { container } = render(<VariableDisplay value={null} />);
    expect(container.querySelector("span")).toHaveClass(
      "variablePrimitive variableNil"
    );
    expect(container.textContent).toBe("null");
  });

  it("should work for undefined value", () => {
    const { container } = render(<VariableDisplay value={undefined} />);
    expect(container.querySelector("span")).toHaveClass(
      " variablePrimitive variableNil"
    );
    expect(container.textContent).toBe("undefined");
  });

  it("should work for other primitive value", () => {
    const { container } = render(<VariableDisplay value={0} />);
    expect(container.querySelector("span")).toHaveClass("variablePrimitive");
    expect(container.textContent).toBe("0");
  });
});
