import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.preview-container", () => {
  it("should create a custom element", () => {
    const element = document.createElement("next-builder.preview-container");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyonDispatchEvent = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onPreviewDataValueSuccess("test");

    expect((spyonDispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "test"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onPreviewDataValueError("error");

    expect((spyonDispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      "error"
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
