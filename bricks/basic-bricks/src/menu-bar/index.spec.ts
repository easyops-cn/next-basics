import ReactDOM from "react-dom";
import "./";
import { MenuBarBrick } from "@next-core/brick-types";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("menu-bar", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.menu-bar"
    ) as MenuBarBrick;
    element.softExpanded = true;
    expect(element.softExpanded).toBe(false);
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
