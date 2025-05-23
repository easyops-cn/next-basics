import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("frame-bricks.side-bar", () => {
  it("should create a custom element", () => {
    const element = document.createElement("frame-bricks.side-bar");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should create a custom element without nav bar", () => {
    const element = document.createElement("frame-bricks.side-bar") as any;
    element.noAppNavBar = true;
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const style = getComputedStyle(element);
    expect(style.top).toEqual("0px");
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
