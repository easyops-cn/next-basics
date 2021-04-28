/* istanbul-ignore-file */
/* nothing to test */
import { createProviderClass } from "@next-core/brick-utils";

export function NoOp(): null {
  return null;
}

customElements.define(
  "basic-providers.provider-no-op",
  createProviderClass(NoOp)
);
