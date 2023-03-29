import { BrickConf } from "@next-core/brick-types";
import { get, pick, set } from "lodash";
import { CommonTypeGenerator } from "./CommTypeGenerator";
import {
  BrickInfoItem,
  ModelConfig,
  UpdateType,
  NormalizedResult,
  Field,
  BaseParams,
  SnippetParams,
  NormalizedSnippet,
  BrickData,
} from "./interface";

export class FormTypeGenerator extends CommonTypeGenerator {
  constructor(params: BaseParams) {
    super(params);
  }

  processFormProvider(modelConfig: ModelConfig): UpdateType {
    const { dataName } = modelConfig;

    const brickProperties = JSON.parse(
      get(this.contextModel, "brick[0].properties", "{}")
    );

    const updatedFormNode = {
      objectId: "STORYBOARD_BRICK",
      instanceId: this.brickData.instanceId,
      property: {
        ...pick(this.brickData, this.updatedBrickFields),
        properties: JSON.stringify({
          ...brickProperties,
          values: this.generatorProviderName({
            dataName,
            dataType: this.dataType,
            instanceId: this.brickData.instanceId,
          }),
        }),
      },
    };

    return updatedFormNode;
  }

  getTargetBrick(brick: string): BrickInfoItem {
    return this.useBrickList.find((item) => item.brick === brick);
  }

  getCreateData(modelConfig: ModelConfig): NormalizedResult {
    const { fields, dataName } = modelConfig;

    const createNodes = fields?.map((field) => {
      const targetBrick = this.getTargetBrick(field.brick);

      return {
        appId: this.appId,
        brick: field.brick,
        mountPoint: "items",
        parent: this.brickData.instanceId,
        type: "brick",
        properties: JSON.stringify(
          targetBrick?.propertyGenerator(
            field.id,
            this.attrMap.get(field.id).name,
            this.attrMap.get(field.id).required === "true"
          )
        ),
      };
    });

    return {
      insert: createNodes,
      update: dataName ? [this.processFormProvider(modelConfig)] : [],
    };
  }

  calcPrevFields(): Field[] {
    const formChildren = get(this.contextModel, "brick[0].children", []);

    const fields = [] as Field[];
    formChildren.forEach((c) => {
      const properties = JSON.parse(get(c, "properties", "{}"));
      const attr = this.attrMap.get(properties.name);
      // istanbul ignore else
      if (attr) {
        fields.push({
          name: attr.name,
          id: attr.id,
          type: attr.value.type,
          brick: c.brick,
          brickInstanceId: c.instanceId,
        });
      }
    });

    return fields;
  }

  getDefaultMergeValue(modelConfig: ModelConfig): NormalizedResult {
    const formData = this.processFormProvider(modelConfig);

    return {
      insert: [],
      update: [formData],
      delete: [],
    };
  }

  handleInsert(field: Field, data: NormalizedResult): void {
    const targetBrick = this.getTargetBrick(field.brick);

    // istanbul ignore else
    if (field.brick) {
      data.insert.push({
        appId: this.appId,
        brick: field.brick,
        mountPoint: "items",
        parent: this.brickData.instanceId,
        type: "brick",
        properties: JSON.stringify(
          targetBrick?.propertyGenerator(
            field.id,
            this.attrMap.get(field.id).name,
            this.attrMap.get(field.id).required === "true"
          )
        ),
      });
    }
  }

  handleUpdate(field: Field, data: NormalizedResult): void {
    const formChildren = get(this.contextModel, "brick[0].children", []);
    const find = formChildren.find(
      (item) => item.instanceId === field.brickInstanceId
    );

    // istanbul ignore else
    if (find) {
      const brickInfo = pick(find, this.updatedBrickFields);

      data.update.push({
        objectId: "STORYBOARD_BRICK",
        instanceId: find.instanceId,
        property: {
          ...brickInfo,
          brick: field.brick,
        },
      });
    }
  }

  handleDelete(field: Field, data: NormalizedResult): void {
    data.delete.push({
      objectId: "STORYBOARD_BRICK",
      instanceId: field.brickInstanceId,
    });
  }

  processSnippetData(snippetParams: SnippetParams): NormalizedSnippet {
    const { modelConfig, snippetData } = snippetParams;

    const { fields = [], dataName } = modelConfig;
    const {
      nodeData,
      parentNode,
      dragOverInstanceId,
      dragStatus,
      mountPoint,
      parent,
    } = snippetData;

    const list = fields.map((field) => {
      const targetBrick = this.useBrickList.find(
        (item) => item.brick === item.brick
      );
      return {
        brick: field.brick,
        properties: targetBrick?.propertyGenerator(
          field.id,
          this.attrMap.get(field.id).name,
          this.attrMap.get(field.id).required === "true"
        ),
      };
    });

    const properties: Record<string, any> = get(
      nodeData,
      "bricks[0].properties",
      {}
    );

    if (dataName) {
      properties.values = this.generatorProviderName({
        dataName,
        dataType: this.dataType,
        instanceId: this.brickData.instanceId,
      });

      set(nodeData, "bricks[0].properties", properties);
    }

    const formItems: BrickConf[] = get(
      nodeData,
      "bricks[0].slots.items.bricks"
    );

    // istanbul ignore else
    if (formItems) {
      formItems.unshift(...list);
    }

    return {
      appId: this.appId,
      dragOverInstanceId,
      dragStatus,
      mountPoint,
      brick: nodeData.brick,
      type: "brick",
      nodeData: nodeData,
      parent: parent || parentNode.instanceId,
      snippetBricks: nodeData,
    };
  }
}
