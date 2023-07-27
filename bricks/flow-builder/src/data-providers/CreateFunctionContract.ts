import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";

export interface CreateFunctionContractParams {
  contract: Record<string, unknown>;
  namespaceInstanceId?: string;
  namespaceId?: string;
  codeProject?: Record<string, unknown>;
}

export async function CreateFunctionContract({
  contract,
  namespaceInstanceId,
  namespaceId,
  codeProject,
}: CreateFunctionContractParams): Promise<Record<string, unknown>> {
  if (!namespaceInstanceId) {
    const namespace = await InstanceApi_createInstance(
      "FLOW_BUILDER_CONTRACT_NAMESPACE@EASYOPS",
      {
        id: namespaceId,
      }
    );
    namespaceInstanceId = namespace.instanceId;
  }
  if (codeProject) {
    await InstanceApi_createInstance(
      "FLOW_BUILDER_CODE_PROJECT@EASYOPS",
      codeProject
    );
  }
  return await InstanceApi_createInstance(
    "FLOW_BUILDER_FUNCTION_CONTRACT@EASYOPS",
    {
      ...contract,
      namespace: namespaceInstanceId,
      namespaceId,
    }
  );
}

customElements.define(
  "flow-builder.provider-create-function-contract",
  createProviderClass(CreateFunctionContract)
);
