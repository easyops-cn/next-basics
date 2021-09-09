import { covertFormValueToEvent } from "./covertFormValueToEvent";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertFormValueToEvent", () => {
  it("should work", () => {
    expect(covertFormValueToEvent()).toEqual(undefined);
  });
});
