import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.event-config-form", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "next-builder.event-config-form"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    const formUtilsMock = {
      validateFields: jest.fn().mockResolvedValue({ age: 19 }),
      resetFields: jest.fn(),
      setFieldsValue: jest.fn(),
    };

    element._formUtils = {
      current: formUtilsMock,
    };

    element.resetFields();
    expect(formUtilsMock.resetFields).toHaveBeenCalled();

    element.setFieldsValue({ name: "hello" });
    expect(formUtilsMock.setFieldsValue).toHaveBeenCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    await element.validate();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "validate.success"
    );

    formUtilsMock.validateFields.mockRejectedValueOnce(
      new Error("please input name")
    );
    await element.validate();
    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "validate.error"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onValuesChange();
    expect((sypOnDispatchEvent.mock.calls[2][0] as CustomEvent).type).toEqual(
      "values.change"
    );

    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
