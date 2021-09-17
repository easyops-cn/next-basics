import { getRuntime } from "@next-core/brick-kit";
import { UseProviderResolveConf } from "@next-core/brick-types";
import { safeLoadFields } from "../builder-container/DataView/utils";
import { EventFormField } from "../shared/visual-events/interfaces";

export function covertFormValueToUseResolves(
  formValue: EventFormField
): UseProviderResolveConf {
  const useProvider =
    formValue.providerType === "provider" ? formValue.provider : formValue.flow;

  return {
    useProvider,
    ...(formValue.transformMapArray === "auto"
      ? {}
      : { transformMapArray: formValue.transformMapArray }),
    ...safeLoadFields({
      if: formValue.if,
      args: formValue.args,
      transform: formValue.transform,
      transformFrom: formValue.transformFrom,
      onReject: formValue.onReject,
    }),
  };
}

getRuntime().registerCustomProcessor(
  "nextBuilder.covertFormValueToUseResolves",
  covertFormValueToUseResolves
);
