import React from "react";
import type { ColumnsType } from "antd/es/table/interface";
import type React from "react";

export interface TableTransferProps {
  dataSource?: any[];
  columns?: ColumnsType<Record<string, any>>;
  targetKeys?: string[];
  selectedKeys?: string[];
  disabled?: boolean;
  dragSortable?: boolean;
  sortTitle?: string;
  maxSelected?: number;
  listStyle?: React.CSSProperties;
  titles?: string[];
  searchPlaceholder?: string;
}

export interface TableTransferEvents {
  "table.transfer.change": CustomEvent<string[]>;
  "sort.change": CustomEvent<string[]>;
  "search.change": CustomEvent<{
    direction: "left" | "right";
    value: any;
  }>;
}

export interface TableTransferEventsMap {
  onTableTransferChange: "table.transfer.change";
  onSortChange: "sort.change";
  onSearchChange: "search.change";
}

export declare class TableTransferElement extends HTMLElement {
  dataSource: any[] | undefined;
  columns: ColumnsType<Record<string, any>> | undefined;
  targetKeys: string[] | undefined;
  selectedKeys: string[] | undefined;
  disabled: boolean | undefined;
  dragSortable: boolean | undefined;
  sortTitle: string | undefined;
  maxSelected: number | undefined;
  listStyle: React.CSSProperties | undefined;
  titles: string[] | undefined;
  searchPlaceholder: string | undefined;
}
