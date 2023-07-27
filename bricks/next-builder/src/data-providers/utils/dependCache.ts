import { PackageAloneApi_listDependencies } from "@next-sdk/next-builder-sdk";

class DependCache {
  #dependCacheList: string[] = [];
  #projectId: string;

  static instance: Map<string, DependCache> = new Map();
  static getInstance(projectId: string): DependCache {
    if (!this.instance.get(projectId)) {
      this.instance.set(projectId, new DependCache(projectId));
    }
    return this.instance.get(projectId);
  }

  constructor(projectId: string) {
    this.#projectId = projectId;
  }

  async update(): Promise<void> {
    const result = await PackageAloneApi_listDependencies(this.#projectId);
    this.#dependCacheList = result.list.map((item) => item.name);
  }

  getList = (): string[] => {
    return this.#dependCacheList;
  };
}

export default DependCache;
