import React, { useState } from "react";
import crontab from "@next-libs/crontab";
import { CrontabType } from "./CrontabInput";

export function parseCrontab(str = "* * * * *"): Record<CrontabType, string> {
  const [minute, hour, date, month, dow] = str.split(" ");
  return {
    minute,
    hour,
    date,
    month,
    dow
  };
}

export function validateCrontab(
  CrontabObj: Record<CrontabType, string>
): boolean {
  return (
    crontab.regex.minute.test(CrontabObj.minute) &&
    crontab.regex.hour.test(CrontabObj.hour) &&
    crontab.regex.date.test(CrontabObj.date) &&
    crontab.regex.month.test(CrontabObj.month) &&
    crontab.regex.dow.test(CrontabObj.dow)
  );
}

export function useCrontab(
  crontabStr: string
): [Record<CrontabType, string>, Function] {
  const initStatus = parseCrontab(crontabStr);
  const [minute, setMinute] = useState(initStatus.minute);
  const [hour, setHour] = useState(initStatus.hour);
  const [date, setDate] = useState(initStatus.date);
  const [month, setMonth] = useState(initStatus.month);
  const [dow, setDow] = useState(initStatus.dow);

  const setChange = (type: CrontabType, value: string) => {
    switch (type) {
      case "minute":
        setMinute(value);
        break;
      case "hour":
        setHour(value);
        break;
      case "date":
        setDate(value);
        break;
      case "month":
        setMonth(value);
        break;
      case "dow":
        setDow(value);
        break;
      default:
        throw new Error("Unknown Crontab Type");
    }
  };

  return [{ minute, hour, date, month, dow }, setChange];
}
