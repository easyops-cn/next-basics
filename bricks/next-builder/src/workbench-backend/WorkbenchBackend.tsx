import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Worker from "../worker/backend.worker.ts";
import { getRuntime } from "@next-core/brick-kit";
import {
  useBuilderData,
  useBuilderDataManager,
  type BuilderDataManager,
  type EventDetailOfNodeAdd,
  type BuilderRuntimeNode,
  type BuilderRuntimeEdge,
  WorkbenchNodeAdd,
} from "@next-core/editor-bricks-helper";
import {
  buildBricks,
  buildRoutes,
} from "../shared/storyboard/buildStoryboardV2";
import { uniqueId } from "lodash";
import type {
  BrickConf,
  BuilderBrickNode,
  BuilderRouteNode,
  BuilderRouteOrBrickNode,
  RouteConf,
  CustomTemplate,
} from "@next-core/brick-types";
import type {
  WorkbenchBackendActionForInit,
  WorkbenchBackendActionForInsertDetail,
  WorkbenchBackendCacheAction,
  UpdateStoryboardType,
  PreviewSettings,
} from "@next-types/preview";

export interface WorkbenchBackendRef {
  manager: BuilderDataManager;
  getInstanceDetail: (instanceId: string) => BuilderRuntimeNode;
  cacheAction: (detail: WorkbenchBackendCacheAction) => any;
}

export interface StoryboardUpdateParams {
  storyboard: UpdateStoryboard;
  updateStoryboardType: UpdateStoryboardType;
  settings?: PreviewSettings;
}

type UpdateStoryboard =
  | RouteConf
  | CustomTemplate
  | {
      snippetId: string;
      bricks: BrickConf[];
    };

interface WorkbenchBackendProps {
  appId: string;
  projectId: string;
  onStoryboardUpdate: ({
    storyboard,
    updateStoryboardType,
    settings,
  }: StoryboardUpdateParams) => void;
  onRootNodeUpdate: (node: BuilderRuntimeNode) => void;
}

function getGraphTreeByBuilderData(
  rootId: number,
  nodes: BuilderRuntimeNode[],
  edges: BuilderRuntimeEdge[]
): BuilderRouteOrBrickNode {
  const normalizeBuilderData = (
    node: BuilderRuntimeNode
  ): BuilderRouteOrBrickNode => {
    return Object.fromEntries(
      Object.entries(node).filter((item) => {
        if (
          item[0].startsWith("$") ||
          item[1] === undefined ||
          item[1] === null ||
          item[1] === ""
        )
          return false;
        return item;
      })
    ) as BuilderRouteOrBrickNode;
  };
  const root = nodes.find((item) => item.$$uid === rootId);
  if (!root) return;
  const rootNode = normalizeBuilderData(root);

  const walkEdges = (
    node: BuilderRuntimeNode,
    rootId?: number
  ): BuilderRouteOrBrickNode[] => {
    const parentUid = node?.$$uid ?? rootId;
    const childList = edges
      .filter((item) => item.parent === parentUid)
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.child);
    const childNode = childList
      .map((uid) => {
        const node = nodes.find((item) => item.$$uid === uid);
        if (!node) return null;
        const mountPoint = edges.find(
          (item) => item.child === node.$$uid
        )?.mountPoint;
        node.children = walkEdges({
          ...node,
        });
        return {
          ...normalizeBuilderData(node),
          mountPoint,
          alias: node.alias || (node.brick as string).split(".").pop(),
        };
      })
      .filter(Boolean);
    return childNode;
  };

  rootNode.children = walkEdges(null, rootId);
  return rootNode;
}

