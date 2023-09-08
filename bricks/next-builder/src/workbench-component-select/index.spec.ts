import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.workbench-component-select", () => {
  it("should create a custom element", () => {
    const onActionClick = jest.fn();
    const onDrag = jest.fn();
    const onFeedbackClick = jest.fn();
    const onInstructionsClick = jest.fn();
    const element = document.createElement(
      "next-builder.workbench-component-select"
    );
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    element.addEventListener("action.click", onActionClick);
    element.addEventListener("on.drag", onDrag);
    element.addEventListener("feedback.click", onFeedbackClick);
    element.addEventListener("instructions.click", onInstructionsClick);

    jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onActionClick();
    expect(onActionClick).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onDrag();
    expect(onDrag).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onFeedbackClick();
    expect(onFeedbackClick).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onInstructionsClick();
    expect(onInstructionsClick).toBeCalled();

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
