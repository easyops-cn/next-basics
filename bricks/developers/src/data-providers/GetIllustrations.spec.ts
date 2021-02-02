import { GetIllustrations, getRandomNumber } from "./GetIllustrations";
import * as illustrations from "@next-core/illustrations";

jest.mock("@next-core/illustrations", () => ({
  illustrationsByCategory: {
    default: ["a", "b"],
  },
}));

jest.mock("antd/lib/_util/colors", () => ({
  PresetColorTypes: ["pink", "red"],
}));
jest.spyOn(Math, "random").mockReturnValue(0.96);
describe("GetIllustrations", () => {
  it("should work", () => {
    const result = GetIllustrations();

    expect(result).toEqual([
      { category: "default", color: "pink", name: "a" },
      { category: "default", color: "pink", name: "b" },
    ]);
  });

  it("getRandomNumber should work ", () => {
    const result = getRandomNumber();

    expect(result).toBe(2);
  });
});
