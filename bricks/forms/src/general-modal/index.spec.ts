import ReactDOM from "react-dom";
import "./";
import { GeneralModalElement } from "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("forms.general-modal", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-modal"
    ) as GeneralModalElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    Object.assign(element, {
      dataSource: {
        title: "123",
      },
      fields: {
        modalTitle: "title",
      },
    });
    element.dispatchEvent(new MouseEvent("click"));

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.open({ noEvent: true });
    expect(element.isVisible).toBe(true);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.close({ noEvent: true });
    expect(element.isVisible).toBe(false);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.open();
    expect(sypOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({
        type: "modal.open",
        detail: element.dataSource,
      })
    );
    element.close();
    expect(sypOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({
        type: "modal.close",
        detail: element.dataSource,
      })
    );

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
