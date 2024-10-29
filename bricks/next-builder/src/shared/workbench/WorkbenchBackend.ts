import { omit } from "lodash";
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import {
  BuildApi_buildAndPush,
  StoryboardApi_cloneBricks,
  type StoryboardApi_CloneBricksRequestBody,
  StoryboardApi_sortStoryboardNodes,
  PackageAloneApi_addDependencies,
  StoryboardApi_addNode,
  StoryboardApi_editNode,
  StoryboardApi_deleteNode,
} from "@next-sdk/next-builder-sdk";
import {
  FormProjectApi_updateFormItem,
  FormProjectApi_deleteFormItem,
  FormProjectApi_createFormItem,
  FormProjectApi_updateFormTemplate,
} from "@next-sdk/form-builder-service-sdk";
import { StoryboardAssembly } from "../storyboard/StoryboardAssembly";
import type {
  WorkbenchBackendActionForInitDetail,
  WorkbenchBackendActionForInsertDetail,
  WorkbenchBackendActionForUpdateDetail,
  WorkbenchBackendActionForMoveDetail,
  WorkbenchBackendActionForDeleteDetail,
  WorkbenchBackendActionForInsert,
  WorkbenchBackendActionForUpdate,
  WorkbenchBackendActionForMove,
  WorkbenchBackendActionForDelete,
  WorkbenchBackendActionForCopyData,
  WorkbenchBackendActionForInsertSnippet,
  WorkbenchBackendActionForCopyBrick,
  WorkbenchBackendActionForCutBrick,
  BackendMessage,
  WorkbenchBackendActionForInsertSnippetDetail,
  WorkbenchBackendActionForInsertFormItem,
  WorkbenchBackendActionForDeleteFormItem,
  WorkbenchBackendActionForUpdateFormItem,
  WorkbenchBackendActionForUpdateFormTemplate,
  WorkbenchBackendActionForUpdateVisualForm,
  WorkbenchBackendActionForBatchOp,
  WorkbenchBackendActionForBatchOpDetail,
  insertFormItemArgs,
  WorkbenchSortData,
} from "@next-types/preview";
import type { HttpResponseError } from "@next-core/brick-http";
import { type pipes } from "@next-core/pipes";
import type { BuilderBrickNode } from "@next-core/brick-types";
import { ModelInstanceRelationRequest } from "@next-sdk/cmdb-sdk/dist/types/model/cmdb";
import { ApplyStoryBoardSnippet } from "../../data-providers/ApplyStoryboardSnippet";
import {
  EventDetailOfSnippetApply,
  SnippetNodeDetail,
} from "@next-core/editor-bricks-helper";
import { ModelDraftTemplateInfo_itemMapList_item } from "@next-sdk/form-builder-service-sdk/dist/types/model/form_builder_service";
import DependCache from "../../data-providers/utils/dependCache";

export type QueueItem =
  | WorkbenchBackendActionForInsert
  | WorkbenchBackendActionForUpdate
  | WorkbenchBackendActionForMove
  | WorkbenchBackendActionForDelete
  | WorkbenchBackendActionForCopyData
  | WorkbenchBackendActionForInsertSnippet
  | WorkbenchBackendActionForCopyBrick
  | WorkbenchBackendActionForCutBrick
  | WorkbenchBackendActionForInsertFormItem
  | WorkbenchBackendActionForDeleteFormItem
  | WorkbenchBackendActionForUpdateFormItem
  | WorkbenchBackendActionForUpdateFormTemplate
  | WorkbenchBackendActionForUpdateVisualForm
  | WorkbenchBackendActionForBatchOp;

export default class WorkbenchBackend {
  private baseInfo: WorkbenchBackendActionForInitDetail;
  private cacheQueue: QueueItem[] = this.observe<QueueItem[]>([]);
  private mockInstanceIdCache: Map<string, string> = new Map();
  private draftInstanceIdCache: ModelDraftTemplateInfo_itemMapList_item[] = [];
  private mockNodeIdCache: Map<string, string> = new Map();
  private topics: Record<string, any> = {};
  private subUid = 0;
  private isDealing = false;
  private isBuilding = false;
  private autoBuild = true;
  private afterChangeTimer: NodeJS.Timeout;
  private isNeedUpdateTree = false;
  private mTimeMap = new Map<string, string>();
  private dependCache: DependCache;
  private hadFetchDepend = false;

  private static instance = new Map<string, WorkbenchBackend>();

