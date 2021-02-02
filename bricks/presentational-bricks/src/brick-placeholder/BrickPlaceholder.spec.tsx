import React from "react";
import { render } from "@testing-library/react";

import { BrickPlaceholder } from "./BrickPlaceholder";

describe("BrickPlaceholder", () => {
  it("should work", () => {
    const result = render(<BrickPlaceholder text="" />);
    const asFragment = result.asFragment;
    expect(asFragment()).toMatchSnapshot();
  });
});
