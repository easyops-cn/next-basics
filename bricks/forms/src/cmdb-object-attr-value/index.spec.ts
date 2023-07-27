import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.cmdb-object-attr-value", () => {
  it("should create a custom element", async () => {
    const fn = jest.fn();

    const element = document.createElement(
      "forms.cmdb-object-attr-value"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    await jest.runAllTimers();

    element.addEventListener("forms.cmdb-object-attr-value.change", fn);
    element.handleChange({});
    expect(fn).toBeCalled();

    const fcb = jest.fn();
    element.floatMaxLengthNotMatch(
      "",
      { type: "float", default: "0.0001" },
      fcb
    );
    expect(fcb.mock.calls[0].length).toBe(0);

    element.floatMaxLengthNotMatch(
      "",
      { type: "float", default: "0.00001" },
      fcb
    );
    expect(fcb.mock.calls[1].length).toBe(1);

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it.each([
    ["int", { type: "int", regex: "8", default: 8 }],
    ["str", { type: "str", default_type: "value", regex: "dd", default: "dd" }],
    [
      "str",
      { type: "str", default_type: "value", regex: "abc", default: null },
    ],
    ["str", { type: "str", default_type: "value", regex: "abc", default: "" }],
    ["float", { type: "float", regex: "8", default: 8 }],
    ["arr", { type: "arr", regex: "1", default: [1] }],
    ["ip", { type: "ip", default: "192.168.100.162" }],
  ])(
    "test %s match defaultValueNotMatchRegex",
    async (type: string, defaultValue: any) => {
      const element = document.createElement(
        "forms.cmdb-object-attr-value"
      ) as any;

      document.body.appendChild(element);
      await jest.runAllTimers();
      const cb = jest.fn();

      element.defaultValueNotMatchRegex("", defaultValue, cb);
      expect(cb.mock.calls[0].length).toBe(0);
      document.body.removeChild(element);
    }
  );

  it.each([
    ["int", { type: "int", regex: "8", default: 9 }],
    ["str", { type: "str", default_type: "value", regex: "dd", default: "cc" }],
    ["float", { type: "float", regex: "8", default: 9 }],
    ["arr", { type: "arr", regex: "1", default: [1, 2, "3"] }],
    ["ip", { type: "ip", default: "192.168.100.162.0" }],
  ])(
    "test %s not match defaultValueNotMatchRegex",
    async (type: string, defaultValue: any) => {
      const element = document.createElement(
        "forms.cmdb-object-attr-value"
      ) as any;

      document.body.appendChild(element);
      await jest.runAllTimers();
      const cb = jest.fn();

      element.defaultValueNotMatchRegex("", defaultValue, cb);
      expect(cb.mock.calls[0].length).toBe(1);
      document.body.removeChild(element);
    }
  );

  it.each([
    [
      "Legal series-number",
      {
        type: "str",
        default_type: "series-number",
        series_number_length: 1,
        start_value: 1,
      },
      0,
    ],
    [
      "Illegal series_number_length",
      {
        type: "str",
        default_type: "series-number",
        series_number_length: 0,
        start_value: 1,
      },
      1,
    ],
    [
      "Illegal start_value",
      {
        type: "str",
        default_type: "series-number",
        series_number_length: 2,
        start_value: 123,
      },
      1,
    ],
    [
      "Illegal prefix",
      {
        type: "str",
        default_type: "series-number",
        series_number_length: 1,
        start_value: 1,
        prefix: "  #",
      },
      1,
    ],
    [
      "Legal auto-increment-id",
      {
        type: "str",
        default_type: "auto-increment-id",
        start_value: 1,
        prefix: "123",
      },
      0,
    ],
    [
      "Illegal prefix",
      {
        type: "str",
        default_type: "auto-increment-id",
        start_value: 1,
        prefix: "a 9",
      },
      1,
    ],
  ])("test %s", async (type: string, defaultValue: any, result: number) => {
    const element = document.createElement(
      "forms.cmdb-object-attr-value"
    ) as any;

    document.body.appendChild(element);
    await jest.runAllTimers();
    const cb = jest.fn();

    element.strSeriesNumberAndAutoIncrementIDValidator("", defaultValue, cb);
    expect(cb.mock.calls[0].length).toBe(result);
    document.body.removeChild(element);
  });
});
