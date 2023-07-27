import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const mockEventListener = jest.fn((e) => {});

describe("presentational-bricks.basic-icon", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.basic-icon");
    Object.assign(element, {
      icon: {
        lib: "fa",
        icon: "angle-left",
        prefix: "fas",
        color: "#167be0",
      },
      renderBg: true,
      bgColor: "#ff0000",
      bgSize: "58px",
      size: "29px",
    });
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "icon.click" when _itemClick has been called"`, async () => {
    const element = document.createElement("presentational-bricks.basic-icon");
    Object.assign(element, {
      icon: {
        lib: "fa",
        icon: "angle-left",
        prefix: "fas",
        color: "#167be0",
      },
    });
    element.addEventListener("icon.click", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.itemClick();
    expect(mockEventListener).toHaveBeenCalled();
  });
});
