import type { HumanizeTimeFormat } from "@next-libs/datetime";

export interface LinkInfo {
  detailUrlTemplate: string;
  target?: string;
}

export interface BrickHumanizeTimeProps {
  value?: number | string;
  inputFormat?: string;
  outputFormat?: string;
  isCostTime?: boolean;
  dataSource?: Record<string, any>;
  fields?: { value: string };
  formatter?: HumanizeTimeFormat;
  isMillisecond?: boolean;
  isMicrosecond?: boolean;
  link?: LinkInfo;
}

export declare class BrickHumanizeTimeElement extends HTMLElement {
  value: number | string | undefined;
  inputFormat: string | undefined;
  outputFormat: string | undefined;
  isCostTime: boolean | undefined;
  dataSource: Record<string, any> | undefined;
  fields: { value: string } | undefined;
  formatter: HumanizeTimeFormat | undefined;
  isMillisecond: boolean | undefined;
  isMicrosecond: boolean | undefined;
  link: LinkInfo | undefined;
}
