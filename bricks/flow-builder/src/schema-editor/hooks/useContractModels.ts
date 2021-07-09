import { useEffect, useState } from "react";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractModel } from "../components/type-item/TypeItem";

export function useContractModels(): [
  { q: string; modelList: ContractModel[] },
  (prevState: string) => void
] {
  const [modelList, setModelList] = useState<ContractModel[]>([]);
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    (async () => {
      const list = (
        await InstanceApi_postSearch("FLOW_BUILDER_MODEL_CONTRACT@EASYOPS", {
          page: 1,
          page_size: 20,
          query: {
            $or: [
              { name: { $like: `%${q}%` } },
              { namespaceId: { $like: `%${q}%` } },
            ],
          },
        })
      ).list;
      setModelList(list as ContractModel[]);
    })();
  }, [q]);

  return [{ q, modelList }, setQ];
}
