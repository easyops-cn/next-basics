import { useEffect, useState } from "react";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractModel } from "../components/type-item/TypeItem";
import { handleHttpError } from "@next-core/brick-kit";

export function useCurModel(
  modelName: string
): [{ name: string; modelData: ContractModel }, (prevState: string) => void] {
  const [modelData, setModeData] = useState<ContractModel>({} as ContractModel);
  const [name, setName] = useState<string>(modelName);

  useEffect(() => {
    (async () => {
      try {
        const data = (
          await InstanceApi_postSearch("FLOW_BUILDER_MODEL_CONTRACT@EASYOPS", {
            page: 1,
            page_size: 1,
            query: {
              name: {
                $eq: name,
              },
            },
          })
        ).list?.[0];
        setModeData(data as ContractModel);
      } catch (err) {
        handleHttpError(err);
      }
    })();
  }, [name]);

  return [{ name, modelData }, setName];
}
