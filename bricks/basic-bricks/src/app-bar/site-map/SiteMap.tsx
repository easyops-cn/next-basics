import React, { forwardRef } from "react";
import styles from "./SiteMap.module.css";
import { Link } from "@next-libs/basic-components";

interface SiteCategory {
  name: string;
  items: any[];
}
export interface SiteMapProps {
  categoryList: SiteCategory[];
}

export function SiteMap(props: SiteMapProps): React.ReactElement {
  return (
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
  );
}
