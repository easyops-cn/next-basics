import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(jest.fn());
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(jest.fn());

describe("forms.cmdb-instance-select", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.cmdb-instance-select");
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

  it("updateObjectIdManual", async () => {
    const element = document.createElement("forms.cmdb-instance-select");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    (element as any).updateObjectIdManual("xxx");
    expect(spyOnRender).toBeCalled();
  });

  it("updateObjectIdManual", async () => {
    const fn = jest.fn();
    const element = document.createElement("forms.cmdb-instance-select");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("forms.cmdb-instance-select.change", fn);
    element.handleChange("xxx");
    expect(fn).toBeCalled();
  });
});
