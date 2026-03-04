import type React from "react";
import type { TransferItem, TransferLocale } from "antd/lib/transfer";
import type { BrickWrapperConfig } from "../interfaces/common.js";

export interface GeneralTransferProps {
  dataSource?: any[];
  listStyle?: React.CSSProperties;
  selectedKeys?: string[];
  disabled?: boolean;
  maxSelected?: number;
  showSearch?: boolean;
  wrapperConfig?: BrickWrapperConfig;
  dataDescriptor?: { [k in keyof TransferItem]: string };
  targetKeys?: string[];
  titles?: string[];
  operations?: string[];
  locale?: Partial<TransferLocale>;
  realTimeNotification?: boolean;
}

export interface GeneralTransferEvents {
  "general.transfer.change": CustomEvent<string[]>;
}

export interface GeneralTransferEventsMap {
  onGeneralTransferChange: "general.transfer.change";
}

export declare class GeneralTransferElement extends HTMLElement {
  dataSource: any[] | undefined;
  listStyle: React.CSSProperties | undefined;
  selectedKeys: string[] | undefined;
  disabled: boolean | undefined;
  maxSelected: number | undefined;
  showSearch: boolean | undefined;
  wrapperConfig: BrickWrapperConfig | undefined;
  dataDescriptor: { [k in keyof TransferItem]: string } | undefined;
  targetKeys: string[] | undefined;
  titles: string[] | undefined;
  operations: string[] | undefined;
  locale: Partial<TransferLocale> | undefined;
  realTimeNotification: boolean | undefined;
  notifyChange(): void;
}
