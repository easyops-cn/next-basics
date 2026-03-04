export interface BrickAlertStatusProps {
  status?: number;
  recoverType?: string;
  isRecover?: boolean;
  dataSource?: any;
  fields?: { status: string; recoverType: string; isRecover: string };
}

export declare class BrickAlertStatusElement extends HTMLElement {
  status: number | undefined;
  recoverType: string | undefined;
  isRecover: boolean | undefined;
  dataSource: any | undefined;
  fields:
    | { status: string; recoverType: string; isRecover: string }
    | undefined;
}
