import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import styles from "DigitalNumber.module.css";

import { DigitalNumber, getPosition } from "./DigitalNumber";

describe("DigitalNumber", () => {
  it("should work", () => {
    render(<DigitalNumber value={34} height={22} />);
    expect(screen.getByTestId("digit-container").children.length).toBe(2);
    expect(screen.getAllByTestId("digit-box")).toHaveLength(2);
  });

  it("should work with thousands is true", () => {
    render(<DigitalNumber value={3434} thousands />);
    expect(screen.getAllByText(/,/i).length).toBe(1);
    expect(screen.getByTestId("digit-container").children.length).toBe(5);
  });

  it("should work with decimal is , and decimals is 3", () => {
    render(<DigitalNumber value={34.12} decimal="," decimals={3} />);
    expect(screen.getAllByText(/,/i).length).toBe(1);
    expect(screen.getByTestId("digit-container").children.length).toBe(6);
  });

  it("should work with type is custom", () => {
    render(<DigitalNumber type={"custom"} value={34.12} />);
    expect(
      screen
        .getByTestId("digit-container")
        .classList.contains(`${styles.digitContainer_custom}`)
    ).toBeTruthy();
    expect(screen.getByTestId("digit-container").children.length).toBe(5);
    expect(screen.getAllByText(/\./i).length).toBe(1);
  });

  it("should work with maxLen is 4", () => {
    render(<DigitalNumber type={"custom"} value={34.12} maxLen={4} />);
    expect(screen.getAllByText(/\./i).length).toBe(1);
    expect(screen.getByTestId("digit-container").children.length).toBe(7);
  });

  it("function getPosition should work", () => {
    expect(getPosition("5", 40)).toEqual(-200);
    expect(getPosition(",", 40)).toEqual(0);
  });
});
