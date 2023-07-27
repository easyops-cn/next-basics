import { useEffect, useState } from "react";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractModel } from "../components/type-item/TypeItem";
import { handleHttpError } from "@next-core/brick-kit";

export async function fetchModelData(
  modelName: string
): Promise<ContractModel> {
  try {
    return (
      await InstanceApi_postSearch(
        "FLOW_BUILDER_MODEL_CONTRACT@EASYOPS",
        {
          page: 1,
          page_size: 1,
          query: {
            name: {
              $eq: modelName,
            },
          },
        },
        {
          interceptorParams: { ignoreLoadingBar: true },
        }
      )
    ).list?.[0] as ContractModel;
  } catch (err) {
    handleHttpError(err);
  }
}

export function useCurModel(
  modelName: string
): [{ name: string; modelData: ContractModel }, (prevState: string) => void] {
  const [modelData, setModeData] = useState<ContractModel>({} as ContractModel);
  const [name, setName] = useState<string>(modelName);

  useEffect(() => {
    (async () => {
      const data = await fetchModelData(name);
      setModeData(data);
    })();
  }, [name]);

  return [{ name, modelData }, setName];
}
