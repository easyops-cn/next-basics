export interface Option {
  label: string;
  caption?: string;
  value: any;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type OptionType = Option | OptionGroup;
