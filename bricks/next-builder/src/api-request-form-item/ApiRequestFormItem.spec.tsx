import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApiRequestFormItem } from "./ApiRequestFormItem";

describe("ApiRequestFormItem", () => {
  it("should work", () => {
    render(
      <ApiRequestFormItem
        value={{
          type: "flowApi",
          params: {
            useProvider: "test@abc:1.1.1",
            args: null,
          },
        }}
        typeChange={() => jest.fn()}
        onChange={() => jest.fn()}
      />
    );
    expect(screen.getByText("API集市")).toBeTruthy();
    expect(screen.getByText("手动填写")).toBeTruthy();
  });
});
