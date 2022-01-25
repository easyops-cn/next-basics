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

  it(`should dispatch event when mouseEnter has been called"`, async () => {
    const mouseEnterListener = jest.fn();
    const element = document.createElement("frame-bricks.side-bar");
    element.addEventListener("side.bar.enter", mouseEnterListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onMouseEnter();
    expect(mouseEnterListener).toBeCalled();
  });

  it(`should dispatch event when mouseLeave has been called"`, async () => {
    const mouseLeaveListener = jest.fn();
    const element = document.createElement("frame-bricks.side-bar");
    element.addEventListener("side.bar.leave", mouseLeaveListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onMouseLeave();
    expect(mouseLeaveListener).toBeCalled();
  });
});
