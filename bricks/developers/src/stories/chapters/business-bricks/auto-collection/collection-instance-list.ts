import { Story } from "../../../interfaces";
import docMD from "../../../docs/auto-collection/collection-instance-list-template.md";

import { CMDB_AUTO_COLLECTION_CONFIG_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-auto-collection.collection-instance-list",
  type: "template",
  author: "cyril",
  text: {
    en: "Collection Instance List",
    zh: "采集实例列表"
  },
  description: {
    en: "",
    zh:
      "展示自动采集实例列表，并支持同步自动采集的实例和对特定的采集实例执行立即采集"
  },
  icon: {
    lib: "fa",
    icon: "box"
  },
  conf: {
    template: "cmdb-auto-collection.collection-instance-list",
    params: {
      collectionConfigId: CMDB_AUTO_COLLECTION_CONFIG_ID
    }
  },
  doc: docMD
};
