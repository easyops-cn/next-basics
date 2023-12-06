import { get, sortBy } from "lodash";
import { INavModule, INavGroup } from "../../interface";
import { getFlags, isIframe } from "../utils";

const ENABLED_FEATURES = getFlags();

export const getModelGroups = (modelList: Record<string, any>[]) => {
  let modelGroups: INavGroup[] = [];
  modelList.forEach((modelData) => {
    if (
      modelData.system ||
      modelData.virtual === "true" ||
      !get(modelData, "view.visible", true)
    ) {
      return;
    }
    const pieces = modelData.category.split(".");
    const category = pieces.shift();
    const subcategory = pieces.join(".");
    let group = modelGroups.find((g) => g.category === category);
    if (group === undefined) {
      group = {
        category,
        states: [],
      };
      modelGroups.push(group);
    }
    if (subcategory === "") {
      group.states.push({
        id: modelData.objectId,
        stateName: isIframe
          ? `/ext/@console-plugin/cmdb-brick/${modelData.objectId}/list`
          : `/next/legacy/cmdb-instance-management/${modelData.objectId}/list`,
        stateParams: {
          objectId: modelData.objectId,
        },
        stateIncludesParams: true,
        text: modelData.name,
      });
    } else {
      const id = modelData.category;
      if (!group.states.some((s) => s.text === subcategory)) {
        group.states.push({
          id: "brickGroup",
          stateName: isIframe
            ? `/ext/@console-plugin/brick-group/${id}`
            : `/next/legacy/cmdb-instance-management/brick-group/${id}`,
          stateParams: {
            objectId: modelData.objectId,
          },
          stateIncludesParams: true,
          text: subcategory,
        });
      }
    }
  });

  // 一级分类默认排序
  const categoryOrders = ["应用资源", "平台资源", "基础资源"];

  modelGroups = sortBy(modelGroups, (group) => {
    const index = categoryOrders.indexOf(group.category);
    return index === -1 ? categoryOrders.length : index;
  });

  // 二级子分类或模型默认排序
  const modelOrders = [
    {
      objectId: "BUSINESS",
    },
    {
      objectId: "APP",
    },
    {
      objectId: "MIDDLEWARE",
    },
    {
      objectId: "_PAASDATABASE",
    },
    {
      objectId: "_PAASSTORAGE",
    },
    {
      objectId: "HOST",
    },
    {
      subcategory: "网络设备",
    },
    {
      objectId: "_IDCRACK",
    },
    {
      objectId: "_IDC",
    },
    {
      objectId: "_ISP",
    },
  ];

  modelGroups.forEach((group) => {
    group.states = sortBy(group.states, (state) => {
      const index = modelOrders.findIndex((item) =>
        state.stateName === "brick"
          ? item.objectId === state.stateParams.objectId
          : item.subcategory === state.text
      );
      return index === -1 ? modelOrders.length : index;
    });
  });

  return modelGroups;
};

export const NAV_RESOURCE_OVERVIEW = {
  id: "cmdb-dashboard",
  stateName: "cmdb.dashboard",
  text: "资源总览",
  icon: "fa fa-dashboard",
};
export const NAV_CHANGELOG = {
  id: "cmdb-changelog",
  stateName: "task.CMDBChangelog",
  text: "变更历史",
  icon: "fa fa-cubes",
  stateParams: {
    system: "cmdb",
    page: 1,
  },
  stateIncludesParams: true,
};
export const NAV_AUTO_COLLECT = {
  id: "cmdb-auto-collection",
  stateName: "ext.@console-plugin/discovery-config.list",
  text: "自动采集",
  icon: "fa fa-file-code-o",
};

export const NAV_DATA_APPROVAL = {
  id: "cmdb-approval",
  stateName: "ext.@console-plugin/cmdb-brick.cmdb-approval.todo",
  text: "数据审批",
  icon: "fa fa-flag-checkered",
};

export const NAV_GROUP_OTHERS = {
  category: "其他",
  states: [
    ...(ENABLED_FEATURES.CMDB_RESOURCE_DASHBOARD
      ? [NAV_RESOURCE_OVERVIEW]
      : []),
    ...(ENABLED_FEATURES.CMDB_CHANGELOG ? [NAV_CHANGELOG] : []),
    ...(ENABLED_FEATURES.MIDDLEWARE_DISCOVERY ? [NAV_AUTO_COLLECT] : []),
    ...(ENABLED_FEATURES.CMDB_APPROVAL ? [NAV_DATA_APPROVAL] : []),
  ],
};

export const getNavModuleCmdbV3 = (modelList: Record<string, any>[]) => {
  const modelGroups = getModelGroups(modelList);

  const navModuleCmdbV3: INavModule = {
    text: "IT 资源管理",
    id: "cmdb",
    groups: [...modelGroups, NAV_GROUP_OTHERS],
  };

  return navModuleCmdbV3;
};
