import React from "react";
import { Sidebar, GeneralIcon } from "@next-libs/basic-components";
import style from "./index.module.css";
import { SidebarMenu, UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";

interface SubMenuProps {
  dataSource: SidebarMenu;
  topOperationConf?: { useBrick: UseBrickConf };
}

export function SubMenu({
  dataSource,
  topOperationConf,
}: SubMenuProps): React.ReactElement {
  return (
    <div className={style.subMenuContainer}>
      {(dataSource.icon || dataSource.title || topOperationConf?.useBrick) && (
        <div className={style.header}>
          <div>
            <GeneralIcon icon={dataSource.icon} />
            <span className={style.headerTitle}>{dataSource.title}</span>
          </div>

          {topOperationConf?.useBrick && (
            <BrickAsComponent
              useBrick={topOperationConf.useBrick}
            ></BrickAsComponent>
          )}
        </div>
      )}
      <Sidebar
        menuItems={dataSource.menuItems}
        inlineIndent={16}
        theme="light"
      />
    </div>
  );
}
