import { parseParameters } from "./parseParameters";

const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

describe("parseParameters", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    expect(parseParameters("- HOST")).toEqual(["HOST"]);
  });

  it("should return an empty array if given an empty string", () => {
    expect(parseParameters("")).toEqual([]);
  });

  it("should return undefined if parse failed", () => {
    expect(parseParameters("- a\nb")).toBeInstanceOf(Error);
    expect(mockConsoleError).toBeCalled();
  });
});
