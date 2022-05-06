import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GeneralPopup } from "./GeneralPopup";

describe("GeneralPopup", () => {
  it("should work", () => {
    const closePopup = jest.fn();
    const props = {
      visible: true,
      modalTitle: "title",
      closePopup: closePopup,
    };
    const { baseElement } = render(<GeneralPopup {...props} />);
    const closeIcon = baseElement.getElementsByClassName("close")[0];
    fireEvent(closeIcon, new MouseEvent("click", { bubbles: true }));
    expect(closePopup).toBeCalled();
  });

  it("should hidden", () => {
    const props = {
      visible: false,
    };
    const { baseElement } = render(<GeneralPopup {...props} />);
    const closeIcon = baseElement.getElementsByClassName("close");
    expect(closeIcon.length).toBe(0);
    expect(baseElement.innerHTML).toBe("<div></div>");
  });
});
