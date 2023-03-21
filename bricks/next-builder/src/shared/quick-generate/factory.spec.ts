import { generatorFactory } from "./factory";
import { FormTypeGenerator } from "./FormTypeGenerator";

describe("factory", () => {
  it("generatorFactory", () => {
    expect(
      generatorFactory("forms.general-form", {
        useBrickList: [],
      })
    ).toBeInstanceOf(FormTypeGenerator);

    expect(() => generatorFactory("test.brick", { a: "test" })).toThrow(
      "This brick: test.brick is not currently support quick generation"
    );
  });
});
