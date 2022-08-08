import { omit } from "lodash";
import {
  InstanceApi_createInstance,
  InstanceApi_updateInstance,
  InstanceArchiveApi_archiveInstance,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import {
  BuildApi_buildAndPush,
  StoryboardApi_sortStoryboardNodes,
} from "@next-sdk/next-builder-sdk";
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
  BackendMessage,
} from "@next-types/preview";
import type { HttpResponseError } from "@next-core/brick-http";
import { type pipes } from "@next-core/pipes";
import type { BuilderBrickNode } from "@next-core/brick-types";

const DELAY_BUILD_TIME = 30000;

export type QueueItem =
  | WorkbenchBackendActionForInsert
  | WorkbenchBackendActionForUpdate
  | WorkbenchBackendActionForMove
  | WorkbenchBackendActionForDelete;

export default class WorkbenchBackend {
  private baseInfo: WorkbenchBackendActionForInitDetail;
  private cacheQueue: QueueItem[] = this.observe<QueueItem[]>([]);
  private mockInstanceIdCache: Map<string, string> = new Map();
  private mockNodeIdCache: Map<string, string> = new Map();
  private topics: Record<string, any> = {};
  private subUid = 0;
  private isDealing = false;
  private isBuilding = false;
  private afterChangeTimer: NodeJS.Timeout;

  private static instance: WorkbenchBackend;

  static getInstance(
    initData: WorkbenchBackendActionForInitDetail
  ): WorkbenchBackend {
    if (!this.instance) {
      this.instance = new WorkbenchBackend(initData);
    }
    return this.instance;
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

  private async createInstance(
    data: WorkbenchBackendActionForInsertDetail
  ): Promise<boolean> {
    try {
      const res = await InstanceApi_createInstance(
        "STORYBOARD_BRICK",
        omit(
          {
            ...data,
            parent: this.mockInstanceIdCache.get(data.parent) || data.parent,
            sort: data.sort || data.nodeData?.sort,
          },
          ["nodeData", "dragOverInstanceId", "dragStatus", "parentInstanceId"]
        )
      );
      this.mockInstanceIdCache.set(data.nodeData.instanceId, res.instanceId);
      this.mockNodeIdCache.set(data.nodeData.id, res.id);
      this.publish("message", {
        action: "insert",
        data,
        newData: res as BuilderBrickNode,
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
      await InstanceApi_updateInstance(
        data.objectId,
        this.mockInstanceIdCache.get(data.instanceId) || data.instanceId,
        data.property
      );
      return true;
    } catch (e) {
      this.handleError(e, "更新实例失败");
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
      const nodeIds = data.nodeIds.map((id) => {
        const cache = this.mockNodeIdCache.get(id);
        if (cache) {
          return cache;
        }
        return id;
      });
      if (instanceId) {
        await InstanceApi_updateInstance(
          "STORYBOARD_BRICK",
          instanceId,
          data.nodeData
        );
      }
      await StoryboardApi_sortStoryboardNodes({
        nodeIds,
      });
      return true;
    } catch (e) {
      this.handleError(e, "移动实例失败");
      return false;
    }
  }

  private async deleteInstance(
    data: WorkbenchBackendActionForDeleteDetail
  ): Promise<boolean> {
    try {
      await InstanceArchiveApi_archiveInstance(
        data.objectId,
        this.mockInstanceIdCache.get(data.instanceId) || data.instanceId
      );
      return true;
    } catch (e) {
      this.handleError(e, "删除实例失败");
      return false;
    }
  }

  private async buildAndPush(): Promise<void> {
    if (this.isBuilding) return;
    this.isBuilding = true;
    try {
      // eslint-disable-next-line no-console
      console.log("=== building ===");
      const result = await StoryboardAssembly({
        projectId: this.baseInfo.projectId,
        storyboardType: "micro-app",
      });
      await BuildApi_buildAndPush({
        projectId: result.projectId,
        storyboardJson: JSON.stringify(result.storyboard),
      });
      // eslint-disable-next-line no-console
      console.log("=== build finsh ===");
      this.isBuilding = false;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("build fail", e);
      this.publish("error", {
        action: "build-fail",
        data: {
          error: "build & push 失败",
        },
      });
    }
  }

  private batchDealRequest = async (): Promise<void> => {
    // 进入批量变更操作
    this.isDealing = true;
    this.cleanTimer();

    if (this.size > 0) {
      const task = this.shift();
      if (task) {
        const { action, data } = task;
        // eslint-disable-next-line no-console
        console.log("batchDealRequest", action, data);
        let isSuccess: boolean;
        try {
          switch (action) {
            case "insert":
              isSuccess = await this.createInstance(data);
              break;
            case "update":
              isSuccess = await this.updateInstance(data);
              break;
            case "move":
              isSuccess = await this.moveInstance(data);
              break;
            case "delete":
              isSuccess = await this.deleteInstance(data);
              break;
          }
          if (isSuccess) {
            this.publish("message", {
              action: "instance-success",
              data: task,
            });
          } else {
            this.publish("message", {
              action: "instance-fail",
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
      // build-and-push
      // eslint-disable-next-line no-console
      console.log("=== ready to build ===");
      // 如果任务队列已经清空, 则发起定时任务, 在规定时间后, 解锁页面, 并且发起build动作
      this.afterChangeTimer = setTimeout(() => {
        this.buildAndPush();
      }, DELAY_BUILD_TIME);
    }
  };
}
