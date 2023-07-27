import { createProviderClass } from "@next-core/brick-utils";

import { getIconList } from "@next-libs/basic-components";

customElements.define(
  "developers.provider-get-icon-list",
  createProviderClass(getIconList)
);
