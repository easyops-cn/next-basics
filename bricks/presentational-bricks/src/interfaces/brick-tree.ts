export interface checkedFilterProps {
  field: string;
  value: any;
  operator: "$eq" | "$ne" | "$lt" | "$lte" | "$gt" | "$gte";
}
