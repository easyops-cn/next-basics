import {
  InstanceApi_getDetail,
  InstanceApi_createInstance,
  InstanceApi_updateInstanceV2,
  InstanceArchiveApi_archiveInstance,
  InstanceApi_UpdateInstanceResponseBody,
} from "@next-sdk/cmdb-sdk";
import { BuilderBrickNode } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";

export interface ReplaceSingleThemePageParams {
  appId: string;
  routeInstanceId: string;
  themeId: string;
  routeChildren: BuilderBrickNode[];
  themeList: string[];
}

const STORYBOARD_BRICK = "STORYBOARD_BRICK";

/**
 * TODO:
 * 实际操作, 在画布页面打开路由编辑抽屉, 发现在变更完主题实例后, 会触发页面重新渲染
 * 然后会马上请求图查询接口, 此时归档(删除)接口还未将数据完全更新
 * 导致图查询接口请求到的数据是旧的, 而本该删除的主题并未删除, 需要重新进入画布才能看到更新
 * 因此目前的处理方案是关闭画布变更主题的入口, 变更主题入口只在 Use Flow页面展示
 * */
export async function ReplaceSingleThemePage({
  appId,
  routeInstanceId,
  themeId,
  routeChildren,
  themeList,
}: ReplaceSingleThemePageParams): Promise<{
  action: string;
}> {
  async function batchUpdateInstance(
    themeChildren: BuilderBrickNode[],
    parent: string,
    isRoute?: boolean
  ): Promise<Promise<InstanceApi_UpdateInstanceResponseBody[]>> {
    const moveNodeReq = [];
    for (const node of themeChildren) {
      moveNodeReq.push(
        InstanceApi_updateInstanceV2(STORYBOARD_BRICK, node.instanceId, {
          parent,
          mountPoint: isRoute ? "bricks" : "content",
        })
      );
    }
    // 批量将子节点移动到父节点上
    return await Promise.all(moveNodeReq);
  }
  if (!themeId) {
    // 模板设置为空, 执行删除操作
    const hasUsedThemeNode = routeChildren.find((item) =>
      themeList.includes(item.brick)
    );
    if (hasUsedThemeNode) {
      // 获取主题模板下子节点的信息
      const { children: themeChildren } = await InstanceApi_getDetail(
        STORYBOARD_BRICK,
        hasUsedThemeNode.instanceId,
        {
          fields: "children.instanceId",
        }
      );
      await batchUpdateInstance(themeChildren, routeInstanceId, true);

      // 归档模板实例
      await InstanceArchiveApi_archiveInstance(
        STORYBOARD_BRICK,
        hasUsedThemeNode.instanceId
      );
      return {
        action: "删除",
      };
    }
    return {
      action: "",
    };
  } else {
    // 存在主题, 需要找到主题节点并进行替换
    const hasUsedThemeNode = routeChildren.find((item) =>
      themeList.includes(item.brick)
    );
    if (hasUsedThemeNode) {
      if (hasUsedThemeNode.brick !== themeId) {
        // 路由第一级存在主题模板, 并且主题变更了, 直接替换实例brick信息
        await InstanceApi_updateInstanceV2(
          STORYBOARD_BRICK,
          hasUsedThemeNode.instanceId,
          {
            brick: themeId,
          }
        );
        return {
          action: "替换",
        };
      }

      return {
        action: "",
      };
    }
    // 不存在主题, 直接创建主题实例, 并将parent指向路由实例
    const newThemeNode = await InstanceApi_createInstance(STORYBOARD_BRICK, {
      appId,
      brick: themeId,
      mountPoint: "bricks",
      parent: routeInstanceId,
      portal: false,
      type: "brick",
    });

    // 如果之前路由下存在子节点, 需要将之前的子节点指向当前新创建的主题实例
    await batchUpdateInstance(routeChildren, newThemeNode.instanceId, false);
    return {
      action: "添加",
    };
  }
}

customElements.define(
  "next-builder.provider-replace-single-theme-page",
  createProviderClass(ReplaceSingleThemePage)
);
