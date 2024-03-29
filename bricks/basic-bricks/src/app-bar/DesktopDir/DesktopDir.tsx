import React from "react";
import classNames from "classnames";
import { useDesktopDirContext } from "../DesktopDirContext";
import styles from "./DesktopDir.module.css";
import defaultAppIcon from "../../images/default-app-icon.png";
import { NormalizedDesktopDir } from "../interfaces";
import { getImageUrl } from "../utils/getImageUrl";

export function DesktopDir(props: NormalizedDesktopDir): React.ReactElement {
  const { setDesktopDir } = useDesktopDirContext();
  const handleDirClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    // 记录鼠标点击的位置，在文件夹展开时以此为原点做动画。
    setDesktopDir({
      dir: {
        name: props.name,
        items: props.items,
      },
      coordinates: {
        x: e.clientX,
        y: e.clientY,
      },
      activeIndex: -1,
    });
  };

  return (
    <>
      <a
        className={classNames(styles.dirLink, {
          [styles[props.size]]: !!props.size,
        })}
        onClick={handleDirClick}
        role="button"
      >
        {props.items
          .slice(0, 4)
          .map((item) =>
            item.type === "app" ? (
              <img
                className={styles.appIcon}
                key={item.id}
                src={getImageUrl(item.app, defaultAppIcon)}
              />
            ) : (
              <img
                className={styles.appIcon}
                key={item.id}
                src={defaultAppIcon}
              />
            )
          )}
      </a>
      <div className={styles.dirName} title={props.name}>
        {props.name}
      </div>
    </>
  );
}
