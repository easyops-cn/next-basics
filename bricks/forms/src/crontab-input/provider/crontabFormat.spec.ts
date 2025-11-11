import { CrontabFormat } from "./CrontabFormat";

jest.mock("i18next", () => ({
  __esModule: true,
  default: {
    addResourceBundle: jest.fn(),
    t: jest.fn((key) => key),
    language: "zh",
  },
}));

describe("CrontabFormat", () => {
  const testCases: [string, string][] = [["0 6 * * *", "在上午 06:00"]];
  test.each(testCases)(
    "crontabFormat(%j) should return %j",
    (crontabStr, output) => {
      expect(CrontabFormat()(crontabStr)).toEqual(output);
    }
  );
});
