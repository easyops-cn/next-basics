import React from "react";
import { render } from "@testing-library/react";

import { BrickCollectionInstanceExecution } from "./BrickCollectionInstanceExecution";

describe("BrickCollectionInstanceExecution", () => {
  it("should work", () => {
    const ids = ["1", "2"];
    const mockOnClick = jest.fn();

    const result = render(
      <BrickCollectionInstanceExecution ids={ids} onClick={mockOnClick} />
    );
    const asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();
  });
});
