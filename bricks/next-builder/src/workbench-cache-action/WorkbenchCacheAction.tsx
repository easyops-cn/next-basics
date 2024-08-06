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
  EventDetailOfSnippetApplyStored,
  getUniqueNodeId,
  type BuilderDataManager,
  type BuilderRuntimeNode,
  type BuilderRuntimeEdge,
} from "@next-core/editor-bricks-helper";
import {
  buildBricks,
  buildRoutes,
} from "../shared/storyboard/buildStoryboardV2";
import { omit, uniqueId, pick, compact } from "lodash";
import type {
  BrickConf,
  BuilderBrickNode,
  BuilderRouteNode,
  RouteConf,
  CustomTemplate,
  Storyboard,
  ContextConf,
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
  WorkbenchBackendActionForMoveDetail,
  WorkbenchBackendActionForBatchOpDetail,
  SnippetRuntimeContext,
} from "@next-types/preview";
import WorkbenchBackend, {
  QueueItem,
} from "../shared/workbench/WorkbenchBackend";
import {
  getGraphTreeByBuilderData,
  normalizeBuilderData,
} from "../utils/getGraphTreeByBuilderData";
import { Button, Modal, Popover, Tooltip, Input } from "antd";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { pipes } from "@next-core/pipes";
import styles from "./WorkbenchCacheAction.module.css";
import { CacheActionList } from "./CacheActionList";
import { JsonStorage } from "@next-libs/storage";
import { normalizeBuilderNode } from "@next-core/brick-utils";
import walk from "../utils/walk";
import { processWithParamsSnippet } from "./processDynamicSnippet";
import classNames from "classnames";
import commonBricks from "@next-shared/common-bricks/common-bricks.json";

export interface WorkbenchCacheActionRef {
  manager: BuilderDataManager;
  getInstanceDetail: (instanceId: string) => BuilderRuntimeNode;
  cacheAction: (detail: WorkbenchBackendCacheAction) => any;
  updateStoryboard: () => void;
  build: () => void;
  showMessage: (conf: MessageConf) => void;
}

export interface StoryboardUpdateParams {
  storyboard: UpdateStoryboard;
  updateStoryboardType: UpdateStoryboardType;
  settings?: PreviewSettings;
}

export interface BuildAndPushParams {
  state: BuildAndPushState;
  storyboard: Storyboard;
  isNeedRefresh?: boolean;
}

type UpdateStoryboard =
  | RouteConf
  | CustomTemplate
  | {
      snippetId: string;
      bricks: BrickConf[];
    };

export type BuildAndPushState = "building" | "success" | "fail";

export type StoryboardType = "micro-app" | "theme-template" | "form";
export interface WorkbenchCacheActionProps {
  appId: string;
  projectId: string;
  storyboardType: StoryboardType;
  objectId: string;
  rootNode: BuilderRuntimeNode;
  onlyShowActionCount?: boolean;
  onStoryboardUpdate: (params: StoryboardUpdateParams) => void;
  onRootNodeUpdate: (node: BuilderRuntimeNode) => void;
  onGraphDataUpdate: (graphData: pipes.GraphData) => void;
  onExecuteSuccess: (res: { res: unknown; op: string }) => void;
  onSnippetSuccess: (data: EventDetailOfSnippetApplyStored) => void;
  onBuildAndPush?: (params: BuildAndPushParams) => void;
}

export interface MessageConf {
  content?: string;
  duration?: number;
  show?: boolean;
}

const DELAY_BUILD_TIME = 30;
const DELAY_BUILD_TIME_KEY = "VISUAL_BUILDER_DELAY_BUILD_TIME";

