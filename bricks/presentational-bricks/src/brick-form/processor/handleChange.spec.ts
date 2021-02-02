import { handleChange } from "./handleChange";

describe("handleChange", () => {
  it.each([["text", "text"], [{ target: { value: "tool" } }, "tool"]])(
    "event params is %o",
    (e, value) => {
      const callback = jest.fn();
      handleChange(e, callback);
      expect(callback).toHaveBeenCalledWith(value);
    }
  );
});
