import ReactDOM from "react-dom";
import { GeneralSelectElement } from "./";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("forms.general-select", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-select"
    ) as GeneralSelectElement;

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
    const element = document.createElement("forms.general-select") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    const value = 'a';
    element._handleChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: 'general.select.change', detail: value})
    );

    const value2 = {'a': 1}
    element._handleChangeV2(value2);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: 'general.select.change.v2', detail: value2})
    );

    element._handleFocus();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: 'general.select.focus', detail: null})
    );

    element._handleBlur();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: 'general.select.blur', detail: null})
    );

    element._handleSearch("qq");
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({type: 'general.select.search', detail: "qq"})
    );
  });
});
