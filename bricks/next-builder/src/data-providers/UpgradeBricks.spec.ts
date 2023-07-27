import { UpgradeBricks } from "./UpgradeBricks";

const mockMixUpdateInstace = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_mixUpdateInstance: (...args) => mockMixUpdateInstace(args),
  InstanceGraphApi_traverseGraphV2: () => jest.fn(),
}));

jest.mock("./BackupBricks", () => ({
  BackupBricks: (_: any): Promise<any> => {
    return Promise.resolve({
      rootNode: {
        instanceId: "mock-instanceId",
      },
      newWrapperBrick: {
        instanceId: "mock-new-wrapper-instanceId",
      },
    });
  },
}));

jest.mock("./UpdateBricksArrange", () => ({
  UpdateBricksArrange: (_: any): Promise<any> => {
    return Promise.resolve([
      {
        _object_id: "STORYBOARD_TEMPLATE",
        instanceId: "mock-instanceId-template",
        state:
          '[{"name":"name"},{"name":"age"},{"name":"cardProps"},{"name":"data_0","resolve":{"useProvider":"providers-of-cmdb.get-detail","args":["abc","STORYBOARD_TEMPLATE"]}},{"name":"data_1","resolve":{"useProvider":"providers-of-cmdb.query-search-v3","args":["STORYBOARD_TEMPLATE","xxx"]}}]',
        proxy: "{}",
      },
    ]);
  },
}));

jest.mock("./UpdateBricksToV3", () => ({
  UpdateBricksToV3: (): Promise<any> => {
    return Promise.resolve([
      {
        _object_id: "STORYBOARD_TEMPLATE",
        instanceId: "mock-instanceId-template",
        state:
          '[{"name":"name"},{"name":"age"},{"name":"cardProps"},{"name":"data_0","resolve":{"useProvider":"providers-of-cmdb.get-detail","args":["abc","STORYBOARD_TEMPLATE"]}},{"name":"data_1","resolve":{"useProvider":"providers-of-cmdb.query-search-v3","args":["STORYBOARD_TEMPLATE","xxx"]}}]',
        proxy: "{}",
      },
    ]);
  },
}));

describe("UpgradeBricks", () => {
  it("should work", async () => {
    await UpgradeBricks({
      appId: "mock-app-id",
      rootId: "mock-root-id",
      options: {
        arrange: true,
        toV3: true,
      },
    });

    expect(mockMixUpdateInstace).toBeCalledTimes(2);
  });
});
