import { covertToEventFormValue } from "./covertToEventFormValue";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertToEventFormValue", () => {
  it("should work", () => {
    expect(covertToEventFormValue()).toEqual(undefined);
  });
});
