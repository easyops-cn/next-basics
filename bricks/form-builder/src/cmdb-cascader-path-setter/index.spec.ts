import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("form-builder.cmdb-cascader-path-setter", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "form-builder.cmdb-cascader-path-setter"
    );
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("handleChange event", async () => {
    const fn = jest.fn();
    const element = document.createElement(
      "form-builder.cmdb-cascader-path-setter"
    );
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("forms.cmdb-cascader-path.change", fn);
    element.handleChange("xxx");
    expect(fn).toBeCalled();
  });
});
