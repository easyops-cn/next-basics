export type AlertLevel = 0 | 1 | 2 | "info" | "warning" | "critical";

export interface BrickAlertLevelProps {
  value?: AlertLevel;
  dataSource?: Record<string, any>;
  fields?: { value: string };
}

export declare class BrickAlertLevelElement extends HTMLElement {
  value: AlertLevel | undefined;
  dataSource: Record<string, any> | undefined;
  fields: { value: string } | undefined;
}
