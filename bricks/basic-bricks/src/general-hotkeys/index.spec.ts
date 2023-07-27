import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);

describe("basic-bricks.general-hotkeys", () => {
  it("should create a custom element", () => {
    const element = document.createElement("basic-bricks.general-hotkeys");
    (element as any).hotkeysConfig = [{ key: "f5", eventName: "test" }];
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).not.toBeCalled();
    document.body.removeChild(element);
  });
});
