import { InstanceApi_deleteInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_deleteStoryboardNode } from "@next-sdk/next-builder-sdk";
import { DeleteThemeTemplate } from "./DeleteThemeTemplate";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

(InstanceApi_deleteInstance as jest.Mock).mockImplementation(
  (objectId, instanceId) => ({ instanceId })
);

describe("DeleteThemeTemplate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", async () => {
    expect(
      await DeleteThemeTemplate({
        layoutInstanceId: "layout-a",
        templateId: "T-01",
        snippetId: "S-02",
      })
    ).toEqual({
      instanceId: "layout-a",
    });
    expect(StoryboardApi_deleteStoryboardNode).toBeCalledTimes(2);
    expect(StoryboardApi_deleteStoryboardNode).toHaveBeenNthCalledWith(
      1,
      "T-01"
    );
    expect(StoryboardApi_deleteStoryboardNode).toHaveBeenNthCalledWith(
      2,
      "S-02"
    );
  });

  it("should ignore template and snippet", async () => {
    expect(
      await DeleteThemeTemplate({
        layoutInstanceId: "layout-a",
      })
    ).toEqual({
      instanceId: "layout-a",
    });
    expect(StoryboardApi_deleteStoryboardNode).toBeCalledTimes(0);
  });
});
