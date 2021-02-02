import { Chapter } from "../../../interfaces";
import { story as GeneralTopology } from "./general-topology";
import { story as GeneralGraph } from "./general-graph";
import { story as HeaderWithDropdown } from "./header-with-dropdown";
import { story as ItemWithTag } from "./item-with-tag";
import { story as GraphNode } from "./graph-node";
import { story as GraphIcon } from "./graph-icon";
export const chapter: Chapter = {
  category: "topology",
  title: {
    en: "topology",
    zh: "拓扑",
  },
  stories: [
    GeneralTopology,
    GeneralGraph,
    HeaderWithDropdown,
    ItemWithTag,
    GraphNode,
    GraphIcon,
  ],
};
