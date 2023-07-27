import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.general-slider", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-slider"
    );
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange(3);

    expect(spyOnDispatch).toBeCalledWith(
      expect.objectContaining({
        type: "slider.change",
        detail: 3,
      })
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onAfterChange(5);

    expect(spyOnDispatch).toBeCalledWith(
      expect.objectContaining({
        type: "slider.after.change",
        detail: 5,
      })
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
