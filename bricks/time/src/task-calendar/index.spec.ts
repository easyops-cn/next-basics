import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("time.task-calendar", () => {
  it("should create a custom element", () => {
    const element = document.createElement("time.task-calendar");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch event`, async () => {
    const element = document.createElement("time.task-calendar");
    Object.assign(element, {
      value: "2021-08-20",
    });
    const mockSelectEventListener = jest.fn((e) => null);
    const mockPanelChangeEventListener = jest.fn((e) => null);
    element.addEventListener("calendar.onSelect", mockSelectEventListener);
    element.addEventListener(
      "calendar.onPanelChange",
      mockPanelChangeEventListener
    );
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onDateSelect();
    expect(mockSelectEventListener).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onPickerPanelChange();
    expect(mockPanelChangeEventListener).toBeCalled();
  });
});
