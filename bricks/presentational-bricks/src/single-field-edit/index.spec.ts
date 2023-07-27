import ReactDOM from "react-dom";
import "./";
import { SingleFieldEditElement } from "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.single-field-edit", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.single-field-edit"
    ) as SingleFieldEditElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    const mockListener = jest.fn();
    element.addEventListener("single-field-edit.ok", mockListener);
    element.addEventListener("single-field-edit.cancel", mockListener);
    const initialValue = "value";
    element.open({ detail: { initialValue } } as CustomEvent);
    expect(element.visible).toBe(true);
    expect(element.initialValue).toEqual(initialValue);
    element.close();
    expect(element.visible).toBe(false);

    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    const spyOnClose = jest.spyOn(element, "close");
    const onOk =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.onOk;
    onOk(initialValue);
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({
        type: "single-field-edit.ok",
        detail: initialValue,
        cancelable: true
      })
    );
    expect(spyOnClose).toBeCalledTimes(1);
    mockListener.mockImplementationOnce((e: CustomEvent) => {
      e.preventDefault();
    });
    onOk(initialValue);
    expect(spyOnClose).toBeCalledTimes(1);
    const onCancel =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.onCancel;
    onCancel();
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({
        type: "single-field-edit.cancel",
        cancelable: true
      })
    );
    expect(spyOnClose).toBeCalledTimes(2);
    mockListener.mockImplementationOnce((e: CustomEvent) => {
      e.preventDefault();
    });
    onCancel();
    expect(spyOnClose).toBeCalledTimes(2);
    element.removeEventListener("single-field-edit.ok", mockListener);
    element.removeEventListener("single-field-edit.cancel", mockListener);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
