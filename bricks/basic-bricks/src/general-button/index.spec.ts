import ReactDOM from "react-dom";
import "./";
import { GeneralButtonElement } from "./";
import { createHistory } from "@next-core/brick-kit";

createHistory();

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);
const mockEventListener = jest.fn(e => {});

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("general-button", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.general-button"
    ) as GeneralButtonElement;
    element.buttonName = "";
    element.buttonProps = {
      type: "primary"
    };
    element.buttonUrl = "./";
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

  it(`should dispatch event when onClick has been called"`, async () => {
    const element = document.createElement(
      "basic-bricks.general-button"
    ) as GeneralButtonElement;
    element.addEventListener("general.button.click", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onClick();
    expect(mockEventListener).toBeCalled();
  });

  it(`should not dispatch event when onClick has been called"`, async () => {
    const element = document.createElement(
      "basic-bricks.general-button"
    ) as GeneralButtonElement;
    Object.assign(element, {
      buttonUrl: "homepage",
      buttonName: "name",
      disabled: true,
      disabledTooltip: "没有权限",
      tooltip: "点击跳转详情",
      target: "_blank"
    });
    element.addEventListener("general.button.click", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onClick();
    expect(mockEventListener).toBeCalled();
  });
});
