import React from "react";
import classNames from "classnames";
import { useDesktopDirContext } from "../DesktopDirContext";
import styles from "./DesktopDir.module.css";
import defaultAppIcon from "../../images/default-app-icon.png";
import { NormalizedDesktopDir } from "../interfaces";

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
                src={
                  item.app.icons && item.app.icons.large
                    ? /^(\/|https?:\/\/)/.test(item.app.icons.large)
                      ? item.app.icons.large
                      : `micro-apps/${item.id}/${item.app.icons.large}`
                    : defaultAppIcon
                }
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
      <span className={styles.dirName}>{props.name}</span>
    </>
  );
}
