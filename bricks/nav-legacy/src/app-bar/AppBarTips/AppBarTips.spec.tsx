import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarTips } from "./AppBarTips";

describe("AppBarTips", () => {
  it("should work", () => {
    const { container } = render(<AppBarTips text="Hello World" />);
    expect(container.getElementsByTagName("div")[0]).toHaveTextContent(
      "Hello World"
    );
  });
});
