import React, { useState, useRef, useEffect, useMemo } from "react";
import Icon from "@ant-design/icons";
import { Tree, Input, Checkbox, Empty } from "antd";
import { TreeProps, DataNode } from "antd/lib/tree";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import { TreeIcon, BrickTreeNodeProps } from "./index";
import { checkedFilterProps } from "../interfaces/brick-tree";
import {
  uniqueId,
  isEmpty,
  eq,
  lt,
  lte,
  gt,
  gte,
  get,
  difference,
  intersection,
} from "lodash";
import { EventDataNode } from "rc-tree/lib/interface";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import styles from "./index.module.css";
import classNames from "classnames";

export const compareFunMap: Record<string, any> = {
  $eq: eq,
  $lt: lt,
  $lte: lte,
  $gt: gt,
  $gte: gte,
  $ne: (value1: any, value2: any): boolean => !eq(value1, value2),
};

function flat(arr: BrickTreeNodeProps[]): BrickTreeNodeProps[] {
  return [].concat(
    ...arr.map((item: BrickTreeNodeProps) =>
      item.children ? [].concat(item, ...flat(item?.children)) : [item]
    )
  );
}

function isMenuIcon(icon: TreeIcon): icon is MenuIcon {
  return (icon as MenuIcon).lib !== undefined;
}

function getTreeNodes(list: BrickTreeNodeProps[]): DataNode[] {
  return list.map((item) => {
    const { children, icon: _icon, key, ...itemProps } = item;
    let icon: React.ReactNode;

    if (_icon) {
      if (isMenuIcon(_icon)) {
        icon = <GeneralIcon icon={_icon} />;
      } else {
        icon = <Icon component={_icon} />;
      }
    }

    return {
      ...itemProps,
      icon,
      key: key ?? uniqueId("tree-node-"),
      children: children && getTreeNodes(children),
    };
  });
}

function getAllKeys(nodes: DataNode[], keys?: React.Key[]): React.Key[] {
  if (!keys) {
    keys = [];
  }

  nodes.forEach((node) => {
    const children = node.children;

    if (!node.disabled && !node.disableCheckbox && node.checkable !== false) {
      keys.push(node.key);
    }

    if (children?.length) {
      getAllKeys(children, keys);
    }
  });

  return keys;
}

// istanbul ignore next
function getAllCheckedState(
  treeData: DataNode[],
  checkedKeySet: Set<React.Key>
): boolean {
  return treeData
    .filter((v) => !v.disabled)
    .every((node) =>
      checkedKeySet.has(node.key)
        ? true
        : node.children && node.children.filter((v) => !v.disabled).length !== 0
        ? getAllCheckedState(node.children, checkedKeySet)
        : false
    );
}

export interface BrickTreeProps {
  selectedKeys?: React.Key[];
  checkedKeys?: React.Key[];
  expandedKeys?: React.Key[];
  configProps?: Omit<
    TreeProps,
    "selectedKeys" | "checkedKeys" | "expandedKeys"
  >;
  dataSource: BrickTreeNodeProps[];
  searchable?: boolean;
  placeholder?: string;
  searchParent?: boolean;
  checkAllEnabled?: boolean;
  checkedFilterConfig?: checkedFilterProps;
  onSelect?(
    selectedKeys: React.Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ): void;
  onCheck?(
    checkedKeys:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] }
  ): void;
  suffixBrick?: { useBrick: UseBrickConf };
}

