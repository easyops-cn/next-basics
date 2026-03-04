export interface FieldToDisplay {
  field?: string;
  separator: string;
}

export interface BrickDisplayStructsProps {
  dataSource?: Record<string, any>;
  fields?: { value: string };
  value?: any;
  displayType?: "stringify" | FieldToDisplay;
  emptyText?: string;
}

export declare class BrickDisplayStructsElement extends HTMLElement {
  dataSource: Record<string, any> | undefined;
  fields: { value: string } | undefined;
  value: any | undefined;
  displayType: "stringify" | FieldToDisplay | undefined;
  emptyText: string | undefined;
}
