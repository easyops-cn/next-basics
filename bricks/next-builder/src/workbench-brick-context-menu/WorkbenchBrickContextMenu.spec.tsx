import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchBrickContextMenu } from "./WorkbenchBrickContextMenu";

describe("WorkbenchBrickContextMenu", () => {
  it("should work", () => {
    const wrapper = render(<WorkbenchBrickContextMenu menu={[]} />);
    expect(wrapper).toBeTruthy();
  });
});
