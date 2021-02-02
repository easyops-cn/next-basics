export interface Option {
  label: string;
  value: any;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type OptionType = Option | OptionGroup;