  static getInstance(
    initData: WorkbenchBackendActionForInitDetail
  ): WorkbenchBackend {
    const key = `${initData.appId}-${initData.rootNode.instanceId}`;
    const instance = this.instance.get(key);
    if (!instance) {
      const newInstance = new WorkbenchBackend(initData);
      this.instance.set(key, newInstance);
    }
    return this.instance.get(key);
  }

  constructor(initData: WorkbenchBackendActionForInitDetail) {
    this.init(initData);
  }

  private observe<T extends object>(obj: T): T {
    const handle = {
      get: (target: any, key: string) => {
        return target[key];
      },
      set: (target: any, key: string, value: QueueItem) => {
        target[key] = value;
        !this.isDealing && this.batchDealRequest();
        return true;
      },
    };
    const proxy = new Proxy<T>(obj, handle);
    return proxy;
  }

  get size(): number {
    return this.cacheQueue.length;
  }

  init(data: WorkbenchBackendActionForInitDetail): void {
    this.baseInfo = data;
    this.dependCache = new DependCache(data.projectId);
  }

  push(data: QueueItem): void {
    this.cacheQueue.push(data);
  }

  shift(): QueueItem {
    return this.cacheQueue.shift();
  }

  clear(): void {
    this.cacheQueue = [];
  }

