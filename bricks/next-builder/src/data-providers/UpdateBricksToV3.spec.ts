import { UpdateBrickToV3 } from "./UpdateBricksToV3";

const mockMixUpdateInstace = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_mixUpdateInstance: (...args) => mockMixUpdateInstace(args),
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

jest.mock("./UpdateBricks", () => ({
  UpdateRouteOrTemplate: (_: any): Promise<any> => {
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

describe("UpdateBrickToV3", () => {
  it("should work", async () => {
    await UpdateBrickToV3({
      appId: "mock-app-id",
      rootId: "mock-root-id",
    });

    expect(mockMixUpdateInstace).toBeCalledTimes(1);
  });
});
