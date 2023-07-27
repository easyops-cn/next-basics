import { requiredValidator, regexpValidator } from "./custom-validator";

describe("custom-validator", () => {
  it("validate required field", () => {
    const mockCallbackFn = jest.fn();

    requiredValidator({ field: "test" }, { value: "" }, mockCallbackFn);

    expect(mockCallbackFn.mock.calls[0][0]).toEqual(
      "next-builder:REQUIRED_FIELD_MESSAGE"
    );

    requiredValidator({ field: "test" }, { value: "hello" }, mockCallbackFn);

    expect(mockCallbackFn.mock.calls[1][0]).toEqual(undefined);
  });

  it("validate regexp field", () => {
    const mockCallbackFn = jest.fn();

    regexpValidator({ field: "test" }, { value: "test" }, mockCallbackFn, {
      id: "test",
      regex: "^\\w{3}$",
      name: "test",
      type: "string",
      originType: "str",
    });

    expect(mockCallbackFn.mock.calls[0][0]).toEqual(
      "next-builder:REGEX_FIELD_MESSAGE"
    );

    regexpValidator({ field: "test" }, { value: "abc" }, mockCallbackFn, {
      id: "test",
      regex: "^\\w{3}$",
      name: "test",
      type: "string",
      originType: "str",
    });

    expect(mockCallbackFn.mock.calls[1][0]).toEqual(undefined);
  });
});
