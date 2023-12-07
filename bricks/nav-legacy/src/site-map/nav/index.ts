import { forEach, remove } from "lodash";
import { NavModuleList } from "../interface";

import { getNavModuleCmdbV3 } from "./modules-v3";

import { getFlags, disableFeature } from "./utils";

const ENABLED_FEATURES = getFlags();
export const getNavModuleList = (modelList: Record<string, any>[]) => {
  const navModuleCmdbV3 = getNavModuleCmdbV3(modelList);
  const moduleList: NavModuleList = [navModuleCmdbV3];

  // 不显示禁用的系统模块
  remove(moduleList, (item) => item && disableFeature(item.id));

  // 不显示禁用的功能
  forEach(moduleList, (navModule) => {
    // 可以在菜单组上设置 `feature`
    remove(
      navModule.groups,
      (group) => group.feature && disableFeature(group.feature)
    );
    forEach(navModule.groups, (group) => {
      // 也可以在菜单项上设置 `feature`
      remove(group.states, (state) =>
        disableFeature(state.feature || state.id)
      );
      // 为应用系统列表添加开关
      remove(
        group.states,
        (state) =>
          !ENABLED_FEATURES.BUSINESSES_LIST &&
          state.id === "cmdb-resources-BUSINESS"
      );
    });
  });

  // 不显示设置了 `hidden` 的导航
  forEach(moduleList, (item) => {
    forEach(item.groups, (group) => {
      // 移除隐藏的状态
      remove(group.states, "hidden");
    });
    // 移除空的或隐藏的分组
    remove(item.groups, (group) => !group.states.length || group.hidden);
  });

  // 初始化菜单的 sref 地址
  forEach(moduleList, (item) => {
    forEach(item.groups, (group) => {
      group.module = item;
      forEach(group.states, (state) => {
        state.group = group;
        if (!state.sref && !state.href && state.stateName) {
          state.sref = state.stateName;
          if (state.stateParams) {
            state.sref += `(${JSON.stringify(state.stateParams)})`;
          }
        }
      });
    });
  });

  return moduleList;
};
