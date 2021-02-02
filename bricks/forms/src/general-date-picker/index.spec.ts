import ReactDOM from "react-dom";
import { GeneralDatePickerElement } from "./";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  /* do nothing */
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    /* do nothing */
  }) as any);

describe("forms.general-date-picker", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-date-picker"
    ) as GeneralDatePickerElement;

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
    const element = document.createElement("forms.general-date-picker") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    const value = '2020-1-1'
    element._handleChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: "general.date.change", detail: value})
    );
    element._handleOk();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: "general.date.ok", detail: null})
    );
  });
});
