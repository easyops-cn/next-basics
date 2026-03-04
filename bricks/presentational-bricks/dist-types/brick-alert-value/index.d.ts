import type { MonitorModels } from "@next-sdk/monitor-sdk";

export interface BrickAlertValueProps {
  dataSource?: MonitorModels.ModelAlertEvent;
}

export declare class BrickAlertValueElement extends HTMLElement {
  dataSource: MonitorModels.ModelAlertEvent | undefined;
}
