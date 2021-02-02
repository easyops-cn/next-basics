import ReactDOM from "react-dom";
import { GeneralIframeElement } from "./";
import "./";

const spyOnDispatchEvent = jest.spyOn(window, "dispatchEvent");

describe("presentational-bricks.general-iframe", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as GeneralIframeElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnDispatchEvent).not.toBeCalled();
    document.body.appendChild(element);
    element.iframeStyle = {
      border: "0px"
    };
    await jest.runAllTimers();
    expect(((element as any).iframe as HTMLIFrameElement).style.border).toBe(
      "0px"
    );
  });
});
