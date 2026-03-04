export enum ConditionOperator {
  eq = "$eq",
  ne = "$ne",
  gt = "$gt",
  gte = "$gte",
  lt = "$lt",
  lte = "$lte",
}

export enum LogicalOperator {
  and = "$and",
  or = "$or",
}

export interface RuleProps {
  condition: ConditionType;
  style?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
  label?: string;
}

export type ConditionType =
  | boolean
  | number
  | string
  | Record<string | ConditionOperator, any>
  | LogicalCondition;

export interface LogicalCondition
  extends Record<string | LogicalOperator, ConditionType[]> {}

export type DataType = string | number | Record<string, any>;

export type DisplayType = "label" | "default";

export interface BrickConditionalDisplayProps {
  rules?: RuleProps[];
  fields?: { value: string };
  dataSource?: DataType;
  type?: DisplayType;
}

export declare class BrickConditionalDisplayElement extends HTMLElement {
  rules: RuleProps[] | undefined;
  fields: { value: string } | undefined;
  dataSource: DataType | undefined;
  type: DisplayType | undefined;
}
