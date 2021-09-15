import { getRuntime } from "@next-core/brick-kit";
import { ResolveConf, UseProviderResolveConf } from "@next-core/brick-types";
import {
  EventFormField,
  HandlerType,
} from "../shared/visual-events/interfaces";
import { isFlowAPiProvider } from "../shared/visual-events/processEventHandler";
import { safeDumpFields } from "../builder-container/DataView/utils";
import { omitBy, isNil } from "lodash";

export function covertUseResolvesToFormValue(
  resolveData: ResolveConf
): EventFormField {
  // 只转换 useProvider 最新的使用方式，name，fields，ref 的遗留写法会提示用户转到 yaml 编辑
  const providerType = isFlowAPiProvider(
    (resolveData as UseProviderResolveConf).useProvider
  )
    ? "flow"
    : "provider";

  const provider = (resolveData as UseProviderResolveConf).useProvider;

  return {
    handlerType: HandlerType.UseProvider,
    providerType,
    ...(providerType === "flow" ? { flow: provider } : { provider }),
    ...safeDumpFields(
      omitBy(
        {
          if: resolveData.if,
          args: (resolveData as UseProviderResolveConf).args,
          transform: resolveData.transform,
          transformFrom: resolveData.transformFrom,
          onReject: resolveData.onReject,
        },
        isNil
      )
    ),
  };
}

getRuntime().registerCustomProcessor(
  "nextBuilder.covertUseResolvesToFormValue",
  covertUseResolvesToFormValue
);
