import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchDataTree } from "./WorkbenchDataTree";
import {
  useBuilderDataManager,
  useBuilderData,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper");

(useBuilderDataManager as jest.Mock).mockReturnValue({});
(useBuilderData as jest.Mock).mockReturnValue({
  rootId: 1,
});

describe("WorkbenchDataTree", () => {
  it("should work", () => {
    const wrapper = render(<WorkbenchDataTree trees={[]} />);
    expect(wrapper).toBeTruthy();
  });
});
