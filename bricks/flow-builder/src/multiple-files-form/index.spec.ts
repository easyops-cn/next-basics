import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("flow-builder.multiple-files-form", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "flow-builder.multiple-files-form"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onFinish();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "validate.success"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onFinishFailed();

    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "validate.error"
    );

    const mockFomSubmitFn = jest.fn();
    element._form = {
      current: {
        submit: mockFomSubmitFn,
      },
    };

    element.validate();

    expect(mockFomSubmitFn).toHaveBeenCalled();

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
