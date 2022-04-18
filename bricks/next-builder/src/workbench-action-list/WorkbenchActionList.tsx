import React, { useState, useEffect } from "react";
import { SidebarSubMenu } from "@next-core/brick-types";
import { WorkbenchAction } from "../workbench-action/WorkbenchAction";
import styles from "./WorkbenchActionList.module.css";
import { getHistory } from "@next-core/brick-kit";
import { UnregisterCallback, Location } from "history";
import { initMenuItemAndMatchCurrentPathKeys } from "@next-libs/basic-components";

interface WorkbenchActionListProps {
  menu: SidebarSubMenu;
}

export function WorkbenchActionList(
  props: WorkbenchActionListProps
): React.ReactElement {
  const { menu } = props;
  const history = getHistory();
  const [activeIndex, setActiveIndex] = useState<number>();
  const [location, setLocation] = useState<Location>(history.location);

  useEffect(() => {
    const unlisten: UnregisterCallback = history.listen((location) => {
      setLocation(location);
    });
    return unlisten;
  }, []);

  useEffect(() => {
    const { pathname, search } = location;

    const { selectedKeys } = initMenuItemAndMatchCurrentPathKeys(
      menu?.menuItems ?? [],
      pathname,
      search,
      ""
    );
    setActiveIndex(Number(selectedKeys[0]));
  }, [menu, location]);

  return (
    <div className={styles.workBenchActionList}>
      {menu?.menuItems
        ?.map((item, index) => {
          if (item.type === "default") {
            return (
              <WorkbenchAction
                key={index}
                icon={item.icon}
                tooltip={item.text}
                to={(item.to || item.href) as string}
                active={activeIndex === index}
              />
            );
          }
        })
        .filter(Boolean)}
    </div>
  );
}
