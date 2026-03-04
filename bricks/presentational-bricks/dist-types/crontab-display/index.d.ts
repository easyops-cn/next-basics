export interface CrontabDisplayProps {
  value?: string;
  dataSource?: Record<string, any>;
  fields?: { value: string };
}

export declare class CrontabDisplayElement extends HTMLElement {
  value: string | undefined;
  dataSource: Record<string, any> | undefined;
  fields: { value: string } | undefined;
}
