export enum AgentStatusType {
  NORMAL = "正常",
  ABNORMAL = "异常",
  NOT_INSTALLED = "未安装",
  UNINSTALLED = "已卸载",
  UNDER_MAINTENANCE = "维护中",
  NORMAL_EN = "Normal",
  ABNORMAL_EN = "Abnormal",
  NOT_INSTALLED_EN = "Not Installed",
  UNINSTALLED_EN = "Uninstalled",
  UNDER_MAINTENANCE_EN = "Under Maintenance",
}

export interface AgentStatusProps {
  dataSource?: any;
  fields?: { value: string };
  value?: AgentStatusType;
}

export declare class AgentStatusElement extends HTMLElement {
  dataSource: any | undefined;
  fields: { value: string } | undefined;
  value: AgentStatusType | undefined;
}
