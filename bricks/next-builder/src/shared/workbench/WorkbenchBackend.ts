import { omit } from "lodash";
import moment from "moment";
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
} from "@next-types/preview";
import { StoryboardAssembly } from "../storyboard/StoryboardAssembly";
import { InstanceApi_getDetail } from "@next-sdk/cmdb-sdk";
import { getAuth } from "@next-core/brick-kit";
import { HttpResponseError } from "@next-core/brick-http";

const DELAY_AFTER_CHANGE_TIME = 60000 * 2;
const POLL_TIME = 60000;
const INIT_UNLOCK_TIME = 30000;

export type QueueItem =
  | WorkbenchBackendActionForInsert
  | WorkbenchBackendActionForUpdate
  | WorkbenchBackendActionForMove
  | WorkbenchBackendActionForDelete;

export interface LockState {
  lock: boolean;
  mtime?: string;
  modifier?: string;
}

export default class WorkerbenchBackend {
  private username = getAuth().username;
  private baseInfo: WorkbenchBackendActionForInitDetail;
  private cacheQueue: QueueItem[] = this.observe<QueueItem[]>([]);
  private mockInstanceIdCache: Map<string, string> = new Map();
  private mockNodeIdCache: Map<string, string> = new Map();
  private topics: Record<string, any> = {};
  private subUid = 0;
  private isDealing = false;
  private isBuilding = false;
  private afterChangeTimer: NodeJS.Timeout;
  private initSetUnLockTimer: NodeJS.Timeout;
  private pollQueyLockStatusTimer: NodeJS.Timeout;
  private lockState: LockState = {
    lock: false,
    mtime: "",
    modifier: "",
  };

  private static instance: WorkerbenchBackend;

  static getInstance(
    initData: WorkbenchBackendActionForInitDetail
  ): WorkerbenchBackend {
    if (!this.instance) {
      this.instance = new WorkerbenchBackend(initData);
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

  get isLock(): boolean {
    return this.lockState.lock && this.lockState.modifier !== this.username;
  }

  async init(data: WorkbenchBackendActionForInitDetail): Promise<void> {
    this.baseInfo = data;
    const isLock = await this.checkLock(true);
    // 初始化, 如果检测到当前页面属于锁定状态, 则发起轮询查询锁的状态
    if (isLock) this.startPollQueryLockState();
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

  publish(topic: string, args: any): void {
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
    clearTimeout(this.initSetUnLockTimer);
    clearTimeout(this.pollQueyLockStatusTimer);
    this.initSetUnLockTimer = null;
    this.afterChangeTimer = null;
    this.pollQueyLockStatusTimer = null;
  }

  private handleError(e: HttpResponseError, errorMsg: string): void {
    this.publish("message", {
      action: "error",
      data: {
        error: e.responseJson?.error || errorMsg,
      },
    });
  }

  private setLockState(state: LockState): void {
    this.lockState = state;
  }

  public async setLock(isLock: boolean): Promise<boolean> {
    this.cleanTimer();
    const isSuccess = await this.updateInstance({
      objectId: this.baseInfo.objectId,
      instanceId: this.baseInfo.rootNode.instanceId,
      property: {
        lock: isLock,
      },
    });
    if (!isSuccess) return isSuccess;
    this.setLockState({
      ...this.lockState,
      modifier: this.username,
      lock: isLock,
    });
    this.publish("message", {
      action: "lock",
      data: {
        ...this.lockState,
        lock: this.isLock,
      },
    });
    return true;
  }

  private async queryIsLock(): Promise<LockState> {
    try {
      const res = await InstanceApi_getDetail(
        this.baseInfo.objectId,
        this.baseInfo.rootNode.instanceId,
        {
          fields: "lock,mtime,modifier",
        }
      );
      return {
        lock: res.lock,
        mtime: res.mtime,
        modifier: res.modifier,
      };
    } catch (e) {
      this.handleError(e, "获取实例信息失败");
      return {
        lock: true,
      };
    }
  }

  private async checkLock(isInit?: boolean): Promise<boolean> {
    try {
      const { lock, mtime, modifier } = await this.queryIsLock();
      this.setLockState({
        lock,
        mtime,
        modifier,
      });
      this.publish("message", {
        action: "lock",
        data: {
          lock: this.isLock,
          mtime,
          modifier,
        },
      });
      if (this.isLock) {
        return true;
      }
      if (isInit && lock && modifier === this.username) {
        // 初始化, 当前页面属于锁定状态, 并且锁定人为当前用户, 开启定时器解锁
        this.initSetUnLockTimer = setTimeout(() => {
          this.setLock(false);
        }, INIT_UNLOCK_TIME);
      }
      return false;
    } catch {
      return true;
    }
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
      this.setLockState({
        ...this.lockState,
        lock: false,
      });
      this.publish("message", {
        action: "update-graph-data",
        data: {
          graphData,
        },
      });
    } catch (e) {
      this.handleError(e, "更新构件树失败");
    }
  }

  private startPollQueryLockState(): void {
    if (this.pollQueyLockStatusTimer) return;
    this.pollQueyLockStatusTimer = setInterval(async () => {
      const { lock, modifier } = await this.queryIsLock();
      // 查询锁的状态, 如果处于非锁定状态, 或者页面已锁, 但修改人属于自已, 则发起图查询, 更新构件树数据
      if (!lock || (lock && modifier === this.username)) {
        await this.updateBrickTree();
        this.isDealing = false;
        clearInterval(this.pollQueyLockStatusTimer);
        this.pollQueyLockStatusTimer = null;
      }
    }, POLL_TIME);
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
        newData: res,
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
      this.publish("message", {
        action: "build-success",
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("build fail", e);
      this.publish("error", {
        action: "build-fail",
        error: e,
      });
    }
  }

  private batchDealRequest = async (): Promise<void> => {
    // 进入批量变更操作
    this.isDealing = true;
    this.cleanTimer();

    if (this.isLock) {
      // 如果当前页面属于锁定状态, 开启轮询
      this.startPollQueryLockState();
      this.isDealing = false;
      return;
    } else {
      // 如果当前页面非锁定状态, 判断其最近更新时间是否大于预设延时时间
      // 如果大于, 需要重新查询页面锁定状态, 如果非锁定, 则设置成锁定
      // 如果锁定, 则返回
      let needChange = false;
      if (this.lockState.mtime) {
        const compareTime =
          new Date(moment().format("YYYY-MM-DD HH:mm:ss")).getTime() -
          new Date(this.lockState.mtime).getTime();
        needChange = compareTime > DELAY_AFTER_CHANGE_TIME;
      }
      if (needChange) {
        const isLock = await this.checkLock();
        if (isLock) {
          this.isDealing = false;
          this.startPollQueryLockState();
          return;
        }
        const isSuccess = await this.setLock(true);
        if (!isSuccess) {
          this.isDealing = false;
          return;
        }
      }
    }

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
      this.afterChangeTimer = setTimeout(async () => {
        this.setLock(false);
        this.buildAndPush();
      }, DELAY_AFTER_CHANGE_TIME);
    }
  };
}
