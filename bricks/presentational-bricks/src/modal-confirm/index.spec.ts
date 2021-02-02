import ReactDOM from "react-dom";
import "./";
import { ModalConfirmElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.modal-confirm", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.modal-confirm"
    ) as ModalConfirmElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    const mockListener = jest.fn();
    element.addEventListener("confirm.ok", mockListener);
    element.addEventListener("confirm.cancel", mockListener);
    const dataSource = {};
    element.open({
      detail: {
        dataSource,
        okButtonProps: { type: "danger" },
        cancelButtonProps: { disabled: true }
      }
    } as CustomEvent);
    expect(element.visible).toBe(true);
    expect(element.dataSource).toEqual(dataSource);
    element.close();
    expect(element.visible).toBe(false);

    element.open({
      okButtonProps: { type: "danger" },
      cancelButtonProps: { disabled: true }
    });
    expect(element.visible).toBe(true);
    element.close();
    expect(element.visible).toBe(false);

    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    const spyOnClose = jest.spyOn(element, "close");
    const onOk =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.onOk;
    onOk();
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({
        type: "confirm.ok",
        detail: dataSource,
        cancelable: true
      })
    );
    expect(spyOnClose).toBeCalledTimes(1);
    mockListener.mockImplementationOnce((e: CustomEvent) => {
      e.preventDefault();
    });
    onOk();
    expect(spyOnClose).toBeCalledTimes(1);
    const onCancel =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.onCancel;
    onCancel();
    expect(spyOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "confirm.cancel", cancelable: true })
    );
    expect(spyOnClose).toBeCalledTimes(2);
    mockListener.mockImplementationOnce((e: CustomEvent) => {
      e.preventDefault();
    });
    onCancel();
    expect(spyOnClose).toBeCalledTimes(2);
    element.removeEventListener("confirm.ok", mockListener);
    element.removeEventListener("confirm.cancel", mockListener);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
