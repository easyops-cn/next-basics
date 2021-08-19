import { chunk } from "lodash";
import moment, { Moment } from "moment";

export type ModeType = "month" | "week";

//月份
export const MONTHS = moment.monthsShort();

//星期
export const WEEKS = moment.weekdaysMin(true);

// 获取年份范围 以当前年份前后推10年
export const getYearRange = (year: number): number[] => {
  return Array.from(new Array(year + 11).keys()).slice(year - 10);
};

// 获取日期
export const getDate = (year: number, month: number, day = 1): Moment => {
  let _year = year;
  let _month = month;
  let _day = day;
  // 如果 month 不在1-12之间，则顺推为前后年的月份
  if (month > 12) {
    _year++;
    _month = month - 12;
  } else if (month < 1) {
    _year--;
    _month = 12 - month;
  }
  // 如果 day 大于当天月份的总天数，则day的值为当天月份的总天数
  const curMonthDays = moment(`${_year}-${_month}`).daysInMonth();
  if (day > curMonthDays) {
    _day = curMonthDays;
  }
  return moment(`${_year}-${_month}-${_day}`);
};

// 获取当月总天数
export const getCurrentMonthDays = (year: number, month: number): number => {
  return getDate(year, month).daysInMonth();
};

// 获取日历数据
export const getCalendarData = (
  mode: ModeType,
  year: number,
  month: number,
  day?: number
): any[] => {
  if (mode === "month") {
    const monthData = [];
    const curMonthDays = getCurrentMonthDays(year, month);
    const startDate = getDate(year, month, 1).startOf("week");
    const endDate = getDate(year, month, curMonthDays).endOf("week");
    do {
      const curDate = moment(startDate);
      monthData.push({
        inView: curDate.isSame(`${year}-${month}`, "month"),
        date: curDate,
      });
    } while (startDate.add(1, "d").isSameOrBefore(endDate));
    return chunk(monthData, 7);
  } else if (mode === "week") {
    const weekData = [];
    const startDate = getDate(year, month, day).startOf("week");
    const endDate = getDate(year, month, day).endOf("week");
    do {
      weekData.push({ inView: true, date: moment(startDate) });
    } while (startDate.add(1, "d").isSameOrBefore(endDate));
    return [weekData];
  }
};
