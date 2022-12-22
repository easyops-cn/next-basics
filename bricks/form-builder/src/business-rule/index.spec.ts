import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("form-builder.business-rule", () => {
  it("should create a custom element", () => {
    const element = document.createElement("form-builder.business-rule");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("handleChange event", async () => {
    const fn = jest.fn();
    const element = document.createElement("form-builder.business-rule");
    // Always waiting for async `(dis)connectedCallback`
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.addEventListener("form-builder.business-rule.edit", fn);
    element.addEventListener("form-builder.business-rule.delete", fn);
    element.businessEdit("xxx");
    element.businessDelete("xxx");
    expect(fn).toBeCalled();
  });
});
