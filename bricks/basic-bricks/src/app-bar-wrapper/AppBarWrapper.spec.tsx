import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarWrapper } from "./AppBarWrapper";

describe("AppBarWrapper", () => {
  it("should work", () => {
    const { container } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"app-bar-container\\"><div class=\\"app-bar\\" style=\\"position: fixed;\\"><div class=\\"app-bar-content\\" style=\\"justify-content: space-around;\\"><div class=\\"leftContainer\\"><slot name=\\"leftContainer\\"></slot></div><div class=\\"rightContainer\\"><slot name=\\"rightContainer\\"></slot></div></div></div></div>"`
    );
  });
});
