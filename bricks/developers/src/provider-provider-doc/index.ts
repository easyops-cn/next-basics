import { createProviderClass } from "@next-core/brick-utils";
import { providerDoc } from "./processors";

customElements.define(
  "developers.provider-provider-doc",
  createProviderClass(providerDoc)
);
