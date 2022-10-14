import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarWrapper } from "./AppBarWrapper";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

describe("AppBarWrapper", () => {
  it("should work", () => {
    const { container } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"app-bar-container\\"><div class=\\"app-bar\\" style=\\"position: fixed;\\"><div class=\\"app-bar-content\\" style=\\"justify-content: space-around;\\"><div class=\\"leftContainer\\"><slot name=\\"leftContainer\\"></slot></div><div class=\\"rightContainer\\"><slot name=\\"rightContainer\\"></slot></div></div></div></div>"`
    );
  });

  it("should render tipslist", async () => {
    const wrapper = mount(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    window.dispatchEvent(
      new CustomEvent("app.bar.tips", {
        detail: [
          {
            text: "hello world",
          },
        ],
      })
    );
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div class=\\"app-bar-container\\"><div class=\\"app-bar\\" style=\\"position: fixed;\\"><div style=\\"display: flex; justify-content: space-between; box-sizing: border-box; width: 100%; line-height: 26px; padding: 6px 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\\"><div>hello world</div></div><div class=\\"app-bar-content\\" style=\\"justify-content: space-around;\\"><div class=\\"leftContainer\\"><slot name=\\"leftContainer\\"></slot></div><div class=\\"rightContainer\\"><slot name=\\"rightContainer\\"></slot></div></div></div></div>"`
    );
  });
});