function LegacyWorkbenchCacheAction(
  {
    appId,
    projectId,
    storyboardType,
    objectId,
    rootNode,
    onlyShowActionCount,
    onStoryboardUpdate,
    onRootNodeUpdate,
    onGraphDataUpdate,
    onExecuteSuccess,
    onSnippetSuccess,
    onBuildAndPush,
  }: WorkbenchCacheActionProps,
  ref: React.Ref<WorkbenchCacheActionRef>
): React.ReactElement {
  const manager = useBuilderDataManager();
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const { rootId, nodes, edges } = useBuilderData();
  const history = getHistory();
  const [delayBuildTime, setDelayBuildTime] = useState<string>(
    storage.getItem(DELAY_BUILD_TIME_KEY) ?? String(DELAY_BUILD_TIME)
  );
  const [buildState, setBuildState] = useState<BuildAndPushState>();
  const [showCaheActionList, setShowCacheActionList] = useState<boolean>(false);
  const [cacheActionList, setCacheActionList] = useState<QueueItem[]>([]);
  const nodesCacheRef = useRef<Map<string, BuilderRuntimeNode>>(new Map());
  const [messageConf, setMessageConf] = useState<MessageConf>({});

  const backendInstance = WorkbenchBackend.getInstance({
    appId,
    projectId,
    rootNode,
    objectId,
    delayBuildTime: Number(delayBuildTime),
    storyboardType,
  });

  const setNodesCache = (
    nodes: BuilderRuntimeNode[],
    edges: BuilderRuntimeEdge[]
  ): void => {
    const brickList = new Set<string>();
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

      if ((node.brick as string)?.includes(".")) {
        brickList.add(
          `${(node.brick as string).split(".")[0]}-${
            node.type === "template" ? "NT" : "NB"
          }`
        );
      } else {
        const pkg = Object.entries(commonBricks).find((pkg) =>
          pkg[1].includes(node.brick as string)
        );
        if (pkg) {
          brickList.add(`${pkg[0]}-NB`);
        }
      }
    });
    if (storyboardType !== "form") {
      backendInstance.setUsedBrickPackage([...brickList.values()]);
    }
  };

  const setNewStoryboard = useCallback(
    (
      rootId: number,
      nodes: BuilderRuntimeNode[],
      edges: BuilderRuntimeEdge[]
    ): void => {
      let storyboard: UpdateStoryboard;

      const graphTree = getGraphTreeByBuilderData({
        rootId,
        nodes: nodes.filter((item) => !item.$$isMock),
        edges,
      });
      let updateStoryboardType: UpdateStoryboardType;
      const rootNode = nodes.find((item) => item.$$uid === rootId);
      if (!rootNode) return;
      const settings =
        rootNode.previewSettings && Array.isArray(rootNode.previewSettings)
          ? rootNode.previewSettings.find((item) => item.active) ??
            rootNode.previewSettings[0]
          : rootNode.previewSettings;

      if (graphTree) {
        if (rootNode.type === "custom-template") {
          updateStoryboardType = "template";

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
            params: rootNode.snippetParams,
            data: rootNode.snippetData,
            context: rootNode.context,
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
    [onStoryboardUpdate]
  );

  const build = (): void => {
    backendInstance.buildAndPush(true);
  };

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
    const nodeUid = getUniqueNodeId();
    const nodeInstanceId = `mock_instanceId_${nodeUid}`;
    const nodeId = `mock_id_${nodeUid}`;
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
    data.nodeData.$$normalized = normalizeBuilderNode(
      normalizeBuilderData(data.nodeData)
    );
    if (data.dragOverInstanceId) {
      manager.workbenchNodeAdd(data);
    } else {
      const parentUid = [...nodesCacheRef.current.values()].find(
        (item) => item.instanceId === data.parent
      ).$$uid;
      const nodeUids = edges
        .filter((item) => item.parent === parentUid)
        .sort((a, b) => a.sort - b.sort)
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
    const providerList = new Set<string>();
    walk(
      {
        ...property,
        properties: data.property.properties
          ? JSON.parse(data.property.properties)
          : "",
        events: data.property.events ? JSON.parse(data.property.events) : "",
        lifeCycle: data.property.lifeCycle
          ? JSON.parse(data.property.lifeCycle)
          : "",
      },
      (key, value) => {
        if (
          key === "useProvider" &&
          typeof value === "string" &&
          !value.includes("@")
        ) {
          providerList.add(`${(value as string).split(".")[0]}-NB`);
        }
      }
    );
    backendInstance.setUsedBrickPackage([...providerList.values()]);
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
    updateNode.$$normalized = normalizeBuilderNode(
      normalizeBuilderData(updateNode)
    );
    manager.updateNode(mergeData.instanceId, updateNode);
  };

  const handleUpdateVisualForm = (
    data: WorkbenchBackendActionForUpdateDetail,
    nodesCache: Map<string, BuilderRuntimeNode>
  ): void => {
    const pickProperty = [
      "brick",
      "alias",
      "mountPoint",
      "ref",
      "if",
      "context",
      "permissionsPreCheck",
      "bg",
      "portal",
      "properties",
      "params",
      "events",
      "lifeCycle",
    ];
    const formChildren = nodesCache.get(data.instanceId)?.children ?? [];
    const rules: [] =
      JSON.parse(data.property.properties ? data.property.properties : "{}")
        .easyops_form_hidden_rules ?? [];

    // 更新form表单子项的notRender属性, 先清空原规则所控制的notRender表达式, 根据规则重新赋值, 最后更新缓存与实例
    formChildren.forEach((child) => {
      let isChange = false;
      const childProperties = JSON.parse(
        child.properties ? child.properties : "{}"
      );

      // 清空原notRender表达式
      if (
        typeof childProperties?.notRender === "string" &&
        childProperties?.notRender?.includes("easyops_form_values")
      ) {
        delete childProperties.notRender;
        isChange = true;
      }

      // 查找是否有新的显隐规则
      const rule = rules.find(
        (item) =>
          (item.actions[0]?.target?.match(/\((.+)\)/g) ?? [])[0]?.slice(
            1,
            -1
          ) === childProperties?.name
      );

      if (rule) {
        childProperties["notRender"] = rule.conditionsExpression;
        isChange = true;
      }

      if (isChange) {
        child.properties = JSON.stringify(childProperties);

        // 更新缓存
        const updateData = {
          instanceId: child.instanceId,
          mtime: child.mtime as string,
          objectId: "STORYBOARD_BRICK",
          property: pick(child, pickProperty),
        };
        handleUpdateBrick(updateData, nodesCache);

        // 更新实例
        const updateDetail: WorkbenchBackendCacheAction = {
          data: updateData,
          action: "update.visualForm",
        };
        updateDetail.uid = uniqueId("cache-action");
        updateDetail.state = "pending";
        setCacheActionList([...cacheActionList, updateData] as QueueItem[]);
        backendInstance.push(updateDetail as QueueItem);
      }
    });
  };

  const handleDeleteBrick = (
    data: WorkbenchBackendActionForDeleteDetail,
    nodesCahce: Map<string, BuilderRuntimeNode>
  ): void => {
    const deleteItem = nodesCahce.get(data.instanceId);
    manager.nodeDelete({
      $$uid: deleteItem.$$uid,
    } as BuilderRuntimeNode);
  };

  const handleMoveBrick = (
    data: WorkbenchBackendActionForMoveDetail,
    nodesCahce: Map<string, BuilderRuntimeNode>
  ): void => {
    const nodeCacheArr = [...nodesCahce.values()];
    data.nodeInstanceIds = data.nodeIds.map((id) => {
      const node = nodeCacheArr.find((item) => item.id === id);
      if (node) {
        return node.instanceId;
      }
    });
  };

  const handleContextUpdate = (
    dataList: ContextConf[],
    snippetContext: SnippetRuntimeContext
  ): void => {
    const isTemplate = snippetContext.rootType === "template";
    const finalList = compact(snippetContext.dataList).concat(dataList);

    const updateData: WorkbenchBackendActionForUpdateDetail = isTemplate
      ? {
          objectId: "STORYBOARD_TEMPLATE",
          instanceId: snippetContext.rootInstanceId,
          property: {
            state: JSON.stringify(finalList),
          },
        }
      : {
          objectId: "STORYBOARD_ROUTE",
          instanceId: snippetContext.rootInstanceId,
          property: {
            context: finalList,
          },
        };

    handleUpdateBrick(updateData, nodesCacheRef.current);

    backendInstance.push({
      action: "update",
      data: updateData,
      uid: uniqueId("cache-action"),
      state: "pending",
    } as QueueItem);
  };

  const handleAddSnippet = (
    detail: WorkbenchBackendActionForInsertSnippet
  ): void => {
    const { data } = detail;

    const processedData = processWithParamsSnippet(
      data.nodeData,
      data.snippetContext
    );
    const { data: snippetDataList, ...finalSnippetData } = processedData;

    if (snippetDataList) {
      handleContextUpdate(snippetDataList, data.snippetContext);
    }

    data.nodeData = finalSnippetData;
    const snippetData = manager.workbenchNodeAdd(data, false);
    if (snippetData) {
      data.snippetData = snippetData;
    }
  };

  const handleAddFormItem = (data: any): void => {
    const nodeUid = getUniqueNodeId();
    const nodeInstanceId = uniqueId("mock_instanceId_");
    data.parent = data.nodeData?.parentItemId;
    data.nodeData = {
      ...data.nodeData,
      $$uid: nodeUid,
      id: data.nodeData?.id,
      instanceId: nodeInstanceId,
      brick: data.nodeData?.brick,
      mountPoint: data.nodeData?.mountPoint,
      parent: data.nodeData?.parentItemId,
      type: data.nodeData?.type ?? "brick",
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
        sort: data.nodeData?.sort,
        nodeIds: [],
      });
    }
    nodesCacheRef.current.set(data.nodeData.instanceId, data.nodeData);
  };

  const handleBatchBrick = (
    data: WorkbenchBackendActionForBatchOpDetail,
    nodesCache: Map<string, BuilderRuntimeNode>
  ): void => {
    if (data.insert?.length) {
      data.insert.forEach((item) => handleAddBrick(item));
    }

    if (data.update?.length) {
      data.update.forEach((item) => handleUpdateBrick(item, nodesCache));
    }

    if (data.delete?.length) {
      data.delete.forEach((item) => handleDeleteBrick(item, nodesCache));
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
      case "insert.formItem":
        handleAddFormItem(detail);
        break;
      case "copy.data":
      case "update":
        handleUpdateBrick(data, nodesCache);
        break;
      case "update.visualForm":
        // 更新form brick自身缓存
        handleUpdateBrick(data, nodesCache);
        handleUpdateVisualForm(data, nodesCache);
        break;
      case "delete":
        handleDeleteBrick(data, nodesCache);
        break;
      case "batch.op":
        handleBatchBrick(data, nodesCache);
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
          case "build-start":
            setBuildState("building");
            setCacheActionList(
              cacheActionList.map((item) => {
                if (item.state === "resolve") {
                  item.isBuilding = true;
                }
                return item;
              })
            );
            break;
          case "build-success":
            onBuildAndPush({
              state: "success",
              ...data,
            });
            setBuildState("success");
            if (data) {
              setCacheActionList(
                cacheActionList.filter((item) => !item.isBuilding)
              );
            }
            break;
          case "build-fail":
            setBuildState("fail");
            setCacheActionList(
              cacheActionList.map((item) => {
                if (item.isBuilding) {
                  item.isBuilding = false;
                }
                return item;
              })
            );
            Modal.error({
              ...data,
            });
            break;
          case "snippet-success":
            onSnippetSuccess(data);
            break;
          case "execute-success":
            onExecuteSuccess(data);
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
            break;
        }
      }
    },
    [
      cacheActionList,
      manager,
      onBuildAndPush,
      onGraphDataUpdate,
      updateCacheActionList,
      onExecuteSuccess,
    ]
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

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const time = value === "" ? DELAY_BUILD_TIME : value;
    backendInstance.setDelayBuildTime(Number(time));
    setDelayBuildTime(String(time));
    storage.setItem(DELAY_BUILD_TIME_KEY, time);
  };

  const renderCacheActionList = useMemo(() => {
    const nodeCache = nodesCacheRef.current;
    return (
      <>
        <div className={styles.setBuildTimeWrapper}>
          <span>设置定时自动推送间隔</span>
          <Tooltip title="推送将于推送任务全部执行完后,定时执行">
            <Input
              size="small"
              addonAfter="秒"
              style={{ width: "100px" }}
              value={delayBuildTime}
              onChange={(e) => setDelayBuildTime(e.target.value)}
              onBlur={handleOnBlur}
              type="number"
              min="-1"
            />
          </Tooltip>
        </div>
        {!onlyShowActionCount && (
          <CacheActionList
            cacheActionList={cacheActionList}
            nodeCache={nodeCache}
          />
        )}
      </>
    );
  }, [cacheActionList, delayBuildTime, onlyShowActionCount]);

  const updateStoryboard = useCallback(() => {
    setNewStoryboard(rootId, [...nodesCacheRef.current.values()], edges);
  }, [setNewStoryboard, rootId, edges]);

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
  }, [rootId, setNewStoryboard, edges]);

  const showMessage = (conf: MessageConf): void => {
    setMessageConf(conf);

    setTimeout(() => {
      setMessageConf({
        ...conf,
        show: false,
      });
    }, conf.duration || 3000);
  };

  useImperativeHandle(ref, () => ({
    manager,
    getInstanceDetail,
    cacheAction,
    updateStoryboard,
    build,
    showMessage,
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

  const noRejectActionLength = cacheActionList.filter(
    (item) => item.state !== "reject"
  ).length;

  return (
    <div className={styles.cacheActionWrapper}>
      <Popover
        title={
          onlyShowActionCount
            ? noRejectActionLength
              ? `${noRejectActionLength}个变更待推送`
              : "暂无待推送变更"
            : "待推送变更列表"
        }
        content={renderCacheActionList}
        visible={showCaheActionList}
        onVisibleChange={setShowCacheActionList}
        overlayClassName={styles.cacheActionListPopover}
        placement="bottomRight"
      >
        <Tooltip title="点击手动执行构建并推送">
          <Button
            shape="circle"
            icon={
              buildState === "building" ? <LoadingOutlined /> : <SendOutlined />
            }
            danger={buildState === "fail"}
            disabled={buildState === "building"}
            onClick={build}
          />
        </Tooltip>
      </Popover>
      {noRejectActionLength ? (
        <span
          className={styles.tips}
          style={{
            backgroundColor: "#0071eb",
          }}
        >
          {noRejectActionLength}
        </span>
      ) : null}
      <div
        className={classNames(styles.messageWrapper, {
          [styles.show]: messageConf.show,
        })}
      >
        <span>{messageConf.content}</span>
      </div>
    </div>
  );
}

export const WorkbenchCacheAction = forwardRef(LegacyWorkbenchCacheAction);
