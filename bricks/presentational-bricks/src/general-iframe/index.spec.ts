import ReactDOM from "react-dom";
import { GeneralIframeElement } from "./";
import "./";

const spyOnDispatchEvent = jest.spyOn(window, "dispatchEvent");
const spyOnRemoveLister = jest.spyOn(window, "removeEventListener");

describe("presentational-bricks.general-iframe", () => {
  it("render nothing if no src property", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as GeneralIframeElement;

    await jest.runAllTimers();
    document.body.appendChild(element);

    expect(element.childNodes.length).toEqual(0);
  });
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as GeneralIframeElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnDispatchEvent).not.toBeCalled();
    document.body.appendChild(element);
    element.src = "http://192.168.100.162";
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

  it("postMessage should send message to iframe", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as any;
    element.src = "http://192.168.100.162/page";
    document.body.appendChild(element);
    await jest.runAllTimers();

    const iframeEl = element.querySelector("iframe") as HTMLIFrameElement;
    const mockPostMessage = jest.fn();
    iframeEl.contentWindow.postMessage = mockPostMessage;

    element.postMessage({ type: "hello" });
    expect(mockPostMessage).toBeCalledWith(
      { type: "hello" },
      "http://192.168.100.162"
    );

    document.body.removeChild(element);
  });

  it("postMessage should use messageOrigin as targetOrigin", async () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as any;
    element.src = "http://192.168.100.162/page";
    element.messageOrigin = "http://192.168.100.163";
    document.body.appendChild(element);
    await jest.runAllTimers();

    const iframeEl = element.querySelector("iframe") as HTMLIFrameElement;
    const mockPostMessage = jest.fn();
    iframeEl.contentWindow.postMessage = mockPostMessage;

    element.postMessage("data");
    expect(mockPostMessage).toBeCalledWith("data", "http://192.168.100.163");

    document.body.removeChild(element);
  });

  it("postMessage should auto-register message listener", async () => {
    const spyOnAddListener = jest.spyOn(window, "addEventListener");
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as any;
    element.src = "http://192.168.100.162/page";
    document.body.appendChild(element);
    await jest.runAllTimers();

    const iframeEl = element.querySelector("iframe") as HTMLIFrameElement;
    iframeEl.contentWindow.postMessage = jest.fn();

    const callsBefore = spyOnAddListener.mock.calls.filter(
      (c) => c[0] === "message"
    ).length;
    element.postMessage("data");
    const callsAfter = spyOnAddListener.mock.calls.filter(
      (c) => c[0] === "message"
    ).length;
    expect(callsAfter).toBe(callsBefore + 1);

    element.postMessage("data2");
    const callsFinal = spyOnAddListener.mock.calls.filter(
      (c) => c[0] === "message"
    ).length;
    expect(callsFinal).toBe(callsAfter);

    document.body.removeChild(element);
    spyOnAddListener.mockRestore();
  });

  it("postMessage should throw if iframe is not ready", () => {
    const element = document.createElement(
      "presentational-bricks.general-iframe"
    ) as any;
    expect(() => element.postMessage("data")).toThrow("iframe is not ready");
  });
});
