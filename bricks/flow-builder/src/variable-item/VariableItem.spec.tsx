import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VariableItem } from "./VariableItem";

describe("VariableItem", () => {
  it("should work", () => {
    const { container } = render(
      <VariableItem
        propValue={{ name: "flowList", data: { id: "abc" } }}
        standalone
      />
    );

    expect(
      container.querySelectorAll(".variablePropValue")[1].textContent
    ).toEqual("{…}");

    fireEvent.click(screen.getByRole("img"));

    expect(container.querySelector(".variableObject").textContent).toEqual(
      '{id: "abc"}'
    );
  });
});
