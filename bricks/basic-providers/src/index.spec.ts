import * as kit from "@next-core/brick-kit";

const spyOnDefine = jest.spyOn(window.customElements, "define");

jest.spyOn(kit, "getRuntime").mockReturnValue({
  registerCustomTemplate: jest.fn(),
} as any);

// Use `require` instead of `import` to avoid hoisting.
require("./index");

describe("index", () => {
  it("should define custom elements", () => {
    expect(spyOnDefine).toBeCalled();
  });
});
