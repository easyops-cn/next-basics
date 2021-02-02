import React from "react";
import { Sidebar, GeneralIcon } from "@next-libs/basic-components";
import style from "./index.module.css";
import { SidebarMenu } from "@next-core/brick-types";

interface SubMenuProps {
  dataSource: SidebarMenu;
}

export function SubMenu({ dataSource }: SubMenuProps): React.ReactElement {
  return (
    <div className={style.subMenuContainer}>
      {(dataSource.icon || dataSource.title) && (
        <div className={style.header}>
          <GeneralIcon icon={dataSource.icon} />
          <span className={style.headerTitle}>{dataSource.title}</span>
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
