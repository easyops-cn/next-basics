import { Story } from "@next-core/brick-types";
import { BuildApi_getStoriesJsonV2 } from "@next-sdk/next-builder-sdk";
import _ from "lodash";
import { forEach } from "lodash";

interface installInfo {
  list?: string[];
  fields?: string[];
}

export class StoriesCache {
  static instance: StoriesCache;

  static getInstance(): StoriesCache {
    if (!StoriesCache.instance) {
      StoriesCache.instance = new StoriesCache();
    }
    return StoriesCache.instance;
  }

  private cache = {
    storyList: new Map<string, Story>(),
    installed: new Set<string>(),
  };

  getStoryList(): Story[] {
    return [...this.cache.storyList.values()];
  }

  setCache(id: string): void {
    this.cache.installed.add(id);
  }

  hasInstalled(id: string): boolean {
    return this.cache.installed.has(id);
  }

  init(list: Story[]) {
    list.forEach((item) => {
      this.cache.storyList.set(item.id || item.storyId, item);
    });
  }

  async install(
    info?: installInfo,
    isCache?: boolean
  ): Promise<Story[] | void> {
    const needInstallList: Set<string> = new Set();
    if (Array.isArray(info?.list) && info.list.length > 0) {
      info.list.forEach((item) => {
        !this.hasInstalled(item) && needInstallList.add(item);
      });
      [...needInstallList.values()].forEach((item) => {
        const { useWidget } = this.cache.storyList.get(item);
        if (useWidget && useWidget.length) {
          useWidget.forEach((widgetId: string) => {
            needInstallList.add(widgetId);
          });
        }
      });
      if ([...needInstallList.values()].length === 0) return;
    }
    if (
      info &&
      info.fields &&
      Array.isArray(info.list) &&
      info.list.length === 0 &&
      this.getStoryList().length > 0
    ) {
      // it's mean the base info had install
      // and we don't need to requset again
      return;
    }
    const response = await BuildApi_getStoriesJsonV2(
      info
        ? {
            storyIds: [...needInstallList.values()],
            fields: info.fields,
          }
        : undefined
    );
    return response.list.map((item) => {
      const id = item.id || item.storyId;
      isCache && this.setCache(id);
      let storyItem = this.cache.storyList.get(id);
      storyItem = _.mergeWith({}, storyItem, item, (o, s) =>
        _.isNull(s) ? o : s
      );
      // transform
      const newItem = {
        ...storyItem,
        storyId: storyItem.id || storyItem.storyId,
        conf: storyItem.examples || storyItem.conf,
        type: storyItem.type === "atom-brick" ? "brick" : storyItem.type,
      };
      delete newItem.id;
      delete newItem.examples;

      this.cache.storyList.set(id, newItem);
      return newItem;
    }) as Story[];
  }
}
