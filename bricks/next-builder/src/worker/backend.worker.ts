import { omit } from "lodash";
import {
  http,
  HttpError,
  HttpResponse,
  setBasePath,
} from "@next-core/brick-http";
import {
  InstanceApi_createInstance,
  InstanceApi_updateInstance,
  InstanceArchiveApi_archiveInstance,
} from "@next-sdk/cmdb-sdk";
import {
  BuildApi_buildAndPush,
  StoryboardApi_sortStoryboardNodes,
} from "@next-sdk/next-builder-sdk";
import type {
  WorkbenchBackendCacheAction,
  WorkbenchBackendActionForInsert,
  WorkbenchBackendActionForUpdate,
  WorkbenchBackendActionForMove,
  WorkbenchBackendActionForDelete,
  WorkbenchBackendActionForInitDetail,
} from "@next-types/preview";
import { StoryboardAssembly } from "../shared/storyboard/StoryboardAssembly";

const DELAY_BUILD_TIME = 5000;

http.interceptors.response.use(
  function (response: HttpResponse) {
    return response.config.options?.observe === "response"
      ? response
      : response.data;
  },
  function (error: HttpError) {
    return Promise.reject(error.error);
  }
);

export type QueueItem =
  | WorkbenchBackendActionForInsert
  | WorkbenchBackendActionForUpdate
  | WorkbenchBackendActionForMove
  | WorkbenchBackendActionForDelete;

export class BackendWorker {
  private baseInfo: WorkbenchBackendActionForInitDetail;
  private worker: Worker;
  private cacheQueue: QueueItem[] = this.observe<QueueItem[]>([]);
  private mockInstanceIdCache: Map<string, string> = new Map();
  private mockNodeIdCache: Map<string, string> = new Map();
  private isDealing = false;
  private isBuilding = false;

  constructor(worker: Worker) {
    this.worker = worker;
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

  get queue(): QueueItem[] {
    return this.cacheQueue;
  }

  get size(): number {
    return this.cacheQueue.length;
  }

  init(data: WorkbenchBackendActionForInitDetail): void {
    this.baseInfo = data;
    this.worker.postMessage({
      init: true,
    });
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

  close(): void {
    self.close();
  }

  on(fn: (this: Worker, ev: WorkerEventMap["message"]) => void): void {
    this.worker.addEventListener("message", fn);
  }

  onError(fn: (this: Worker, ev: WorkerEventMap["error"]) => void): void {
    this.worker.addEventListener("error", fn);
  }

  onMessageError(
    fn: (this: Worker, ev: WorkerEventMap["messageerror"]) => void
  ): void {
    this.worker.addEventListener("messageerror", fn);
  }

  postMessage(message: any): void {
    this.worker.postMessage(message);
  }

  private batchDealRequest = async (): Promise<void> => {
    this.isDealing = true;

    while (this.size > 0) {
      const item = this.shift();
      if (item) {
        const { action, data } = item;
        // eslint-disable-next-line no-console
        console.log("batchDealRequest", action, data);
        try {
          switch (action) {
            case "insert":
              if (data) {
                const res = await InstanceApi_createInstance(
                  "STORYBOARD_BRICK",
                  omit(
                    {
                      ...data,
                      parent:
                        this.mockInstanceIdCache.get(data.parent) ||
                        data.parent,
                      sort: data.sort || data.nodeData?.sort,
                    },
                    [
                      "nodeData",
                      "dragOverInstanceId",
                      "dragStatus",
                      "parentInstanceId",
                    ]
                  )
                );
                this.mockInstanceIdCache.set(
                  data.nodeData.instanceId,
                  res.instanceId
                );
                this.mockNodeIdCache.set(data.nodeData.id, res.id);
                this.postMessage({
                  action,
                  data,
                  newData: res,
                });
              }
              break;
            case "update":
              await InstanceApi_updateInstance(
                data.objectId,
                this.mockInstanceIdCache.get(data.instanceId) ||
                  data.instanceId,
                data.property
              );
              break;
            case "move":
              if (data) {
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
              }
              break;
            case "delete":
              await InstanceArchiveApi_archiveInstance(
                data.objectId,
                this.mockInstanceIdCache.get(data.instanceId) || data.instanceId
              );
              break;
          }
          this.postMessage({
            action: "done",
            data: item,
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("action was error: ", JSON.stringify(item));
          // eslint-disable-next-line no-console
          console.error("error: ", e);
          this.postMessage({
            action: "error",
            data: item,
          });
          break;
        }
      } else {
        break;
      }
    }

    if (this.size > 0) {
      this.batchDealRequest();
    } else {
      this.isDealing = false;
      // build-and-push
      // eslint-disable-next-line no-console
      console.log("=== ready to build ===");
      setTimeout(async () => {
        if (!this.isDealing && !this.isBuilding) {
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
            this.postMessage({
              action: "build-success",
            });
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("build fail", e);
            this.postMessage({
              action: "build-fail",
              data: e,
            });
          }
        }
      }, DELAY_BUILD_TIME);
    }
  };
}

const backendWorker = new BackendWorker(self as any);

export const handleWorkerMessage = (e: WorkerEventMap["message"]): void => {
  const { action, data }: WorkbenchBackendCacheAction = e.data;
  switch (action) {
    case "init":
      setBasePath(data.basePath);
      backendWorker.init(data);
      break;
    case "insert":
    case "update":
    case "move":
    case "delete":
      backendWorker.push(e.data);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log("no action", data);
      break;
  }
};

backendWorker.on(handleWorkerMessage);
backendWorker.onError((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
});
backendWorker.onMessageError((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
});
