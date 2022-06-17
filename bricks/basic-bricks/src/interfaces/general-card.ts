import { ButtonProps } from "antd/lib/button";

export interface OperationButton {
  // to listen for
  id: string;
  eventName: string;
  configProps: ButtonProps & { icon?: string };
  tooltip?: string;
  text?: string;
  needData?: boolean;
}
