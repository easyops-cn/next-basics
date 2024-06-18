import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VariableList } from "./VariableList";

describe("VariableList", () => {
  it("should work for array", () => {
    const { container } = render(
      // eslint-disable-next-line no-sparse-arrays
      <VariableList value={["quality", , "good"]} />
    );
    expect(container.getElementsByClassName("propItem").length).toEqual(3);

    expect(container.textContent).toEqual('0: "quality"1: empty2: "good"');
  });

  it("should work for object", () => {
    const { container } = render(
      <VariableList value={{ name: "easyops", age: 18 }} />
    );
    expect(container.textContent).toEqual('name: "easyops"age: 18');
  });
});
