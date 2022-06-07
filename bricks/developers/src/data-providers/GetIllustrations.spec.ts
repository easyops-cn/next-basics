import { GetIllustrations, getRandomNumber } from "./GetIllustrations";
import * as illustrations from "@next-core/illustrations";

jest.mock("@next-core/illustrations", () => ({
  illustrationsByCategory: {
    default: ["a", "b"],
    exception: ["c", "d"],
  },
}));

jest.mock("antd/lib/_util/colors", () => ({
  PresetColorTypes: ["pink", "red"],
}));
jest.spyOn(Math, "random").mockReturnValue(0.96);
describe("GetIllustrations", () => {
  it("should work when it has no category", () => {
    const result = GetIllustrations();

    expect(result).toEqual([
      { category: "default", color: "pink", name: "a" },
      { category: "default", color: "pink", name: "b" },
      { category: "exception", color: "red", name: "c" },
      { category: "exception", color: "red", name: "d" },
    ]);
  });

  it("should work when it has an exact category", () => {
    const result = GetIllustrations("exception");

    expect(result).toEqual([
      { category: "exception", color: "red", name: "c" },
      { category: "exception", color: "red", name: "d" },
    ]);
  });

  it("getRandomNumber should work ", () => {
    const result = getRandomNumber();

    expect(result).toBe(2);
  });
});
