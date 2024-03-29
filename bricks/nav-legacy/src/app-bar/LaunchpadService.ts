import { JsonStorage } from "@next-libs/storage";
import {
  MicroApp,
  DesktopItemCustom,
  DesktopItemApp,
  DesktopData,
  SiteMapItem,
} from "@next-core/brick-types";
import {
  LaunchpadApi_ListCollectionResponseItem,
  LaunchpadApi_listCollection,
  LaunchpadApi_CreateCollectionRequestBody,
  LaunchpadApi_createCollection,
  LaunchpadApi_deleteCollection,
} from "@next-sdk/user-service-sdk";
import { LaunchpadApi_getLaunchpadInfo } from "@next-sdk/micro-app-standalone-sdk";
import { getRuntime, getAuth } from "@next-core/brick-kit";
import { pick } from "lodash";
import i18next from "i18next";
import { LaunchpadSettings } from "./LaunchpadSettingsContext";
import { DeferredService } from "../shared/DeferredService";

interface LaunchpadBaseInfo {
  settings: LaunchpadSettings;
  microApps: MicroApp[];
  desktops: DesktopData[];
  siteSort: SiteMapItem[];
}

export class LaunchpadService {
  readonly storageKey = `launchpad-recently-visited:${getAuth().org}`;
  private storage: JsonStorage;
  private favoriteList: LaunchpadApi_ListCollectionResponseItem[] = [];
  private filteredFavoriteList: LaunchpadApi_ListCollectionResponseItem[] = [];
  private microApps: MicroApp[] = [];
  private customList: DesktopItemCustom[] = [];
  private maxVisitorLength = 7;
  private initialized = false;
  private baseInfo: LaunchpadBaseInfo = {
    settings: {
      columns: 7,
      rows: 4,
    },
    microApps: [],
    desktops: [],
    siteSort: [],
  };
  public loaded = false;
  public favoritesLoaded = false;

  private readonly deferredLaunchpadInfo: DeferredService;
  private readonly deferredFavorites: DeferredService;

  constructor() {
    this.storage = new JsonStorage(localStorage);
    this.deferredLaunchpadInfo = new DeferredService(this.doFetchLaunchpadInfo);
    this.deferredFavorites = new DeferredService(this.doFetchFavorites);

    this.init();
    this.initialized = true;
  }

  init(): void {
    const runtime = getRuntime();
    this.baseInfo = {
      desktops: runtime.getDesktops(),
      microApps: runtime.getMicroApps(),
      settings: runtime.getLaunchpadSettings(),
      siteSort: runtime.getLaunchpadSiteMap(),
    };

    this.initValue();
  }

  private initValue(): void {
    this.customList = this.baseInfo.desktops
      .map((desktop) => desktop.items.filter((i) => i.type === "custom"))
      .flat() as DesktopItemCustom[];

    const microApps = this.baseInfo.microApps
      // 兼容较老版本接口未返回 `status` 的情况。
      .filter(
        (item) =>
          !item.status ||
          item.status === "enabled" ||
          item.status === "developing"
      );

    this.setMicroApps(microApps);
  }

  setMaxVisitorLength(value: number): void {
    this.maxVisitorLength = value;
  }

  preFetchFavorites(): void {
    this.deferredFavorites.schedulePrefetch();
  }

  async fetchFavoriteList(
    eager?: boolean
  ): Promise<LaunchpadApi_ListCollectionResponseItem[]> {
    await this.deferredFavorites.fetch(eager);
    return this.favoriteList;
  }

  private doFetchFavorites = async (): Promise<void> => {
    const result = (
      await LaunchpadApi_listCollection(
        { page: 1, pageSize: 25 },
        {
          interceptorParams: { ignoreLoadingBar: true },
          noAbortOnRouteChange: true,
        }
      )
    ).list;
    this.setFavorites(result);
    this.favoritesLoaded = true;
  };

  preFetchLaunchpadInfo(): void {
    if (window.STANDALONE_MICRO_APPS) {
      this.deferredLaunchpadInfo.schedulePrefetch();
    }
  }

