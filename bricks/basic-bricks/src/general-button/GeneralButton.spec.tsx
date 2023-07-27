import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createHistory } from "@next-core/brick-kit";
import { GeneralButton } from "./GeneralButton";

createHistory();

describe("GeneralButton", () => {
  const props = {
    buttonName: "Hello",
    onClick: jest.fn(),
    tooltip: "点击跳转详情",
  };

  it("should work", () => {
    render(<GeneralButton {...props} />);

    expect(screen.getByRole("button")).toHaveTextContent("Hello");
    expect(screen.getByRole("button").style.pointerEvents).not.toBe("none");
    expect(screen.getByRole("button").parentElement.tagName).not.toBe("A");
    expect(screen.queryByRole("img")).toBe(null);

    expect(props.onClick).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole("button"));
    expect(props.onClick).toBeCalledTimes(1);
  });

  it("should work with button url", () => {
    render(<GeneralButton {...props} buttonUrl="/ci" />);
    expect(screen.getByRole("button").parentElement.tagName).toBe("A");
    expect(screen.getByRole("button").parentElement.getAttribute("href")).toBe(
      "/ci"
    );
  });

  it("should work with button icon", () => {
    render(<GeneralButton {...props} buttonIcon="setting" />);
    expect(
      (screen.getByRole("img").firstChild as HTMLElement).dataset.icon
    ).toBe("setting");
  });

  it("should work with disabled button", () => {
    render(<GeneralButton {...props} disabled disabledTooltip="没有权限" />);
    expect(screen.getByRole("button").style.pointerEvents).toBe("none");
  });
});
