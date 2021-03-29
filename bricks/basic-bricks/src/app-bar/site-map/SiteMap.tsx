import React, { forwardRef, useMemo } from "react";
import styles from "./SiteMap.module.css";
import { Link } from "@next-libs/basic-components";
import { throttle } from "lodash";

interface SiteCategory {
  name: string;
  items: any[];
}
export interface SiteMapProps {
  categoryList: SiteCategory[];
  containerStyle?: React.CSSProperties;
  onScrollCallback?: (flag: boolean) => void;
}

export function LeacySiteMap(
  props: SiteMapProps,
  ref: any
): React.ReactElement {
  const handleWheel = (e: React.WheelEvent) => {
    const scrolltop = ref.current?.scrollTop;
    // istanbul ignore else
    if (scrolltop === 0 && e.deltaY < 0) {
      props.onScrollCallback?.(false);
    }
  };

  const throttleWheel = throttle(handleWheel, 300);

  return (
    <div
      className={styles.scrollContainer}
      style={props.containerStyle}
      ref={ref}
      onWheel={throttleWheel}
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
