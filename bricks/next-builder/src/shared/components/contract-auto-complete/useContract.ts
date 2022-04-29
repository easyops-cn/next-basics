import { useEffect, useState } from "react";
import { InstanceApi_postSearchV3 } from "@next-sdk/cmdb-sdk";

interface ContractParams {
  pageSize?: number;
  q?: string;
}

interface ContractField {
  name: string;
  version: string;
  namespaceId: string;
}

export function useContract({
  pageSize = 20,
  q = "",
}: ContractParams): [ContractField[]] {
  const [contractList, setContractList] = useState<ContractField[]>([]);
  const [query, setQ] = useState<string>("");

  useEffect(() => {
    setQ(q);
  }, [q]);

  useEffect(() => {
    (async () => {
      try {
        const { list } = await InstanceApi_postSearchV3(
          "FLOW_BUILDER_API_CONTRACT@EASYOPS",
          {
            page: 1,
            page_size: pageSize,
            fields: ["name", "namespaceId", "version"],
            query: {
              namespaceId: {
                $exists: true,
              },
              $or: [
                { name: { $like: `%${query}%` } },
                { namespaceId: { $like: `%${query}%` } },
              ],
            },
          },
          {
            interceptorParams: { ignoreLoadingBar: true },
          }
        );

        setContractList(list as ContractField[]);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setContractList([]);
      }
    })();
  }, [pageSize, query]);

  return [contractList];
}
