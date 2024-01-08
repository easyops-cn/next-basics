import { ModelDefinition, SchemaItemProperty } from "./interfaces";
import { calcModelDefinition } from "./processor";

export class ContractContext {
  static instance: ContractContext;
  private _modelDefinitionMap = new Map<string, ModelDefinition>();
  private _importMap = new Map<string, string>();
  private _usedModelIdSet = new Set<string>();
  public customTypeList: string[];

  constructor(
    definitionList: ModelDefinition[],
    importList: string[],
    customTypeList: string[] = [],
    useModelIdList: string[] = []
  ) {
    definitionList?.forEach((item) => {
      this._modelDefinitionMap.set(item.name, item);
    });

    importList?.forEach((namespace) => {
      const key = namespace.split(".").pop();
      this._importMap.set(key, namespace);
    });

    useModelIdList?.forEach((modelId) => {
      this._usedModelIdSet.add(modelId);
    });

    this.customTypeList = customTypeList;
  }

  getModelDefinition(): ModelDefinition[] {
    const list = [];
    for (const [, modelDefinition] of this._modelDefinitionMap) {
      list.push(modelDefinition);
    }

    return list;
  }

  addModelDefinition(newModelList: ModelDefinition[]): void {
    newModelList?.forEach((model) => {
      this._modelDefinitionMap.set(model.name, model);
    });
  }

  getImportNamespaceList(): string[] {
    return Array.from(this._importMap.values());
  }

  addImportNamespace(key: string, namespace: string): void {
    this._importMap.set(key, namespace);
  }

  hasImportNamespace(key: string): boolean {
    return this._importMap.has(key);
  }

  getSingleNamespace(key: string): string {
    return this._importMap.get(key);
  }

  addUsedModelId(modelId: string): void {
    this._usedModelIdSet.add(modelId);
  }

  getUsedModelId(): string[] {
    return Array.from(this._usedModelIdSet);
  }

  static getInstance(
    definitionList?: ModelDefinition[],
    importList?: string[],
    customTypeList?: string[],
    useModelIdList?: string[]
  ): ContractContext {
    if (!this.instance) {
      this.instance = new ContractContext(
        definitionList,
        importList,
        customTypeList,
        useModelIdList
      );
    }
    return this.instance;
  }

  static cleanInstance(): void {
    // istanbul ignore else
    if (this.instance) {
      this.instance = null;
    }
  }
}
