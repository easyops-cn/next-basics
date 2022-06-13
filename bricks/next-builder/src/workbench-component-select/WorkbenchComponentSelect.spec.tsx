import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchComponentSelect } from "./WorkbenchComponentSelect";

describe("WorkbenchComponentSelect", () => {
  it("should work", () => {
    const wrapper = render(
      <WorkbenchComponentSelect brickList={[]} storyList={[]} />
    );
    fireEvent.click(screen.getByTestId("my-brick"));
    expect(wrapper).toBeTruthy();
  });
});
