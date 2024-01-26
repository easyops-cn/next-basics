import { useEffect, useState } from "react";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractModel } from "../components/type-item/TypeItem";
import { handleHttpError } from "@next-core/brick-kit";

export interface ContractModelsParams {
  disabledModelType?: boolean;
  projectId?: string;
}

export function useContractModels({
  disabledModelType,
  projectId,
}: ContractModelsParams = {}): [
  { q: string; modelList: ContractModel[] },
  (prevState: string) => void,
  (prevState: number) => void
] {
  const [modelList, setModelList] = useState<ContractModel[]>([]);
  const [q, setQ] = useState<string>("");
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    !disabledModelType &&
      (async () => {
        try {
          const list = (
            await InstanceApi_postSearch(
              "FLOW_BUILDER_MODEL_CONTRACT@EASYOPS",
              {
                page: 1,
                page_size: pageSize,
                query: {
                  "namespace.apiProject.instanceId": projectId,
                  $or: [
                    { name: { $like: `%${q}%` } },
                    { namespaceId: { $like: `%${q}%` } },
                  ],
                },
              },
              {
                interceptorParams: { ignoreLoadingBar: true },
              }
            )
          ).list;
          setModelList(list as ContractModel[]);
        } catch (err) {
          handleHttpError(err);
        }
      })();
  }, [q, disabledModelType, pageSize]);

  return [{ q, modelList }, setQ, setPageSize];
}
