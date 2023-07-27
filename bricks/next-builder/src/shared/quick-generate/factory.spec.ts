import { generatorFactory } from "./factory";
import { FormTypeGenerator } from "./FormTypeGenerator";
import { TableTypeGenerator } from "./TableTypeGenerator";

describe("factory", () => {
  it("generatorFactory", () => {
    expect(
      generatorFactory("forms.general-form", {
        useBrickList: [],
      })
    ).toBeInstanceOf(FormTypeGenerator);

    expect(
      generatorFactory("presentational-bricks.brick-table", {
        useBrickList: [],
      })
    ).toBeInstanceOf(TableTypeGenerator);

    expect(() => generatorFactory("test.brick", { a: "test" })).toThrow(
      "This brick: test.brick is not currently support quick generation"
    );
  });
});
