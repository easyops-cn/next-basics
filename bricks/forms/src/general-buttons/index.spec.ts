import ReactDOM from "react-dom";
import "./";
import { GeneralButtonsElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("forms.general-buttons", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-buttons"
    ) as GeneralButtonsElement;
    // Always waiting for async `(dis)connectedCallback`
    expect(element.submitType).toBe("primary");
    element.submitType = "unknown";
    expect(element.submitType).toBe("primary");
    element.submitType = "link";
    expect(element.submitType).toBe("link");

    expect(element.cancelType).toBe("link");
    element.cancelType = "unknown";
    expect(element.cancelType).toBe("link");
    element.cancelType = "danger";
    expect(element.cancelType).toBe("danger");

    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    const mockSubmitEventListener = jest.fn((e) => null);
    element.addEventListener("submit.button.click", mockSubmitEventListener);
    const mockCancelEventListener = jest.fn((e) => null);
    element.addEventListener("cancel.button.click", mockCancelEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onSubmitClick();
    expect(mockSubmitEventListener).toHaveBeenCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onCancelClick();
    expect(mockCancelEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
