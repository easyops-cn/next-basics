import React from "react";
import { Annotation, Declaration } from "../V3Types/annotation";
import { ProviderParam, V3ProviderParams } from "./V3ProviderParams";
import { V3ProviderReturns } from "./V3ProviderReturns";

export interface V3ProviderInterfaceProps {
  data: {
    types?: Declaration[];
    params?: ProviderParam[];
    returns?: {
      annotation: Annotation;
    };
  };
}

export function V3ProviderInterface({
  data,
}: V3ProviderInterfaceProps): React.ReactElement {
  return (
    <>
      <h2>Definition</h2>
      <V3ProviderParams params={data?.params} types={data?.types} />
      <V3ProviderReturns returns={data?.returns} types={data?.types} />
    </>
  );
}
