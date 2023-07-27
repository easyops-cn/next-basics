import { createProviderClass } from "@next-core/brick-utils";

import {
  listBrickStory,
  categoryList,
  categoryMenu,
  getBrickDocs,
  categoryMenuV2,
  listBrickStoryV2,
} from "./processor";

customElements.define(
  "developers.providers-of-brick-story",
  createProviderClass(listBrickStory)
);

customElements.define(
  "developers.providers-of-brick-story-v2",
  createProviderClass(listBrickStoryV2)
);

customElements.define(
  "developers.get-category-list",
  createProviderClass(categoryList)
);

customElements.define(
  "developers.get-category-menu",
  createProviderClass(categoryMenu)
);

customElements.define(
  "developers.get-category-menu-v2",
  createProviderClass(categoryMenuV2)
);

customElements.define(
  "developers.providers-of-brick-docs",
  createProviderClass(getBrickDocs)
);
