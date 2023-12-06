import React, { forwardRef, useEffect, useMemo } from "react";
import styles from "./SiteMap.module.css";
import { Link } from "@next-libs/basic-components";
import { MicroApp } from "@next-core/brick-types";
import { launchpadService } from "../LaunchpadService";

interface SiteCategory {
  name: string;
  id: string;
  order: string;
  apps: {
    id?: string;
    sort?: string;
    name?: string;
    homepage?: string;
  }[];
}
export interface SiteMapProps {
  categoryList: SiteCategory[];
  containerStyle?: React.CSSProperties;
  onLoad?: () => void;
}

export function LeacySiteMap(
  props: SiteMapProps,
  ref: any
): React.ReactElement {
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    props.onLoad?.();
  }, []);

  const handleClick = (app: MicroApp): void => {
    launchpadService.pushVisitor("app", app);
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
              {item.apps?.map((row, index) => (
                <li className={styles.item} key={index}>
                  <Link
                    to={row.homepage}
                    onClick={() => handleClick(row as MicroApp)}
                  >
                    {row.name}
                  </Link>
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
