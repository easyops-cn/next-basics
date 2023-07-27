import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { CreateFunctionContract } from "./CreateFunctionContract";

jest.mock("@next-sdk/cmdb-sdk");

const mockCreateInstance = InstanceApi_createInstance as jest.Mock;

describe("CreateFunctionContract", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new namespace, a new code project and a new function contract", async () => {
    mockCreateInstance.mockResolvedValueOnce({
      instanceId: "instance-of-my-namespace",
    });
    await CreateFunctionContract({
      contract: {
        name: "my-function-contract",
      },
      namespaceId: "my.namespace",
      codeProject: {
        projectId: "my-code-project",
      },
    });
    await (global as any).flushPromises();
    expect(mockCreateInstance).toBeCalledTimes(3);
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      1,
      "FLOW_BUILDER_CONTRACT_NAMESPACE@EASYOPS",
      {
        id: "my.namespace",
      }
    );
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      2,
      "FLOW_BUILDER_CODE_PROJECT@EASYOPS",
      {
        projectId: "my-code-project",
      }
    );
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      3,
      "FLOW_BUILDER_FUNCTION_CONTRACT@EASYOPS",
      {
        name: "my-function-contract",
        namespace: "instance-of-my-namespace",
        namespaceId: "my.namespace",
      }
    );
  });

  it("should create a new namespace and a new function contract", async () => {
    mockCreateInstance.mockResolvedValueOnce({
      instanceId: "instance-of-my-namespace",
    });
    await CreateFunctionContract({
      contract: {
        name: "my-function-contract",
      },
      namespaceId: "my.namespace",
    });
    await (global as any).flushPromises();
    expect(mockCreateInstance).toBeCalledTimes(2);
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      1,
      "FLOW_BUILDER_CONTRACT_NAMESPACE@EASYOPS",
      {
        id: "my.namespace",
      }
    );
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      2,
      "FLOW_BUILDER_FUNCTION_CONTRACT@EASYOPS",
      {
        name: "my-function-contract",
        namespace: "instance-of-my-namespace",
        namespaceId: "my.namespace",
      }
    );
  });

  it("should create a new code project and a new function contract", async () => {
    await CreateFunctionContract({
      contract: {
        name: "my-function-contract",
      },
      namespaceInstanceId: "instance-of-my-namespace",
      namespaceId: "my.namespace",
      codeProject: {
        projectId: "my-code-project",
      },
    });
    await (global as any).flushPromises();
    expect(mockCreateInstance).toBeCalledTimes(2);
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      1,
      "FLOW_BUILDER_CODE_PROJECT@EASYOPS",
      {
        projectId: "my-code-project",
      }
    );
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      2,
      "FLOW_BUILDER_FUNCTION_CONTRACT@EASYOPS",
      {
        name: "my-function-contract",
        namespace: "instance-of-my-namespace",
        namespaceId: "my.namespace",
      }
    );
  });

  it("should create a new function contract", async () => {
    await CreateFunctionContract({
      contract: {
        name: "my-function-contract",
      },
      namespaceInstanceId: "instance-of-my-namespace",
      namespaceId: "my.namespace",
    });
    await (global as any).flushPromises();
    expect(mockCreateInstance).toBeCalledTimes(1);
    expect(mockCreateInstance).toHaveBeenNthCalledWith(
      1,
      "FLOW_BUILDER_FUNCTION_CONTRACT@EASYOPS",
      {
        name: "my-function-contract",
        namespace: "instance-of-my-namespace",
        namespaceId: "my.namespace",
      }
    );
  });
});
