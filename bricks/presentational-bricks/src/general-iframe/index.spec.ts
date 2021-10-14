import ReactDOM from "react-dom";
import { GeneralIframeElement } from "./";
import "./";

const spyOnDispatchEvent = jest.spyOn(window, "dispatchEvent");
const spyOnRemoveLister = jest.spyOn(window, "removeEventListener");

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
      border: "0px",
    };
    await jest.runAllTimers();
    expect(((element as any).iframe as HTMLIFrameElement).style.border).toBe(
      "0px"
    );
  });

  it("add event listener", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as any;
    await jest.runAllTimers();
    expect(spyOnDispatchEvent).not.toBeCalled();
    element.enableMessageSubscribe = true;
    element.src = "http://192.168.100.162";
    document.body.appendChild(element);

    const sypOnElementDispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.onMessage({ origin: "http://192.168.100.163" } as MessageEvent);

    expect(sypOnElementDispatchEvent).not.toBeCalled();

    element.messageOrigin = "http://192.168.100.163";
    element.onMessage({ origin: "http://192.168.100.163" } as MessageEvent);

    expect(
      (sypOnElementDispatchEvent.mock.calls[0][0] as CustomEvent).type
    ).toEqual("iframe.message");

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(spyOnRemoveLister).toBeCalled();
  });
});
