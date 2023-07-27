import { Story } from "../../../interfaces";
import docMD from "../../../docs/auto-collection/collection-history-list-template.md";

import { CMDB_AUTO_COLLECTION_CONFIG_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-auto-collection.collection-history-list",
  type: "template",
  author: "cyril",
  text: {
    en: "Collection History List",
    zh: "采集历史列表"
  },
  description: {
    en: "",
    zh: "展示自动采集历史列表"
  },
  icon: {
    lib: "fa",
    icon: "box"
  },
  conf: {
    template: "cmdb-auto-collection.collection-history-list",
    params: {
      collectionConfigId: CMDB_AUTO_COLLECTION_CONFIG_ID
    }
  },
  doc: docMD
};
