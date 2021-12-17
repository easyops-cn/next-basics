import React, { useCallback } from "react";
import styles from "./ProviderGroupList.module.css";
import { Link } from "@next-libs/basic-components";
import { ReactComponent as APISvg } from "../images/api.svg";

export interface GroupItem {
  name: string;
  label?: string;
  description?: string;
  items: Array<{
    name: string;
    description?: string;
  }>;
}

export interface NamespaceItem {
  name: string;
  label?: string;
  description?: string;
  groups: GroupItem[];
}

export interface ProviderGroupProps {
  dataSource: NamespaceItem[];
  containerStyle?: React.CSSProperties;
  onClick?: (name: string, data: GroupItem) => void;
}

const colorList = [
  "var(--theme-green-color)",
  "var(--theme-blue-color)",
  "var(--theme-red-color)",
  "var(--theme-orange-color)",
  "var(--theme-cyan-color)",
  "var(--theme-purple-color)",
  "var(--theme-jewelryblue-color)",
  "var(--theme-yellowgreen-color)",
  "var(--theme-slategray-color)",
  "var(--theme-lightpurple-color)",
];

export function ProviderGroupList(
  props: ProviderGroupProps
): React.ReactElement {
  const { dataSource, containerStyle, onClick } = props;
  const getColor = useCallback((position: number) => {
    const colorLength = colorList.length;
    return colorList[position % colorLength];
  }, []);

  const getLabel = useCallback(
    (row: GroupItem) => `${row.description || row.label} (${row.name})`,
    []
  );

  return (
    <div style={containerStyle}>
      {dataSource?.map((item) => (
        <div key={item.name}>
          <div>
            <a id={item.name} className={styles.anchor} />
            <div className={styles.nameWrapper}>
              <APISvg style={{ width: 24, height: 24 }} />
              <span className={styles.groupName}>{item.label}</span>
              <span className={styles.divider} />
            </div>
          </div>
          <div className={styles.content}>
            {item.groups?.map((row, index) => (
              <div key={row.name} className={styles.item}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: getColor(index) }}
                />
                <Link
                  className={styles.name}
                  onClick={() => onClick?.(item.name, row)}
                >
                  <span title={getLabel(row)}>{getLabel(row)}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
