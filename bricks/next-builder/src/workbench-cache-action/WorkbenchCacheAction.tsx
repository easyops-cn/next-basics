import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { getHistory } from "@next-core/brick-kit";
import {
  useBuilderData,
  useBuilderDataManager,
  type BuilderDataManager,
  type BuilderRuntimeNode,
  type BuilderRuntimeEdge,
} from "@next-core/editor-bricks-helper";
import {
  buildBricks,
  buildRoutes,
} from "../shared/storyboard/buildStoryboardV2";
import { omit, uniqueId } from "lodash";
import type {
  BrickConf,
  BuilderBrickNode,
  BuilderRouteNode,
  RouteConf,
  CustomTemplate,
} from "@next-core/brick-types";
import type {
  WorkbenchBackendActionForInsertDetail,
  WorkbenchBackendCacheAction,
  UpdateStoryboardType,
  PreviewSettings,
  BackendMessage,
  WorkbenchBackendActionForInsertSnippet,
  WorkbenchBackendActionForUpdateDetail,
  WorkbenchBackendActionForDeleteDetail,
} from "@next-types/preview";
import WorkbenchBackend, {
  QueueItem,
} from "../shared/workbench/WorkbenchBackend";
import getGraphTreeByBuilderData from "../utils/getGraphTreeByBuilderData";
import { Button, Modal, Popover, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { pipes } from "@next-core/pipes";
import styles from "./WorkbenchCacheAction.module.css";
import { CacheActionList } from "./CacheActionList";
import { WorkbenchBackendActionForMoveDetail } from "../../../../types/preview/index";

export interface WorkbenchCacheActionRef {
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

export interface WorkbenchCacheActionProps {
  appId: string;
  projectId: string;
  objectId: string;
  rootNode: BuilderRuntimeNode;
  onStoryboardUpdate: ({
    storyboard,
    updateStoryboardType,
    settings,
  }: StoryboardUpdateParams) => void;
  onRootNodeUpdate: (node: BuilderRuntimeNode) => void;
  onGraphDataUpdate: (graphData: pipes.GraphData) => void;
}

function LegacyWorkbenchCacheAction(
  {
    appId,
    projectId,
    objectId,
    rootNode,
    onStoryboardUpdate,
    onRootNodeUpdate,
    onGraphDataUpdate,
  }: WorkbenchCacheActionProps,
  ref: React.Ref<WorkbenchCacheActionRef>
): React.ReactElement {
  const { rootId, nodes, edges } = useBuilderData();
  const history = getHistory();
  const [error, setError] = useState(false);
  const [showCaheActionList, setShowCacheActionList] = useState<boolean>(false);
  const [cacheActionList, setCacheActionList] = useState<QueueItem[]>([]);
  const manager = useBuilderDataManager();
  const backendInstance = WorkbenchBackend.getInstance({
    appId,
    projectId,
    rootNode,
    objectId,
  });
  const nodesCacheRef = useRef<Map<string, BuilderRuntimeNode>>(new Map());

  const setNodesCache = (
    nodes: BuilderRuntimeNode[],
    edges: BuilderRuntimeEdge[]
  ): void => {
    nodes.forEach((node) => {
      const nodeParentUid = edges.find(
        (item) => item.child === node.$$uid
      )?.parent;
      const parentNode = nodes.find((item) => item.$$uid === nodeParentUid);
      nodesCacheRef.current.set(node.instanceId, {
        ...node,
        mountPoint: edges.find((item) => item.child === node.$$uid)?.mountPoint,
        parent: [parentNode],
      });
    });
  };

  const setNewStoryboard = useCallback(
    (
      rootId: number,
      nodes: BuilderRuntimeNode[],
      edges: BuilderRuntimeEdge[]
    ): void => {
      let storyboard: UpdateStoryboard;
      let settings: unknown;
      const graphTree = getGraphTreeByBuilderData({
        rootId,
        nodes: nodes.filter((item) => !item.$$isMock && !item.$$isDelete),
        edges,
      });
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
    },
    [onStoryboardUpdate, rootNode]
  );

  const getInstanceDetail = useCallback(
    (instanceId: string): BuilderRuntimeNode => {
      if (nodesCacheRef.current.size === 0) {
        setNodesCache(nodes, edges);
      }
      return nodesCacheRef.current.get(instanceId);
    },
    [nodes, edges]
  );

  const handleAddBrick = (
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
      parent: [nodes.find((node) => node.instanceId === data.parent)],
      portal: data.portal,
      bg: data.bg,
      type: data.type,
    };
    if (data.dragOverInstanceId) {
      manager.workbenchNodeAdd(data);
    } else {
      const parentUid = [...nodesCacheRef.current.values()].find(
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
      });
    }
    nodesCacheRef.current.set(data.nodeData.instanceId, data.nodeData);
  };

  const handleUpdateBrick = (
    data: WorkbenchBackendActionForUpdateDetail,
    nodesCahce: Map<string, BuilderRuntimeNode>
  ): void => {
    const { instanceId, property } = data;
    const cacheProperty = nodesCahce.get(instanceId);
    const mergeData = Object.assign(cacheProperty, property);
    data.mtime = mergeData.mtime;
    nodesCahce.set(instanceId, mergeData);
    // 如果缓存的instanceId更新, 则需要更新两份缓存数据
    if (!cacheProperty.instanceId.startsWith("mock")) {
      nodesCahce.set(cacheProperty.instanceId, {
        ...mergeData,
        $$isMock: false,
      });
    }
    if (instanceId === rootNode.instanceId) {
      onRootNodeUpdate(mergeData);
    }
    const updateNode = omit(
      {
        ...mergeData,
        ...(property.alias
          ? {
              alias:
                property.alias ||
                cacheProperty.alias ||
                (mergeData.brick as string).split(".").pop(),
            }
          : {}),
      },
      ["$$isMock"]
    ) as BuilderRuntimeNode;
    manager.updateNode(mergeData.instanceId, updateNode);
  };

  const handleDeleteBrick = (
    data: WorkbenchBackendActionForDeleteDetail,
    nodesCahce: Map<string, BuilderRuntimeNode>
  ): void => {
    const deleteItem = nodesCahce.get(data.instanceId);
    nodesCahce.set(data.instanceId, {
      ...deleteItem,
      $$isDelete: true,
    });
  };

  const handleMoveBrick = (
    data: WorkbenchBackendActionForMoveDetail,
    nodesCahce: Map<string, BuilderRuntimeNode>
  ): void => {
    const cache = nodesCahce.get(data.nodeInstanceId);
    data.mtime = cache.mtime as string;
  };

  const handleAddSnippet = (
    detail: WorkbenchBackendActionForInsertSnippet
  ): void => {
    const { data } = detail;
    const snippetData = manager.workbenchNodeAdd(data, false);
    if (snippetData) {
      data.snippetData = snippetData;
    }
  };

  const updateCacheActionList = useCallback(
    (
      detail: WorkbenchBackendCacheAction,
      state: "resolve" | "reject"
    ): void => {
      const newList = cacheActionList.map((item) => {
        if (item.uid === detail.uid) {
          item.state = state;
        }
        return item;
      });
      setCacheActionList(newList);
    },
    [cacheActionList]
  );

  const cacheAction = (detail: WorkbenchBackendCacheAction): any => {
    const { action, data } = detail;
    const nodesCache = nodesCacheRef.current;
    switch (action) {
      case "get":
        return {
          action,
          ...getInstanceDetail(data.instanceId),
        };
      case "insert":
        handleAddBrick(data);
        break;
      case "insert.snippet":
        handleAddSnippet(detail);
        break;
      case "copy.data":
      case "update":
        handleUpdateBrick(data, nodesCache);
        break;
      case "delete":
        handleDeleteBrick(data, nodesCache);
        break;
      case "move":
        handleMoveBrick(data, nodesCache);
        break;
      case "cut.brick":
      case "copy.brick":
        break;
    }
    detail.uid = uniqueId("cache-action");
    detail.state = "pending";
    setCacheActionList([...cacheActionList, detail] as QueueItem[]);
    backendInstance.push(detail as QueueItem);
  };

  const handleBackendMessage = useCallback(
    (topic: string, detail: BackendMessage): void => {
      const nodesCache = nodesCacheRef.current;
      if (topic === "message") {
        const { action, data } = detail;
        switch (action) {
          case "insert":
            if (detail.data) {
              const { data, newData } = detail;
              if (nodesCache.has(data.nodeData.instanceId)) {
                const cacheItem = nodesCache.get(data.nodeData.instanceId);
                const newCahceData = {
                  ...cacheItem,
                  instanceId: newData.instanceId,
                  id: newData.id,
                };
                nodesCache.set(data.nodeData.instanceId, {
                  ...newCahceData,
                  $$isMock: true,
                });
                nodesCache.set(newData.instanceId, newCahceData);
                manager.updateNode(data.nodeData.instanceId, newCahceData);
              }
            }
            break;
          case "instance-success":
            updateCacheActionList(data, "resolve");
            break;
          case "instance-fail":
            Modal.error({
              title: "实例更新失败",
            });
            updateCacheActionList(data, "reject");
            break;
          case "update-graph-data":
            onGraphDataUpdate(data.graphData);
            break;
          case "build-fail":
            Modal.error({
              title: "build & push 失败",
            });
            break;
          case "error":
            Modal.error({
              title: data.error,
            });
            setCacheActionList(
              cacheActionList.map((item) => {
                if (item.state === "pending") {
                  return {
                    ...item,
                    state: "reject",
                  };
                }
                return item;
              })
            );
            setError(true);
            break;
        }
      }
    },
    [cacheActionList, manager, onGraphDataUpdate, updateCacheActionList]
  );

  const handleBeforePageLeave = useCallback(
    (e: BeforeUnloadEvent): void => {
      const isPeddingList = cacheActionList.filter(
        (item) => item.state === "pending"
      );
      if (isPeddingList.length) {
        e.preventDefault();
        e.returnValue = "";
      } else {
        delete e.returnValue;
      }
    },
    [cacheActionList]
  );

  const renderCacheActionList = useMemo(() => {
    const nodeCache = nodesCacheRef.current;
    return (
      <CacheActionList
        cacheActionList={cacheActionList}
        nodeCache={nodeCache}
      />
    );
  }, [cacheActionList]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforePageLeave);
    const removeListeners = [
      manager.onNodeUpdate((e) => {
        const { rootId, nodes, edges } = e.detail;
        setNewStoryboard(rootId, nodes, edges);
      }),
    ];

    return () => {
      for (const fn of removeListeners) {
        fn();
      }
      window.removeEventListener("beforeunload", handleBeforePageLeave);
    };
  }, [handleBeforePageLeave, history, manager, setNewStoryboard]);

  useEffect(() => {
    setNodesCache(nodes, edges);
  }, [edges, nodes]);

  useEffect(() => {
    setNewStoryboard(rootId, [...nodesCacheRef.current.values()], edges);
  }, [rootId, setNewStoryboard]);

  useImperativeHandle(ref, () => ({
    manager,
    getInstanceDetail,
    cacheAction,
  }));

  useEffect(() => {
    const onMessage = backendInstance.subscribe(
      "message",
      handleBackendMessage
    );
    return () => {
      backendInstance.unsubscribe(onMessage);
    };
  }, [backendInstance, handleBackendMessage]);

  return (
    <div className={styles.cacheActionWrapper}>
      <Popover
        title="变更列表"
        content={renderCacheActionList}
        visible={showCaheActionList}
        onVisibleChange={setShowCacheActionList}
        overlayClassName={styles.cacheActionListPopover}
        placement="bottomRight"
        trigger="click"
      >
        <Tooltip title="变更列表">
          <Button
            shape="circle"
            icon={
              <GeneralIcon
                icon={{
                  icon: "unordered-list",
                  lib: "antd",
                  theme: "outlined",
                  color: "var(--antd-btn-default-color)",
                }}
              />
            }
          />
        </Tooltip>
      </Popover>
      {cacheActionList.filter((item) => item.state === "pending").length ? (
        <span
          className={styles.tips}
          style={{
            backgroundColor: error ? "#c52d2d" : "#6c6c6c",
          }}
        >
          {cacheActionList.filter((item) => item.state === "pending").length}
        </span>
      ) : null}
    </div>
  );
}

export const WorkbenchCacheAction = forwardRef(LegacyWorkbenchCacheAction);
