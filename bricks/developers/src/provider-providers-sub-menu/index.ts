import { createProviderClass } from "@next-core/brick-utils";
import { redirectTo, providersSubMenu, serviceData } from "./processors";

customElements.define(
  "developers.provider-redirect-to",
  createProviderClass(redirectTo)
);

customElements.define(
  "developers.provider-providers-sub-menu",
  createProviderClass(providersSubMenu)
);

customElements.define(
  "developers.provider-service-data",
  createProviderClass(serviceData)
);
