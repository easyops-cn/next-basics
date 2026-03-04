export type ClusterType = "-1" | "0" | "1" | "2" | "3";

export interface BrickClusterTypeProps {
  objectId?: string;
  value?: ClusterType;
  dataSource?: Record<string, any>;
  fields?: { value: string };
  showBg?: boolean;
}

export declare class BrickClusterTypeElement extends HTMLElement {
  objectId: string | undefined;
  value: ClusterType | undefined;
  dataSource: Record<string, any> | undefined;
  fields: { value: string } | undefined;
  showBg: boolean | undefined;
}
