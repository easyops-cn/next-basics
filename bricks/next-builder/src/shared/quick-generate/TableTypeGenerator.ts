import { get, pick } from "lodash";
import { CommonTypeGenerator } from "./CommTypeGenerator";
import {
  ModelConfig,
  NormalizedResult,
  Field,
  Column,
  BaseParams,
} from "./interface";

export class TableTypeGenerator extends CommonTypeGenerator {
  needCustomProcessor = true;
  constructor(params: BaseParams) {
    super(params);
  }

  getBrickProperties(): Record<string, any> {
    return JSON.parse(get(this.contextModel, "brick[0].properties", "{}"));
  }

  getCreateData(modelConfig: ModelConfig): NormalizedResult {
    const { fields, dataName } = modelConfig;

    const columns = fields.reduce((arr, item) => {
      const targetBrick = this.useBrickList.find(
        (row) => row.brick === item.brick
      );

      arr.push({
        dataIndex: item.id,
        key: item.id,
        title: item.id,
        useBrick: [
          {
            brick: targetBrick.brick?.split(":")[0],
            properties: targetBrick?.propertyGenerator?.({
              value: `<% DATA.cellData %>`,
            }),
          },
        ],
      });

      return arr;
    }, []);

    const brickProperties = this.getBrickProperties();

    const update = {
      objectId: "STORYBOARD_BRICK",
      instanceId: this.brickData.instanceId,
      property: {
        ...pick(this.brickData, this.updatedBrickFields),
        properties: JSON.stringify({
          ...brickProperties,
          columns: columns,
          dataSource: this.generatorProviderName({
            dataName,
            dataType: this.dataType,
            instanceId: this.brickData.instanceId,
          }),
        }),
      },
    };

    return {
      update: [update],
    };
  }

  calcPrevFields(): Field[] {
    const brickProperties = this.getBrickProperties();

    const columns: Column[] = brickProperties.columns ?? [];

    const fields = [] as Field[];

    columns.forEach((col) => {
      const attr = this.attrMap.get(col.dataIndex);
      const useBrick = [].concat(col.useBrick);

      if (attr) {
        fields.push({
          name: attr.name,
          id: attr.id,
          type: attr.value.type,
          brick: useBrick && useBrick[0]?.brick,
        });
      }
    });

    return fields;
  }

  getDefaultMergeValue(): Column[] {
    const properties = JSON.parse(
      get(this.contextModel, "brick[0].properties", "{}")
    );
    const columns = properties.columns ?? [];

    return columns;
  }

  handleInsert(field: Field, columns: Column[]): void {
    const targetBrick = this.useBrickList.find(
      (row) => row.brick === field.brick
    );

    columns.push({
      key: field.id,
      dataIndex: field.id,
      title: field.id,
      ...(targetBrick?.brick
        ? {
            useBrick: [
              {
                brick: field.brick,
                properties: targetBrick?.propertyGenerator?.({
                  value: `<% DATA.cellData %>`,
                }),
              },
            ],
          }
        : {}),
    });
  }

  handleUpdate(field: Field, columns: Column[]): void {
    const targetBrick = this.useBrickList.find(
      (row) => row.brick === field.brick
    );

    const find = columns.find((item) => item.dataIndex === field.id);

    if (find) {
      find.useBrick = [
        {
          brick: field.brick,
          properties: targetBrick?.propertyGenerator?.({
            value: `<% DATA.cellData %>`,
          }),
        },
      ];
    }
  }

  handleDelete(field: Field, columns: Column[]): void {
    const findIndex = columns.findIndex((item) => item.dataIndex === field.id);

    if (findIndex !== -1) {
      columns.splice(findIndex, 1);
    }
  }
  processFinalMergeValue(
    columns: Column[],
    modelConfig: ModelConfig
  ): NormalizedResult {
    const { dataName } = modelConfig;
    const brickProperties = this.getBrickProperties();

    return {
      update: [
        {
          objectId: "STORYBOARD_BRICK",
          instanceId: this.brickData.instanceId,
          property: {
            ...pick(this.brickData, this.updatedBrickFields),
            properties: JSON.stringify({
              ...brickProperties,
              columns: columns,
              dataSource: this.generatorProviderName({
                dataName,
                dataType: this.dataType,
                instanceId: this.brickData.instanceId,
              }),
            }),
          },
        },
      ],
    };
  }
}
