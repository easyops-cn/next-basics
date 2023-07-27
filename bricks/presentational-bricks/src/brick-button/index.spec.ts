import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);
const mockEventListener = jest.fn(e => {});

describe("presentational-bricks.brick-button", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-button"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      text: "保存",
      configProps: {
        type: "primary"
      }
    });

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "button.click" when _handleOnClick has been called"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-button"
    );
    Object.assign(element, {
      text: "取消",
      configProps: {
        type: "primary"
      }
    });
    element.addEventListener("button.click", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onClick();
    expect(mockEventListener).toHaveBeenCalled();
  });
});