export function BrickTree(props: BrickTreeProps): React.ReactElement {
  const {
    selectedKeys: _selectedKeys,
    checkedKeys: _checkedKeys,
    expandedKeys: _expandedKeys,
    configProps = {},
    dataSource = [],
    searchable = false,
    searchParent = false,
    placeholder = "",
    checkAllEnabled,
    checkedFilterConfig: { field, value, operator } = {},
    suffixBrick,
  } = props;
  const [allChecked, setAllChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [filterCheckedKeys, setFilterCheckedKeys] = useState<React.Key[]>();
  const [checkedKeys, setCheckedKeys] = useState<
    React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }
  >();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [searchValue, setSearchValue] = useState<string>();
  const treeContainerRef = useRef<HTMLDivElement>();
  const nodeMatchedRef = useRef<boolean>(false);

  const treeData = useMemo(() => getTreeNodes(dataSource), [dataSource]);
  const filterTreeKeys = useMemo(
    () =>
      flat(dataSource)
        .filter((v) => compareFunMap[operator]?.(value, get(v, field)))
        .map((v) => v.key) || [],
    [dataSource]
  );

  useEffect(() => {
    setSelectedKeys(_selectedKeys);
  }, [_selectedKeys]);
  // istanbul ignore next
  useEffect(() => {
    setCheckedKeys(_checkedKeys);
    setFilterCheckedKeys(difference(_checkedKeys, filterTreeKeys));
    if (Array.isArray(_checkedKeys)) {
      if (
        _checkedKeys.length === 0 ||
        intersection(_checkedKeys, getAllKeys(treeData))?.length === 0
      ) {
        setAllChecked(false);
        setIndeterminate(false);
      } else {
        const checkedKeySet = new Set(_checkedKeys);
        const allChecked = getAllCheckedState(treeData, checkedKeySet);
        setAllChecked(allChecked);
        setIndeterminate(!allChecked);
      }
    }
  }, [_checkedKeys]);
  useEffect(() => {
    setExpandedKeys(_expandedKeys);
  }, [_expandedKeys]);

  let searchValueLength: number;

  if (searchValue) {
    searchValueLength = searchValue.length;
  }

  const getExpandedKeysBySearchValue = (
    nodes: DataNode[],
    searchValue: string,
    expandedKeys: React.Key[]
  ) => {
    let isHit = false;

    nodes.forEach((node) => {
      const length = node.children?.length;
      if (length ? searchParent : true) {
        if (
          typeof node.title === "string" &&
          node.title.includes(searchValue)
        ) {
          isHit = true;
        }
      }

      if (
        length &&
        getExpandedKeysBySearchValue(node.children, searchValue, expandedKeys)
      ) {
        expandedKeys.push(node.key);
        isHit = true;
      }
    });

    return isHit;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchValue(value);
    nodeMatchedRef.current = false;

    if (value) {
      const expandedKeys: React.Key[] = [];

      getExpandedKeysBySearchValue(treeData, value, expandedKeys);
      setExpandedKeys(expandedKeys);
    }
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const checkedKeys = checked ? getAllKeys(treeData) : [];
    let _filterCheckedKeys: React.Key[] = [];
    if (props.checkedFilterConfig) {
      _filterCheckedKeys = difference(checkedKeys, filterTreeKeys);
      setFilterCheckedKeys(_filterCheckedKeys);
    }
    setAllChecked(checked);
    setIndeterminate(false);
    setCheckedKeys(checkedKeys);
    props.onCheck?.(
      props.checkedFilterConfig ? _filterCheckedKeys : checkedKeys
    );
  };

  const onSelect = (
    selectedKeys: React.Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    setSelectedKeys(selectedKeys);
    props.onSelect?.(selectedKeys, info);
  };

  const onCheck = (
    checkedKeys:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] }
  ) => {
    let _filterCheckedKeys: React.Key[] = [];
    if (props.checkedFilterConfig) {
      _filterCheckedKeys = difference(
        checkedKeys as React.Key[],
        filterTreeKeys
      );
      Array.isArray(checkedKeys) && setFilterCheckedKeys(_filterCheckedKeys);
    }
    setCheckedKeys(checkedKeys);

    if (Array.isArray(checkedKeys)) {
      if (checkedKeys.length === 0) {
        setAllChecked(false);
        setIndeterminate(false);
      } else {
        const checkedKeySet = new Set(checkedKeys);
        const allChecked = treeData.every((node) =>
          checkedKeySet.has(node.key)
        );

        setAllChecked(allChecked);
        setIndeterminate(allChecked ? false : true);
      }
    }
    props.onCheck?.(
      props.checkedFilterConfig ? _filterCheckedKeys : checkedKeys
    );
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <>
      {searchable && (
        <Input.Search
          placeholder={placeholder}
          onChange={onChange}
          style={{ marginBottom: 8 }}
          data-testid="search-input"
        />
      )}
      {configProps.checkable && checkAllEnabled && (
        <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            data-testid="check-all-checkbox"
          >
            全选
          </Checkbox>
          <span style={{ marginLeft: "auto" }} className="checkedNum">
            已选{" "}
            {props.checkedFilterConfig
              ? filterCheckedKeys?.length
              : (Array.isArray(checkedKeys) && checkedKeys?.length) || 0}{" "}
            项
          </span>
        </div>
      )}
      <div
        className={classNames(
          isEmpty(suffixBrick?.useBrick)
            ? styles.treeWrapper
            : styles.treeWithSuffixWrapper
        )}
        ref={treeContainerRef}
      >
        {treeData?.length ? (
          <Tree
            {...configProps}
            treeData={treeData}
            titleRender={(node) => {
              const { title: _title, children } = node;
              let title: React.ReactNode = _title;

              if (
                typeof _title === "string" &&
                searchValue &&
                (searchParent ? true : !children?.length)
              ) {
                const index = _title.indexOf(searchValue);

                if (index >= 0) {
                  const beforeStr = _title.substring(0, index);
                  const afterStr = _title.substring(searchValueLength + index);

                  title = (
                    <span
                      ref={(() => {
                        if (!nodeMatchedRef.current) {
                          nodeMatchedRef.current = true;

                          return (el: HTMLElement) => {
                            if (el) {
                              const nodeEl =
                                el.closest(".ant-tree-treenode") || el;
                              const treeContainerEl = treeContainerRef.current;

                              treeContainerEl.scrollBy(
                                undefined,
                                nodeEl.getBoundingClientRect().top -
                                  treeContainerEl.getBoundingClientRect().top
                              );
                            }
                          };
                        } else {
                          return null;
                        }
                      })()}
                    >
                      {beforeStr}
                      <span
                        style={{ color: "#0071eb", backgroundColor: "#ebf3fd" }}
                      >
                        {searchValue}
                      </span>
                      {afterStr}
                    </span>
                  );
                }
              }

              if (!isEmpty(suffixBrick?.useBrick)) {
                return (
                  <div className={styles.suffixBrickWrapper}>
                    <span>{title}</span>
                    <BrickAsComponent
                      useBrick={suffixBrick.useBrick}
                      data={node}
                    />
                  </div>
                );
              }

              return title;
            }}
            selectedKeys={selectedKeys}
            checkedKeys={checkedKeys}
            {...(expandedKeys ? { expandedKeys: expandedKeys } : {})}
            onSelect={onSelect}
            onCheck={onCheck}
            onExpand={onExpand}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </>
  );
}
