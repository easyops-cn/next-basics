import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PrintButton } from "./PrintButton";

describe("PrintButton", () => {
  it("should work", () => {
    const { asFragment } = render(<PrintButton prefixTitle="hello" />);
    expect(asFragment()).toBeTruthy();
  });

  it("handleButton hover should work", () => {
    const { container, queryByText } = render(
      <PrintButton prefixTitle="hello" />
    );
    window.print = () => void 0;
    const printButton = container.querySelector(".print-hide");
    fireEvent.click(printButton);
    expect(queryByText("打印")).toBe(null);
  });
});
