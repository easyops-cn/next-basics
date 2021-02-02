import ReactDOM from "react-dom";
import { GeneralInputElement } from "./";
import "./";
// eslint-disable-next-line @typescript-eslint/no-empty-function
const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .mockImplementation((() => {}) as any);

describe("forms.general-input", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-input"
    ) as GeneralInputElement;

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

  it("should trigger event", async () => {
    const element = document.createElement("forms.general-input") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleChange("q");
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual("q");

    element._handleKeyUp("alt");
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      "alt"
    );

    element._handleFocus();
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual(
      null
    );

    element._handleBlur("app");
    expect((dispatchEvent.mock.calls[3][0] as CustomEvent).detail).toEqual(
      "app"
    );

    element._handlePressEnter("enter");
    expect((dispatchEvent.mock.calls[4][0] as CustomEvent).detail).toEqual(
      "enter"
    );

    element._handleKeyDown("down");
    expect((dispatchEvent.mock.calls[5][0] as CustomEvent).detail).toEqual(
      "down"
    );
  });
});
