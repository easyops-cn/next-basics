import type { SidebarMenu, UseBrickConf } from "@next-core/brick-types";
import type { UseBrickConf } from "@next-core/brick-types";

export interface SubMenuProps {
  dataSource?: SidebarMenu;
  topOperationConf?: { useBrick: UseBrickConf };
  isThirdLevel?: boolean;
}

export declare class SubMenuElement extends HTMLElement {
  dataSource: SidebarMenu | undefined;
  topOperationConf: { useBrick: UseBrickConf } | undefined;
  isThirdLevel: boolean | undefined;
}
