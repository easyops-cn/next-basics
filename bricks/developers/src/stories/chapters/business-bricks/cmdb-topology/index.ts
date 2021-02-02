import { Chapter } from "../../../interfaces";
import { story as TopologyGraphIndex } from "./topology-graph-index";
import { story as InstanceTopoViewTemplate } from "./instance-topology-view-template";
import { story as TopologyGraph } from "./topology-graph";
import { story as ObjectTopologyView } from "./object-topology-view";

export const chapter: Chapter = {
  category: "cmdb-topology",
  title: {
    en: "cmdb topology",
    zh: "CMDB拓扑",
  },
  stories: [
    TopologyGraphIndex,
    InstanceTopoViewTemplate,
    TopologyGraph,
    ObjectTopologyView,
  ],
};
