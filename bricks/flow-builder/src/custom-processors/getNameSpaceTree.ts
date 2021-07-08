import { forEach } from "lodash";
import { cloneDeep } from "lodash";
import { getRuntime } from "@next-core/brick-kit";

interface GraphEdge {
  in: string;
  out: string;
  out_name: string;
  relation_id: string;
}

interface NamespaceVertice {
  _object_id?: string;
  id: string;
  instanceId: string;
}

export function getNameSpaceTree(graphData: {
  topic_vertices: NamespaceVertice[];
  vertices: any[];
  edges: GraphEdge[];
}): any {
  const cloneGraphData = cloneDeep(graphData);
  const namespaceTopicVertices: NamespaceVertice[] = [];
  const namespaceVertices: NamespaceVertice[] = [];
  cloneGraphData.topic_vertices = cloneGraphData.topic_vertices.filter(
    (i) => i.id
  );
  cloneGraphData.topic_vertices.forEach((tv) => {
    const objectId = tv._object_id;
    const splitedNamespace = tv.id.split(".");
    for (let i = 0; i < splitedNamespace.length; i++) {
      const label = splitedNamespace.slice(0, i + 1).join(".");
      if (i === 0) {
        const instanceId = label;
        if (!namespaceTopicVertices.find((n) => n.instanceId === instanceId)) {
          namespaceTopicVertices.push({
            id: splitedNamespace[i], // eg. instance
            instanceId: instanceId, // eg. easyops.cmdb.instance
            _object_id: objectId,
          });
        }
      } else if (i < splitedNamespace.length - 1) {
        const instanceId = label;
        if (!namespaceVertices.find((n) => n.instanceId === instanceId)) {
          namespaceVertices.push({
            id: splitedNamespace[i], // eg. instance
            instanceId: instanceId, // eg. easyops.cmdb.instance
            _object_id: objectId,
          });
          cloneGraphData.edges.push({
            out: splitedNamespace.slice(0, i).join("."),
            in: instanceId,
            out_name: "children",
            relation_id: objectId,
          });
        }
      } else {
        const instanceId = cloneGraphData.topic_vertices.find(
          (i) => i.id === label
        ).instanceId;
        cloneGraphData.edges.push({
          out: splitedNamespace.slice(0, i).join("."),
          in: instanceId,
          out_name: "children",
          relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
        });
      }
    }
  });
  cloneGraphData.vertices = cloneGraphData.vertices
    .concat(
      cloneGraphData.topic_vertices.map((i) => ({
        ...i,
        id: i.id.split(".").pop(),
      })) // origin topic_vertices become vertices, eg. id: "a.b.c" => id: "c"
    )
    .concat(namespaceVertices);
  cloneGraphData.topic_vertices = namespaceTopicVertices;
  return cloneGraphData;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getNameSpaceTree",
  getNameSpaceTree
);
