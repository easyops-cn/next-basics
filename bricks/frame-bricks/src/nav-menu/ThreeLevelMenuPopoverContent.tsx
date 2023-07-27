import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import styles from "./ThreeLevelMenuPopoverContent.module.css";
import {
  SidebarMenuGroups,
  SidebarMenuSimpleItems,
  isSubMenu,
  isGroup,
  renderLinkCom,
} from "./utils";
import { debounce } from "lodash";

interface ThreeLevelMenuPopoverContentProps {
  menuItem: SidebarMenuGroups;
  selectedKey: string[];
}

export function ThreeLevelMenuPopoverContent(
  props: ThreeLevelMenuPopoverContentProps
): React.ReactElement {
  const { menuItem, selectedKey } = props;
  const [curGroupKey, setCurrentGroupKey] = useState<string>();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const { relatedGroupKeys, relatedMenuItemKeys } = useMemo(() => {
    const selectedKeySet = new Set(selectedKey);
    const relatedGroupKeys: string[] = [];
    const relatedMenuItemKeys: string[] = [];

    menuItem.items.map((group) => {
      let childrenSelected = false;
      if (group.type === "group") {
        group.items?.map((item) => {
          if (selectedKeySet.has(item.key)) {
            childrenSelected = true;
            relatedMenuItemKeys.push(item.key);
          }
        });
      }
      if (childrenSelected || selectedKeySet.has(group.key)) {
        relatedGroupKeys.push(group.key);
      }
    });
    return { relatedGroupKeys, relatedMenuItemKeys };
  }, [menuItem, selectedKey]);

  useEffect(() => {
    if (relatedGroupKeys[0]) {
      setCurrentGroupKey(relatedGroupKeys[0]);
      setActiveKeys([relatedGroupKeys[0]]);
    } else {
      const defaultGroupKey = menuItem.items[0].key;
      setCurrentGroupKey(defaultGroupKey);
      setActiveKeys([defaultGroupKey]);
    }
  }, []);

  const curGroup = useMemo(() => {
    return menuItem.items.find(
      (v) => v.key === curGroupKey && v.type === "group"
    ) as SidebarMenuGroups;
  }, [menuItem, curGroupKey]);

  const debouncedUpdateGroup = useMemo(() => {
    return debounce((item: SidebarMenuSimpleItems) => {
      setCurrentGroupKey(item.key);
      setActiveKeys([item.key]);
    }, 200);
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.groupList}>
        {menuItem.items
          ?.filter((v) => !isSubMenu(v))
          .map((item) => {
            return (
              <div
                key={item.key}
                className={classnames(styles.groupItem, {
                  [styles.groupItemChecked]: relatedGroupKeys.includes(
                    item.key
                  ),
                  [styles.groupItemActive]: activeKeys[0] === item.key,
                })}
                onMouseEnter={() => {
                  debouncedUpdateGroup(item as SidebarMenuSimpleItems);
                }}
              >
                {isGroup(item) ? (
                  <div className={styles.groupItemText}>{item.title}</div>
                ) : (
                  renderLinkCom(
                    item as SidebarMenuSimpleItems,
                    styles.groupItemText,
                    { width: "100%" }
                  )
                )}
              </div>
            );
          })}
      </div>
      {curGroup && (
        <div
          className={styles.menuContainer}
          onMouseEnter={() => {
            debouncedUpdateGroup.cancel();
          }}
        >
          <div className={styles.menuHeader}>
            <div className={styles.menuHeaderText}>{curGroup.title}</div>
          </div>
          <div className={styles.menuItemsContainer}>
            {(
              curGroup.items?.filter(
                (v) => !isSubMenu(v, true)
              ) as SidebarMenuSimpleItems[]
            ).map((item) => {
              return (
                <div
                  key={item.key}
                  className={classnames(styles.menuItem, {
                    [styles.menuItemChecked]: relatedMenuItemKeys.includes(
                      item.key
                    ),
                    [styles.menuItemActive]: activeKeys[1] === item.key,
                  })}
                  onClick={() => {
                    setActiveKeys([curGroup.key, item.key]);
                  }}
                >
                  {renderLinkCom(item, styles.menuItemText, { width: "100%" })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