  fetchLaunchpadInfo(): Promise<unknown> {
    return this.deferredLaunchpadInfo.fetch();
  }

  private doFetchLaunchpadInfo = async (): Promise<void> => {
    const launchpadInfo = await LaunchpadApi_getLaunchpadInfo(null, {
      interceptorParams: { ignoreLoadingBar: true },
      noAbortOnRouteChange: true,
    });

    for (const storyboard of launchpadInfo.storyboards) {
      const app = storyboard.app as unknown as MicroApp;
      if (app) {
        if (app.locales) {
          // Prefix to avoid conflict between brick package's i18n namespace.
          const ns = `$tmp-${app.id}`;
          // Support any languages in `app.locales`.
          Object.entries(app.locales).forEach(([lang, resources]) => {
            i18next.addResourceBundle(lang, ns, resources);
          });
          // Use `app.name` as the fallback `app.localeName`.
          app.localeName = i18next.getFixedT(null, ns)("name", app.name);
          // Remove the temporary i18n resource bundles.
          Object.keys(app.locales).forEach((lang) => {
            i18next.removeResourceBundle(lang, ns);
          });
        } else {
          app.localeName = app.name;
        }
      }
    }

    this.baseInfo = {
      ...launchpadInfo,
      settings: launchpadInfo.settings.launchpad as LaunchpadSettings,
      microApps: launchpadInfo.storyboards
        .map((storyboard) => storyboard.app)
        .filter(Boolean) as unknown as MicroApp[],
    } as unknown as LaunchpadBaseInfo;
    this.initValue();
    this.loaded = true;
  };

  getBaseInfo(): LaunchpadBaseInfo {
    return this.baseInfo;
  }

  getFavoritesLength(): number {
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
    if (window.STANDALONE_MICRO_APPS && !this.initialized) {
      // standalone 模式时，初始化不会请求 launchpad 数据，拿不全 microApps 和 customList，所以 syncValidRecentlyVisitor 直接返回。后面调用 getLaunchpadInfo 能正常拿到 microApps 和 customList 数据，正常进行同步。
      return;
    }
    const visitors = this.getAllVisitors();
    const result = visitors.reduce((pre, v) => {
      let find: MicroApp | DesktopItemCustom;
      if (v.type === "app") {
        find = this.microApps.find((app) => app.id === v.id);
      } else {
        find = this.customList.find((f) => f.type === v.type && f.id === v.id);
      }

      if (find) {
        return pre.concat(this.processVisitor(v.type, find));
      }
      return pre;
    }, []);
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

  processVisitor(
    type: "app" | "custom",
    item: MicroApp | DesktopItemCustom
  ): DesktopItemApp | DesktopItemCustom {
    if (type === "app") {
      const app = item as MicroApp;
      return {
        id: app.id,
        app: {
          name: app.name,
          icons: app.icons,
          localeName: app.localeName,
          id: app.id,
          homepage: app.homepage,
          currentVersion: app.currentVersion,
          standaloneMode: (app as MicroApp & { standaloneMode: boolean })
            .standaloneMode,
        } as MicroApp,
        type: "app",
      } as DesktopItemApp;
    }
    return item as DesktopItemCustom;
  }

  pushVisitor(
    type: "app" | "custom",
    item: MicroApp | DesktopItemCustom
  ): void {
    this.setItem(type, this.processVisitor(type, item));
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
    const curMicroApps = this.baseInfo.microApps.filter((app) => !app.internal);
    const siteMapList = this.baseInfo.siteSort;

    return siteMapList?.map((item) => ({
      ...item,
      apps: (item.apps || []).map((row) => {
        const find = curMicroApps.find((item) => item.id === row.id) || {};
        return {
          ...row,
          ...pick(find, [
            "name",
            "icons",
            "localeName",
            "homepage",
            "currentVersion",
            "standaloneMode",
          ]),
        };
      }),
    }));
  }
}

const service = new LaunchpadService();
export const launchpadService = service;
