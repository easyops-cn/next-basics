import { http } from "@next-core/brick-http";
import { providerDoc } from "./processors";
import originalDoc from "./ucpro.mock";

jest.spyOn(http, "get").mockResolvedValue(originalDoc);

describe("providerDoc", () => {
  it("should work for providers-of-ucpro.desktop-api-clone", async () => {
    const docData = await providerDoc("ucpro", "desktop-api-clone");
    expect(docData).toMatchObject({
      serviceId: "ucpro",
      brickName: "desktop-api-clone",
      comment: "克隆大产品",
      endpoint: "GET /api/v1/clone",
      parameters: [
        {
          kindString: "Parameter",
          name: "data",
          type: {
            id: 6135,
            name: "CloneRequestBody",
            type: "reference",
          },
        },
      ],
      returns: {
        name: "Partial",
        type: "reference",
      },
      usedReferenceIds: [6135, 6111],
    });
    expect(docData.references.has(6135)).toBe(true);
    expect(docData.references.has(6111)).toBe(true);
  });

  it("should work for providers-of-ucpro.desktop-api-running-tasks", async () => {
    const docData = await providerDoc("ucpro", "desktop-api-running-tasks");
    expect(docData).toMatchObject({
      serviceId: "ucpro",
      brickName: "desktop-api-running-tasks",
      comment: "正在安装或卸载的小产品任务",
      parameters: [],
      returns: {
        id: 6181,
        name: "RunningTasksResponseBody",
        type: "reference",
      },
      usedReferenceIds: [6181],
    });
    expect(docData.references.has(6181)).toBe(true);
  });

  it("should work for providers-of-ucpro.desktop-api-get-app-dependencies", async () => {
    const docData = await providerDoc(
      "ucpro",
      "desktop-api-get-app-dependencies"
    );
    expect(docData).toMatchObject({
      serviceId: "ucpro",
      brickName: "desktop-api-get-app-dependencies",
      comment: "获取在线商店应用当前版本的依赖信息",
      parameters: [
        {
          kindString: "Parameter",
          name: "params",
          type: {
            id: 6147,
            name: "GetAppDependenciesRequestParams",
            type: "reference",
          },
        },
      ],
      returns: {
        id: 6149,
        name: "GetAppDependenciesResponseBody",
        type: "reference",
      },
      usedReferenceIds: [6147, 6149],
    });
    expect(docData.references.has(6147)).toBe(true);
    expect(docData.references.has(6149)).toBe(true);
  });

  it("should work for providers-of-ucpro.desktop-api-get-task-status", async () => {
    const docData = await providerDoc("ucpro", "desktop-api-get-task-status");
    expect(docData).toMatchObject({
      serviceId: "ucpro",
      brickName: "desktop-api-get-task-status",
      comment: "查询部署任务状态",
      parameters: [
        {
          kindString: "Parameter",
          name: "taskId",
        },
      ],
      returns: {
        id: 6158,
        name: "GetTaskStatusResponseBody",
        type: "reference",
      },
      usedReferenceIds: [6158],
    });
    expect(docData.references.has(6158)).toBe(true);
  });

  it("should work for providers-of-ucpro.desktop-api-install-app", async () => {
    const docData = await providerDoc("ucpro", "desktop-api-install-app");
    expect(docData).toMatchObject({
      serviceId: "ucpro",
      brickName: "desktop-api-install-app",
      comment: "安装小产品",
      parameters: [
        {
          kindString: "Parameter",
          name: "data",
        },
      ],
      returns: {
        id: 6173,
        name: "InstallAppResponseBody",
        type: "reference",
      },
      usedReferenceIds: [6170, 6173],
    });
    expect(docData.references.has(6170)).toBe(true);
    expect(docData.references.has(6173)).toBe(true);
  });
});
