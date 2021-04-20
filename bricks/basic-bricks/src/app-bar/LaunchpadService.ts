import { JsonStorage } from "@next-libs/storage";
import {
  MicroApp,
  DesktopItemCustom,
  DesktopItemApp,
} from "@next-core/brick-types";
import {
  LaunchpadApi_ListCollectionResponseItem,
  LaunchpadApi_listCollection,
  LaunchpadApi_CreateCollectionRequestBody,
  LaunchpadApi_createCollection,
  LaunchpadApi_deleteCollection,
} from "@next-sdk/user-service-sdk";
import { getRuntime } from "@next-core/brick-kit";
import { pick } from "lodash";

export class LaunchpadService {
  readonly storageKey = "launchpad-recently-visited";
  private storage: JsonStorage;
  private favoriteList: LaunchpadApi_ListCollectionResponseItem[] = [];
  private filteredFavoriteList: LaunchpadApi_ListCollectionResponseItem[] = [];
  private microApps: MicroApp[] = [];
  private customList: DesktopItemCustom[] = [];
  private maxVisitorLength = 7;
  constructor() {
    this.storage = new JsonStorage(localStorage);
    const runtime = getRuntime();
    const desktops = runtime.getDesktops();

    this.customList = desktops
      .map((desktop) => desktop.items.filter((i) => i.type === "custom"))
      .flat() as DesktopItemCustom[];

    const microApps = runtime
      .getMicroApps()
      // 兼容较老版本接口未返回 `status` 的情况。
      .filter(
        (item) =>
          !item.status ||
          item.status === "enabled" ||
          item.status === "developing"
      );

    this.setMicroApps(microApps);
  }

  setMaxVisitorLength(value: number) {
    this.maxVisitorLength = value;
  }

  async fetchFavoriteList() {
    const result = (
      await LaunchpadApi_listCollection({ page: 1, pageSize: 25 })
    ).list;
    this.setFavorites(result);
    return result;
  }

  getFavoritesLength() {
    return this.favoriteList.length;
  }

  typeAdaptor(type: string): string {
    if (type === "customItem") {
      return "custom";
    }

    if (type === "microApp") {
      return "app";
    }

    return type;
  }

  setFavorites(list: LaunchpadApi_ListCollectionResponseItem[]): void {
    this.filteredFavoriteList = list.filter(
      (v) =>
        v.launchpadCollection.type === "microApp" ||
        (v.launchpadCollection as any).type === "customItem"
    );

    this.favoriteList = list;
  }

  setMicroApps(microApps: MicroApp[]) {
    this.microApps = microApps;
    this.syncValidRecentlyVisitor();
  }

  syncValidRecentlyVisitor() {
    const visitors = this.getAllVisitors();
    const result = visitors.filter((v) => {
      if (v.type === "app") {
        return this.microApps.some((app) => app.id === v.id);
      } else {
        return this.customList.some((f) => f.type === v.type && f.id === v.id);
      }
    });

    this.setAllVisitors(result);
  }

  async setAsFavorite(params: LaunchpadApi_CreateCollectionRequestBody) {
    await LaunchpadApi_createCollection(params, {
      interceptorParams: { ignoreLoadingBar: true },
    });
  }

  async deleteFavorite(id: string | number) {
    await LaunchpadApi_deleteCollection(id, {
      interceptorParams: { ignoreLoadingBar: true },
    });
  }

  isFavorite(item: DesktopItemApp | DesktopItemCustom) {
    if (item.type === "app") {
      return this.filteredFavoriteList.some(
        (f) =>
          this.typeAdaptor(f.launchpadCollection.type) === "app" &&
          f.microAppId === item.id
      );
    }

    return this.filteredFavoriteList.some(
      (f) =>
        this.typeAdaptor(f.launchpadCollection.type) === "custom" &&
        (f as any).customItemId === item.id
    );
  }

  getItem(
    type: "app" | "custom",
    id: string
  ): DesktopItemApp | DesktopItemCustom {
    return (this.storage.getItem(this.storageKey) || []).find(
      (v: DesktopItemApp | DesktopItemCustom) => v.id === id && v.type === type
    );
  }

  getItemIndex(type: "app" | "custom", id: string): number {
    return (this.storage.getItem(this.storageKey) || []).findIndex(
      (v: DesktopItemApp | DesktopItemCustom) => v.id === id && v.type === type
    );
  }

  hasItem(type: "app" | "custom", id: string): boolean {
    return (this.storage.getItem(this.storageKey) || []).some(
      (v: DesktopItemApp | DesktopItemCustom) => v.id === id && v.type === type
    );
  }

  getAllVisitors(): (DesktopItemApp | DesktopItemCustom)[] {
    return this.storage.getItem(this.storageKey) || [];
  }

  setItem(
    type: "app" | "custom",
    item: DesktopItemApp | DesktopItemCustom
  ): void {
    const visitors = this.getAllVisitors();

    if (!this.hasItem(type, item.id)) {
      visitors.unshift(item);
    } else {
      const index = this.getItemIndex(type, item.id);
      visitors.splice(index, 1);
      visitors.unshift(item);
    }

    // 默认只保存一行
    if (visitors.length > this.maxVisitorLength) {
      visitors.pop();
    }
    this.setAllVisitors(visitors);
  }

  setAllVisitors(visitors: (DesktopItemApp | DesktopItemCustom)[]) {
    this.storage.setItem(this.storageKey, visitors);
  }

  pushVisitor(
    type: "app" | "custom",
    item: MicroApp | DesktopItemCustom
  ): void {
    if (type === "app") {
      const app = item as MicroApp;
      item = {
        id: app.id,
        app: {
          name: app.name,
          icons: app.icons,
          localeName: app.localeName,
          id: app.id,
          homepage: app.homepage,
        } as MicroApp,
        type: "app",
      } as any;
    }

    this.setItem(type, item as DesktopItemApp | DesktopItemCustom);
  }

  getVisitor(
    type: "app" | "custom",
    id: string
  ): DesktopItemApp | DesktopItemCustom | undefined {
    return this.getItem(type, id);
  }

  getRealDesktopItem(
    item: LaunchpadApi_ListCollectionResponseItem
  ): MicroApp | DesktopItemCustom {
    if (item.launchpadCollection.type === "microApp") {
      return this.microApps.find((app) => app.id === item.microAppId);
    } else {
      return this.customList.find(
        (custom) => custom.id === (item as any).customItemId
      );
    }
  }

  setFavoriteAsVisitor(item: LaunchpadApi_ListCollectionResponseItem) {
    const type = this.typeAdaptor(item.launchpadCollection.type);
    if (type === "link") return;
    const data = this.getRealDesktopItem(item);
    if (data) {
      this.pushVisitor(type as "custom" | "app", data);
    }
  }

  getSitemapList() {
    const curMicroApps = getRuntime().getMicroApps({ includeInternal: true });
    const siteMapList = getRuntime().getLaunchpadSiteMap();

    return siteMapList?.map((item) => ({
      ...item,
      apps: (item.apps || []).map((row) => {
        const find = curMicroApps.find((item) => item.id === row.id) || {};
        return {
          ...row,
          ...pick(find, ["name", "icons", "localeName", "homepage"]),
        };
      }),
    }));
  }
}

const service = new LaunchpadService();
export const launchpadService = service;
