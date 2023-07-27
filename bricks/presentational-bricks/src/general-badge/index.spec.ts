import ReactDOM from "react-dom";
import "./";
import { GeneralBadgeElement } from "./index";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.general-badge", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-badge"
    ) as GeneralBadgeElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.count = 10;
    element.dataSource = { username: "easyops" };
    element.overflowCount = 99;
    element.countColor = "red";
    element.content = {
      useBrick: {
        brick: "div",
        properties: {
          textContent: "我的通知",
        },
      },
    };
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
