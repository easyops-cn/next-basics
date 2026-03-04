import type { UseBrickConf } from "@next-core/brick-types";

export interface GeneralTitleProps {
  mainTitle?: string;
  description?: string;
  subTitle?: string;
  url?: string;
  target?: string;
  descPrefixBrick?: { useBrick: UseBrickConf };
  titleSuffixBrick?: { useBrick: UseBrickConf };
  descSuffixBrick?: { useBrick: UseBrickConf };
  dataSource?: Record<string, any>;
  fields?: {
    mainTitle?: string;
    description?: string;
    subTitle?: string;
  };
}

export declare class GeneralTitleElement extends HTMLElement {
  mainTitle: string | undefined;
  description: string | undefined;
  subTitle: string | undefined;
  url: string | undefined;
  target: string | undefined;
  descPrefixBrick: { useBrick: UseBrickConf } | undefined;
  titleSuffixBrick: { useBrick: UseBrickConf } | undefined;
  descSuffixBrick: { useBrick: UseBrickConf } | undefined;
  dataSource: Record<string, any> | undefined;
  fields:
    | {
        mainTitle?: string;
        description?: string;
        subTitle?: string;
      }
    | undefined;
}
