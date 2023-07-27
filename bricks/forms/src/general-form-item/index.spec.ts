import ReactDOM from "react-dom";
import "./";
import { GeneralFormItemElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.general-form-item", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-form-item"
    ) as GeneralFormItemElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    const mockListener = jest.fn();
    const value = "some value";
    element.addEventListener("general-form-item.change", mockListener);
    spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0].props.children.props.onChange(value);
    expect(mockListener).toBeCalledWith(
      expect.objectContaining({
        type: "general-form-item.change",
        detail: value
      })
    );

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
