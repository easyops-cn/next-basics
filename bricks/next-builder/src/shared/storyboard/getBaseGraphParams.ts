import { InstanceGraphApi_TraverseGraphV2RequestBody } from "@next-sdk/cmdb-sdk";

export function getBaseGraphParams({
  projectId,
  objectId,
}: {
  projectId: string;
  objectId: string;
}): InstanceGraphApi_TraverseGraphV2RequestBody {
  return {
    object_id: objectId,
    query: {
      "project.instanceId": projectId,
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
