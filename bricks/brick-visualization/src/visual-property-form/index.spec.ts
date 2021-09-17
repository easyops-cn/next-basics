import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock("@next-libs/code-editor-components", () => {});

describe("brick-visualization.visual-property-form", () => {
  it("should create a custom element visual-property-form", async () => {
    const element = document.createElement(
      "brick-visualization.visual-property-form"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    const formUtilsMock = {
      validateFields: jest.fn(() => () => {
        "lucy";
      }),
      resetPropertyFields: jest.fn(),
      getCurTypeList: jest.fn(),
    };
    element._formUtils = {
      current: formUtilsMock,
    };

    element.resetFields();
    expect(formUtilsMock.resetPropertyFields).toHaveBeenCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    await element.validate();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "validate.success"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onValuesChange();
    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "values.change"
    );

    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should dispatch validate error event", async () => {
    const element = document.createElement(
      "brick-visualization.visual-property-form"
    ) as any;

    document.body.appendChild(element);

    element._formUtils = {
      current: {
        validateFields: jest
          .fn()
          .mockReturnValue(new Error("please input name")),
      },
    };

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    await element.validate();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "validate.error"
    );
  });
});
