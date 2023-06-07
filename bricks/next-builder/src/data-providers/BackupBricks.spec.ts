import { BackupBricks } from "./BackupBricks";

const mockCreateInstance = jest.fn((_) => {
  return {
    id: "mock-create-id",
    instanceId: "mock-create-instanceId",
  };
});
const mockMixUpdateInstace = jest.fn();
const mockCloneBrick = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_createInstance: (...args) => mockCreateInstance(args),
  InstanceApi_mixUpdateInstance: (...args) => mockMixUpdateInstace(args),
  InstanceGraphApi_traverseGraphV2: () =>
    Promise.resolve({
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
          _object_id: "STORYBOARD_BRICK",
          brick: "tpl-basic-header",
        },
        {
          instanceId: "c",
          _object_id: "STORYBOARD_BRICK",
          brick: "tpl-basic-footer",
        },
        {
          instanceId: "d",
          _object_id: "STORYBOARD_BRICK",
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
    }),
}));

jest.mock("@next-sdk/next-builder-sdk", () => ({
  StoryboardApi_cloneBricks: (...args) => mockCloneBrick(args),
}));

describe("BackupBricks", () => {
  it("should work", async () => {
    const result = await BackupBricks({
      appId: "mock-app-id",
      rootId: "mock-root-id",
    });

    expect(mockCreateInstance).toHaveBeenNthCalledWith(1, [
      "STORYBOARD_BRICK",
      {
        alias: "v2",
        brick: ":if",
        if: "false",
        dataSource: false,
        mountPoint: "bricks",
        parent: "brick-tpl-basic-view",
        type: "brick",
      },
    ]);
    expect(mockCreateInstance).toHaveBeenNthCalledWith(2, [
      "STORYBOARD_BRICK",
      {
        alias: "v3",
        brick: ":if",
        dataSource: true,
        mountPoint: "bricks",
        parent: "brick-tpl-basic-view",
        type: "brick",
      },
    ]);

    expect(mockMixUpdateInstace).toHaveBeenNthCalledWith(1, [
      {
        data: [
          {
            instanceId: "b",
            parent: "mock-create-instanceId",
            _object_id: "STORYBOARD_BRICK",
          },
          {
            instanceId: "c",
            parent: "mock-create-instanceId",
            _object_id: "STORYBOARD_BRICK",
          },
          {
            instanceId: "d",
            parent: "mock-create-instanceId",
            _object_id: "STORYBOARD_BRICK",
          },
        ],
      },
    ]);
    expect(mockCloneBrick).toHaveBeenNthCalledWith(1, [
      {
        exclude: true,
        newAppId: "mock-app-id",
        newParentBrickId: "mock-create-id",
        sourceBrickId: "mock-create-id",
      },
    ]);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "newWrapperBrick": Object {
          "id": "mock-create-id",
          "instanceId": "mock-create-instanceId",
        },
        "rootNode": Object {
          "brick": "tpl-basic-view",
          "instanceId": "brick-tpl-basic-view",
          "type": "brick",
        },
      }
    `);
  });
});
