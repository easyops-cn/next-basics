import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("basic-bricks.general-custom-buttons", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.general-custom-buttons"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    element.customButtons = [{ id: "x" }];
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.handleClick("");
    element.updateButton("", null);
    element.updateButton("x", { disabled: true });
    element.updateButton("x", { disabled: true });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
