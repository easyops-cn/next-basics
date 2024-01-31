import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  debounce,
  cloneDeep,
} from "lodash";
import { EventDataNode } from "rc-tree/lib/interface";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import styles from "./index.module.css";
import classNames from "classnames";
import i18n from "i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

const { DirectoryTree } = Tree;

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

function getTreeNodes(
  list: BrickTreeNodeProps[],
  iconUseBrick: { useBrick: UseBrickConf }
): DataNode[] {
  return list.map((item) => {
    const { children, icon: _icon, key, ...itemProps } = item;
    let icon: React.ReactNode;

    if (iconUseBrick) {
      icon = <BrickAsComponent useBrick={iconUseBrick.useBrick} data={item} />;
    } else if (_icon) {
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
      children: children && getTreeNodes(children, iconUseBrick),
    };
  });
}

function nodeCheckable(node: DataNode): boolean {
  return !node.disabled && !node.disableCheckbox && node.checkable !== false;
}

function getAllKeys(nodes: DataNode[], keys?: React.Key[]): React.Key[] {
  if (!keys) {
    keys = [];
  }

  nodes.forEach((node) => {
    const children = node.children;

    if (nodeCheckable(node)) {
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

const getExpandedKeysBySearchValue = (
  nodes: DataNode[],
  searchValue: string,
  expandedKeys: React.Key[],
  options?: { searchParent?: boolean; alsoSearchByKey?: boolean }
): boolean => {
  let isHit = false;

  nodes.forEach((node) => {
    const childrenLength = node.children?.length;
    if (childrenLength ? options?.searchParent : true) {
      if (
        (typeof node.title === "string" &&
          node.title?.toLocaleLowerCase()?.includes(searchValue)) ||
        (options?.alsoSearchByKey &&
          node.key.toString()?.toLocaleLowerCase()?.includes(searchValue))
      ) {
        isHit = true;
      }
    }

    if (
      childrenLength &&
      getExpandedKeysBySearchValue(
        node.children,
        searchValue,
        expandedKeys,
        options
      )
    ) {
      expandedKeys.push(node.key);
      isHit = true;
    }
  });

  return isHit;
};

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
  searchQ?: string;
  placeholder?: string;
  searchParent?: boolean;
  checkAllEnabled?: boolean;
  checkedFilterConfig?: checkedFilterProps;
  checkedNotRelevant?: boolean;
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
  onExpand?(expandedKeys: React.Key[]): void;
  onSearch?(value: string): void;
  suffixBrick?: { useBrick: UseBrickConf };
  suffixStopEvent?: boolean;
  afterSearchBrick?: { useBrick: UseBrickConf };
  showSpecificationTitleStyle?: boolean;
  defaultExpandAll?: boolean;
  deselectable?: boolean;
  alsoSearchByKey?: boolean;
  isFilter?: boolean;
  iconUseBrick?: { useBrick: UseBrickConf };
  isDirectory?: boolean;
  hideSelectedNum?: boolean;
  hideBackground?: boolean;
}

export function BrickTree(props: BrickTreeProps): React.ReactElement {
  const {
    selectedKeys: _selectedKeys,
    expandedKeys: _expandedKeys,
    configProps = {},
    dataSource = [],
    searchable = false,
    searchParent = false,
    searchQ = "",
    placeholder = "",
    checkAllEnabled,
    checkedFilterConfig: { field, value, operator } = {},
    checkedNotRelevant,
    suffixBrick,
    suffixStopEvent,
    afterSearchBrick,
    showSpecificationTitleStyle,
    defaultExpandAll,
    deselectable,
    alsoSearchByKey,
    isFilter,
    onSearch,
    iconUseBrick,
    isDirectory,
    hideBackground,
  } = props;
  const [allChecked, setAllChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [filterCheckedKeys, setFilterCheckedKeys] = useState<React.Key[]>();
  const [checkedKeys, setCheckedKeys] = useState<
    React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }
  >();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [searchValue, setSearchValue] = useState<string>(searchQ);
  const [inputValue, setInputValue] = useState<string>(searchQ);
  const treeContainerRef = useRef<HTMLDivElement>();
  const nodeMatchedRef = useRef<boolean>(false);

  const defaultData = useMemo(
    () => getTreeNodes(dataSource, iconUseBrick),
    [dataSource]
  );
  const filterTreeKeys = useMemo(
    () =>
      flat(dataSource)
        .filter((v) => compareFunMap[operator]?.(value, get(v, field)))
        .map((v) => v.key) || [],
    [dataSource]
  );
  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] => {
      const filterTrees: DataNode[] = [];
      for (let i = 0; i < data.length; i++) {
        const node = cloneDeep(data[i]);
        let children: DataNode[] = [];
        if (node.children) {
          node.children = children = loop(node.children);
        }
        const strTitle = node.title as string;
        const _key = node.key as string;
        const lowerCaseSearchValue = searchValue.toLocaleLowerCase();
        const index = strTitle
          .toLocaleLowerCase()
          .indexOf(lowerCaseSearchValue);
        const kIndex = alsoSearchByKey
          ? _key.toString()?.toLocaleLowerCase().indexOf(lowerCaseSearchValue)
          : -1;
        if (index != -1 || kIndex != -1 || children.length)
          filterTrees.push(node);
      }
      return filterTrees;
    };
    const data = searchValue ? loop(defaultData) : defaultData;
    return data;
  }, [searchValue, defaultData]);

  useEffect(() => {
    setSelectedKeys(_selectedKeys);
  }, [_selectedKeys]);
  // istanbul ignore next
  useEffect(() => {
    const _checkedKeys = props.checkedKeys ?? [];
    setCheckedKeys(_checkedKeys);
    setFilterCheckedKeys(difference(_checkedKeys, filterTreeKeys));
    if (
      _checkedKeys.length === 0 ||
      intersection(_checkedKeys, getAllKeys(defaultData))?.length === 0
    ) {
      setAllChecked(false);
      setIndeterminate(false);
    } else {
      const checkedKeySet = new Set(_checkedKeys);
      let allChecked;
      if (!checkedNotRelevant) {
        allChecked = getAllCheckedState(defaultData, checkedKeySet);
      } else {
        const allKeys = getAllKeys(defaultData);
        allChecked = allKeys.every((key) => checkedKeySet.has(key));
      }
      setAllChecked(allChecked);
      setIndeterminate(!allChecked);
    }
  }, [props.checkedKeys]);
  useEffect(() => {
    setExpandedKeys(_expandedKeys);
  }, [_expandedKeys]);
  useEffect(() => {
    nodeMatchedRef.current = false;
  }, [searchValue]);

  let searchValueLength: number;

  if (searchValue) {
    searchValueLength = searchValue.length;
  }

  const onChange = useCallback(
    debounce((value: string) => {
      // 等到 expandedKeys 更新后，也就是展开状态改变后，再触发跳转到第一个匹配项
      setTimeout(() => {
        setSearchValue(value);
      });
      if (value) {
        const expandedKeys: React.Key[] = [];

        getExpandedKeysBySearchValue(
          defaultData,
          value.toLocaleLowerCase(),
          expandedKeys,
          {
            searchParent,
            alsoSearchByKey,
          }
        );
        setExpandedKeys(expandedKeys);
      }
      if (isFilter) {
        onSearch(value);
      }
    }, 300),
    [defaultData, searchParent, alsoSearchByKey]
  );
  const handleOnChange = (value: string) => {
    onChange(value);
    setInputValue(value);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const checkedKeys = checked ? getAllKeys(defaultData) : [];
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
    if (!deselectable && selectedKeys.length === 0) {
      return;
    }

    setSelectedKeys(selectedKeys);
    props.onSelect?.(selectedKeys, info);
  };

  const onCheck = (
    checkedKeys:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] }
  ) => {
    const _checkedKeys =
      "checked" in checkedKeys ? checkedKeys.checked : checkedKeys;
    let _filterCheckedKeys: React.Key[] = [];
    if (props.checkedFilterConfig) {
      _filterCheckedKeys = difference(_checkedKeys, filterTreeKeys);
      setFilterCheckedKeys(_filterCheckedKeys);
    }
    setCheckedKeys(_checkedKeys);

    if (_checkedKeys.length === 0) {
      setAllChecked(false);
      setIndeterminate(false);
    } else {
      const checkedKeySet = new Set(_checkedKeys);
      let allChecked;
      if (!checkedNotRelevant) {
        allChecked = defaultData.every((node) => checkedKeySet.has(node.key));
      } else {
        const allKeys = getAllKeys(defaultData);
        allChecked = allKeys.every((key) => checkedKeySet.has(key));
      }
      setAllChecked(allChecked);
      setIndeterminate(!allChecked);
    }

    props.onCheck?.(
      props.checkedFilterConfig ? _filterCheckedKeys : _checkedKeys
    );
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    setExpandedKeys(expandedKeys);
    props.onExpand(expandedKeys);
  };

  const titleRender = (node: any) => {
    const { title: _title, children, key: _key } = node;
    let title: React.ReactNode = _title;
    //根据ui规范，全部或者默认的节点，字体加粗，间距加宽
    const allOrDefaultFlag =
      (title === "全部" || title === "默认") && !children;
    if (
      typeof _title === "string" &&
      searchValue &&
      (searchParent ? true : !children?.length)
    ) {
      const lowerCaseSearchValue = searchValue.toLocaleLowerCase();
      const index = _title.toLocaleLowerCase().indexOf(lowerCaseSearchValue);
      const kIndex = alsoSearchByKey
        ? _key.toString()?.toLocaleLowerCase().indexOf(lowerCaseSearchValue)
        : -1;

      if (index >= 0) {
        const beforeStr = _title.substring(0, index);
        const matchStr = _title.substring(index, searchValueLength + index);
        const afterStr = _title.substring(searchValueLength + index);

        title = (
          <span
            ref={(() => {
              if (!nodeMatchedRef.current) {
                nodeMatchedRef.current = true;

                return (el: HTMLElement) => {
                  if (el) {
                    const nodeEl = el.closest(".ant-tree-treenode") || el;
                    const treeContainerEl = treeContainerRef.current;

                    treeContainerEl?.scrollBy(
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
            {alsoSearchByKey ? (
              // 如果也按key搜索，就整体高亮（因为key不会展示）
              <span className={styles.matchTextTotal}>{_title}</span>
            ) : (
              <>
                {beforeStr}
                <span className={styles.matchText}>{matchStr}</span>
                {afterStr}
              </>
            )}
          </span>
        );
      } else if (kIndex >= 0) {
        title = (
          <span
            ref={(() => {
              if (!nodeMatchedRef.current) {
                nodeMatchedRef.current = true;

                return (el: HTMLElement) => {
                  if (el) {
                    const nodeEl = el.closest(".ant-tree-treenode") || el;
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
            <span className={styles.matchTextTotal}>{_title}</span>
          </span>
        );
      }
    }

    if (!isEmpty(suffixBrick?.useBrick)) {
      return (
        <div className={styles.suffixBrickWrapper}>
          <span
            className={
              showSpecificationTitleStyle && allOrDefaultFlag
                ? styles.allOrDefault
                : null
            }
          >
            {title}
          </span>
          <span
            onClick={(e) => {
              suffixStopEvent && e.stopPropagation();
            }}
          >
            <BrickAsComponent useBrick={suffixBrick.useBrick} data={node} />
          </span>
        </div>
      );
    }

    return showSpecificationTitleStyle && allOrDefaultFlag ? (
      <span className={styles.allOrDefault}>{title}</span>
    ) : (
      title
    );
  };

  const getTreeElement = (props: any): React.ReactNode =>
    isDirectory ? <DirectoryTree {...props} /> : <Tree {...props} />;

  return (
    <>
      {searchable && (
        <div style={{ display: "flex" }}>
          <Input.Search
            placeholder={placeholder}
            onChange={(e) => handleOnChange(e.target.value)}
            value={inputValue}
            style={{ marginBottom: 8 }}
            data-testid="search-input"
          />
          {!isEmpty(afterSearchBrick?.useBrick) && (
            <BrickAsComponent
              useBrick={afterSearchBrick?.useBrick}
            ></BrickAsComponent>
          )}
        </div>
      )}
      {configProps.checkable && checkAllEnabled && (
        <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            data-testid="check-all-checkbox"
          >
            {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECT_ALL}`)}
          </Checkbox>
          {!props.hideSelectedNum && (
            <span style={{ marginLeft: "auto" }} className="checkedNum">
              {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, {
                number: props.checkedFilterConfig
                  ? filterCheckedKeys?.length
                  : (Array.isArray(checkedKeys) && checkedKeys?.length) || 0,
              })}
            </span>
          )}
        </div>
      )}
      <div
        className={classNames(styles.treeWrapper, {
          [styles.withSuffix]: !isEmpty(suffixBrick?.useBrick),
          [styles.titleSpace]: showSpecificationTitleStyle,
          [styles.hideBackground]: hideBackground,
        })}
        ref={treeContainerRef}
      >
        {treeData?.length ? (
          getTreeElement({
            ...configProps,
            ...(expandedKeys ? { expandedKeys: expandedKeys } : {}),
            treeData,
            titleRender,
            checkedKeys,
            checkStrictly: checkedNotRelevant,
            selectedKeys,
            defaultExpandAll,
            onSelect,
            onCheck,
            onExpand,
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </>
  );
}
