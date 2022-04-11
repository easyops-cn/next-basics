import { PasteBricks, PasteBricksParams } from "./PasteBricks";
// import {
//   InstanceGraphApi_traverseGraphV2,
// } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_CloneBricksRequestBody } from "@next-sdk/next-builder-sdk";
import {
  InstanceRelationApi_AppendRequestBody,
  InstanceRelationApi_SetRequestBody,
} from "@next-sdk/cmdb-sdk";

const mockRelationApiAppend = jest.fn();
const mockRelationApiSet = jest.fn();
const mockCloneBrick = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceRelationApi_append: (...args) => mockRelationApiAppend(args),
  InstanceRelationApi_set: (...args) => mockRelationApiSet(args),
  InstanceGraphApi_traverseGraphV2: (params) =>
    Promise.resolve(
      params.object_id === "STORYBOARD_TEMPLATE"
        ? {
            topic_vertices: [
              {
                instanceId: "template-a",
                templateId: "tpl-basic-view",
              },
              {
                instanceId: "template-b",
                templateId: "tpl-basic-header",
              },
              {
                instanceId: "template-c",
                templateId: "tpl-basic-footer",
              },
              {
                instanceId: "template-d",
                templateId: "tpl-basic-header-title",
              },
            ],
            vertices: [
              {
                instanceId: "brick-a",
                brick: "tpl-basic-view",
              },
              {
                instanceId: "brick-b",
                brick: "tpl-basic-header",
              },
              {
                instanceId: "brick-c",
                brick: "tpl-basic-footer",
              },
              {
                instanceId: "brick-d",
                brick: "tpl-basic-header-title",
              },
              {
                instanceId: "brick-e",
                brick: "div",
              },
            ],
            edges: [
              {
                out: "template-a",
                in: "brick-a",
                out_name: "children",
              },
              {
                in: "brick-b",
                out: "brick-a",
                out_name: "children",
              },
              {
                in: "brick-b",
                out: "brick-a",
                out_name: "children",
              },
              {
                in: "brick-d",
                out: "brick-b",
                out_name: "children",
              },
              {
                in: "brick-c",
                out: "brick-a",
                out_name: "children",
              },
              {
                in: "brick-e",
                out: "brick-a",
                out_name: "children",
              },
            ],
          }
        : {
            topic_vertices: [
              {
                instanceId: "brick-tpl-basic-view",
                brick: "tpl-basic-view",
                type: "brick",
              },
            ],
            vertices: [
              {
                instanceId: "b",
                brick: "tpl-basic-header",
              },
              {
                instanceId: "c",
                brick: "tpl-basic-footer",
              },
              {
                instanceId: "d",
                brick: "brick-content",
              },
            ],
            edges: [
              {
                out: "brick-tpl-basic-view",
                in: "b",
                out_name: "children",
              },
              {
                out: "brick-tpl-basic-view",
                in: "c",
                out_name: "children",
              },
              {
                out: "brick-tpl-basic-view",
                in: "d",
                out_name: "children",
              },
            ],
          }
    ),
}));

jest.mock("@next-sdk/next-builder-sdk", () => ({
  StoryboardApi_cloneBricks: (...args) => mockCloneBrick(args),
}));

function calledExpect(fn: jest.Mock, param: unknown): void {
  if (typeof param === "number") {
    expect(fn).toBeCalledTimes(param);
  } else if (param) {
    expect(fn.mock.calls[0][0]).toEqual(param);
  }
}

describe("PasteBricks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const commomParams = {
    sourceBrickInstanceId: "test",
    sourceProjectInstanceId: "test1",
    sourceBrickId: "test",
    newRelatedInstanceId: "test",
    newProjectInstanceId: "test2",
    newParentBrickId: "test",
    newAppId: "test",
    linked: true,
  };

  it.each<
    [
      PasteBricksParams,
      Array<StoryboardApi_CloneBricksRequestBody> | boolean | number,
      Array<string | InstanceRelationApi_SetRequestBody> | boolean | number,
      Array<string | InstanceRelationApi_AppendRequestBody> | boolean | number
    ]
  >([
    [
      {
        ...commomParams,
        type: "copy",
      },
      [
        {
          sourceBrickId: "test",
          newParentBrickId: "test",
          newAppId: "test",
        },
      ],
      false,
      [
        "STORYBOARD_TEMPLATE",
        "project",
        {
          instance_ids: [
            "template-a",
            "template-b",
            "template-d",
            "template-c",
          ],
          related_instance_ids: ["test2"],
        },
      ],
    ],
    [
      {
        ...commomParams,
        linked: true,
        type: "cut",
      },
      false,
      [
        "STORYBOARD_NODE",
        "parent",
        {
          instance_ids: ["test"],
          related_instance_ids: ["test"],
        },
      ],
      [
        "STORYBOARD_TEMPLATE",
        "project",
        {
          instance_ids: [
            "template-a",
            "template-b",
            "template-d",
            "template-c",
          ],
          related_instance_ids: ["test2"],
        },
      ],
    ],
    [
      {
        ...commomParams,
        linked: false,
        type: "copy",
      },
      [
        {
          sourceBrickId: "test",
          newParentBrickId: "test",
          newAppId: "test",
        },
      ],
      false,
      0,
    ],
    [
      {
        ...commomParams,
        linked: true,
        sourceProjectInstanceId: "abc",
        newProjectInstanceId: "abc",
        type: "cut",
      },
      false,
      [
        "STORYBOARD_NODE",
        "parent",
        {
          instance_ids: ["test"],
          related_instance_ids: ["test"],
        },
      ],
      0,
    ],
  ])(
    "PasteBricks(%j) should work",
    async (params, copyParams, cutParams, linkParams) => {
      await PasteBricks(params);
      await (global as any).flushPromises();
      calledExpect(mockCloneBrick, copyParams);
      calledExpect(mockRelationApiSet, cutParams);
      calledExpect(mockRelationApiAppend, linkParams);
    }
  );
});
