import ReactDOM from "react-dom";
import "./";
import { GeneralInputNumberElement } from "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  /* do nothing */
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    /* do nothing */
  }) as any);

describe("forms.general-input-number", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-input-number"
    ) as GeneralInputNumberElement;
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
    const element = document.createElement(
      "forms.general-input-number"
    ) as GeneralInputNumberElement;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.value = 6;

    element._handlePressEnter("enter");
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "enter"
    );

    element._handleBlur(6);
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(6);

    element._handleFocus();
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual(
      null
    );

    element._handleChange("q");
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[3][0] as CustomEvent).detail).toEqual("q");
  });
});
