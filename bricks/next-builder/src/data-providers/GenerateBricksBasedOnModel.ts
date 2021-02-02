import { createProviderClass } from "@next-core/brick-utils";
import { find, flatten, uniqueId, isNil, filter } from "lodash";
import { AttrBrickConfList } from "./GetAttrBrickConf";

export interface Attribute {
  name: string;
  id: string;
  required: boolean;
  value: {
    type: string;
    regex?: string[];
  };
}

export interface GenerateBricksBasedOnModelParams {
  brickType: "table" | "forms" | "descriptions";
  attrBrickConfList: AttrBrickConfList[];
  attrCustomBrickConfMap: Record<string, any>;
  parentId?: string;
  selectedAttrRowKeys?: string[];
  tableFrontSearch?: boolean;
}

interface BrickDefinition {
  brick: string;
  properties: Record<string, any>;
  id?: string;
  parentId?: string;
  events?: Record<string, any>;
  mountPoint?: string;
  ref?: string;
}

interface Nodes {
  id?: string;
  parentId?: string;
  mountPoint?: string;
  brick?: {
    brick?: string;
    properties?: string;
    events?: string;
    ref?: string;
  };
}

export function GenerateBricksBasedOnModel(
  params: GenerateBricksBasedOnModelParams
): Nodes[] {
  let brickNodes: BrickDefinition[];
  const attrBrickConfListToGenerate = filter(
    params.attrBrickConfList,
    (v) =>
      isNil(params.selectedAttrRowKeys) ||
      params.selectedAttrRowKeys.includes(v.rowKey)
  );
  if (params.brickType === "forms") {
    const getChildren = (bricks: Nodes[]): Nodes[] => {
      bricks.map((brick) => {
        brick.id = uniqueId();
        brick.parentId = "0";
        return brick;
      });
      return bricks;
    };
    const getAttrBrickConf = attrBrickConfListToGenerate.map((attr) => {
      const defaultConf = params.attrCustomBrickConfMap[attr.instanceId];
      if (defaultConf) {
        return getChildren(
          find(attr.attrBrickConf.options, ["id", defaultConf.brickConfId])
            .brickConf
        );
      } else {
        return getChildren(attr.attrBrickConf.options[0].brickConf);
      }
    });
    // Todo(lynette): sort
    brickNodes = [
      {
        id: "0",
        brick: "forms.general-form",
        ref: "general-form",
      },
      ...flatten(getAttrBrickConf),
      {
        id: uniqueId(),
        brick: "forms.general-buttons",
        parentId: "0",
        properties: {
          showCancelButton: true,
          submitText: "提交",
          cancelText: "取消",
        },
        mountPoint: "items",
      },
    ];
  } else if (params.brickType === "table") {
    brickNodes = [
      {
        brick: "basic-bricks.general-card",
        id: "0",
      },
      {
        brick: "container-brick.search-bar",
        id: "1",
        parentId: "0",
        mountPoint: "content",
      },
      ...(params.tableFrontSearch
        ? [
            {
              brick: "presentational-bricks.brick-input",
              id: "2",
              parentId: "1",
              mountPoint: "start",
              properties: {
                shouldUpdateUrlParams: false,
                placeholder: "Search keyword",
              },
              events: {
                "input.emit": [
                  {
                    targetRef: "brick-table",
                    method: "filterSourceData",
                  },
                ],
              },
            },
          ]
        : [
            {
              brick: "presentational-bricks.brick-general-search",
              id: "2",
              parentId: "1",
              mountPoint: "start",
              properties: {
                q: "${query.q}",
                defaultArgs: [{ field: "page", value: 1 }],
              },
            },
          ]),
      {
        brick: "presentational-bricks.brick-table",
        ref: "brick-table",
        id: "3",
        parentId: "0",
        mountPoint: "content",
        properties: {
          showCard: false,
          ...(params.tableFrontSearch
            ? {
                frontSearch: true,
                shouldUpdateUrlParams: false,
                page: 1,
                pageSize: 10,
              }
            : {
                sort: "${query.sort}",
                order: "${query.order}",
                page: "${query.page=1|number}",
                pageSize: "${query.pageSize=10|number}",
              }),
          ...(find(attrBrickConfListToGenerate, (attr) => attr.unique === true)
            ? {
                rowKey: find(
                  attrBrickConfListToGenerate,
                  (attr) => attr.unique === true
                ).id,
              }
            : {}),
          columns: attrBrickConfListToGenerate?.map((attr, index) => {
            const useBrick = params.attrCustomBrickConfMap?.[attr.instanceId]
              ? find(attr.attrBrickConf.options, [
                  "id",
                  params.attrCustomBrickConfMap[attr.instanceId].brickConfId,
                ]).brickConf
              : attr.attrBrickConf.options?.[0]?.brickConf;
            return {
              title: attr.name,
              dataIndex: attr.id,
              ...(useBrick?.[0].brick === "text" ? {} : { useBrick }),
            };
          }),
        },
      },
    ];
  } else {
    brickNodes = [
      {
        brick: "presentational-bricks.brick-descriptions",
        ref: "brick-descriptions",
        properties: {
          itemList: attrBrickConfListToGenerate?.map((attr) => {
            const useBrick = params.attrCustomBrickConfMap?.[attr.instanceId]
              ? find(attr.attrBrickConf.options, [
                  "id",
                  params.attrCustomBrickConfMap[attr.instanceId].brickConfId,
                ]).brickConf
              : attr.attrBrickConf.options?.[0]?.brickConf;
            return {
              label: attr.name,
              field: attr.id,
              ...(useBrick?.[0].brick === "text" ? {} : { useBrick }),
            };
          }),
          column: attrBrickConfListToGenerate?.length % 2 === 0 ? 2 : 3,
        },
      },
    ];
  }
  const nodes = brickNodes.map((v) => {
    return {
      id: v.id,
      type: "brick",
      ...(isNil(v.mountPoint)
        ? {}
        : {
            mountPoint: v.mountPoint,
          }),
      parentId: v.parentId ?? params.parentId,
      brick: {
        brick: v.brick,
        ...(isNil(v.ref)
          ? {}
          : {
              ref: v.ref,
            }),
        ...(isNil(v.events)
          ? {}
          : {
              events: JSON.stringify(v.events, null, 2),
            }),
        ...(isNil(v.properties)
          ? {}
          : {
              properties: JSON.stringify(v.properties, null, 2),
            }),
      },
    };
  });
  return nodes;
}

customElements.define(
  "next-builder.provider-generate-bricks-based-on-model",
  createProviderClass(GenerateBricksBasedOnModel)
);
