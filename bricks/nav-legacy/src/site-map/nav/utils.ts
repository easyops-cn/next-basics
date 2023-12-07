import { indexOf } from "lodash";

let flags: Record<string, boolean> = {};

export const isIframe = window.parent !== window.self;

export const setFlags = (value: Record<string, boolean>) => {
  flags = value;
};

export const getFlags = () => {
  const ENABLED_FEATURES = {
    DONGYIN_FLOW: flags["dongyin-flow"],
    AUTOMATION_INSPECTION: flags["automation-inspection"],
    ONLINE_STORE: flags["online-store"],
    F5_MANAGEMENT: flags["f5-management"],
    FILE_SYNC: flags["file-sync"],
    OPENSHIFT: flags["openshift"],
    CONFIGURATIONS: flags["configurations"],
    ORCHESTRATION: flags["orchestration"],
    DATABASES: flags["databases"],
    REQUIREMENTS: flags["requirements"],
    DIRECT_LINK_TO_INSTANCE_LIST: flags["direct-link-to-instance-list"],
    CMDB_APPROVAL: flags["cmdb-approval"],
    MIDDLEWARE_DISCOVERY: flags["middleware-discovery"],
    CMDB_RESOURCE_DASHBOARD: flags["cmdb-resource-dashboard"],
    REQUEST_TRACE: flags["request-trace"],
    MESSAGE_SUBSCRIBE: flags["message-subscribe"],
    CMDB_API_ADMIN: flags["cmdb-api-admin"],
    CMDB_AUTO_DISCOVERY: flags["cmdb-auto-discovery"],
    CMDB_CHANGELOG: flags["cmdb-changelog"],
    AGENT_PLUGINS: flags["agent-plugins"],
    BUSINESSES_LIST: flags["businesses-list"],
    MENU_PERMISSION_SETTING: flags["menu-permission-setting"],
  };

  return ENABLED_FEATURES;
};

export const disableFeature = (id: string) => {
  return Object.keys(flags).includes(id) && flags[id] === false;
};

// index 越小，优先级越高
export const ORDERS = ["应用资源", "平台资源", "基础设施", "组织信息", "其他"];
export const COLUMNS = 100;
export const getGroupsList = (columns, groups) => {
  const headerNavList = [];

  for (let i = 0; i < columns; i++) {
    headerNavList.push([]);
  }

  for (let i = 0; i < groups.length; i++) {
    headerNavList[i % columns].push(groups[i]);
  }

  return headerNavList;
};

export const getFilterNavList = (headerNavs: any) => {
  const filterList = [];
  for (const nav of headerNavs) {
    for (const group of nav.groups) {
      group.category = group.category || "未知";
      group.order = ORDERS.includes(group.category)
        ? indexOf(ORDERS, group.category)
        : Infinity;
      for (const state of group.states) {
        const link: Record<string, any> = { value: state.stateName };
        link["text"] = [group.category, state.text].join(" / ");
        link["objectId"] = state.stateParams.objectId;
        filterList.push(link);
      }
    }
  }
  return filterList;
};
