import { GetIllustrationsCategories } from "./GetIllustrationsCategories";

jest.mock("@next-core/illustrations", () => ({
  illustrationsByCategory: {
    default: ["a", "b"],
    exception: ["c", "d"],
  },
}));

describe("GetIllustrations", () => {
  it("should work", () => {
    const result = GetIllustrationsCategories();

    expect(result).toEqual(["all", "default", "exception"]);
  });
});
