import React, { forwardRef, useMemo } from "react";
import styles from "./SiteMap.module.css";
import { Link } from "@next-libs/basic-components";

interface SiteCategory {
  name: string;
  items: any[];
}
export interface SiteMapProps {
  categoryList: SiteCategory[];
  containerStyle?: React.CSSProperties;
}

export function LeacySiteMap(
  props: SiteMapProps,
  ref: any
): React.ReactElement {
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={styles.scrollContainer}
      style={props.containerStyle}
      ref={ref}
      onWheel={handleWheel}
    >
      <div className={styles.siteMapContainer}>
        {props.categoryList?.map((item) => (
          <div className={styles.groupWrapper} key={item.name}>
            <div>{item.name}</div>
            <ul className={styles.group}>
              {item.items.map((row, index) => (
                <li className={styles.item} key={index}>
                  <Link to={row.link}>{row.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SiteMap = forwardRef(LeacySiteMap);
