/* istanbul-ignore-file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React, { useRef } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AdvancedBrickLibrary } from "../AdvancedBrickLibrary/AdvancedBrickLibrary";
import { LibraryMenu } from "../LibraryMenu/LibraryMenu";
import { libCategoryList, LIB_ALL_CATEGORY } from "../constants";

import styles from "./LibraryDropdownMenu.module.css";

export interface LibraryDropdownMenuProps {
  onCloseClick?: React.MouseEventHandler;
  onDraggingChange?: (isDragging: boolean) => void;
}

export function LibraryDropdownMenu({
  onCloseClick,
  onDraggingChange,
}: LibraryDropdownMenuProps): React.ReactElement {
  const libraryRef = useRef<any>();
  const handleCategoryChange = (category: string): void => {
    libraryRef.current?.handleSearchWithGroup("", category);
  };

  return (
    <div className={styles.wrapper}>
      <Button type="text" onClick={onCloseClick} className={styles.closeBtn}>
        <CloseOutlined />
      </Button>
      <div className={styles.libraryContainer}>
        <LibraryMenu
          menuItems={libCategoryList}
          onItemClick={handleCategoryChange}
          defaultSelectedKeys={[LIB_ALL_CATEGORY]}
        />
        <AdvancedBrickLibrary
          ref={libraryRef}
          onDraggingChange={onDraggingChange}
        />
      </div>
    </div>
  );
}
