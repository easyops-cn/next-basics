import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchBackend } from "./WorkbenchBackend";

describe("WorkbenchWorker", () => {
  it("should work", () => {
    const wrapper = render(<WorkbenchBackend />);
    expect(wrapper).toBeTruthy();
  });
});
