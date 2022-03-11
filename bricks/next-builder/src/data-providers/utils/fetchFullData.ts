import {
  InstanceApi_postSearchV3,
  type InstanceApi_PostSearchV3RequestBody,
} from "@next-sdk/cmdb-sdk";
import { RequestCustomOptions } from "@next-core/brick-http";

export async function fetchFullData(
  objectId: string | number,
  requsetParam: InstanceApi_PostSearchV3RequestBody,
  options?: RequestCustomOptions
): Promise<{ list: Record<string, unknown>[] }> {
  let initPage = 1;
  const initPageSize = 3000;

  const fetchData = async (
    list: Record<string, unknown>[] = []
  ): Promise<Record<string, unknown>[]> => {
    const result = await InstanceApi_postSearchV3(
      objectId,
      {
        ...requsetParam,
        page: initPage,
        page_size: initPageSize,
      },
      options
    );
    list = list.concat(result.list);
    if (list.length < result.total) {
      initPage++;
      list = await fetchData(list);
    }
    return list;
  };

  const list = await fetchData([]);

  return {
    list,
  };
}
