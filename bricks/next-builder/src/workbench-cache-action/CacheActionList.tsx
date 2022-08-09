import React from "react";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import styles from "./WorkbenchCacheAction.module.css";
import { QueueItem } from "../shared/workbench/WorkbenchBackend";
import classnames from "classnames";

interface CacheActionListProps {
  cacheActionList: QueueItem[];
  nodeCache: Map<string, BuilderRuntimeNode>;
}

export function CacheActionList({
  cacheActionList,
  nodeCache,
}: CacheActionListProps): React.ReactElement {
  const ActionContants = {
    insert: "新增实例",
    update: "更新实例",
    move: "移动实例",
    delete: "删除实例",
    "copy.data": "粘贴数据",
    "copy.brick": "粘贴构件",
    "cut.brick": "粘贴构件",
    "insert.snippet": "新增片段",
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
        return nodeCache.get(data.nodeData.instanceId)?.id;
      case "move":
        return data.nodeInstanceId
          ? nodeCache.get(data.nodeInstanceId)?.id
          : data.nodeIds.join(",");
      case "update":
      case "delete":
        return nodeCache.get(data.instanceId)?.id;
      case "cut.brick":
      case "copy.brick":
        return item.sourceId;
      case "copy.data":
        return item.sourceName;
      case "insert.snippet":
        return item.data.brick;
    }
  };

  const itemContent = (item: QueueItem): string =>
    `${ActionContants[item.action]}: [${getBrickId(item)}]`;

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
}
