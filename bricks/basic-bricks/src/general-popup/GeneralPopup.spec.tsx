import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GeneralPopup } from "./GeneralPopup";

describe("GeneralPopup", () => {
  it("should work", () => {
    const props = {
      visible: true,
      modalTitle: "title",
    };
    const { baseElement } = render(<GeneralPopup {...props} />);
    const GeneralPopupElement =
      baseElement.getElementsByClassName("GeneralPopup");
    expect(GeneralPopupElement.length).toBe(1);
  });
});
