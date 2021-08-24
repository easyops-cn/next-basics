import ReactDOM from "react-dom";
import { GeneralFormElement } from "./";
import moment from "moment";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(jest.fn());
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(jest.fn() as any);

describe("forms.general-form", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "forms.general-form"
    ) as GeneralFormElement;

    const validateFields = jest.fn();
    const resetFields = jest.fn();
    const setFieldsValue = jest.fn();
    const isFieldTouched = jest.fn();
    const dispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.staticValues = { id: "fake", a: { a1: 111 } };
    element.formUtils = {
      validateFields,
      resetFields,
      setFieldsValue,
      isFieldTouched,
    } as any;
    expect(element.layout).toBe("horizontal");
    element.layout = "unknown" as any;
    expect(element.layout).toBe("horizontal");
    element.layout = "inline";
    expect(element.layout).toBe("inline");

    validateFields.mockImplementationOnce((fn) => {
      fn(null, { hello: "world", a: { a2: 222 } });
    });
    element.validate();
    let event = dispatchEvent.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe("validate.success");
    expect(event.detail).toEqual({
      id: "fake",
      hello: "world",
      a: { a1: 111, a2: 222 },
    });

    validateFields.mockImplementationOnce((fn) => {
      fn({ error: "oops" });
    });
    element.validate();
    event = dispatchEvent.mock.calls[1][0] as CustomEvent;
    expect(event.type).toBe("validate.error");
    expect(event.detail).toEqual({ error: "oops" });

    element.valueTypes = {
      time: "moment|YYYY-MM-DD",
    };
    element.setInitValue({ name: "jack", time: "2019-09-08" });
    expect(setFieldsValue).toBeCalledWith({
      name: "jack",
      time: expect.any(moment),
    });

    element.setInitValue({ name: "rose" }, { runInMicrotask: true });
    expect(setFieldsValue).not.toBeCalledWith({
      name: "rose",
    });
    await jest.runAllTimers();
    expect(setFieldsValue).toBeCalledWith({
      name: "rose",
    });

    element.reset();
    expect(resetFields).toBeCalled();

    element.resetFields(["id"]);
    expect(resetFields).toBeCalled();

    element.staticValues = {
      extraName: "lucy",
    };
    validateFields.mockImplementationOnce((fn) => {
      fn(null, { name: "test" });
    });
    await element.stepOut();
    event = dispatchEvent.mock.calls[2][0] as CustomEvent;
    expect(event.detail).toEqual({ "[0].name": "test" });
    expect((dispatchEvent.mock.calls[3][0] as CustomEvent).detail).toEqual({
      extraName: "lucy",
      name: "test",
    });

    validateFields.mockImplementationOnce((fn) => {
      fn({ error: "oops" });
    });
    await expect(element.stepOut()).rejects.toEqual(undefined);
    event = dispatchEvent.mock.calls[4][0] as CustomEvent;
    expect(event.detail).toEqual({ error: "oops" });

    // validateTouchedField
    const fieldName = "fieldName";
    const validateOptions = { force: true };
    validateFields.mockClear();
    isFieldTouched.mockReturnValueOnce(false);
    element.validateTouchedField(fieldName, validateOptions);
    expect(isFieldTouched).not.toBeCalled();
    expect(validateFields).not.toBeCalled();
    jest.runOnlyPendingTimers();
    expect(isFieldTouched).toBeCalledWith(fieldName);
    expect(validateFields).not.toBeCalled();

    isFieldTouched.mockReturnValueOnce(true);
    element.validateTouchedField(fieldName, validateOptions);
    jest.runOnlyPendingTimers();
    expect(isFieldTouched).toBeCalledWith(fieldName);
    expect(validateFields).toBeCalledWith(
      [fieldName],
      validateOptions,
      expect.anything()
    );

    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
