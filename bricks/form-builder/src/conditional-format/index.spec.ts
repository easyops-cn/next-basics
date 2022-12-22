import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("form-builder.conditional-format", () => {
  it("should create a custom element", () => {
    const element = document.createElement("form-builder.conditional-format");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
  it("handleChange event", async () => {
    const fn = jest.fn();
    const element = document.createElement("form-builder.conditional-format");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("forms.conditional.change", fn);
    element.handleChange("xxx");
    expect(fn).toBeCalled();
  });
});
