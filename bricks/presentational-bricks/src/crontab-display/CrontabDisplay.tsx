import React from "react";
import crontab from "@next-libs/crontab";

export interface CrontabDisplayProps {
  value: string;
}

export function CrontabDisplay(props: CrontabDisplayProps): React.ReactElement {
  const { value } = props;

  const [minute, hour, date, month, dow] = value.split(" ");

  const crontabObj = {
    minute,
    hour,
    date,
    month,
    dow
  };

  return (
    <div>
      {value}（{crontab.format(crontabObj)}）
    </div>
  );
}