  publish(topic: string, args: BackendMessage): void {
    if (!this.topics[topic]) {
      return;
    }
    const subscribers = this.topics[topic];
    let len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[len].func(topic, args);
    }
  }

  subscribe(topic: string, fn: (topic: string, detail: any) => void): string {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    const token = (++this.subUid).toString();
    this.topics[topic].push({
      token: token,
      func: fn,
    });
    return token;
  }

  unsubscribe(token: string): void {
    for (const m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
          }
        }
      }
    }
  }

  public setDelayBuildTime(time: number): void {
    this.baseInfo.delayBuildTime = time;
  }

  private cleanTimer(): void {
    clearTimeout(this.afterChangeTimer);
    this.afterChangeTimer = null;
  }

  private handleError(e: HttpResponseError, errorMsg: string): void {
    this.publish("message", {
      action: "error",
      data: {
        error: e?.responseJson?.error || errorMsg,
      },
    });
  }

  async updateBrickTree(): Promise<void> {
    try {
      const graphData = await InstanceGraphApi_traverseGraphV2({
        child: [
          {
            depth: -1,
            parentOut: "children",
            select_fields: ["*"],
          },
        ],
        object_id: "STORYBOARD_NODE",
        query: {
          id: this.baseInfo.rootNode.id,
        },
        select_fields: ["*"],
      });
      this.isNeedUpdateTree = false;
      this.publish("message", {
        action: "update-graph-data",
        data: {
          graphData: graphData as pipes.GraphData,
        },
      });
    } catch (e) {
      this.handleError(e, "更新构件树失败");
    }
  }

  private async updateMTime(
    objectId: string,
    instanceId: string
  ): Promise<void> {
    const realInstanceId =
      this.mockInstanceIdCache.get(instanceId) || instanceId;
    const detail = await InstanceApi_getDetail(objectId, realInstanceId, {
      fields: "mtime",
    });
    this.mTimeMap.set(realInstanceId, detail.mtime);
  }

  private async createInstance(
    data: WorkbenchBackendActionForInsertDetail
  ): Promise<boolean> {
    try {
      const res = await StoryboardApi_addNode(this.baseInfo.appId, {
        objectId: "STORYBOARD_BRICK",
        instance: omit(
          {
            ...data,
            parent: this.mockInstanceIdCache.get(data.parent) || data.parent,
            sort: data.sort || data.nodeData?.sort,
          },
          [
            "nodeData",
            "dragOverInstanceId",
            "dragStatus",
            "parentInstanceId",
            "sortData",
          ]
        ),
      });
      this.mockInstanceIdCache.set(
        data.nodeData.instanceId,
        res.instance.instanceId
      );
      this.mockNodeIdCache.set(data.nodeData.id, res.instance.id);
      if (data.sortData) {
        await this.sortInstance({
          objectId: "STORYBOARD_BRICK",
          ...data.sortData,
        });
      }
      this.publish("message", {
        action: "insert",
        data,
        newData: res.instance as BuilderBrickNode,
      });
      return true;
    } catch (e) {
      this.handleError(e, "创建实例失败");
      return false;
    }
  }

  private async updateInstance(
    data: WorkbenchBackendActionForUpdateDetail
  ): Promise<boolean> {
    try {
      const instanceId =
        this.mockInstanceIdCache.get(data.instanceId) || data.instanceId;
      const mtime = this.mTimeMap.get(instanceId) || data.mtime;
      const res = await StoryboardApi_editNode(this.baseInfo.appId, {
        objectId: data.objectId,
        instanceId: instanceId,
        mtime: mtime,
        instance: data.property,
      });
      return true;
    } catch (e) {
      if (
        e.name === "HttpResponseError" &&
        [100000, 100005].includes(e.responseJson.code)
      ) {
        this.handleError(
          null,
          "实例修改冲突，可能有其他人正在修改当前页面，请尝试刷新页面"
        );
      } else {
        this.handleError(e, "更新实例失败");
      }
      return false;
    }
  }

  private async moveInstance(
    data: WorkbenchBackendActionForMoveDetail
  ): Promise<boolean> {
    try {
      const instanceId =
        this.mockInstanceIdCache.get(data.nodeInstanceId) ||
        data.nodeInstanceId;

      if (data.nodeData) {
        const isSuccess = await this.updateInstance({
          objectId: data.objectId,
          instanceId: instanceId,
          property: data.nodeData,
          mtime: data.mtime,
        });
        if (!isSuccess) return false;
      }
      return await this.sortInstance(data);
    } catch (e) {
      this.handleError(e, "移动实例失败");
      return false;
    }
  }

  private async sortInstance(
    data: WorkbenchSortData & { objectId: string }
  ): Promise<boolean> {
    try {
      if (data.nodeIds.length > 1) {
        const nodeIds = data.nodeIds.map((id) => {
          const cache = this.mockNodeIdCache.get(id);
          if (cache) {
            return cache;
          }
          return id;
        });
        await StoryboardApi_sortStoryboardNodes({
          nodeIds,
        });
        await Promise.all(
          data.nodeInstanceIds?.map((iid) => {
            const instanceId = this.mockInstanceIdCache.get(iid) || iid;
            this.updateMTime(data.objectId, instanceId);
          })
        );
      }
      return true;
    } catch (e) {
      this.handleError(e, "实例排序失败");
      return false;
    }
  }

  private async deleteInstance(
    data: WorkbenchBackendActionForDeleteDetail
  ): Promise<boolean> {
    try {
      await StoryboardApi_deleteNode(this.baseInfo.appId, {
        objectId: data.objectId,
        instanceId:
          this.mockInstanceIdCache.get(data.instanceId) || data.instanceId,
      });
      return true;
    } catch (e) {
      this.handleError(e, "删除实例失败");
      return false;
    }
  }

  private replaceSnippetData(data: EventDetailOfSnippetApply): void {
    data.nodeIds = data.nodeIds.map((item) => {
      if (typeof item === "string" && item.startsWith("mock")) {
        return this.mockNodeIdCache.get(item);
      }
      return item;
    });
    const walkChildren = (data: SnippetNodeDetail): void => {
      if (
        typeof data.nodeData.parent === "string" &&
        data.nodeData.parent.startsWith("mock")
      ) {
        data.nodeData.parent = this.mockInstanceIdCache.get(
          data.nodeData.parent
        );
      }
      data.children?.forEach(walkChildren);
    };
    data.nodeDetails.forEach(walkChildren);
  }

  private async insertSnippet(
    data: WorkbenchBackendActionForInsertSnippetDetail
  ): Promise<boolean> {
    try {
      this.replaceSnippetData(data.snippetData);
      const result = await ApplyStoryBoardSnippet(data.snippetData, {
        appId: this.baseInfo.appId,
      });
      this.publish("message", {
        action: "snippet-success",
        data: {
          snippetId: data.brick,
          nodeData: data.nodeData,
          ...result,
        },
      });
      this.isNeedUpdateTree = true;
      return true;
    } catch (e) {
      this.handleError(e, "新增代码片段失败");
      return false;
    }
  }

  private async copyBrick(
    data: StoryboardApi_CloneBricksRequestBody
  ): Promise<boolean> {
    try {
      await StoryboardApi_cloneBricks(data);
      this.isNeedUpdateTree = true;
      return true;
    } catch (e) {
      this.handleError(e, "粘贴失败");
      return false;
    }
  }

  private async cutBrick(
    data: Partial<ModelInstanceRelationRequest> & {
      objectId: string;
    }
  ): Promise<boolean> {
    try {
      let objectId = data.objectId;
      if (!objectId) {
        objectId = (
          await InstanceApi_getDetail("STORYBOARD_NODE", data.instance_ids[0], {
            fields: "_object_id",
          })
        )._object_id;
      }
      await StoryboardApi_editNode(this.baseInfo.appId, {
        objectId: objectId,
        instanceId: data.instance_ids[0],
        instance: {
          parent: data.related_instance_ids[0],
        },
      });
      this.isNeedUpdateTree = true;
      return true;
    } catch (e) {
      this.handleError(e, "剪切失败");
      return false;
    }
  }

  async buildAndPush(isNeedRefresh?: boolean): Promise<void> {
    this.cleanTimer();
    if (this.isBuilding) return;
    this.isBuilding = true;
    try {
      // eslint-disable-next-line no-console
      console.log("=== building ===");
      this.publish("message", {
        action: "build-start",
      });
      const result = await StoryboardAssembly({
        projectId: this.baseInfo.projectId,
        storyboardType: this.baseInfo.storyboardType || "micro-app",
      });
      await BuildApi_buildAndPush({
        projectId: result.projectId,
        storyboardJson: JSON.stringify(result.storyboard),
        ignoredResources: {
          menus: true,
          image: true,
          workflow: true,
        },
      });
      // eslint-disable-next-line no-console
      console.log("=== build finsh ===");
      await this.updateBrickTree();
      this.isBuilding = false;
      this.publish("message", {
        action: "build-success",
        data: {
          storyboard: result.storyboard,
          isNeedRefresh,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("build fail", e);
      this.isBuilding = false;
      this.publish("message", {
        action: "build-fail",
        data: {
          title: "build & push 失败",
          content: e?.responseJson?.error as string,
        },
      });
    }
  }

  private async createFormItem(
    task: WorkbenchBackendActionForInsertFormItem
  ): Promise<boolean> {
    try {
      const { args } = task;
      const res = await FormProjectApi_createFormItem(
        ...(args as insertFormItemArgs)
      );
      this.mockInstanceIdCache.set(
        task.nodeData.instanceId,
        res.itemInstanceId
      );
      if (res.itemMapList) this.draftInstanceIdCache = res.itemMapList;
      this.publish("message", {
        action: "execute-success",
        data: {
          res: res,
          op: "insert",
        },
      });
      return true;
    } catch (e) {
      this.handleError(e, "创建表单项失败");
      return false;
    }
  }

  private async updateFormItem(
    task: WorkbenchBackendActionForUpdateFormItem
  ): Promise<boolean> {
    try {
      const instance =
        this.mockInstanceIdCache.get(task.args[0]) ||
        this.draftInstanceIdCache?.find(
          (item) => item.oldInstanceId === task.args[0]
        )?.newItem?.instanceId ||
        task.args[0];
      const res = await FormProjectApi_updateFormItem(instance, task.args[1]);
      if (res.itemMapList) this.draftInstanceIdCache = res.itemMapList;
      this.publish("message", {
        action: "execute-success",
        data: {
          res: res,
          op: "update",
        },
      });
      return true;
    } catch (e) {
      this.handleError(e, "更新表单项失败");
      return false;
    }
  }

  private async updateFormTemplate(
    task: WorkbenchBackendActionForUpdateFormTemplate
  ): Promise<boolean> {
    try {
      const instance =
        this.mockInstanceIdCache.get(task.args[0]) ||
        this.draftInstanceIdCache?.find(
          (item) => item.oldInstanceId === task.args[0]
        )?.newItem?.instanceId ||
        task.args[0];
      const res = await FormProjectApi_updateFormTemplate(
        instance,
        task.args[1]
      );
      if (res.itemMapList?.length > 0)
        this.draftInstanceIdCache = res.itemMapList;
      this.publish("message", {
        action: "execute-success",
        data: {
          res: res,
          op: "update",
        },
      });
      return true;
    } catch (e) {
      this.handleError(e, "更新表单模板失败");
      return false;
    }
  }

  private async deleteFormItem(
    task: WorkbenchBackendActionForDeleteFormItem
  ): Promise<boolean> {
    try {
      const instance =
        this.mockInstanceIdCache.get(task.args[0]) ||
        this.draftInstanceIdCache?.find(
          (item) => item.oldInstanceId === task.args[0]
        )?.newItem?.instanceId ||
        task.args[0];
      const res = await FormProjectApi_deleteFormItem(instance, task.args[1]);
      if (res.itemMapList) this.draftInstanceIdCache = res.itemMapList;
      this.publish("message", {
        action: "execute-success",
        data: {
          res: res,
          op: "delete",
        },
      });
      return true;
    } catch (e) {
      this.handleError(e, "删除表单项失败");
      return false;
    }
  }

  private async batchHandleInstance(
    task: WorkbenchBackendActionForBatchOpDetail
  ): Promise<boolean> {
    try {
      if (task.insert?.length) {
        await Promise.all(task.insert.map((item) => this.createInstance(item)));
      }

      if (task.update?.length) {
        await Promise.all(task.update.map((item) => this.updateInstance(item)));
      }

      if (task.delete?.length) {
        await Promise.all(task.delete.map((item) => this.deleteInstance(item)));
      }

      this.isNeedUpdateTree = true;
      return true;
    } catch (e) {
      this.handleError(e, "批量编辑失败");
      return false;
    }
  }

  private batchDealRequest = async (): Promise<void> => {
    // 进入批量变更操作
    this.isDealing = true;
    this.cleanTimer();
    if (this.size > 0) {
      const task = this.shift();
      if (task && task.state === "pending") {
        const { action, data } = task;
        // eslint-disable-next-line no-console
        console.log("batchDealRequest", action, data);
        this.autoBuild =
          !action.includes("formItem") && !action.includes("formTemplate");
        let isSuccess: boolean;
        try {
          switch (action) {
            case "insert":
              isSuccess = await this.createInstance(data);
              break;
            case "copy.data":
            case "update":
              isSuccess = await this.updateInstance(data);
              if (isSuccess) {
                await this.updateMTime(data.objectId, data.instanceId);
              }
              break;
            case "update.visualForm":
              isSuccess = await this.updateInstance(data);
              if (isSuccess) {
                await this.updateMTime(data.objectId, data.instanceId);
              }
              break;
            case "move":
              isSuccess = await this.moveInstance(data);
              break;
            case "delete":
              isSuccess = await this.deleteInstance(data);
              break;
            case "insert.snippet":
              isSuccess = await this.insertSnippet(data);
              break;
            case "insert.formItem":
              this.createFormItem(task);
              break;
            case "delete.formItem":
              this.deleteFormItem(task);
              break;
            case "update.formItem":
              this.updateFormItem(task);
              break;
            case "update.formTemplate":
              this.updateFormTemplate(task);
              break;
            case "copy.brick":
              isSuccess = await this.copyBrick(data);
              break;
            case "cut.brick":
              isSuccess = await this.cutBrick(data);
              break;
            case "batch.op":
              isSuccess = await this.batchHandleInstance(data);
              break;
          }
          if (isSuccess) {
            this.publish("message", {
              action: "instance-success",
              data: task,
            });
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("action was error: ", JSON.stringify(task));
          // eslint-disable-next-line no-console
          console.error("error: ", e);
          this.handleError(e, "实例操作失败");
        }
      }
    }

    if (this.size > 0) {
      this.batchDealRequest();
    } else {
      this.isDealing = false;
      if (this.isNeedUpdateTree) {
        await this.updateBrickTree();
      }
      // build-and-push
      // eslint-disable-next-line no-console
      console.log("=== ready to build ===");
      // 如果任务队列已经清空, 则发起定时任务, 在规定时间后, 解锁页面, 并且发起build动作
      if (this.baseInfo.delayBuildTime < 0) {
        // eslint-disable-next-line no-console
        console.log("=== time less than 0, build cancel ===");
        return;
      }
      if (this.autoBuild) {
        this.afterChangeTimer = setTimeout(() => {
          this.buildAndPush();
        }, (this.baseInfo.delayBuildTime ?? 10) * 1000);
      }
    }
  };

  setUsedBrickPackage = async (list: string[]): Promise<void> => {
    if (!this.hadFetchDepend) {
      this.hadFetchDepend = true;
      await this.dependCache.update();
    }
    const installedPackage = this.dependCache.getList();
    const missPackage = list.filter((pack) => !installedPackage.includes(pack));
    if (missPackage.length) {
      // miss brick package
      await PackageAloneApi_addDependencies(this.baseInfo.projectId, {
        dependencies: missPackage.map((pack) => ({
          name: pack,
          actualVersion: null,
          constraint: "*",
        })),
      });
      await this.dependCache.update();
    }
  };
}
