import { InstanceGraphApi_TraverseGraphV2RequestBody } from "@next-sdk/cmdb-sdk";

export function getBaseGraphParams({
  projectId,
  objectId,
  extraQuery,
}: {
  projectId?: string;
  objectId: string;
  extraQuery?: Record<string, unknown>;
}): InstanceGraphApi_TraverseGraphV2RequestBody {
  return {
    object_id: objectId,
    query: {
      "project.instanceId": projectId,
      ...extraQuery,
    },
    select_fields: ["*"],
    child: [
      {
        child: [
          {
            depth: -1,
            parentOut: "children",
            select_fields: ["*"],
          },
        ],
        depth: -1,
        parentOut: "children",
        select_fields: ["*"],
      },
    ],
  };
}
