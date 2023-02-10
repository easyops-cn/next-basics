import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.cmdb-cascader", () => {
  it("should create a custom element", () => {
    const element = document.createElement("forms.cmdb-cascader");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("handleChange event", async () => {
    const fn = jest.fn();
    const element = document.createElement("forms.cmdb-cascader");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("forms.cmdb-cascader.change", fn);
    element.handleChange("xxx");
    expect(fn).toBeCalledTimes(0);
  });

  it("handleChangeV2 event", async () => {
    const fn = jest.fn();
    const element = document.createElement("forms.cmdb-cascader");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("forms.cmdb-cascader.change.v2", fn);
    element.handleChangeV2("xxx");
    expect(fn).toBeCalledTimes(1);
  });
});
