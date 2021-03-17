import React, { useEffect, useState, CSSProperties } from "react";
import { SearchComponent } from "../../SearchComponent/SearchComponent";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { useTranslation } from "react-i18next";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { get } from "lodash";
import classNames from "classnames";

import styles from "./SearchableTree.module.css";

interface SearchableTreeProps{
  list: Record<string,any>[];
  defaultSelectedKeys: string[];
  icon?: React.ReactNode;
  field?: string;
  searchPlaceholder?: string;
  onSelect?: (selectedProps: any) => void;
  onQChange?: (q: string) => void;
  customClassName?: string;
}

export function SearchableTree({
  list, 
  defaultSelectedKeys,
  icon,
  field = "title",
  searchPlaceholder,
  onSelect,
  onQChange,
  customClassName
}:SearchableTreeProps): React.ReactElement{
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);

  const handleSearch = (value: string): void => {
    setQ(value);
  };

  useEffect(()=>{
    onQChange?.(q);
  },[q]);

  const handleClick = (selectedKeys: React.Key[], value: any): void => {
    const selectedProps = value.node.props;
    const select = selectedProps.id ? [selectedProps.id] : [];
    setSelectedKeys(select);
    onSelect?.(selectedProps);
  };

  const titleRender = (nodeData: Record<string,any>): React.ReactElement => {
    const titleText = get(nodeData,field) as string;
    let title = <span>{titleText}</span>;
    if (q) {
      const trimQ = q.trim();
      const index = titleText.toLowerCase().indexOf(trimQ.toLowerCase());
      if (index !== -1) {
        const [beforeStr, matchStr, afterStr] = [
          titleText.substr(0, index),
          titleText.substr(index, trimQ.length),
          titleText.substr(index + trimQ.length),
        ];
        title = (
          <span>
            {beforeStr}
            {!!matchStr && (
              <span className={styles.matchedStr}>{matchStr}</span>
            )}
            {afterStr}
          </span>
        );
      }
    }
    return <span title={nodeData.path}>{title}</span>;
  };
  
  return (
    <div
      className={classNames(styles.container,customClassName)}
    >
      <SearchComponent placeholder={searchPlaceholder} onSearch={handleSearch} />
      {
        list?.length > 0 &&(
          <div className={styles.treeWrapper}>
            <Tree
              showIcon
              defaultExpandAll={true}
              treeData={list}
              selectedKeys={selectedKeys}
              switcherIcon={<DownOutlined />}
              onSelect={handleClick}
              titleRender={titleRender}
              icon={icon}
              blockNode={true}
            ></Tree>
          </div>
        )
      } 
    </div>
  )
}