import ReactDOM from "react-dom";
import { GeneralTimePickerElement } from "./";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  /* do nothing */
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    /* do nothing */
  }) as any);

describe("forms.general-time-picker", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-time-picker"
    ) as GeneralTimePickerElement;

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
    const element = document.createElement("forms.general-time-picker") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleOpenChange(true, "16:30:00");
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "general.time.open"
    );
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "16:30:00"
    );

    element._handleOpenChange(false, "14:30:00");
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "general.time.close"
    );
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      "14:30:00"
    );

    element._handleChange("18:30:00");
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual(
      "18:30:00"
    );
  });
});
