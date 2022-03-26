import { ModelDefinition, SchemaItemProperty } from "./interfaces";
import { calcModelDefinition } from "./processor";

export class ContractContext {
  static instance: ContractContext;
  private _modelDefinitionSet = new Map<string, ModelDefinition>();

  constructor(list: ModelDefinition[]) {
    list?.forEach((item) => {
      this._modelDefinitionSet.set(item.name, item);
    });
  }

  getModelDefinition(): ModelDefinition[] {
    const list = [];
    for (const [, modelDefinition] of this._modelDefinitionSet) {
      list.push(modelDefinition);
    }

    return list;
  }

  addModelDefinition(newModelList: ModelDefinition[]): void {
    newModelList?.forEach((model) => {
      this._modelDefinitionSet.set(model.name, model);
    });
  }

  updateModelDefinition(name: string, modelList: ModelDefinition[]): void {
    const removedModelList = this.getChildrenModelDefinition(name);
    removedModelList.forEach((model) => {
      this._modelDefinitionSet.delete(model.name);
    });

    modelList.forEach((model) => {
      this._modelDefinitionSet.set(model.name, model);
    });
  }

  private _getChildrenModelDefinition(
    fields: SchemaItemProperty[],
    modelList: ModelDefinition[],
    parentModels: string[]
  ): void {
    fields?.forEach((item) => {
      const modelName = calcModelDefinition(item);
      const find = this._modelDefinitionSet.get(modelName);

      if (find) {
        const hasSelfRef = parentModels.includes(modelName);

        if (!hasSelfRef) {
          modelList.push(find);
          parentModels.push(modelName);
          if (find.fields) {
            this._getChildrenModelDefinition(
              find.fields,
              modelList,
              parentModels
            );
          }
        }
      } else {
        if (item.fields) {
          this._getChildrenModelDefinition(
            item.fields,
            modelList,
            parentModels
          );
        }
      }
    });
  }

  getChildrenModelDefinition(name: string): ModelDefinition[] {
    const list: ModelDefinition[] = [];
    const parentModels: string[] = [];
    const model = this._modelDefinitionSet.get(name);

    if (!model) return [];

    list.push(model);
    parentModels.push(model.name);

    this._getChildrenModelDefinition(model.fields, list, parentModels);

    return list;
  }

  static getInstance(list?: ModelDefinition[]): ContractContext {
    if (!this.instance) {
      this.instance = new ContractContext(list);
    }
    return this.instance;
  }

  static cleanInstance(): void {
    if (this.instance) {
      this.instance = null;
    }
  }
}
