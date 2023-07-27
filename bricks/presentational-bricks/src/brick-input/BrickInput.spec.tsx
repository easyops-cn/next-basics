import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { BrickInput, BrickInputProps } from "./BrickInput";

describe("BrickInput", () => {
  const props: BrickInputProps = {
    handleValueEmit: jest.fn(),
    placeholder: "xxx"
  };
  it("should work", () => {
    const { asFragment } = render(
      <BrickInput handleValueEmit={props.handleValueEmit} />
    );
    expect(asFragment).toMatchSnapshot();
  });
  it("trigger change", () => {
    const { getByPlaceholderText } = render(
      <BrickInput
        handleValueEmit={props.handleValueEmit}
        placeholder={props.placeholder}
        trigger="enter"
      />
    );
    const inputContainer = getByPlaceholderText("xxx");

    fireEvent.change(inputContainer, { target: { value: "xx" } });
    fireEvent.keyDown(inputContainer, { key: "Enter", keyCode: 13 });
    expect(props.handleValueEmit).toHaveBeenCalled();
  });
  it("change value", () => {
    const { getByPlaceholderText } = render(
      <BrickInput
        handleValueEmit={props.handleValueEmit}
        placeholder={props.placeholder}
      />
    );
    const inputContainer = getByPlaceholderText("xxx");
    fireEvent.change(inputContainer, { target: { value: "xx" } });
    fireEvent.keyDown(inputContainer, { key: "Enter", keyCode: 13 });
    expect(props.handleValueEmit).toHaveBeenCalled();
  });
});
