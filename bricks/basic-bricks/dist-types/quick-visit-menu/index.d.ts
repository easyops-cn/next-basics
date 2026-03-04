export interface QuickVisitMenuProps {
  menu?: Record<string, any>;
  buttonName?: string;
  favouriteMenus?: {
    text: string;
    to?: string;
    href?: string;
  }[];
  searchPlaceholder?: string;
  maxFavouriteCount?: number;
}

export interface QuickVisitMenuEvents {
  "menu.drag": CustomEvent<Record<string, any>>;
  "menu.remove": CustomEvent<Record<string, any>>;
  "menu.add": CustomEvent<Record<string, any>>;
  "menu.click": CustomEvent<Record<string, any>>;
  "collect.failed": CustomEvent<Record<string, any>>;
}

export interface QuickVisitMenuEventsMap {
  onMenuDrag: "menu.drag";
  onMenuRemove: "menu.remove";
  onMenuAdd: "menu.add";
  onMenuClick: "menu.click";
  onCollectFailed: "collect.failed";
}

export declare class QuickVisitMenuElement extends HTMLElement {
  menu: Record<string, any> | undefined;
  buttonName: string | undefined;
  favouriteMenus:
    | {
        text: string;
        to?: string;
        href?: string;
      }[]
    | undefined;
  searchPlaceholder: string | undefined;
  maxFavouriteCount: number | undefined;
}
