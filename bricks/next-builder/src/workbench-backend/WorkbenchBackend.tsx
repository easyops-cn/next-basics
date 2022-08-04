import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { getHistory, getRuntime } from "@next-core/brick-kit";
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
  WorkbenchBackendActionForInsertDetail,
  WorkbenchBackendCacheAction,
  UpdateStoryboardType,
  PreviewSettings,
  BackendMessage,
  LockState,
} from "@next-types/preview";
import WorkerbenchBackend, {
  QueueItem,
} from "../shared/workbench/WorkbenchBackend";
import { Button, message, Modal, Popover, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { pipes } from "@next-core/pipes";
import styles from "./WorkbenchBackend.module.css";
import classnames from "classnames";

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
    objectId,
    rootNode,
    onStoryboardUpdate,
    onRootNodeUpdate,
    onGraphDataUpdate,
  }: WorkbenchBackendProps,
  ref: React.Ref<WorkbenchBackendRef>
): React.ReactElement {
  const { rootId, nodes, edges } = useBuilderData();
  const history = getHistory();
  const [lockState, setLockState] = useState<LockState>({
    lock: false,
  });
  const [error, setError] = useState(false);
  const [showCaheActionList, setShowCacheActionList] = useState<boolean>(false);
  const [cacheActionList, setCacheActionList] = useState<QueueItem[]>([]);
  const manager = useBuilderDataManager();
  const basePath = getRuntime().getBasePath();
  const backendInstance = WorkerbenchBackend.getInstance({
    appId,
    projectId,
    basePath,
    rootNode,
    objectId,
  });
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
    const graphTree = getGraphTreeByBuilderData(
      rootId,
      [...nodesCahceRef.current.values()].filter(
        (item) => !item.$$isMock && !item.$$isDelete
      ),
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
  }, [edges, onStoryboardUpdate, rootId, rootNode]);

  const getInstanceDetail = useCallback(
    (instanceId: string): BuilderRuntimeNode => {
      if (nodesCahceRef.current.size === 0) {
        setNodesCache(nodes, edges);
      }
      return nodesCahceRef.current.get(instanceId);
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
      const parentUid = [...nodesCahceRef.current.values()].find(
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
    nodesCahceRef.current.set(data.nodeData.instanceId, data.nodeData);
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

  const handleUnlock = (): void => {
    Modal.confirm({
      title: "确认解锁",
      content: (
        <>
          <span>
            当前页面由用户 {lockState.modifier} 于 {lockState.mtime} 进行锁定;
          </span>
          <span>请确认是否进行解锁</span>
        </>
      ),
      onOk: async () => {
        await backendInstance.updateBrickTree();
        await backendInstance.setLock(false);
      },
    });
  };

  const cacheAction = (detail: WorkbenchBackendCacheAction): any => {
    const { action, data } = detail;
    if (action !== "get" && lockState.lock) return;
    const nodesCahce = nodesCahceRef.current;
    switch (action) {
      case "get":
        return {
          action,
          ...getInstanceDetail(data.instanceId),
        };
      case "insert":
        handleAddBrick(data);
        break;
      case "update":
        if (data) {
          const { instanceId, property } = data;
          const cacheProperty = nodesCahce.get(instanceId);
          const mergeData = Object.assign(cacheProperty, property);
          manager.updateNode(instanceId, {
            ...mergeData,
            ...(property.alias
              ? {
                  alias:
                    property.alias ||
                    cacheProperty.alias ||
                    (mergeData.brick as string).split(".").pop(),
                }
              : {}),
          });
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
        }
        setNodesCache([...nodesCahce.values()], edges);
        setNewStoryboard();
        break;
      case "move":
        break;
      case "delete":
        if (data.instanceId) {
          const deleteItem = nodesCahce.get(data.instanceId);
          nodesCahce.set(data.instanceId, {
            ...deleteItem,
            $$isDelete: true,
          });
        }
        break;
    }
    detail.uid = uniqueId("cache-action");
    detail.state = lockState.lock ? "reject" : "pending";
    setCacheActionList([...cacheActionList, detail] as QueueItem[]);
    backendInstance.push(detail as QueueItem);
  };

  const handleBackendMessage = useCallback(
    (topic: string, detail: BackendMessage): void => {
      const nodesCache = nodesCahceRef.current;
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
            message.error("实例更新失败");
            updateCacheActionList(data, "reject");
            break;
          case "lock":
            setLockState(data);
            if (data?.lock) {
              message.error("当前页面已锁定, 不允许修改");
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
            }
            break;
          case "update-graph-data":
            onGraphDataUpdate(data.graphData);
            break;
          case "build-fail":
            message.error("build & push 失败");
            break;
          case "error":
            message.error(data.error);
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
    const nodeCahce = nodesCahceRef.current;
    const ActionContants = {
      insert: "新增",
      update: "更新",
      move: "移动",
      delete: "删除",
    };

    const stateConstants = {
      pending: "处理中",
      resolve: "完成",
      reject: "失败",
    };

    const getBrickId = (item: QueueItem): string => {
      const { action, data } = item;
      switch (action) {
        case "insert":
          return nodeCahce.get(data.nodeData.instanceId)?.id;
        case "move":
          return data.nodeInstanceId
            ? nodeCahce.get(data.nodeInstanceId)?.id
            : data.nodeIds.join(",");
        case "update":
        case "delete":
          return nodeCahce.get(data.instanceId)?.id;
      }
    };

    const itemContent = (item: QueueItem): string =>
      `${ActionContants[item.action]}实例: [${getBrickId(item)}]`;

    return (
      <div className={styles.cacheActionListWrapper}>
        {cacheActionList.length
          ? [...cacheActionList].reverse().map((item) => {
              return (
                <div key={item.uid} className={styles.cacheActionItem}>
                  <span title={itemContent(item)}>{itemContent(item)}</span>
                  <span className={classnames(styles[item.state])}>
                    {stateConstants[item.state]}
                  </span>
                </div>
              );
            })
          : "暂无变更"}
      </div>
    );
  }, [cacheActionList]);

  useEffect(() => {
    setNodesCache(nodes, edges);
  }, [edges, nodes]);

  useEffect(() => {
    const removeListeners = [manager.onNodeUpdate(setNewStoryboard)];
    window.addEventListener("beforeunload", handleBeforePageLeave);
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
      window.removeEventListener("beforeunload", handleBeforePageLeave);
    };
  }, [handleBeforePageLeave, history, manager, setNewStoryboard]);

  useEffect(() => {
    setNewStoryboard();
  }, [setNewStoryboard]);

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
      {lockState.lock ? (
        <Tooltip title="解锁">
          <Button
            shape="circle"
            icon={
              <GeneralIcon
                icon={{
                  color: "var(--tag-red-color)",
                  icon: "lock",
                  lib: "fa",
                  prefix: "fas",
                }}
              />
            }
            onClick={handleUnlock}
          />
        </Tooltip>
      ) : (
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
      )}
      {cacheActionList.filter((item) => item.state === "pending").length ? (
        <span
          className={styles.tips}
          style={{
            backgroundColor: lockState.lock || error ? "#c52d2d" : "#6c6c6c",
          }}
        >
          {cacheActionList.filter((item) => item.state === "pending").length}
        </span>
      ) : null}
    </div>
  );
}

export const WorkbenchBackend = forwardRef(LegacyWorkbenchBackend);
