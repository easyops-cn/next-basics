/* istanbul ignore file temporary */
import React, {
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useContext,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GeneralIcon } from "@next-libs/basic-components";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
import { TreeList } from "./components/TreeList/TreeList";
import { initStepMap, getCheckStepList } from "./CheckManagement";
import styles from "./StepTree.module.css";
import { StepCheckMap, StepTreeAction, ActionClickDetail } from "./interfaces";
import { StepTreeNodeData, StepItem } from "../interfaces";
import { WorkbenchTreeContext, TreeListContext } from "./constants";

export interface StepTreeProps {
  placeholder?: string;
  searchPlaceholder?: string;
  nodes: StepTreeNodeData[];
  noSearch?: boolean;
  multipleSelectMode?: boolean;
  selectedSteps?: StepItem[];
  activeBarActions?: StepTreeAction[];
  onActiveBarAction?: (detail: ActionClickDetail) => void;
  activeBarUseBrick?: { useBrick: UseBrickConf };
  activeBarStyle?: React.CSSProperties;
}

export function StepTree({
  placeholder,
  searchPlaceholder,
  nodes,
  noSearch,
  multipleSelectMode,
  selectedSteps,
  activeBarActions,
  onActiveBarAction,
  activeBarUseBrick,
  activeBarStyle,
}: StepTreeProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [q, setQ] = useState<string>(null);
  const [checkedMap, setCheckedMap] = useState<StepCheckMap>(
    initStepMap(selectedSteps)
  );
  const { matchNode } = useContext(WorkbenchTreeContext);

  useEffect(() => {
    const map = initStepMap(selectedSteps);
    setCheckedMap(map);
  }, [selectedSteps]);

  const filteredNodes = useMemo(() => {
    const trimmedLowerQ = q?.trim().toLowerCase();
    if (noSearch || !trimmedLowerQ || !nodes) {
      return nodes;
    }

    const walk = (node: StepTreeNodeData): boolean => {
      node.matchedSelf = matchNode(node, trimmedLowerQ);
      const hasMatchedChildren = node.children?.map(walk).includes(true);
      node.matched = node.matchedSelf || hasMatchedChildren;
      return node.matched;
    };

    nodes.forEach(walk);
    return nodes.slice();
  }, [q, noSearch, nodes, matchNode]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQ(event.target.value);
    },
    []
  );

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {nodes?.length ? (
        <div>
          {!noSearch && (
            <div className={styles.searchBox}>
              <Input
                value={q}
                onChange={handleSearchChange}
                size="small"
                placeholder={searchPlaceholder}
                prefix={<SearchOutlined />}
                allowClear
              />
            </div>
          )}
          {multipleSelectMode && (
            <div className={styles.activeBar} style={activeBarStyle}>
              <div>
                {activeBarUseBrick?.useBrick && (
                  <BrickAsComponent
                    useBrick={activeBarUseBrick.useBrick}
                    data={nodes}
                  />
                )}
              </div>
              <div>
                {activeBarActions?.map((item, index) => (
                  <span
                    key={index}
                    className={styles.icon}
                    title={item.title}
                    onClick={() =>
                      onActiveBarAction?.({
                        action: item.action,
                        data: getCheckStepList(checkedMap),
                      })
                    }
                  >
                    <GeneralIcon icon={item.icon} />
                  </span>
                ))}
              </div>
            </div>
          )}
          <TreeListContext.Provider
            value={{ q, multipleSelectMode, checkedMap, setCheckedMap }}
          >
            <div>
              <TreeList nodes={filteredNodes} level={1} />
            </div>
          </TreeListContext.Provider>
        </div>
      ) : (
        <div className={styles.placeholder}>{placeholder}</div>
      )}
    </div>
  );
}
