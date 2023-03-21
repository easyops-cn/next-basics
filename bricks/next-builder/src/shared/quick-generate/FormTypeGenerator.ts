import { get, pick } from "lodash";
import { CommonTypeGenerator } from "./CommTypeGenerator";
import {
  BrickInfoItem,
  ModelConfig,
  UpdateType,
  NormalizedResult,
  Field,
  BaseParams,
} from "./interface";

export class FormTypeGenerator extends CommonTypeGenerator {
  constructor(params: BaseParams) {
    super(params);
  }

  processFormProvider(): UpdateType {
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
          values: this.generatorProviderName(
            this.dataType,
            this.brickData.instanceId
          ),
        }),
      },
    };

    return updatedFormNode;
  }

  getTargetBrick(brick: string): BrickInfoItem {
    return this.useBrickList.find((item) => item.brick === brick);
  }

  getCreateData(modelConfig: ModelConfig): NormalizedResult {
    const { fields, provider } = modelConfig;

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
      update: provider ? [this.processFormProvider()] : [],
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

  getDefaultMergeValue(): NormalizedResult {
    return {
      insert: [],
      update: [],
      delete: [],
    };
  }

  handleInsert(field: Field, data: NormalizedResult): void {
    const targetBrick = this.getTargetBrick(field.brick);

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
}
