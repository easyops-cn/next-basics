import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PollAnnounce } from "./PollAnnounce";

xdescribe("PollAnnounce", () => {
  it("should work", () => {
    render(<PollAnnounce />);
    fireEvent.click(screen.getByTestId("my-brick"));
    expect(screen.getByTestId("my-brick")).toHaveTextContent("AGILE works!");
  });
});