function LegacyWorkbenchBackend(
  {
    appId,
    projectId,
    onStoryboardUpdate,
    onRootNodeUpdate,
  }: WorkbenchBackendProps,
  ref: React.Ref<WorkbenchBackendRef>
): React.ReactElement {
  const { rootId, nodes, edges } = useBuilderData();
  const manager = useBuilderDataManager();
  const basePath = getRuntime().getBasePath();
  const worker = useMemo(() => new Worker(), []);
  const nodesCahceRef = useRef<Map<string, BuilderRuntimeNode>>(new Map());

  const setNodesCache = (
    nodes: BuilderRuntimeNode[],
    edges: BuilderRuntimeEdge[]
  ): void => {
    nodes.forEach((node) => {
      const nodeParentUid = edges.find(
        (item) => item.child === node.$$uid
      )?.parent;
      const parentNode = nodes.find((item) => item.$$uid === nodeParentUid);
      nodesCahceRef.current.set(node.instanceId, {
        ...node,
        mountPoint: edges.find((item) => item.child === node.$$uid)?.mountPoint,
        parent: [parentNode],
      });
    });
  };

  const setNewStoryboard = useCallback((): void => {
    let storyboard: UpdateStoryboard;
    let settings: unknown;
    const rootInstanceId = nodes.find(
      (item) => item.$$uid === rootId
    ).instanceId;
    const rootNode = nodesCahceRef.current.get(rootInstanceId);
    const graphTree = getGraphTreeByBuilderData(
      rootId,
      [...nodesCahceRef.current.values()],
      edges
    );
    let updateStoryboardType: UpdateStoryboardType;
    if (graphTree) {
      if (rootNode.type === "custom-template") {
        updateStoryboardType = "template";
        settings = Array.isArray(rootNode.previewSettings)
          ? rootNode.previewSettings.find((item) => item.active) ??
            rootNode.previewSettings[0]
          : rootNode.previewSettings;
        storyboard = {
          name: rootNode.templateId,
          proxy: rootNode.proxy ? JSON.parse(rootNode.proxy) : null,
          state: rootNode.state ? JSON.parse(rootNode.state as string) : null,
          bricks: buildBricks(graphTree.children as BuilderBrickNode[], {
            keepIds: false,
          }),
        } as CustomTemplate;
      } else if (rootNode.type === "snippet") {
        updateStoryboardType = "snippet";
        storyboard = {
          snippetId: rootNode.snippetId,
          bricks: buildBricks(graphTree.children as BuilderBrickNode[], {
            keepIds: false,
          }),
        };
      } else {
        updateStoryboardType = "route";
        storyboard = buildRoutes([graphTree] as BuilderRouteNode[], {
          keepIds: false,
        })[0];
      }

      onStoryboardUpdate({
        storyboard,
        updateStoryboardType,
        settings,
      });
    }
  }, [nodes, edges, onStoryboardUpdate, rootId]);

  const getInstanceDetail = useCallback(
    (instanceId: string): BuilderRuntimeNode => {
      if (nodesCahceRef.current.size === 0) {
        setNodesCache(nodes, edges);
      }
      return nodesCahceRef.current.get(instanceId);
    },
    [nodes, edges]
  );

  const handleBrickAddNode = (
    data: WorkbenchBackendActionForInsertDetail
  ): void => {
    const nodeUid = Number(uniqueId());
    const nodeInstanceId = uniqueId("mock_instanceId_");
    const nodeId = uniqueId("mock_id_");
    data.nodeData = {
      ...data.nodeData,
      $$uid: nodeUid,
      id: nodeId,
      instanceId: nodeInstanceId,
      brick: data.brick,
      mountPoint: data.mountPoint,
      parent: data.parent,
      portal: data.portal,
      bg: data.bg,
      type: data.type,
    };
    if (data.dragOverInstanceId) {
      manager.workbenchNodeAdd(data as WorkbenchNodeAdd);
    } else {
      const parentUid = nodes.find(
        (item) => item.instanceId === data.parent
      ).$$uid;
      const nodeUids = edges
        .filter((item) => item.parent === parentUid)
        .map((item) => item.child)
        .concat(nodeUid);
      manager.nodeAdd({
        nodeData: data.nodeData,
        nodeUid,
        parentUid,
        nodeUids,
        sort: data.sort,
        nodeIds: [],
      } as EventDetailOfNodeAdd);
    }
  };

  const cacheAction = (detail: WorkbenchBackendCacheAction): any => {
    const { action, data } = detail;
    switch (action) {
      case "get":
        return {
          action,
          ...getInstanceDetail(data.instanceId),
        };
      case "insert":
        handleBrickAddNode(data);
        nodesCahceRef.current.set(data.nodeData.instanceId, data.nodeData);
        break;
      case "update":
        if (data) {
          const { instanceId, property } = data;
          const rootInstanceId = nodes.find(
            (item) => item.$$uid === rootId
          ).instanceId;
          const originProperty = nodesCahceRef.current.get(instanceId);
          const mergeData = Object.assign(originProperty, property);
          manager.updateNode(instanceId, {
            ...mergeData,
            ...(property.alias
              ? {
                  alias:
                    property.alias ||
                    originProperty.alias ||
                    (mergeData.brick as string).split(".").pop(),
                }
              : {}),
          });
          nodesCahceRef.current.set(instanceId, mergeData);
          if (instanceId === rootInstanceId) {
            onRootNodeUpdate(mergeData);
          }
        }
        setNodesCache([...nodesCahceRef.current.values()], edges);
        setNewStoryboard();
        break;
      case "move":
        break;
      case "delete":
        nodesCahceRef.current.delete(data.instanceId);
        break;
    }
    worker.postMessage(detail);
  };

  useEffect(() => {
    const nodesCacheRef = nodesCahceRef.current;
    setNodesCache(nodes, edges);
    return () => {
      nodesCacheRef.clear();
    };
  }, []);

  useEffect(() => {
    const removeListeners = [manager.onNodeUpdate(() => setNewStoryboard())];
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
    };
  }, [manager, setNewStoryboard]);

  useEffect(() => {
    setNewStoryboard();
  }, [setNewStoryboard]);

  const handleWorkerMessage = useCallback(
    (e: WorkerEventMap["message"]): void => {
      const { action, data, newData } = e.data;
      const nodesCache = nodesCahceRef.current;
      switch (action) {
        case "insert":
          if (nodesCache.has(data.nodeData.instanceId)) {
            const cacheItem = nodesCache.get(data.nodeData.instanceId);
            const newCahceData = {
              ...cacheItem,
              instanceId: newData.instanceId,
              id: newData.id,
            };
            nodesCache.delete(data.nodeData.instanceId);
            nodesCache.set(newData.instanceId, newCahceData);
            manager.updateNode(data.nodeData.instanceId, newCahceData);
          }
          break;
      }
    },
    []
  );

  useImperativeHandle(ref, () => ({
    manager,
    getInstanceDetail,
    cacheAction,
  }));

  useEffect(() => {
    worker.postMessage({
      action: "init",
      data: {
        appId,
        projectId,
        basePath,
      },
    } as WorkbenchBackendActionForInit);
    worker.addEventListener("message", handleWorkerMessage);
    return () => {
      worker.removeEventListener("message", handleWorkerMessage);
      worker.terminate();
    };
  }, [worker, basePath, handleWorkerMessage, appId, projectId]);

  return null;
}

export const WorkbenchBackend = forwardRef(LegacyWorkbenchBackend);
