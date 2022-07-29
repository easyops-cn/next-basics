import "./";
import ReactDOM from "react-dom";
import { GeneralInputNumberRangeElement } from "./";
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
      "forms.general-input-number-range"
    ) as GeneralInputNumberRangeElement;
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
      "forms.general-input-number-range"
    ) as GeneralInputNumberRangeElement;
    const validate = jest.fn;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.value = { min: 1, max: 6 };
    element.validator = validate;

    element._handleBlur();
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      max: 6,
      min: 1,
    });

    element._handleFocus();
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      null
    );

    element._handleChange({ min: 1 });
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual({
      min: 1,
    });
  });

  it("validate should work", async () => {
    const element = document.createElement(
      "forms.general-input-number-range"
    ) as GeneralInputNumberRangeElement;
    await jest.runAllTimers();
    document.body.appendChild(element);
    const callbackFun = jest.fn();
    element.validateMinAndMax(
      { message: "最小值不能大于最大值" },
      { min: 8, max: 2 },
      callbackFun
    );
    expect(callbackFun).toHaveBeenCalled();
    expect(element.validateMinAndMax).toThrow();
  });
});
