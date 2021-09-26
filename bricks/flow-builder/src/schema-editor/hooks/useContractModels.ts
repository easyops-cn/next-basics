import { useEffect, useState } from "react";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractModel } from "../components/type-item/TypeItem";
import { handleHttpError } from "@next-core/brick-kit";

export function useContractModels({
  disabledModelType,
}: { disabledModelType?: boolean } = {}): [
  { q: string; modelList: ContractModel[] },
  (prevState: string) => void
] {
  const [modelList, setModelList] = useState<ContractModel[]>([]);
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    !disabledModelType &&
      (async () => {
        try {
          const list = (
            await InstanceApi_postSearch(
              "FLOW_BUILDER_MODEL_CONTRACT@EASYOPS",
              {
                page: 1,
                page_size: 20,
                query: {
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
  }, [q, disabledModelType]);

  return [{ q, modelList }, setQ];
}
