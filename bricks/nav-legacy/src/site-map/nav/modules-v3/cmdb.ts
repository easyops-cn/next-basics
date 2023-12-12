import { get, sortBy, keyBy, cloneDeep } from "lodash";
import { INavGroup, INavModule } from "../../interface";
import { getFlags } from "../utils";
import { isIframe } from "../utils";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { CmdbObjectApi_ListObjectCategoryResponseBody_list_item } from "@next-sdk/cmdb-sdk";

const ENABLED_FEATURES = getFlags();

export const getModelGroups = (
  modelList: Record<string, any>[],
  isNext: boolean,
  urlTemplates: Record<string, string>
) => {
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
        stateName: isNext
          ? parseTemplate(urlTemplates.modelUrlTemplate, modelData)
          : isIframe
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
          stateName: isNext
            ? parseTemplate(urlTemplates.groupUrlTemplate, modelData)
            : isIframe
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
export const getCategoryMap = (
  objectCategory: CmdbObjectApi_ListObjectCategoryResponseBody_list_item[]
) => {
  const modifyCategoryList: any = objectCategory.map((category: any) => {
    const subCategoryList = Object.entries(category.child).map((item) => ({
      name: item[1],
      title: item[1],
      objectList: [],
    }));
    const subCategoryMap = keyBy(subCategoryList, "name");
    return {
      ...category,
      title: category.name || "其他",
      objectList: [],
      subCategoryMap,
    };
  });
  return keyBy(modifyCategoryList, "name");
};
export const getGroupsByCategoryMap = (
  modelList,
  categoryMap,
  urlTemplates,
  favouriteModels?: string[]
) => {
  const result: Record<string, any> = cloneDeep(categoryMap);
  modelList.forEach((modelData) => {
    const pieces = modelData.category.split(".");
    const category = pieces.shift();
    const subcategory = pieces.join(".");
    if (!subcategory) {
      if (result?.[category]?.objectList) {
        result[category].objectList.push({
          ...modelData,
          to: parseTemplate(urlTemplates.modelUrlTemplate, modelData),
          isFavourite: favouriteModels?.includes(modelData.objectId),
        });
      }
    } else {
      if (result?.[category]?.["subCategoryMap"]?.[subcategory]) {
        result[category]["subCategoryMap"][subcategory].isOpen = false;
        result[category]["subCategoryMap"][subcategory]["objectList"].push({
          ...modelData,
          to: parseTemplate(urlTemplates.modelUrlTemplate, modelData),
          isFavourite: favouriteModels?.includes(modelData.objectId),
        });
      }
    }
  });
  // return Object.values(result);
  return Object.values(result).map((item) => ({
    name: item.name,
    title: item.title,
    objectList: item.objectList,
    subCategory: Object.values(item.subCategoryMap),
  }));
};

export const getNewModelGroups = (
  modelList: Record<string, any>[],
  objectCategory: any,
  urlTemplates: Record<string, string>,
  favouriteModels?: string[],
  noFilter?: boolean
) => {
  const categoryMap = getCategoryMap(objectCategory);
  const filteredModelList = !noFilter
    ? modelList.filter((modelData) => {
        return !(
          !modelData.name ||
          modelData.system ||
          modelData.virtual === "true" ||
          !get(modelData, "view.visible", true)
        );
      })
    : modelList.filter((modelData) => {
        return !(!modelData.name || !get(modelData, "view.visible", true));
      });
  const groups = getGroupsByCategoryMap(
    filteredModelList,
    categoryMap,
    urlTemplates,
    favouriteModels
  );
  return groups;
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

export const getNavModuleCmdbV3 = (
  modelList: Record<string, any>[],
  isNext: boolean,
  urlTemplates: Record<string, string>
) => {
  const modelGroups = getModelGroups(modelList, isNext, urlTemplates);

  const navModuleCmdbV3: INavModule = {
    text: "IT 资源管理",
    id: "cmdb",
    groups: [...modelGroups, NAV_GROUP_OTHERS],
  };

  return navModuleCmdbV3;
};
