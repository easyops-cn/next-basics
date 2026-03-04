export interface BrickDeleteConfirmProps {
  dataSource?: any;
  deleteName?: string;
  fields?: any;
  keySeparator?: string;
  type?: "array" | "object" | "string";
}

export declare class BrickDeleteConfirmElement extends HTMLElement {
  dataSource: any | undefined;
  deleteName: string | undefined;
  fields: any | undefined;
  keySeparator: string | undefined;
  type: "array" | "object" | "string" | undefined;
}
