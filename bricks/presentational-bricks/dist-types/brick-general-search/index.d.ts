export type Size = "small" | "default" | "large" | "extraLarge";

export type Shape = "round" | "default";

export interface BrickGeneralSearchProps {
  placeholder?: string;
  q?: string;
  defaultArgs?: { field: string; value: any }[];
  shouldUpdateUrlParams?: boolean;
  shouldTrimQuery?: boolean;
  qField?: string;
  disableAutofocus?: boolean;
  searchType?: "all" | "ip";
  searchTypeEnabled?: boolean;
  debounceTime?: number;
  size?: Size;
  shape?: Shape;
  inputStyle?: Record<string, any>;
  buttonStyle?: Record<string, any>;
  searchBoxStyleType?: "defalut" | "round";
  allowClear?: boolean;
  bordered?: boolean;
  alwaysFoucus?: boolean;
  field?: string;
  customSearchTypeOptions?: {
    label: string;
    value: string;
  }[];
}

export interface BrickGeneralSearchEvents {
  "filter.update": CustomEvent<Record<string, any>>;
  "query.change": CustomEvent<string>;
  "query.change.v2": CustomEvent<{ q: string }>;
  "search.type.change": CustomEvent<string>;
  "input.blur": CustomEvent<string>;
}

export interface BrickGeneralSearchEventsMap {
  onFilterUpdate: "filter.update";
  onQueryChange: "query.change";
  onQueryChangeV2: "query.change.v2";
  onSearchTypeChange: "search.type.change";
  onInputBlur: "input.blur";
}

export declare class BrickGeneralSearchElement extends HTMLElement {
  placeholder: string | undefined;
  q: string | undefined;
  defaultArgs: { field: string; value: any }[] | undefined;
  shouldUpdateUrlParams: boolean | undefined;
  shouldTrimQuery: boolean | undefined;
  qField: string | undefined;
  disableAutofocus: boolean | undefined;
  searchType: "all" | "ip" | undefined;
  searchTypeEnabled: boolean | undefined;
  debounceTime: number | undefined;
  size: Size | undefined;
  shape: Shape | undefined;
  inputStyle: Record<string, any> | undefined;
  buttonStyle: Record<string, any> | undefined;
  searchBoxStyleType: "defalut" | "round" | undefined;
  allowClear: boolean | undefined;
  bordered: boolean | undefined;
  alwaysFoucus: boolean | undefined;
  field: string | undefined;
  customSearchTypeOptions:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
}
