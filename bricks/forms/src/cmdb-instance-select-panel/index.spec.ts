import ReactDOM from "react-dom";
import "./";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .mockImplementation((() => {}) as any);

describe("forms.cmdb-instance-select-panel", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.cmdb-instance-select-panel");

    Object.assign(element, {
      objectList: []
    });

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
      "forms.cmdb-instance-select-panel"
    ) as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleChange(["2bc4d", "56bca"]);
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual([
      "2bc4d",
      "56bca"
    ]);
  });
});
