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
        return nodeCache.get(data.nodeData.instanceId)?.id;
      case "move":
        return data.nodeInstanceId
          ? nodeCache.get(data.nodeInstanceId)?.id
          : data.nodeIds.join(",");
      case "update":
      case "delete":
        return nodeCache.get(data.instanceId)?.id;
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
}
