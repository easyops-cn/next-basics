export interface DisabledDate {
  second?: string | number;
  minute?: string | number;
  hour?: string | number;
  date?: string | number;
  month?: string | number;
  year?: string | number;
  weekday?: string | number;
}

export type DisabledDateType = DisabledDate | DisabledDate[];
