import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { removeItemFromList } from "./QuickVisitMenu";
import { Tooltip } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { K, NS_NAV_LEGACY } from "../i18n/constants";
import { useTranslation } from "react-i18next";
export function arrayMoveImmutable(array, fromIndex, toIndex) {
  if (fromIndex === toIndex) {
    return array;
  }
  const newArray = [...array];
  const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex;
    const [item] = newArray.splice(fromIndex, 1);
    newArray.splice(endIndex, 0, item);
  }
  return newArray;
}

export function FavouriteMenu({
  menus,
  handleMenuRemove,
  handleMenuDrag,
  handleMenuClick,
}): React.ReactElement {
  const [list, setList] = useState([]);
  const { t } = useTranslation(NS_NAV_LEGACY);
  useEffect(() => {
    setList(menus);
  }, [menus]);

  const removeItem = (menu) => {
    const newList = removeItemFromList(list, menu);
    setList(newList);
    handleMenuRemove(newList);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newList = arrayMoveImmutable(list, oldIndex, newIndex);
    setList(newList);
    handleMenuDrag(newList, oldIndex, newIndex);
  };
  const SortableWrapper = SortableContainer(({ children }) => {
    return <div className={styles.container}>{children}</div>;
  });
  const DragHandle = SortableHandle(() => (
    <span className={styles.dragHandler}>:::</span>
  ));

  const SortableItem = SortableElement(({ menu, removeItem, clickItem }) => (
    <div className={styles.favouriteTag}>
      <div className={styles.textContainer} onClick={() => clickItem(menu)}>
        <Tooltip
          mouseLeaveDelay={2}
          trigger={menu.text?.length > 16 ? "hover" : []}
          title={menu.text}
        >
          {menu.text}
        </Tooltip>
      </div>
      <div className={styles.operation}>
        <Tooltip title={t(K.REMOVE_FROM_QUICK_ACCESS)}>
          <CloseOutlined
            className={styles.deleteBtn}
            onClick={() => removeItem(menu)}
          />
        </Tooltip>
        <DragHandle />
      </div>
    </div>
  ));
  return (
    <SortableWrapper
      onSortEnd={onSortEnd}
      helperClass="sortableHelper"
      axis="xy"
      useDragHandle
    >
      {list.map((menu, index) => (
        <SortableItem
          key={`item-${menu.text}`}
          index={index}
          menu={menu}
          removeItem={removeItem}
          clickItem={handleMenuClick}
        />
      ))}
    </SortableWrapper>
  );
}
