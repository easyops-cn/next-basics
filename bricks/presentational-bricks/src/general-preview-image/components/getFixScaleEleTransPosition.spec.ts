import getFixScaleEleTransPosition from "./getFixScaleEleTransPosition";

jest.mock("rc-util/lib/Dom/css", () => {
  const getClientSize = () => {
    return {
      width: 400,
      height: 400,
    };
  };

  return {
    getClientSize,
  };
});

describe("getFixScaleEleTransPosition", () => {
  it("should work", () => {
    expect(getFixScaleEleTransPosition(100, 100, 10, 10)).toEqual({
      x: 0,
      y: 0,
    });

    expect(getFixScaleEleTransPosition(500, 100, 10, 10)).toEqual({ x: 50 });
  });
});
