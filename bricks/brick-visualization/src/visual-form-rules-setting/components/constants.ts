export enum OpType {
  Common = "common",
  String = "string",
  Time = "time",
  Number = "number",
  Array = "array",
  Boolean = "boolean",
}

export const operationOptions: any[] = [
  { value: "isNil", label: "为空", type: OpType.Common },
  { value: "isNotNil", label: "不为空", type: OpType.Common },
  { value: "equal", label: "等于", type: OpType.Common },
  { value: "notEqual", label: "不等于", type: OpType.Common },
  { value: "contain", label: "包含", type: OpType.String },
  { value: "notContain", label: "不包含", type: OpType.String },
  { value: "startWith", label: "开头是", type: OpType.String },
  { value: "notStartWith", label: "开头不是", type: OpType.String },
  { value: "endWith", label: "结尾是", type: OpType.String },
  { value: "notEndWith", label: "结尾不是", type: OpType.String },
  { value: "in", label: "是其中一个", type: OpType.String },
  { value: "notIn", label: "不是其中一个", type: OpType.String },
  { value: "withinTimeRange", label: "在时间范围内", type: OpType.Time },
  { value: "notWithinTimeRange", label: "不在时间范围内", type: OpType.Time },
  { value: "earlier", label: "早于", type: OpType.Time },
  { value: "notLater", label: "早于等于", type: OpType.Time },
  { value: "later", label: "晚于", type: OpType.Time },
  { value: "notEarlier", label: "晚于等于", type: OpType.Time },
  { value: "larger", label: "大于", type: OpType.Number },
  { value: "smaller", label: "小于", type: OpType.Number },
  { value: "greaterOrEqual", label: "大于等于", type: OpType.Number },
  { value: "lessOrEqual", label: "小于等于", type: OpType.Number },
  { value: "withinNumericalRange", label: "在大小范围内", type: OpType.Number },
  {
    value: "notWithinNumericalRange",
    label: "不在大小范围内",
    type: OpType.Number,
  },
  { value: "containOneOf", label: "包含其中一个", type: OpType.Array },
  { value: "notContainOneOf", label: "不包含其中一个", type: OpType.Array },
  { value: "containAll", label: "同时包含", type: OpType.Array },
  { value: "isTrue", label: "为真", type: OpType.Boolean },
  { value: "isFalse", label: "为假", type: OpType.Boolean },
];

export interface Condition {
  origin: string;
  operation: string;
  compareValType?: string;
  value?: any;
  fieldValue?: string;
  op: string;
  conditionId?: string;
  rangeValue?: any[];
}
