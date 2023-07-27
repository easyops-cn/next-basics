import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  /* do nothing */
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    /* do nothing */
  }) as any);

describe("forms.general-text-area", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.general-text-area");
    // Always waiting for async `(dis)connectedCallback`
    (element as any).value = "";
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
    const element = document.createElement("forms.general-text-area") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    const value = "a";
    element._handleChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({
        type: "general.textarea.change",
        detail: value,
      })
    );

    element._handleFocus();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "general.textarea.focus", detail: null })
    );

    element._handleBlur("TEST");
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "general.textarea.blur", detail: "TEST" })
    );

    const detail = {};
    element._handleBlurV2(detail);
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "general.textarea.blur.V2", detail })
    );
  });
});
