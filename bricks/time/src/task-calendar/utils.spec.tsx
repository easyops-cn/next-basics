import {
  getCurrentMonthDays,
  getDate,
  getYearRange,
  getCalendarData,
  ModeType,
} from "./utils";

// local: en, 周日为每个星期第一天
describe("utils", () => {
  it("getYearRange should work", () => {
    expect(getYearRange(2021)).toEqual([
      2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
      2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
    ]);
  });

  it.each([
    [2021, 8, 9, "2021-08-09"],
    [2021, 14, 9, "2022-02-09"],
    [2021, 0, 9, "2020-12-09"],
    [2021, 8, 50, "2021-08-31"],
    [2021, 14, 50, "2022-02-28"],
  ])(
    "test getDate",
    (year: number, month: number, day: number, result: string) => {
      expect(getDate(year, month, day).format("YYYY-MM-DD")).toEqual(result);
    }
  );

  it("getCurrentMonthDays should work", () => {
    expect(getCurrentMonthDays(2020, 2)).toEqual(29);
  });

  it.each([
    ["month", 2021, 1, 1, 6, "2020-12-27", "2021-02-06"],
    ["month", 2021, 12, 1, 5, "2021-11-28", "2022-01-01"],
    ["month", 2021, 8, 1, 5, "2021-08-01", "2021-09-04"],
    ["week", 2021, 12, 29, 1, "2021-12-26", "2022-01-01"],
    ["week", 2021, 1, 2, 1, "2020-12-27", "2021-01-02"],
    ["week", 2021, 5, 12, 1, "2021-05-09", "2021-05-15"],
  ])(
    "test getCalendarData",
    (
      mode: string,
      year: number,
      month: number,
      day: number,
      length: number,
      resultA: string,
      resultB: string
    ) => {
      const data = getCalendarData(mode as ModeType, year, month, day);
      expect(data.length).toEqual(length);
      expect(data[0][0].date.format("YYYY-MM-DD")).toEqual(resultA);
      expect(data[data.length - 1][6].date.format("YYYY-MM-DD")).toEqual(
        resultB
      );
    }
  );
});
