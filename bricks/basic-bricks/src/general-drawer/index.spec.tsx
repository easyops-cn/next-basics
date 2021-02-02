import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("basic-bricks.general-drawer", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.general-drawer"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    element.click();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.open({ noEvent: true });
    expect(element.isVisible).toBe(true);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.close({ noEvent: true });
    expect(element.isVisible).toBe(false);
    expect(sypOnDispatchEvent).not.toBeCalled();
    element.open();
    expect(sypOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "general.drawer.open" })
    );
    element.close();
    expect(sypOnDispatchEvent).toBeCalledWith(
      expect.objectContaining({ type: "general.drawer.close" })
    );

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
