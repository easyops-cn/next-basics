import ReactDOM from "react-dom";
import "./";
import { GeneralModalElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null as any);

describe("basic-bricks.general-modal", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.general-modal"
    ) as GeneralModalElement;
    element.dataSource = {
      name: "modalName",
    };
    element.modalTitle = "modalTitle";
    element.width = 100;
    element.okText = "save";
    element.cancelText = "cancel";
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    element.fields = {
      modalTitle: "name",
    };
    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.open({ noEvent: true });
    expect(element.isVisible).toBe(true);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.close({ noEvent: true });
    expect(element.isVisible).toBe(false);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.open();
    expect(sypOnDispatchEvent.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: "modal.open",
        detail: element.dataSource,
      })
    );
    element.close();
    expect(sypOnDispatchEvent.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        type: "modal.close",
        detail: element.dataSource,
      })
    );

    element.handleAfterClose();
    expect(sypOnDispatchEvent.mock.calls[2][0]).toEqual(
      expect.objectContaining({
        type: "model.after.close",
      })
    );

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("listenOnClose should work", async () => {
    const element = document.createElement(
      "basic-bricks.general-modal"
    ) as GeneralModalElement;
    element.configProps = {};
    document.body.appendChild(element);
    await jest.runAllTimers();
    // element.querySelector('.ant-btn:not(.ant-btn-primary)').click();
    element.click();
    document.body.removeChild(element);
    await jest.runAllTimers();
  });
});
